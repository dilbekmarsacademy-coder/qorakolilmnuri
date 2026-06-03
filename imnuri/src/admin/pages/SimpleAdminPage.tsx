// Testimonials, Courses, Gallery uchun umumiy sahifa
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa'

type Row = Record<string, unknown>

type PageConfig = {
  title: string
  table: string
  columns: { key: string; label: string; type?: string; rows?: number }[]
  displayKey: string
}

export const testimonialsConfig: PageConfig = {
  title: "O'quvchilar sharhlari",
  table: 'testimonials',
  displayKey: 'name',
  columns: [
    { key: 'name', label: 'Ism' },
    { key: 'result', label: 'Natija (IELTS 7.5 / DTM 90)' },
    { key: 'university', label: 'Universitet' },
    { key: 'year', label: 'Yil' },
    { key: 'text', label: 'Sharh matni', type: 'textarea', rows: 3 },
    { key: 'image_url', label: 'Rasm URL (ixtiyoriy)' },
  ],
}

export const galleryConfig: PageConfig = {
  title: 'Galereya',
  table: 'gallery_items',
  displayKey: 'label',
  columns: [
    { key: 'label', label: 'Nomi' },
    { key: 'category', label: 'Kategoriya (Darslar / Natijalar / Tadbirlar)' },
    { key: 'emoji', label: 'Emoji (📚 / 🏆 / 🎓)' },
    { key: 'image_url', label: 'Rasm URL (ixtiyoriy)' },
    { key: 'display_order', label: 'Tartib raqami', type: 'number' },
  ],
}

export function GenericAdminPage({ config }: { config: PageConfig }) {
  const [rows, setRows] = useState<Row[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Row | null>(null)
  const [saving, setSaving] = useState(false)

  const load = async () => {
    setLoading(true)
    const { data } = await supabase.from(config.table).select('*').order('created_at', { ascending: false })
    if (data) setRows(data)
    setLoading(false)
  }

  useEffect(() => { load() }, [config.table])

  const openNew = () => {
    const empty: Row = { id: undefined }
    config.columns.forEach(c => { empty[c.key] = '' })
    setEditing(empty)
  }

  const save = async () => {
    if (!editing) return
    setSaving(true)
    const { id, ...rest } = editing
    if (id) {
      await supabase.from(config.table).update(rest).eq('id', id)
    } else {
      await supabase.from(config.table).insert(rest)
    }
    setSaving(false)
    setEditing(null)
    load()
  }

  const remove = async (id: unknown) => {
    if (!confirm("O'chirilsinmi?")) return
    await supabase.from(config.table).delete().eq('id', id)
    setRows(prev => prev.filter(r => r.id !== id))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-heading font-bold text-gray-800">{config.title}</h2>
          <p className="text-gray-500 text-sm mt-1">{rows.length} ta yozuv</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 bg-primary hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-all">
          <FaPlus size={13} /> Yangi
        </button>
      </div>

      {loading ? (
        <div className="text-center py-10 text-gray-400">Yuklanmoqda...</div>
      ) : rows.length === 0 ? (
        <div className="text-center py-10 text-gray-400">
          <div className="text-4xl mb-3">📭</div>
          <p>Hozircha ma'lumot yo'q</p>
          <button onClick={openNew} className="mt-4 text-primary font-medium text-sm hover:underline">+ Yangi qo'shish</button>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Nomi</th>
                {config.columns.slice(1, 3).map(c => (
                  <th key={c.key} className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">{c.label}</th>
                ))}
                <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {rows.map(row => (
                <tr key={String(row.id)} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5 font-medium text-gray-800 text-sm">{String(row[config.displayKey] || '')}</td>
                  {config.columns.slice(1, 3).map(c => (
                    <td key={c.key} className="px-5 py-3.5 text-gray-500 text-sm hidden md:table-cell">
                      {String(row[c.key] || '').slice(0, 50)}
                    </td>
                  ))}
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => setEditing({ ...row })} className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition-colors">
                        <FaEdit size={12} />
                      </button>
                      <button onClick={() => remove(row.id)} className="w-7 h-7 rounded-lg bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 transition-colors">
                        <FaTrash size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl my-4">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-gray-800">{editing.id ? 'Tahrirlash' : 'Yangi qo\'shish'}</h3>
              <button onClick={() => setEditing(null)} className="text-gray-400 hover:text-gray-600"><FaTimes /></button>
            </div>
            <div className="space-y-4">
              {config.columns.map(col => (
                <div key={col.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{col.label}</label>
                  {col.type === 'textarea' ? (
                    <textarea value={String(editing[col.key] ?? '')} onChange={e => setEditing(p => ({ ...p!, [col.key]: e.target.value }))}
                      rows={col.rows ?? 3} className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary resize-none" />
                  ) : (
                    <input type={col.type ?? 'text'} value={String(editing[col.key] ?? '')} onChange={e => setEditing(p => ({ ...p!, [col.key]: e.target.value }))}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary" />
                  )}
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setEditing(null)} className="flex-1 py-3 border border-gray-200 rounded-2xl text-sm text-gray-500 hover:bg-gray-50">Bekor</button>
              <button onClick={save} disabled={saving} className="flex-1 py-3 bg-primary text-white rounded-2xl text-sm font-bold hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2">
                {saving ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <FaSave size={14} />}
                Saqlash
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
