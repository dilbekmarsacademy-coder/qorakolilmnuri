import { useEffect, useState } from 'react'
import { supabase, type Teacher } from '../../lib/supabase'
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa'

// Komponent tashqarisida — har renderda qayta yaratilmaydi
function Field({ label, value, onChange, type = 'text' }: {
  label: string
  value: string | number
  onChange: (v: string) => void
  type?: string
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary"
      />
    </div>
  )
}

const empty: Omit<Teacher, 'id'> = {
  name: '', subject: '', experience: '', score: '', rating: 5.0,
  students: 0, cert: '', bio: '', gradient: 'linear-gradient(135deg,#1B4F8A,#2563EB)',
  image_url: '', display_order: 0, active: true,
}

export default function TeachersAdminPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Partial<Teacher> | null>(null)
  const [saving, setSaving] = useState(false)

  const load = async () => {
    setLoading(true)
    const { data } = await supabase.from('teachers').select('*').order('display_order')
    if (data) setTeachers(data as Teacher[])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const openNew = () => setEditing({ ...empty })
  const openEdit = (t: Teacher) => setEditing({ ...t })

  const [saveError, setSaveError] = useState<string | null>(null)

  const save = async () => {
    if (!editing || !editing.name?.trim()) return
    setSaving(true)
    setSaveError(null)

    const { id, ...fields } = editing

    if (id) {
      const { error } = await supabase.from('teachers').update(fields).eq('id', id)
      if (error) { setSaveError(error.message); setSaving(false); return }
    } else {
      const { error } = await supabase.from('teachers').insert([fields])
      if (error) { setSaveError(error.message); setSaving(false); return }
    }

    setSaving(false)
    setEditing(null)
    load()
  }

  const remove = async (id: string) => {
    if (!confirm("O'chirilsinmi?")) return
    await supabase.from('teachers').delete().eq('id', id)
    setTeachers(prev => prev.filter(t => t.id !== id))
  }

  const toggleActive = async (t: Teacher) => {
    await supabase.from('teachers').update({ active: !t.active }).eq('id', t.id)
    setTeachers(prev => prev.map(x => x.id === t.id ? { ...x, active: !x.active } : x))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-heading font-bold text-gray-800">O'qituvchilar</h2>
          <p className="text-gray-500 text-sm mt-1">{teachers.length} ta o'qituvchi</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 bg-primary hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-all hover:shadow-lg">
          <FaPlus size={13} /> Yangi qo'shish
        </button>
      </div>

      {loading ? (
        <div className="text-center py-10 text-gray-400">Yuklanmoqda...</div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {teachers.map(t => (
            <div key={t.id} className={`bg-white rounded-3xl border overflow-hidden transition-all ${t.active ? 'border-gray-100' : 'border-gray-200 opacity-60'}`}>
              <div className="h-3 rounded-t-3xl" style={{ background: t.gradient }} />
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg"
                    style={{ background: t.gradient }}>
                    {t.name?.[0] ?? '?'}
                  </div>
                  <div className="flex gap-1.5">
                    <button onClick={() => toggleActive(t)} title={t.active ? "Yashirish" : "Ko'rsatish"}
                      className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors ${t.active ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                      {t.active ? '✓' : '×'}
                    </button>
                    <button onClick={() => openEdit(t)} className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition-colors">
                      <FaEdit size={12} />
                    </button>
                    <button onClick={() => remove(t.id)} className="w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 transition-colors">
                      <FaTrash size={12} />
                    </button>
                  </div>
                </div>
                <h3 className="font-bold text-gray-800 mb-0.5">{t.name}</h3>
                <p className="text-primary text-sm mb-2">{t.subject}</p>
                <div className="flex gap-3 text-xs text-gray-500">
                  <span>⭐ {t.rating}</span>
                  <span>👥 {t.students}+</span>
                  <span>📅 {t.experience}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 w-full max-w-xl shadow-2xl my-4">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-gray-800 text-lg">{editing.id ? 'Tahrirlash' : "Yangi o'qituvchi"}</h3>
              <button onClick={() => setEditing(null)} className="text-gray-400 hover:text-gray-600"><FaTimes /></button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="col-span-2"><Field label="To'liq ism *" value={editing.name ?? ''} onChange={v => setEditing(p => ({ ...p, name: v }))} /></div>
              <Field label="Fan" value={editing.subject ?? ''} onChange={v => setEditing(p => ({ ...p, subject: v }))} />
              <Field label="Tajriba" value={editing.experience ?? ''} onChange={v => setEditing(p => ({ ...p, experience: v }))} />
              <Field label="Natija (IELTS/DTM)" value={editing.score ?? ''} onChange={v => setEditing(p => ({ ...p, score: v }))} />
              <Field label="Sertifikat" value={editing.cert ?? ''} onChange={v => setEditing(p => ({ ...p, cert: v }))} />
              <Field label="Reyting (1-5)" value={editing.rating ?? 5} onChange={v => setEditing(p => ({ ...p, rating: parseFloat(v) }))} type="number" />
              <Field label="O'quvchilar soni" value={editing.students ?? 0} onChange={v => setEditing(p => ({ ...p, students: parseInt(v) }))} type="number" />
              <div className="col-span-2"><Field label="Rasm URL (bo'sh qoldirsa avatar ko'rinadi)" value={editing.image_url ?? ''} onChange={v => setEditing(p => ({ ...p, image_url: v }))} /></div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio / Qisqa ma'lumot</label>
                <textarea value={editing.bio ?? ''} onChange={e => setEditing(p => ({ ...p, bio: e.target.value }))} rows={3}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary resize-none" />
              </div>
            </div>

            {saveError && (
              <div className="mb-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-600 text-sm">
                ⚠️ Xato: {saveError}
              </div>
            )}
            <div className="flex gap-3">
              <button onClick={() => { setEditing(null); setSaveError(null) }}
                className="flex-1 py-3 border border-gray-200 rounded-2xl text-sm text-gray-500 hover:bg-gray-50">
                Bekor
              </button>
              <button onClick={save} disabled={saving || !editing.name?.trim()}
                className="flex-1 py-3 bg-primary text-white rounded-2xl text-sm font-bold hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2">
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
