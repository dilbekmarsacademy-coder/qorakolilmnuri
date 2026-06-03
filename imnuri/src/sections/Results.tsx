import { motion } from 'framer-motion'
import { lazy, Suspense } from 'react'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'

const BarChart     = lazy(() => import('recharts').then(m => ({ default: m.BarChart })))
const Bar          = lazy(() => import('recharts').then(m => ({ default: m.Bar })))
const XAxis        = lazy(() => import('recharts').then(m => ({ default: m.XAxis })))
const YAxis        = lazy(() => import('recharts').then(m => ({ default: m.YAxis })))
const CartesianGrid= lazy(() => import('recharts').then(m => ({ default: m.CartesianGrid })))
const Tooltip      = lazy(() => import('recharts').then(m => ({ default: m.Tooltip })))
const ResponsiveContainer = lazy(() => import('recharts').then(m => ({ default: m.ResponsiveContainer })))

const yearlyData = [
  { year: '2019', grants: 142, students: 180 },
  { year: '2020', grants: 165, students: 195 },
  { year: '2021', grants: 178, students: 205 },
  { year: '2022', grants: 193, students: 220 },
  { year: '2023', grants: 210, students: 238 },
  { year: '2024', grants: 228, students: 256 },
  { year: '2025', grants: 245, students: 270 },
]

const ieltsData = [
  { band: '5.5', count: 45 },
  { band: '6.0', count: 87 },
  { band: '6.5', count: 112 },
  { band: '7.0', count: 78 },
  { band: '7.5', count: 43 },
  { band: '8.0', count: 21 },
]

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { name: string; value: number; color: string }[]; label?: string }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-3">
        <p className="font-bold text-maintext mb-1 text-sm">{label}</p>
        {payload.map((p, i) => (
          <p key={i} className="text-sm" style={{ color: p.color }}>
            {p.name}: <strong>{p.value}</strong>
          </p>
        ))}
      </div>
    )
  }
  return null
}

const ChartFallback = () => (
  <div className="h-64 flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
)

const vp = { once: true, margin: '-60px' }

export default function ResultsSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 })

  return (
    <section id="results" className="py-20 md:py-28 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={vp}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-block bg-green-100 text-green-700 font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
            Natijalar
          </span>
          <h2 className="font-heading font-black text-3xl md:text-4xl text-maintext mb-4">
            Raqamlar yolg'on gapirmaydi
          </h2>
          <p className="text-secondary text-lg max-w-xl mx-auto">
            Har yili o'sib borayotgan muvaffaqiyat statistikasi
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ y: 24 }}
            whileInView={{ y: 0 }}
            viewport={vp}
            transition={{ duration: 0.5 }}
            className="bg-gray-50 rounded-3xl p-6 border border-gray-100"
          >
            <h3 className="font-heading font-bold text-maintext text-lg mb-5">
              📊 Yillik grant statistikasi
            </h3>
            <Suspense fallback={<ChartFallback />}>
              {inView && (
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={yearlyData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="year" tick={{ fontSize: 11, fill: '#6B7280' }} />
                    <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="students" name="O'quvchilar" fill="#BFDBFE" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="grants" name="Grant" fill="#1B4F8A" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </Suspense>
          </motion.div>

          <motion.div
            initial={{ y: 24 }}
            whileInView={{ y: 0 }}
            viewport={vp}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-gray-50 rounded-3xl p-6 border border-gray-100"
          >
            <h3 className="font-heading font-bold text-maintext text-lg mb-5">
              🇬🇧 IELTS natijalari (2025)
            </h3>
            <Suspense fallback={<ChartFallback />}>
              {inView && (
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={ieltsData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="band" tick={{ fontSize: 11, fill: '#6B7280' }} />
                    <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="count" name="O'quvchilar" fill="#F4A51B" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </Suspense>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { num: '245+', label: '2025-yil grant oldi', color: 'text-primary' },
            { num: '91%', label: 'Grant ulushi', color: 'text-green-600' },
            { num: '8.0', label: "Eng yuqori IELTS", color: 'text-accent' },
            { num: '100%', label: "Bitiruvchi ishonadi", color: 'text-purple-600' },
          ].map((item, i) => (
            <div key={i} className="bg-gray-50 rounded-2xl p-4 text-center border border-gray-100">
              <p className={`font-heading font-black text-2xl md:text-3xl ${item.color}`}>{item.num}</p>
              <p className="text-secondary text-xs mt-1">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/results"
            className="inline-flex items-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold px-8 py-3.5 rounded-2xl transition-all duration-200"
          >
            To'liq statistika →
          </Link>
        </div>
      </div>
    </section>
  )
}
