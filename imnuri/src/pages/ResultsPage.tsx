import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaTrophy, FaArrowRight } from 'react-icons/fa'
import { MdOutlineBarChart } from 'react-icons/md'

export default function ResultsPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section
        className="py-20 md:py-24 text-white"
        style={{ background: 'linear-gradient(135deg, #0d2d5a 0%, #1B4F8A 100%)' }}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-8 text-center">
          <motion.div
            initial={{ y: 30 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block bg-white/10 text-white/80 text-sm px-4 py-1.5 rounded-full mb-6">
              Natijalar va statistika
            </span>
            <h1 className="font-heading font-black text-4xl md:text-5xl mb-4">
              Raqamlar gapiradi
            </h1>
            <p className="text-white/80 text-xl max-w-2xl mx-auto">
              Ilm Nuri bitiruvchilarining har yilgi muvaffaqiyat statistikasi
            </p>
          </motion.div>
        </div>
      </section>

      {/* Empty state */}
      <section className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 md:px-8">

          {/* Empty state card */}
          <motion.div
            initial={{ y: 30 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-12 md:p-16">
              {/* Icon */}
              <div className="relative w-24 h-24 mx-auto mb-8">
                <div className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center">
                  <MdOutlineBarChart className="text-primary" size={44} />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                  <FaTrophy className="text-accent" size={14} />
                </div>
              </div>

              <h2 className="font-heading font-black text-2xl md:text-3xl text-maintext mb-4">
                Natijalar hozircha mavjud emas
              </h2>
              <p className="text-secondary text-lg leading-relaxed mb-10">
                Yillik grant statistikasi, IELTS natijalari va bitiruvchilar
                ro'yxati tez orada bu yerda joylashtiriladi.
              </p>

              {/* Placeholder bars — dekorativ */}
              <div className="flex items-end justify-center gap-3 mb-10 h-20">
                {[40, 60, 50, 75, 55, 80, 65].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: `${h}%`, opacity: 0.25 + i * 0.05 }}
                    transition={{ duration: 0.6, delay: 0.2 + i * 0.08 }}
                    className="w-7 bg-primary rounded-t-lg"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/apply"
                  className="flex items-center justify-center gap-2 bg-accent hover:bg-yellow-500 text-white font-bold px-7 py-3.5 rounded-2xl transition-all hover:shadow-lg hover:shadow-accent/30"
                >
                  Ariza berish <FaArrowRight size={13} />
                </Link>
                <Link
                  to="/contact"
                  className="flex items-center justify-center gap-2 border-2 border-gray-200 hover:border-primary text-secondary hover:text-primary font-semibold px-7 py-3.5 rounded-2xl transition-all"
                >
                  Biz bilan bog'lanish
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Info cards pastda */}
          <motion.div
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10 max-w-2xl mx-auto"
          >
            {[
              { icon: "📊", title: "Grant statistikasi", desc: "Yillar bo'yicha natijalar" },
              { icon: "🇬🇧", title: "IELTS ballari", desc: "Band taqsimoti" },
              { icon: "🏆", title: "Bitiruvchilar", desc: "Muvaffaqiyat tarixi" },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white border border-gray-100 rounded-2xl p-5 text-center opacity-50"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <p className="font-heading font-bold text-maintext text-sm">{item.title}</p>
                <p className="text-secondary text-xs mt-1">{item.desc}</p>
                <div className="mt-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-primary/30 rounded-full w-3/4" />
                </div>
              </div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20 text-white"
        style={{ background: 'linear-gradient(135deg, #0d2d5a 0%, #1B4F8A 100%)' }}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading font-black text-3xl md:text-4xl mb-4">
            Siz ham muvaffaqiyat statistikasiga qo'shiling!
          </h2>
          <p className="text-white/80 mb-8 text-lg max-w-xl mx-auto">
            Hoziroq ariza qoldiring — biz siz bilan tez orada bog'lanamiz
          </p>
          <Link
            to="/apply"
            className="inline-flex items-center gap-2 bg-accent hover:bg-yellow-500 text-white font-bold px-8 py-4 rounded-2xl transition-all hover:shadow-xl hover:shadow-accent/30"
          >
            Ariza berish →
          </Link>
        </div>
      </section>
    </div>
  )
}
