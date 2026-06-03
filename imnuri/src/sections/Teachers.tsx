import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaStar, FaAward, FaUsers, FaBook } from 'react-icons/fa'
import { supabase } from '../lib/supabase'

type Teacher = {
  id: string
  name: string
  subject: string
  experience: string
  score: string
  rating: number
  students: number
  cert: string
  gradient: string
  image_url: string
  active: boolean
}

const vp = { once: true, margin: '-60px' }

function TeacherCard({ t }: { t: Teacher }) {
  const hasImage = !!t.image_url

  return (
    <div className="group relative rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
      style={{ aspectRatio: '3/4' }}>

      {/* Rasm yoki gradient fon */}
      {hasImage ? (
        <img
          src={t.image_url}
          alt={t.name}
          className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
        />
      ) : (
        <div
          className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
          style={{ background: t.gradient || 'linear-gradient(135deg,#1B4F8A,#2563EB)' }}
        >
          {/* Avatar initials */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white font-heading font-black"
              style={{ fontSize: 'clamp(4rem, 10vw, 7rem)', opacity: 0.25, userSelect: 'none' }}>
              {t.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
            </span>
          </div>
        </div>
      )}

      {/* Pastki gradient — har doim ko'rinadi */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3
        bg-gradient-to-t from-black/80 to-transparent
        flex flex-col justify-end px-4 pb-4
        transition-all duration-500 group-hover:opacity-0">
        <p className="text-white font-heading font-bold text-lg leading-tight drop-shadow">{t.name}</p>
        <p className="text-white/80 text-sm">{t.subject}</p>
      </div>

      {/* Hover overlay — blur + ma'lumotlar */}
      <div className="absolute inset-0
        bg-black/60 backdrop-blur-sm
        flex flex-col items-center justify-center px-5 text-center
        opacity-0 group-hover:opacity-100
        transition-all duration-400">

        {/* Reyting */}
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} size={14}
              className={i < Math.round(t.rating) ? 'text-yellow-400' : 'text-white/30'} />
          ))}
          <span className="text-white/70 text-xs ml-1">{t.rating}</span>
        </div>

        <h3 className="text-white font-heading font-black text-xl mb-1">{t.name}</h3>
        <p className="text-white/80 text-sm mb-4">{t.subject}</p>

        {/* Statistika */}
        <div className="flex gap-3 mb-4 w-full justify-center">
          <div className="bg-white/15 rounded-xl px-3 py-2 text-center min-w-[64px]">
            <FaBook className="text-white/70 mx-auto mb-0.5" size={12} />
            <p className="text-white font-bold text-sm">{t.experience}</p>
            <p className="text-white/60 text-[10px]">Tajriba</p>
          </div>
          <div className="bg-white/15 rounded-xl px-3 py-2 text-center min-w-[64px]">
            <FaUsers className="text-white/70 mx-auto mb-0.5" size={12} />
            <p className="text-white font-bold text-sm">{t.students}+</p>
            <p className="text-white/60 text-[10px]">O'quvchi</p>
          </div>
        </div>

        {t.cert && (
          <div className="flex items-center gap-1.5 bg-accent/20 border border-accent/40 rounded-xl px-3 py-1.5">
            <FaAward className="text-accent" size={11} />
            <span className="text-amber-300 text-xs font-semibold">{t.cert}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default function TeachersSection() {
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('teachers')
      .select('*')
      .eq('active', true)
      .order('display_order')
      .limit(4)
      .then(({ data }) => {
        if (data && data.length > 0) setTeachers(data as Teacher[])
        setLoading(false)
      })
  }, [])

  return (
    <section id="teachers" className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ y: 24 }}
          whileInView={{ y: 0 }}
          viewport={vp}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-block bg-primary/10 text-primary font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
            Bizning jamoa
          </span>
          <h2 className="font-heading font-black text-3xl md:text-4xl text-maintext mb-4">
            Tajribali <span className="text-primary">o'qituvchilar</span>
          </h2>
          <p className="text-secondary text-lg max-w-xl mx-auto">
            Har bir o'qituvchi o'z sohasining mutaxassisi — kartochka ustiga boring
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {[1,2,3,4].map(i => (
              <div key={i} className="rounded-3xl bg-gray-100 animate-pulse" style={{ aspectRatio: '3/4' }} />
            ))}
          </div>
        ) : teachers.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <p className="text-4xl mb-3">👨‍🏫</p>
            <p>O'qituvchilar tez orada qo'shiladi</p>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10"
            initial="hidden"
            whileInView="show"
            viewport={vp}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          >
            {teachers.map(t => (
              <motion.div
                key={t.id}
                variants={{ hidden: { y: 30 }, show: { y: 0, transition: { duration: 0.5 } } }}
              >
                <TeacherCard t={t} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {!loading && (
          <motion.div
            initial={{ y: 16 }}
            whileInView={{ y: 0 }}
            viewport={vp}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <Link
              to="/teachers"
              className="inline-flex items-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold px-8 py-3.5 rounded-2xl transition-all duration-200"
            >
              Barcha o'qituvchilar →
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  )
}
