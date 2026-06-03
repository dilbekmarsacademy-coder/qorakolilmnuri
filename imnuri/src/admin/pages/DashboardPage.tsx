import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { FaFileAlt, FaUsers, FaClock, FaCheckCircle, FaPhoneAlt, FaArrowRight } from 'react-icons/fa'

type Stats = {
  total: number
  new: number
  contacted: number
  enrolled: number
}

type RecentApp = {
  id: string
  name: string
  phone: string
  course: string
  status: string
  created_at: string
}

const statusConfig = {
  new:       { label: 'Yangi',        bg: 'bg-blue-100',   text: 'text-blue-700' },
  contacted: { label: "Qo'ng'irildi", bg: 'bg-yellow-100', text: 'text-yellow-700' },
  enrolled:  { label: 'Yozildi',      bg: 'bg-green-100',  text: 'text-green-700' },
  rejected:  { label: 'Rad etildi',   bg: 'bg-red-100',    text: 'text-red-700' },
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({ total: 0, new: 0, contacted: 0, enrolled: 0 })
  const [recent, setRecent] = useState<RecentApp[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('applications')
        .select('id, name, phone, course, status, created_at')
        .order('created_at', { ascending: false })
        .limit(50)

      if (data) {
        setStats({
          total:     data.length,
          new:       data.filter(d => d.status === 'new').length,
          contacted: data.filter(d => d.status === 'contacted').length,
          enrolled:  data.filter(d => d.status === 'enrolled').length,
        })
        setRecent(data.slice(0, 8))
      }
      setLoading(false)
    }
    load()
  }, [])

  const cards = [
    { label: 'Jami arizalar',   value: stats.total,     icon: FaFileAlt,     color: 'bg-blue-500',   light: 'bg-blue-50',   text: 'text-blue-600' },
    { label: 'Yangi',           value: stats.new,        icon: FaClock,       color: 'bg-amber-500',  light: 'bg-amber-50',  text: 'text-amber-600' },
    { label: "Qo'ng'irildi",   value: stats.contacted,  icon: FaPhoneAlt,    color: 'bg-purple-500', light: 'bg-purple-50', text: 'text-purple-600' },
    { label: 'Yozildi',        value: stats.enrolled,   icon: FaCheckCircle, color: 'bg-green-500',  light: 'bg-green-50',  text: 'text-green-600' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-heading font-bold text-gray-800">Dashboard</h2>
        <p className="text-gray-500 text-sm mt-1">Ilm Nuri ta'lim markazi boshqaruv paneli</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((c, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className={`w-11 h-11 ${c.light} rounded-xl flex items-center justify-center mb-3`}>
              <c.icon className={c.text} size={18} />
            </div>
            <p className="text-2xl font-heading font-black text-gray-800">
              {loading ? '—' : c.value}
            </p>
            <p className="text-gray-500 text-sm mt-0.5">{c.label}</p>
          </div>
        ))}
      </div>

      {/* Recent applications */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-heading font-bold text-gray-800">So'nggi arizalar</h3>
          <Link to="/admin/applications" className="text-primary text-sm font-medium hover:underline flex items-center gap-1">
            Hammasi <FaArrowRight size={12} />
          </Link>
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-400">Yuklanmoqda...</div>
        ) : recent.length === 0 ? (
          <div className="p-8 text-center">
            <div className="text-4xl mb-3">📭</div>
            <p className="text-gray-500">Hozircha ariza yo'q</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {recent.map(app => {
              const st = statusConfig[app.status as keyof typeof statusConfig] ?? statusConfig.new
              return (
                <div key={app.id} className="px-6 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm flex-shrink-0">
                    {app.name?.[0] ?? '?'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 text-sm">{app.name}</p>
                    <p className="text-gray-400 text-xs">{app.phone} · {app.course}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${st.bg} ${st.text}`}>
                    {st.label}
                  </span>
                  <p className="text-gray-400 text-xs hidden md:block">
                    {new Date(app.created_at).toLocaleDateString('uz-UZ')}
                  </p>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Quick links */}
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        {[
          { label: "O'qituvchilarni tahrirlash", to: '/admin/teachers', icon: FaUsers, color: 'text-teal-600', bg: 'bg-teal-50' },
          { label: 'Kurslarni boshqarish', to: '/admin/courses', icon: FaFileAlt, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Sayt sozlamalari', to: '/admin/settings', icon: FaCheckCircle, color: 'text-orange-600', bg: 'bg-orange-50' },
        ].map((item, i) => (
          <Link key={i} to={item.to} className="bg-white rounded-2xl p-5 border border-gray-100 hover:border-primary/20 hover:shadow-md transition-all flex items-center gap-4">
            <div className={`w-10 h-10 ${item.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
              <item.icon className={item.color} size={18} />
            </div>
            <span className="font-medium text-gray-700 text-sm">{item.label}</span>
            <FaArrowRight className="text-gray-300 ml-auto" size={13} />
          </Link>
        ))}
      </div>
    </div>
  )
}
