import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { courses } from '../sections/Courses'
import { FaArrowRight, FaCheckCircle } from 'react-icons/fa'

export default function CoursesPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section
        className="py-20 md:py-24 text-white"
        style={{ background: 'linear-gradient(135deg, #0d2d5a 0%, #1B4F8A 100%)' }}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-8 text-center">
          <div>
            <span className="inline-block bg-white/10 text-white/80 text-sm px-4 py-1.5 rounded-full mb-6">
              Kurslar va yo'nalishlar
            </span>
            <h1 className="font-heading font-black text-4xl md:text-5xl mb-6">
              Qaysi yo'nalishni tanlaysiz?
            </h1>
            <p className="text-white/80 text-xl max-w-2xl mx-auto leading-relaxed">
              6 ta asosiy yo'nalish bo'yicha professional o'qituvchilar bilan individual mashg'ulotlar
            </p>
          </div>
        </div>
      </section>

      {/* Courses grid */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, i) => (
              <motion.div
                key={course.id}
                initial={{ y: 30 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`bg-white border ${course.border} rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
              >
                <div className={`h-3 bg-gradient-to-r ${course.color}`} />
                <div className="p-8">
                  <div className={`w-16 h-16 ${course.bg} rounded-2xl flex items-center justify-center text-3xl mb-5`}>
                    {course.icon}
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="font-heading font-bold text-maintext text-2xl">{course.name}</h2>
                    <span className="text-xs font-semibold bg-gray-100 text-secondary px-3 py-1 rounded-full">
                      {course.tag}
                    </span>
                  </div>
                  <p className="text-secondary mb-6 leading-relaxed">{course.desc}</p>

                  <div className="flex gap-4 text-sm text-secondary mb-6">
                    <div className="bg-background rounded-xl px-3 py-2">
                      <p className="font-semibold text-maintext">{course.duration}</p>
                      <p className="text-xs">Davomiyligi</p>
                    </div>
                    <div className="bg-background rounded-xl px-3 py-2">
                      <p className="font-semibold text-maintext">{course.level}</p>
                      <p className="text-xs">Daraja</p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    {[
                      "Kichik guruhlar (max 8-10 kishi)",
                      "Hafta sayin nazorat sinovlari",
                      "Individual ko'mak va mashg'ulotlar",
                    ].map((point, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <FaCheckCircle className="text-green-500" size={13} />
                        <span className="text-secondary text-sm">{point}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <Link
                      to={`/courses/${course.id}`}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r ${course.color} text-white hover:shadow-md transition-all`}
                    >
                      Batafsil <FaArrowRight size={13} />
                    </Link>
                    <Link
                      to="/apply"
                      className="flex-1 flex items-center justify-center py-3 rounded-xl text-sm font-semibold border-2 border-gray-200 text-secondary hover:border-primary hover:text-primary transition-all"
                    >
                      Ariza berish
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20 text-white"
        style={{ background: 'linear-gradient(135deg, #0d2d5a 0%, #1B4F8A 100%)' }}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading font-black text-3xl md:text-4xl mb-4">
            Qaysi fanni tanlashni bilmayapsizmi?
          </h2>
          <p className="text-white/80 mb-8 text-lg max-w-xl mx-auto">
            Biz bilan bog'laning — mutaxassis maslahatchimiz siz uchun to'g'ri yo'nalishni aniqlashga yordam beradi
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/apply"
              className="bg-accent hover:bg-yellow-500 text-white font-bold px-8 py-4 rounded-2xl transition-all hover:shadow-xl"
            >
              Bepul konsultatsiya olish
            </Link>
            <a
              href="tel:+998997087604"
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-8 py-4 rounded-2xl transition-all"
            >
              +998 99 708-76-04
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
