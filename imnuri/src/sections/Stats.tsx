import { useInView } from 'react-intersection-observer'
import { useCountUp } from 'react-countup'
import { motion } from 'framer-motion'
import { FaGraduationCap, FaUsers, FaClock, FaTrophy } from 'react-icons/fa'
import type { IconType } from 'react-icons'

const stats: {
  icon: IconType
  end: number
  suffix: string
  label: string
  desc: string
  bg: string
  iconColor: string
}[] = [
  {
    icon: FaClock,
    end: 11,
    suffix: '+',
    label: 'Yil faoliyat',
    desc: '2013 yildan buyon',
    bg: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    icon: FaUsers,
    end: 3000,
    suffix: '+',
    label: 'Bitiruvchilar',
    desc: "Muvaffaqiyatli o'quvchilar",
    bg: 'bg-amber-50',
    iconColor: 'text-amber-600',
  },
  {
    icon: FaGraduationCap,
    end: 90,
    suffix: '%',
    label: 'Grant sohibi',
    desc: 'Har yili davlat granti',
    bg: 'bg-green-50',
    iconColor: 'text-green-600',
  },
  {
    icon: FaTrophy,
    end: 8,
    suffix: '+',
    label: 'IELTS Band',
    desc: 'Maksimal natija',
    bg: 'bg-purple-50',
    iconColor: 'text-purple-600',
  },
]

function StatCard({ stat, index, active }: { stat: typeof stats[0]; index: number; active: boolean }) {
  const countUpRef = useCountUp({
    ref: `stat-${index}`,
    start: 0,
    end: stat.end,
    duration: 2.5,
    suffix: stat.suffix,
    startOnMount: false,
  })

  if (active && countUpRef.start) {
    countUpRef.start()
  }

  const Icon = stat.icon

  return (
    <motion.div
      initial={{ y: 30 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="rounded-3xl p-6 text-center hover:scale-105 transition-all duration-300"
      style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}
    >
      <div className={`w-14 h-14 ${stat.bg} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
        <Icon className={stat.iconColor} size={26} />
      </div>
      <div className="font-heading font-black text-4xl md:text-5xl text-white mb-1">
        <span id={`stat-${index}`}>0{stat.suffix}</span>
      </div>
      <p className="font-semibold text-white/90 mb-1">{stat.label}</p>
      <p className="text-white/50 text-sm">{stat.desc}</p>
    </motion.div>
  )
}

export default function Stats() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section
      className="py-20 md:py-24"
      style={{ background: 'linear-gradient(135deg, #0d2d5a 0%, #1B4F8A 100%)' }}
      ref={ref}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-white/80 text-sm px-4 py-1.5 rounded-full mb-4"
            style={{ background: 'rgba(255,255,255,0.1)' }}>
            Raqamlarda natijalar
          </span>
          <h2 className="font-heading font-black text-3xl md:text-4xl text-white">
            Bizning yutuqlarimiz
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <StatCard key={i} stat={stat} index={i} active={inView} />
          ))}
        </div>

        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 rounded-3xl p-8 text-center"
          style={{ background: 'rgba(244,165,27,0.15)', border: '1px solid rgba(244,165,27,0.25)' }}
        >
          <p className="text-white font-heading font-bold text-xl md:text-2xl">
            🎯 Har yili 200+ abituriyent davlat grantigacha yetib boradi
          </p>
          <p className="text-white/70 mt-2">Ilm Nuri bilan siz ham bu statistikaning bir qismi bo'ling!</p>
        </motion.div>
      </div>
    </section>
  )
}
