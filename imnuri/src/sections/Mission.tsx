import { motion } from 'framer-motion'
import { FaBullseye, FaEye, FaHeart } from 'react-icons/fa'

const items = [
  {
    icon: FaBullseye,
    title: "Missiya",
    text: "Har bir o'quvchiga o'z imkoniyatini maksimal darajada ochib, yuqori natija va kuchli ta'lim olishiga yordam berish.",
    color: "bg-blue-100 text-primary",
  },
  {
    icon: FaEye,
    title: "Vizion",
    text: "O'zbekistonda eng natijali va zamonaviy ta'lim markaziga aylanish.",
    color: "bg-amber-100 text-amber-600",
  },
  {
    icon: FaHeart,
    title: "Qadriyatlar",
    text: "Sifat, mas'uliyat, individual yondashuv va o'quvchi muvaffaqiyati — biz uchun eng muhim qadriyatlar.",
    color: "bg-rose-100 text-rose-600",
  },
]

const vp = { once: true, margin: '-80px' }

export default function Mission() {
  return (
    <section id="about" className="py-20 md:py-28 bg-background">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-2 gap-14 items-center">
          {/* Image placeholder */}
          <motion.div
            initial={{ x: -40 }}
            whileInView={{ x: 0 }}
            viewport={vp}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute -top-4 -left-4 w-full h-full bg-background rounded-3xl -z-10" />
            <div className="bg-white border border-gray-100 shadow-xl rounded-3xl overflow-hidden">
              <div
                className="h-56 flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #14306E 0%, #2563EB 100%)' }}
              >
                <div className="text-center text-white p-8">
                  <p className="font-heading font-black text-7xl text-accent">15+</p>
                  <p className="font-semibold text-xl mt-2">Yil faoliyat</p>
                  <p className="text-white/70 text-sm mt-1">2015 yildan buyon</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-secondary leading-relaxed">
                  QORAKO'L ILM NURI o'quv markazi 2015-yildan buyon Qorako'l tumanida faoliyat
                  yuritib kelmoqda. Viloyatlardan kelgan o'quvchilar uchun yotoqxona, kuniga
                  3 mahal issiq ovqat va doimiy nazorat mavjud.
                </p>
                <div className="mt-4 flex items-center gap-3 p-3 bg-green-50 rounded-xl">
                  <span className="text-2xl">🏆</span>
                  <p className="text-green-700 font-semibold text-sm">
                    15000+ o'quvchi, 99%gacha grant natijasi
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text content */}
          <div>
            <motion.div
              initial={{ y: 20 }}
              whileInView={{ y: 0 }}
              viewport={vp}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <span className="inline-block bg-primary/10 text-primary font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
                Biz haqimizda
              </span>
              <h2 className="font-heading font-black text-3xl md:text-4xl text-maintext mb-4 leading-tight">
                Har bir o'quvchi —<br />
                <span className="text-primary">bizning g'ururimiz</span>
              </h2>
              <p className="text-secondary text-lg leading-relaxed">
                Markazimizda 5-sinfdan boshlab abituriyentlargacha bo'lgan o'quvchilar uchun
                turli fanlardan sifatli ta'lim yo'lga qo'yilgan. Asosiy maqsadimiz — o'quvchiga
                faqat bilim berish emas, balki intizom, nazorat va aniq natijaga olib boradigan
                tizim yaratish.
              </p>
            </motion.div>

            <div className="space-y-4">
              {items.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ x: 40 }}
                  whileInView={{ x: 0 }}
                  viewport={vp}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                  className="flex items-start gap-4 p-5 bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-primary/20 hover:shadow-md transition-all"
                >
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${item.color.split(' ')[0]}`}>
                    <item.icon className={item.color.split(' ')[1]} size={20} />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-maintext mb-1">{item.title}</h3>
                    <p className="text-secondary text-sm leading-relaxed">{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
