import { motion } from 'framer-motion'
import { FaStar, FaQuoteLeft } from 'react-icons/fa'

const students = [
  {
    name: 'Sherzod Karimov',
    result: 'IELTS 7.5',
    university: 'Toshkent DTU',
    is_grant: true,
    year: '2025',
    text: "Ilm Nuri markazida 8 oy davomida ingliz tilini o'rgandim. Noldan boshlab Band 7.5 ga yetdim. Rustam domla har bir mashg'ulotda real natija berdi.",
    gradient: 'linear-gradient(135deg,#1B4F8A,#2563EB)',
    stars: 5,
    imageUrl: '',
  },
  {
    name: 'Dilnoza Xasanova',
    result: 'DTM 89 ball',
    university: 'Buxoro Tibbiyot',
    is_grant: true,
    year: '2025',
    text: "Kimyo va biologiyadan Jahongir domla o'qitdi. Har bir tushunchani shunday tushunarli qilib tushuntirdikim, natijam 89 ballga yetdi.",
    gradient: 'linear-gradient(135deg,#059669,#065f46)',
    stars: 5,
    imageUrl: '',
  },
  {
    name: 'Jasur Ergashev',
    result: 'DTM 88 ball',
    university: 'TDTU',
    is_grant: true,
    year: '2025',
    text: "Malika domla bilan ishlash menga katta o'zgarish olib keldi. Har hafta test ishlardik, natijam asta-sekin o'sdi.",
    gradient: 'linear-gradient(135deg,#7c3aed,#6d28d9)',
    stars: 5,
    imageUrl: '',
  },
  {
    name: 'Mohlaroyim Tursunova',
    result: 'IELTS 7.0',
    university: 'Xorijda o\'qish',
    is_grant: false,
    year: '2024',
    text: "6 oylik intensiv tayyorgarlikdan keyin Band 7 oldim. Endi Turkiyada o'qimoqdaman. Ilm Nuri mening hayotimni o'zgartirdi.",
    gradient: 'linear-gradient(135deg,#d97706,#b45309)',
    stars: 5,
    imageUrl: '',
  },
  {
    name: 'Akbar Nishonov',
    result: 'DTM 91 ball',
    university: "O'zMU",
    is_grant: true,
    year: '2024',
    text: "Markazda o'qish mening hayotimdagi eng to'g'ri qaror bo'ldi. 91 ball bilan universitetga kirdim. Barcha domlarimga minnatdorman.",
    gradient: 'linear-gradient(135deg,#0891b2,#0d9488)',
    stars: 5,
    imageUrl: '',
  },
  {
    name: 'Zulfiya Rahimova',
    result: 'IELTS 8.0',
    university: 'Westminster Toshkent',
    is_grant: true,
    year: '2024',
    text: "Band 8.0 — bu mening orzum edi. Ilm Nuri jamosi bu orzuni haqiqatga aylantirdi. Professionallik va sabr — bu yerda barchasi bor.",
    gradient: 'linear-gradient(135deg,#dc2626,#ea580c)',
    stars: 5,
    imageUrl: '',
  },
]

const vp = { once: true, margin: '-60px' }

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 md:py-28" style={{ background: '#F8F9FB' }}>
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <motion.div initial={{ y: 24 }} whileInView={{ y: 0 }} viewport={vp} transition={{ duration: 0.5 }} className="text-center mb-14">
          <span className="inline-block bg-accent/15 text-amber-700 font-semibold text-sm px-4 py-1.5 rounded-full mb-4">O'quvchilar fikri</span>
          <h2 className="font-heading font-black text-3xl md:text-4xl text-maintext mb-4">
            Ular bugun muvaffaqiyatli —<br /><span className="text-primary">siz esa ertaga!</span>
          </h2>
          <p className="text-secondary text-lg max-w-xl mx-auto">
            Har yili yuzlab o'quvchilarimiz davlat granti sohibi bo'lib, orzulariga yetishadi
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {students.map((s, i) => (
            <motion.div
              key={i}
              initial={{ y: 32 }}
              whileInView={{ y: 0 }}
              viewport={vp}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-white rounded-3xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              {/* Yuqori qism: avatar + ism + natija */}
              <div className="flex items-center gap-4 mb-4">
                <div className="relative flex-shrink-0">
                  <div
                    className="w-14 h-14 rounded-full ring-4 ring-white shadow-lg flex items-center justify-center text-white font-heading font-bold text-xl flex-shrink-0"
                    style={{ background: s.gradient }}
                  >
                    {s.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)}
                  </div>
                  {s.is_grant && (
                    <div className="absolute -top-1 -right-1 bg-green-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                      GRANT
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-heading font-bold text-maintext text-base leading-tight truncate">{s.name}</p>
                  <p className="text-primary font-semibold text-sm mt-0.5">{s.result}</p>
                  <p className="text-secondary text-xs mt-0.5 truncate">{s.university} · {s.year}</p>
                </div>
              </div>

              {/* Yulduzlar */}
              <div className="flex gap-0.5 mb-3">
                {[...Array(s.stars)].map((_, j) => <FaStar key={j} className="text-yellow-400" size={13} />)}
              </div>

              {/* Sharh */}
              <div className="relative flex-1">
                <FaQuoteLeft className="text-primary/10 absolute -top-1 -left-1" size={28} />
                <p className="text-secondary text-sm leading-relaxed pl-3 relative z-10">"{s.text}"</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={vp}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { num: '3000+', label: 'Bitiruvchi' },
            { num: '90%', label: 'Grant sohibi' },
            { num: '8.0', label: 'IELTS max' },
            { num: '11+', label: 'Yil tajriba' },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 text-center border border-gray-100">
              <p className="font-heading font-black text-3xl text-primary">{item.num}</p>
              <p className="text-secondary text-sm mt-1">{item.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
