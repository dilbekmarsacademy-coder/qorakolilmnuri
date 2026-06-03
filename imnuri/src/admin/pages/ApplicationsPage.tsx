import { useEffect, useState } from 'react'
import { supabase, type Application, type ApplicationStatus } from '../../lib/supabase'
import { FaSearch, FaPhone, FaTrash, FaStickyNote } from 'react-icons/fa'

const statusConfig: Record<ApplicationStatus, { label: string; bg: string; text: string }> = {
  new:       { label: 'Yangi',        bg: 'bg-blue-100',   text: 'text-blue-700' },
  contacted: { label: "Qo'ng'irildi", bg: 'bg-yellow-100', text: 'text-yellow-700' },
  enrolled:  { label: 'Yozildi',      bg: 'bg-green-100',  text: 'text-green-700' },
  rejected:  { label: 'Rad etildi',   bg: 'bg-red-100',    text: 'text-red-700' },
}

const statusOptions: { value: ApplicationStatus; label: string }[] = [
  { value: 'new',       label: 'Yangi' },
  { value: 'contacted', label: "Qo'ng'irildi" },
  { value: 'enrolled',  label: 'Yozildi' },
  { value: 'rejected',  label: 'Rad etildi' },
]

export default function ApplicationsPage() {
  const [apps, setApps] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [editingNotes, setEditingNotes] = useState<string | null>(null)
  const [noteText, setNoteText] = useState('')

  const load = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('applications')
      .select('*')
      .order('created_at', { ascending: false })
    if (data) setApps(data as Application[])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const updateStatus = async (id: string, status: ApplicationStatus) => {
    await supabase.from('applications').update({ status }).eq('id', id)
    setApps(prev => prev.map(a => a.id === id ? { ...a, status } : a))
  }

  const saveNotes = async (id: string) => {
    await supabase.from('applications').update({ notes: noteText }).eq('id', id)
    setApps(prev => prev.map(a => a.id === id ? { ...a, notes: noteText } : a))
    setEditingNotes(null)
  }

  const deleteApp = async (id: string) => {
    if (!confirm('Bu arizani o\'chirishni xohlaysizmi?')) return
    await supabase.from('applications').delete().eq('id', id)
    setApps(prev => prev.filter(a => a.id !== id))
  }

  const filtered = apps.filter(a => {
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.phone.includes(search) || a.course?.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === 'all' || a.status === filterStatus
    return matchSearch && matchStatus
  })

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-heading font-bold text-gray-800">Arizalar</h2>
        <p className="text-gray-500 text-sm mt-1">Jami: {apps.length} ta ariza</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
          <input
            type="text"
            placeholder="Ism, telefon yoki fan bo'yicha qidirish..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary bg-white"
          />
        </div>
        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary bg-white"
        >
          <option value="all">Barcha statuslar</option>
          {statusOptions.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
      </div>

      {/* Status summary */}
      <div className="flex gap-3 mb-6 flex-wrap">
        {statusOptions.map(s => {
          const count = apps.filter(a => a.status === s.value).length
          const cfg = statusConfig[s.value]
          return (
            <button key={s.value} onClick={() => setFilterStatus(filterStatus === s.value ? 'all' : s.value)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${cfg.bg} ${cfg.text} ${filterStatus === s.value ? 'ring-2 ring-offset-1 ring-current' : ''}`}>
              {s.label}: {count}
            </button>
          )
        })}
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-gray-400">Yuklanmoqda...</div>
        ) : filtered.length === 0 ? (
          <div className="p-10 text-center">
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-gray-400">Ariza topilmadi</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['Ism', 'Telefon', 'Fan', 'Vaqt', 'Sana', 'Status', 'Amallar'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map(app => {
                  const st = statusConfig[app.status]
                  return (
                    <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs flex-shrink-0">
                            {app.name?.[0] ?? '?'}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-800">{app.name}</p>
                            {app.notes && <p className="text-xs text-gray-400 truncate max-w-[120px]">{app.notes}</p>}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <a href={`tel:${app.phone.replace(/\s/g,'')}`} className="flex items-center gap-1.5 text-sm text-primary hover:underline">
                          <FaPhone size={11} /> {app.phone}
                        </a>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{app.course || '—'}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{app.preferred_time || '—'}</td>
                      <td className="px-4 py-3 text-xs text-gray-400">
                        {new Date(app.created_at).toLocaleDateString('uz-UZ')}
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={app.status}
                          onChange={e => updateStatus(app.id, e.target.value as ApplicationStatus)}
                          className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg border-0 cursor-pointer ${st.bg} ${st.text}`}
                        >
                          {statusOptions.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <button onClick={() => { setEditingNotes(app.id); setNoteText(app.notes || '') }}
                            title="Izoh qo'shish"
                            className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-primary/10 hover:text-primary flex items-center justify-center text-gray-400 transition-colors">
                            <FaStickyNote size={12} />
                          </button>
                          <button onClick={() => deleteApp(app.id)}
                            title="O'chirish"
                            className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-red-50 hover:text-red-500 flex items-center justify-center text-gray-400 transition-colors">
                            <FaTrash size={12} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Notes modal */}
      {editingNotes && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="font-bold text-gray-800 mb-4">Izoh qo'shish</h3>
            <textarea
              value={noteText}
              onChange={e => setNoteText(e.target.value)}
              placeholder="Bu ariza haqida eslatma..."
              rows={4}
              className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-primary resize-none"
              autoFocus
            />
            <div className="flex gap-3 mt-4">
              <button onClick={() => setEditingNotes(null)}
                className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-500 hover:bg-gray-50">
                Bekor
              </button>
              <button onClick={() => saveNotes(editingNotes)}
                className="flex-1 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-blue-700">
                Saqlash
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
