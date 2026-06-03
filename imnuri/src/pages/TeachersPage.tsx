import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaStar, FaAward, FaUsers, FaBook } from 'react-icons/fa'
import { Link } from 'react-router-dom'
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
  bio: string
  gradient: string
  image_url: string
  active: boolean
}

const vp = { once: true, margin: '-60px' }

function TeacherCard({ t, i }: { t: Teacher; i: number }) {
  const hasImage = !!t.image_url

  return (
    <motion.div
      initial={{ y: 30 }}
      whileInView={{ y: 0 }}
      viewport={vp}
      transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
      className="group relative rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
      style={{ aspectRatio: '3/4' }}
    >
      {/* Fon rasm yoki gradient */}
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
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white font-heading font-black opacity-20 select-none"
              style={{ fontSize: 'clamp(4rem, 8vw, 8rem)' }}>
              {t.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
            </span>
          </div>
        </div>
      )}

      {/* Default pastki gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-2/5
        bg-gradient-to-t from-black/80 to-transparent
        flex flex-col justify-end px-5 pb-5
        transition-opacity duration-400 group-hover:opacity-0">
        <p className="text-white font-heading font-bold text-lg leading-tight">{t.name}</p>
        <p className="text-white/75 text-sm">{t.subject}</p>
      </div>

      {/* Hover: blur overlay + ma'lumotlar */}
      <div className="absolute inset-0
        bg-black/60 backdrop-blur-sm
        flex flex-col items-center justify-center px-5 text-center
        opacity-0 group-hover:opacity-100
        transition-all duration-400">

        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, j) => (
            <FaStar key={j} size={13}
              className={j < Math.round(t.rating) ? 'text-yellow-400' : 'text-white/25'} />
          ))}
          <span className="text-white/60 text-xs ml-1">{t.rating}</span>
        </div>

        <h3 className="text-white font-heading font-black text-xl mb-1 leading-tight">{t.name}</h3>
        <p className="text-white/80 text-sm mb-3">{t.subject}</p>

        {t.bio && (
          <p className="text-white/60 text-xs leading-relaxed mb-4 line-clamp-3">{t.bio}</p>
        )}

        <div className="flex gap-2 mb-3 justify-center flex-wrap">
          <div className="bg-white/15 rounded-xl px-3 py-2 text-center">
            <FaBook className="text-white/60 mx-auto mb-0.5" size={11} />
            <p className="text-white font-bold text-sm">{t.experience}</p>
            <p className="text-white/50 text-[10px]">Tajriba</p>
          </div>
          <div className="bg-white/15 rounded-xl px-3 py-2 text-center">
            <FaUsers className="text-white/60 mx-auto mb-0.5" size={11} />
            <p className="text-white font-bold text-sm">{t.students}+</p>
            <p className="text-white/50 text-[10px]">O'quvchi</p>
          </div>
          {t.score && (
            <div className="bg-white/15 rounded-xl px-3 py-2 text-center">
              <p className="text-white font-bold text-sm">{t.score}</p>
              <p className="text-white/50 text-[10px]">Natija</p>
            </div>
          )}
        </div>

        {t.cert && (
          <div className="flex items-center gap-1.5 bg-accent/20 border border-accent/30 rounded-xl px-3 py-1.5">
            <FaAward className="text-accent" size={11} />
            <span className="text-amber-300 text-xs font-semibold">{t.cert}</span>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('teachers')
      .select('*')
      .eq('active', true)
      .order('display_order')
      .then(({ data }) => {
        if (data) setTeachers(data as Teacher[])
        setLoading(false)
      })
  }, [])

  return (
    <div className="pt-20">
      <section className="py-20 md:py-24 text-white"
        style={{ background: 'linear-gradient(135deg,#0d2d5a 0%,#1B4F8A 100%)' }}>
        <div className="max-w-6xl mx-auto px-4 md:px-8 text-center">
          <span className="inline-block bg-white/10 text-white/80 text-sm px-4 py-1.5 rounded-full mb-6">
            O'qituvchilar jamoasi
          </span>
          <h1 className="font-heading font-black text-4xl md:text-5xl mb-4">
            Professional va sertifikatlangan jamoa
          </h1>
          <p className="text-white/80 text-xl max-w-2xl mx-auto">
            Kartochka ustiga boring — ma'lumotlar ko'rinadi
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="rounded-3xl bg-gray-100 animate-pulse" style={{ aspectRatio: '3/4' }} />
              ))}
            </div>
          ) : teachers.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-5xl mb-4">👨‍🏫</p>
              <p className="text-gray-400 text-lg">O'qituvchilar tez orada qo'shiladi</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-12">
              {teachers.map((t, i) => <TeacherCard key={t.id} t={t} i={i} />)}
            </div>
          )}

          {!loading && (
            <div className="bg-gray-50 rounded-3xl p-8 text-center border border-gray-100">
              <h3 className="font-heading font-bold text-xl text-maintext mb-2">O'qituvchi bo'lmoqchimisiz?</h3>
              <p className="text-secondary mb-4 text-sm">CV va sertifikatingizni yuboring</p>
              <a href="mailto:hr@ilmnuri.uz"
                className="inline-flex items-center gap-2 bg-primary hover:bg-blue-700 text-white font-semibold px-7 py-3 rounded-2xl transition-all hover:shadow-lg text-sm">
                📧 hr@ilmnuri.uz
              </a>
            </div>
          )}
        </div>
      </section>

      <section className="py-20 text-white"
        style={{ background: 'linear-gradient(135deg,#0d2d5a,#1B4F8A)' }}>
        <div className="max-w-6xl mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading font-black text-3xl md:text-4xl mb-4">Bu mutaxassislar bilan birga o'qing!</h2>
          <p className="text-white/80 mb-8">Hoziroq ariza qoldiring va bepul sinov darsiga yozilib oling</p>
          <Link to="/apply"
            className="inline-flex items-center gap-2 bg-accent hover:bg-yellow-500 text-white font-bold px-8 py-4 rounded-2xl transition-all hover:shadow-xl">
            Sinov darsiga yozilish →
          </Link>
        </div>
      </section>
    </div>
  )
}
