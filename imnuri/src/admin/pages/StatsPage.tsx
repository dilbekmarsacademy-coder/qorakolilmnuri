import { useEffect, useState, lazy, Suspense } from 'react'
import { supabase } from '../../lib/supabase'

const PieChart       = lazy(() => import('recharts').then(m => ({ default: m.PieChart })))
const Pie            = lazy(() => import('recharts').then(m => ({ default: m.Pie })))
const Cell           = lazy(() => import('recharts').then(m => ({ default: m.Cell })))
const BarChart       = lazy(() => import('recharts').then(m => ({ default: m.BarChart })))
const Bar            = lazy(() => import('recharts').then(m => ({ default: m.Bar })))
const XAxis          = lazy(() => import('recharts').then(m => ({ default: m.XAxis })))
const YAxis          = lazy(() => import('recharts').then(m => ({ default: m.YAxis })))
const CartesianGrid  = lazy(() => import('recharts').then(m => ({ default: m.CartesianGrid })))
const Tooltip        = lazy(() => import('recharts').then(m => ({ default: m.Tooltip })))
const ResponsiveContainer = lazy(() => import('recharts').then(m => ({ default: m.ResponsiveContainer })))

const COLORS = ['#1B4F8A', '#F4A51B', '#10b981', '#ef4444']

export default function StatsPage() {
  const [data, setData] = useState<{ course: string; count: number }[]>([])
  const [byStatus, setByStatus] = useState<{ name: string; value: number }[]>([])
  const [byDay, setByDay] = useState<{ date: string; count: number }[]>([])

  useEffect(() => {
    async function load() {
      const { data: apps } = await supabase.from('applications').select('course, status, created_at')
      if (!apps) return

      // By course
      const courseMap: Record<string, number> = {}
      apps.forEach(a => { courseMap[a.course || 'Noma\'lum'] = (courseMap[a.course || 'Noma\'lum'] || 0) + 1 })
      setData(Object.entries(courseMap).map(([course, count]) => ({ course, count })).sort((a, b) => b.count - a.count))

      // By status
      const statusMap: Record<string, number> = { new: 0, contacted: 0, enrolled: 0, rejected: 0 }
      apps.forEach(a => { if (a.status in statusMap) statusMap[a.status]++ })
      setByStatus([
        { name: 'Yangi', value: statusMap.new },
        { name: "Qo'ng'irildi", value: statusMap.contacted },
        { name: 'Yozildi', value: statusMap.enrolled },
        { name: 'Rad', value: statusMap.rejected },
      ])

      // By day (last 14 days)
      const dayMap: Record<string, number> = {}
      const today = new Date()
      for (let i = 13; i >= 0; i--) {
        const d = new Date(today)
        d.setDate(d.getDate() - i)
        dayMap[d.toISOString().slice(5, 10)] = 0
      }
      apps.forEach(a => {
        const day = a.created_at.slice(5, 10)
        if (day in dayMap) dayMap[day]++
      })
      setByDay(Object.entries(dayMap).map(([date, count]) => ({ date, count })))
    }
    load()
  }, [])

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-heading font-bold text-gray-800">Statistika</h2>
        <p className="text-gray-500 text-sm mt-1">Arizalar bo'yicha tahlil</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Fanlar bo'yicha */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-700 mb-5">Fan bo'yicha arizalar</h3>
          <Suspense fallback={<div className="h-64 flex items-center justify-center text-gray-400">Yuklanmoqda...</div>}>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={data} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="course" tick={{ fontSize: 10, fill: '#6B7280' }} />
                <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} />
                <Tooltip />
                <Bar dataKey="count" name="Ariza" fill="#1B4F8A" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </Suspense>
        </div>

        {/* Status bo'yicha */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-700 mb-5">Status bo'yicha</h3>
          <Suspense fallback={<div className="h-64 flex items-center justify-center text-gray-400">Yuklanmoqda...</div>}>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={byStatus} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({ name, value }) => `${name}: ${value}`} labelLine={false}>
                  {byStatus.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Suspense>
        </div>

        {/* Kunlik */}
        <div className="md:col-span-2 bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-700 mb-5">So'nggi 14 kun</h3>
          <Suspense fallback={<div className="h-64 flex items-center justify-center text-gray-400">Yuklanmoqda...</div>}>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={byDay} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#6B7280' }} />
                <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} />
                <Tooltip />
                <Bar dataKey="count" name="Ariza" fill="#F4A51B" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </Suspense>
        </div>
      </div>
    </div>
  )
}
