import { motion } from 'framer-motion'
import { FaCheckCircle, FaMedal, FaUserGraduate, FaBookOpen } from 'react-icons/fa'

const achievements = [
  { icon: FaMedal, title: "11+ Yil Tajriba", desc: "Qorako'lda ishonchli va natijali ta'lim markazi" },
  { icon: FaUserGraduate, title: "90% Grant", desc: "Har yili o'quvchilarning 90%i davlat granti sohibi bo'ladi" },
  { icon: FaBookOpen, title: "6 Fan", desc: "Ingliz tili, Matematika, Kimyo, Biologiya, Huquq, Tarix" },
]

const values = [
  "Professional o'qituvchilar jamoasi",
  "Individual yondashuv har bir o'quvchiga",
  "Zamonaviy o'quv dasturlari",
  "Muntazam sinov va nazorat",
  "Ota-onalar bilan hamkorlik",
  "Motivatsion va qulay muhit",
]

const vp = { once: true, margin: '-80px' }

export default function About() {
  return (
    <section id="about-info" className="py-20 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={vp}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-block bg-blue-100 text-primary font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
            Biz haqimizda
          </span>
          <h2 className="font-heading font-black text-3xl md:text-4xl text-maintext mb-4">
            Natija beruvchi ta'lim —<br />
            <span className="text-primary">Ilm Nuri</span> da
          </h2>
          <p className="text-secondary text-lg max-w-2xl mx-auto leading-relaxed">
            2013 yildan beri Qorako'l shahrida faoliyat yuritib, minglab abituriyentlarni
            orzulariga eltadigan ta'lim markazi.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ x: -40 }}
            whileInView={{ x: 0 }}
            viewport={vp}
            transition={{ duration: 0.7 }}
          >
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full bg-background rounded-3xl -z-10" />
              <div className="bg-white border border-gray-100 shadow-xl rounded-3xl overflow-hidden">
                <div className="h-56 flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #1B4F8A 0%, #2563EB 100%)' }}>
                  <div className="text-center text-white p-8">
                    <p className="font-heading font-black text-7xl text-accent">11+</p>
                    <p className="font-semibold text-xl mt-2">Yil faoliyat</p>
                    <p className="text-white/70 text-sm mt-1">2013 yildan buyon</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-secondary leading-relaxed">
                    Ilm Nuri ta'lim markazi — Qorako'lda o'zining yuqori natijalari bilan mashhur.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <div>
            <div className="space-y-5 mb-8">
              {achievements.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ x: 40 }}
                  whileInView={{ x: 0 }}
                  viewport={vp}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                  className="flex items-start gap-4 p-5 bg-background rounded-2xl border border-gray-100 hover:border-primary/20 hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <item.icon className="text-primary" size={22} />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-maintext text-lg">{item.title}</h3>
                    <p className="text-secondary text-sm mt-1">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ y: 20 }}
              whileInView={{ y: 0 }}
              viewport={vp}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="font-heading font-bold text-maintext text-xl mb-4">Nima uchun Ilm Nuri?</h3>
              <div className="grid grid-cols-1 gap-2">
                {values.map((val, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <FaCheckCircle className="text-accent flex-shrink-0" size={16} />
                    <span className="text-secondary text-sm">{val}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
