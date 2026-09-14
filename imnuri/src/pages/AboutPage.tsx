import { motion } from 'framer-motion'
import { FaCheckCircle, FaMedal, FaUsers, FaBed, FaUtensils, FaEye, FaMobileAlt, FaClipboardCheck, FaCalendarCheck, FaSms } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const conditions = [
  { icon: FaBed, text: "Yotoqxona mavjud" },
  { icon: FaUtensils, text: "Kuniga 3 mahal issiq ovqat" },
  { icon: FaEye, text: "O'quvchilar ustidan doimiy nazorat" },
  { icon: FaMobileAlt, text: "Telefonlardan foydalanish cheklangan" },
  { icon: FaClipboardCheck, text: "Kundalik dars va testlar" },
  { icon: FaUsers, text: "Ota-onalar bilan muntazam aloqa" },
  { icon: FaCalendarCheck, text: "Har 2 oyda ota-onalar yig'ilishi" },
  { icon: FaSms, text: "Natijalar bo'yicha SMS/xabarnomalar" },
  { icon: FaMedal, text: "Tajribali va sertifikatga ega ustozlar" },
]

const leadership = [
  { name: "Sobir Ubaydulloyevich Arslonov", role: "Markaz asoschisi va rahbari", experience: "2015-yildan buyon", emoji: "👨‍💼" },
]

const vp = { once: true, margin: '-80px' }

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero — tezkor ko'rinadi, opacity animatsiyasi yo'q */}
      <section
        className="py-20 md:py-28 text-white"
        style={{ background: 'linear-gradient(135deg, #0d2d5a 0%, #14306E 100%)' }}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-8 text-center">
          <span className="inline-block bg-white/10 text-white/80 text-sm px-4 py-1.5 rounded-full mb-6">
            Biz haqimizda
          </span>
          <h1 className="font-heading font-black text-4xl md:text-5xl mb-6">
            QORAKO'L ILM NURI O'quv Markazi
          </h1>
          <p className="text-white/80 text-xl max-w-2xl mx-auto leading-relaxed">
            2015-yildan buyon o'quvchilarni OTM, Prezident maktablari, Milliy sertifikat
            hamda xalqaro imtihonlarga tizimli tayyorlab kelayotgan ta'lim markazi.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[
              { num: "15+", label: "Yil faoliyat" },
              { num: "15000+", label: "O'quvchi" },
              { num: "99%", label: "Grant sohibi" },
              { num: "10+", label: "Yo'nalish" },
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
                text: "Har bir o'quvchiga o'z imkoniyatini maksimal darajada ochib, yuqori natija va kuchli ta'lim olishiga yordam berish.",
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

          {/* Markaz haqida batafsil */}
          <motion.div
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            viewport={vp}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto bg-background rounded-3xl p-8 md:p-10 border border-gray-100"
          >
            <h2 className="font-heading font-black text-2xl md:text-3xl text-maintext mb-4 text-center">
              Markaz haqida
            </h2>
            <p className="text-secondary leading-relaxed">
              QORAKO'L ILM NURI o'quv markazi 2015-yildan buyon Qorako'l tumanida faoliyat
              yuritib kelmoqda. Markazimizda 5-sinfdan boshlab abituriyentlargacha bo'lgan
              o'quvchilar uchun turli fanlardan sifatli ta'lim yo'lga qo'yilgan. Asosiy
              maqsadimiz — o'quvchiga faqat bilim berish emas, balki intizom, nazorat va
              aniq natijaga olib boradigan tizim yaratish. Viloyatlardan kelgan o'quvchilar
              uchun yotoqxona, 3 mahal issiq ovqat va doimiy nazorat mavjud. O'quvchilarning
              natijalari muntazam nazorat qilinadi va ota-onalar bilan aloqa yo'lga qo'yilgan.
            </p>
            <p className="text-secondary text-sm mt-4">
              📍 Manzil: Buxoro viloyati, Qorako'l tumani, Amfiteatr ro'parasi
            </p>
          </motion.div>

          {/* Ta'lim sharoiti */}
          <motion.h2
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            viewport={vp}
            transition={{ duration: 0.5 }}
            className="font-heading font-black text-3xl text-maintext text-center mb-12 mt-20"
          >
            Ta'lim sharoiti
          </motion.h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {conditions.map((c, i) => (
              <motion.div
                key={i}
                initial={{ y: 20 }}
                whileInView={{ y: 0 }}
                viewport={vp}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="flex items-center gap-3 bg-background rounded-2xl p-4 border border-gray-100"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <c.icon className="text-primary" size={17} />
                </div>
                <span className="text-maintext text-sm font-medium">{c.text}</span>
              </motion.div>
            ))}
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

          <div className="grid max-w-sm mx-auto gap-6 mb-10">
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
            Nima uchun 99%gacha o'quvchi grant oladi?
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
