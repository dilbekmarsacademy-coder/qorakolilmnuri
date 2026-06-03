import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'

export const courses = [
  { id: 'english', icon: '🇬🇧', name: 'Ingliz tili (IELTS)', short: 'IELTS Band 0 dan 8 gacha. Xalqaro sertifikat dasturi.', desc: "To'liq IELTS tayyorgarligi: Listening, Reading, Writing, Speaking. Har oyda mock test.", color: 'from-blue-500 to-blue-700', bg: 'bg-blue-50', border: 'border-blue-100', tag: 'Eng mashhur', duration: '3–12 oy', level: 'Barcha darajalar' },
  { id: 'math', icon: '📐', name: 'Matematika', short: 'Algebra, geometriya, DTM va IELTS math tayyorgarligi.', desc: 'Asosiy tushunchalardan DTM test formatigacha. Har hafta mustahkamlash sinovlari.', color: 'from-emerald-500 to-green-700', bg: 'bg-green-50', border: 'border-green-100', tag: 'DTM uchun', duration: '4–10 oy', level: "O'rta va oliy" },
  { id: 'chemistry', icon: '⚗️', name: 'Kimyo', short: 'DTM kimyo: organik, anorganik, fizik kimyo.', desc: 'Laboratoriya mashqlari va DTM test formatlari. Kuchli nazariya + amaliyot.', color: 'from-orange-500 to-red-600', bg: 'bg-orange-50', border: 'border-orange-100', tag: 'Tibbiyot uchun', duration: '4–10 oy', level: "O'rta va oliy" },
  { id: 'biology', icon: '🧬', name: 'Biologiya', short: "Hujayradan ekologiyagacha. Tibbiyot yo'nalishi uchun.", desc: 'Anatomiya, botanika, zoologiya, genetika. DTM formati bilan chuqur tayyorgarlik.', color: 'from-teal-500 to-cyan-700', bg: 'bg-teal-50', border: 'border-teal-100', tag: 'Tibbiyot uchun', duration: '4–10 oy', level: "O'rta va oliy" },
  { id: 'law', icon: '⚖️', name: 'Huquq', short: "Konstitutsiya, fuqarolik, jinoyat huquqi asoslari.", desc: "O'zbek qonunchiligining barcha sohalarini DTM test formatida o'rganish.", color: 'from-purple-500 to-violet-700', bg: 'bg-purple-50', border: 'border-purple-100', tag: 'Yuridik uchun', duration: '3–8 oy', level: "O'rta va oliy" },
  { id: 'history', icon: '📜', name: 'Tarix', short: "O'zbekiston va dunyo tarixi DTM formatida.", desc: "Qadimdan zamonaviy davrgacha. Xronologiya, sanalar va tahlil metodikasi.", color: 'from-amber-500 to-yellow-600', bg: 'bg-amber-50', border: 'border-amber-100', tag: 'Gumanitar', duration: '3–8 oy', level: "O'rta va oliy" },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}
const item = {
  hidden: { y: 28 },
  show: { y: 0, transition: { duration: 0.45 } },
}

export default function CoursesSection() {
  return (
    <section id="courses" className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-block bg-accent/10 text-amber-700 font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
            Kurslar va yo'nalishlar
          </span>
          <h2 className="font-heading font-black text-3xl md:text-4xl text-maintext mb-4">
            Qaysi fanni o'rganmoqchisiz?
          </h2>
          <p className="text-secondary text-lg max-w-xl mx-auto">
            6 ta asosiy yo'nalish — professional o'qituvchilar bilan
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {courses.map(course => (
            <motion.div
              key={course.id}
              variants={item}
              className={`group bg-white border ${course.border} rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
            >
              <div className={`h-1.5 bg-gradient-to-r ${course.color}`} />
              <div className="p-7">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 ${course.bg} rounded-2xl flex items-center justify-center text-3xl`}>
                    {course.icon}
                  </div>
                  <span className="text-xs font-semibold bg-gray-100 text-secondary px-3 py-1 rounded-full">
                    {course.tag}
                  </span>
                </div>
                <h3 className="font-heading font-bold text-maintext text-xl mb-2">{course.name}</h3>
                <p className="text-secondary text-sm leading-relaxed mb-5">{course.short}</p>
                <div className="flex items-center gap-4 text-xs text-secondary mb-5">
                  <span>⏱ {course.duration}</span>
                  <span>📊 {course.level}</span>
                </div>
                <Link
                  to={`/courses/${course.id}`}
                  aria-label={`${course.name} haqida ko'proq ma'lumot`}
                  className={`flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all bg-gradient-to-r ${course.color} bg-clip-text text-transparent`}
                >
                  Ko'proq ma'lumot <FaArrowRight size={12} />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-10">
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 bg-primary hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-2xl transition-all hover:shadow-lg hover:shadow-primary/30"
          >
            Barcha kurslar <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  )
}
