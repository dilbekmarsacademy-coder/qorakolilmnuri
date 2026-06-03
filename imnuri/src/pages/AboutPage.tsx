import { motion } from 'framer-motion'
import { FaCheckCircle, FaMedal, FaUsers, FaHistory } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const milestones = [
  { year: "2013", title: "Markaz tashkil topdi", desc: "Qorako'lda Ilm Nuri ta'lim markazi faoliyatini boshladi" },
  { year: "2015", title: "Birinchi IELTS natijalari", desc: "O'quvchilarimiz IELTS Band 6.5 ko'rsatdi" },
  { year: "2018", title: "100+ grant sohibi", desc: "Birinchi marta 100 dan ortiq o'quvchi grant oldi" },
  { year: "2020", title: "Online ta'lim", desc: "Pandemiya davrida online format muvaffaqiyatli yo'lga qo'yildi" },
  { year: "2022", title: "Kengayish", desc: "Yangi o'quv xonalari va zamonaviy jihozlar" },
  { year: "2025", title: "245+ grant", desc: "Rekord: 245 ta o'quvchi davlat granti sohibi bo'ldi" },
]

const leadership = [
  { name: "Abdullayev Husan", role: "Markaz direktori", experience: "15+ yil tajriba", emoji: "👨‍💼" },
  { name: "Nazarova Feruza", role: "O'quv ishlari bo'yicha direktor o'rinbosari", experience: "11+ yil tajriba", emoji: "👩‍💼" },
  { name: "Xoliqov Jasur", role: "IELTS bo'limi rahbari", experience: "8+ yil tajriba", emoji: "👨‍🏫" },
]

const vp = { once: true, margin: '-80px' }

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero — tezkor ko'rinadi, opacity animatsiyasi yo'q */}
      <section
        className="py-20 md:py-28 text-white"
        style={{ background: 'linear-gradient(135deg, #0d2d5a 0%, #1B4F8A 100%)' }}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-8 text-center">
          <span className="inline-block bg-white/10 text-white/80 text-sm px-4 py-1.5 rounded-full mb-6">
            Biz haqimizda
          </span>
          <h1 className="font-heading font-black text-4xl md:text-5xl mb-6">
            Ilm Nuri Ta'lim Markazi
          </h1>
          <p className="text-white/80 text-xl max-w-2xl mx-auto leading-relaxed">
            2013 yildan beri Qorako'l shahrida sifatli ta'lim berib kelayotgan,
            o'quvchilarning 90%ini davlat grantigacha yetkazuvchi markaz.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[
              { num: "11+", label: "Yil faoliyat" },
              { num: "3000+", label: "Bitiruvchi" },
              { num: "90%", label: "Grant sohibi" },
              { num: "6", label: "Fan yo'nalishi" },
            ].map((s, i) => (
              <div key={i} className="bg-white/10 rounded-2xl p-5">
                <p className="font-heading font-black text-4xl text-accent">{s.num}</p>
                <p className="text-white/70 text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <motion.h2
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            viewport={vp}
            transition={{ duration: 0.5 }}
            className="font-heading font-black text-3xl text-maintext text-center mb-12"
          >
            Bizning asosimiz
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              {
                icon: "🎯",
                title: "Missiya",
                text: "Har bir o'quvchini o'z salohiyatini ochishga yordam berish va ularni davlat grantigacha yetkazish.",
                color: "border-primary/20 bg-blue-50",
              },
              {
                icon: "👁️",
                title: "Vizion",
                text: "O'zbekistonda eng natijali va zamonaviy ta'lim markazlaridan biriga aylanish.",
                color: "border-amber-200 bg-amber-50",
              },
              {
                icon: "💎",
                title: "Qadriyatlar",
                text: "Sifat, mas'uliyat, halollik, individual yondashuv va o'quvchi muvaffaqiyati — asosiy qadriyatlarimiz.",
                color: "border-green-200 bg-green-50",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ y: 30 }}
                whileInView={{ y: 0 }}
                viewport={vp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`p-8 rounded-3xl border ${item.color}`}
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-heading font-bold text-maintext text-xl mb-3">{item.title}</h3>
                <p className="text-secondary leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>

          {/* History timeline */}
          <motion.h2
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            viewport={vp}
            transition={{ duration: 0.5 }}
            className="font-heading font-black text-3xl text-maintext text-center mb-12"
          >
            <FaHistory className="inline-block text-primary mr-3" size={26} />
            Markaz tarixi
          </motion.h2>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 hidden md:block" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ x: 0 }}
                  viewport={vp}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className={`flex gap-6 items-center ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className="flex-1 bg-background rounded-2xl p-6 border border-gray-100">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-primary text-white font-bold text-sm px-3 py-1 rounded-full">{m.year}</span>
                      <h3 className="font-heading font-bold text-maintext">{m.title}</h3>
                    </div>
                    <p className="text-secondary text-sm">{m.desc}</p>
                  </div>
                  <div className="hidden md:flex w-4 h-4 bg-primary rounded-full flex-shrink-0 relative z-10" />
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <motion.h2
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            viewport={vp}
            transition={{ duration: 0.5 }}
            className="font-heading font-black text-3xl text-maintext text-center mb-12"
          >
            <FaUsers className="inline-block text-primary mr-3" size={26} />
            Rahbariyat
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {leadership.map((person, i) => (
              <motion.div
                key={i}
                initial={{ y: 30 }}
                whileInView={{ y: 0 }}
                viewport={vp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-3xl p-8 border border-gray-100 text-center hover:shadow-lg transition-all"
              >
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-5xl mx-auto mb-4">
                  {person.emoji}
                </div>
                <h3 className="font-heading font-bold text-maintext text-xl mb-1">{person.name}</h3>
                <p className="text-primary font-medium text-sm mb-3">{person.role}</p>
                <div className="flex items-center gap-2 justify-center">
                  <FaMedal className="text-accent" size={14} />
                  <span className="text-secondary text-sm">{person.experience}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <motion.h2
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            viewport={vp}
            transition={{ duration: 0.5 }}
            className="font-heading font-black text-3xl text-maintext text-center mb-12"
          >
            Nima uchun 90% o'quvchi grant oladi?
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {[
              "Har bir o'quvchi uchun individual o'quv rejasi tuziladi",
              "Hafta sayin mock test va nazorat sinovlari",
              "Kichik guruhlar (max 8-10 o'quvchi)",
              "Zamonaviy o'quv materiallar va metodlar",
              "Ota-onalar bilan muntazam aloqa va hisobot",
              "Motivatsion va qo'llab-quvvatlovchi muhit",
              "O'qituvchilar o'zlari yuqori ball egasi",
              "Natijaga yo'naltirilgan o'quv dasturlari",
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ x: -20 }}
                whileInView={{ x: 0 }}
                viewport={vp}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="flex items-start gap-3 p-4 bg-background rounded-2xl"
              >
                <FaCheckCircle className="text-accent mt-0.5 flex-shrink-0" size={16} />
                <span className="text-secondary text-sm leading-relaxed">{item}</span>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/apply"
              className="inline-flex items-center gap-2 bg-accent hover:bg-yellow-500 text-white font-bold px-8 py-4 rounded-2xl transition-all hover:shadow-lg hover:shadow-accent/30"
            >
              Ariza berish →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
