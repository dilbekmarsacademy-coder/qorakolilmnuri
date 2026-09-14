import { motion } from 'framer-motion'
import { FaBed, FaUtensils, FaEye, FaMobileAlt, FaClipboardCheck, FaUsers, FaCalendarCheck, FaSms, FaMedal } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const advantages = [
  { icon: FaBed, title: "Yotoqxona mavjud", desc: "Viloyatlardan kelgan o'quvchilar uchun qulay yotoqxona xizmati.", color: "bg-blue-100 text-primary" },
  { icon: FaUtensils, title: "Kuniga 3 mahal issiq ovqat", desc: "O'quvchilar to'yib, sog'lom ovqatlanadi va darsga to'liq kuch bilan kirishadi.", color: "bg-amber-100 text-amber-600" },
  { icon: FaEye, title: "Doimiy nazorat", desc: "O'quvchilar ustidan kun davomida uzluksiz nazorat olib boriladi.", color: "bg-green-100 text-green-600" },
  { icon: FaMobileAlt, title: "Telefondan cheklangan foydalanish", desc: "Diqqat faqat darsga qaratiladi — telefonlardan foydalanish qat'iy cheklangan.", color: "bg-purple-100 text-purple-600" },
  { icon: FaClipboardCheck, title: "Kundalik dars va testlar", desc: "Har kuni dars va sinov testlari orqali bilim mustahkamlanadi.", color: "bg-teal-100 text-teal-600" },
  { icon: FaUsers, title: "Ota-onalar bilan aloqa", desc: "Ota-onalar bilan muntazam aloqa yo'lga qo'yilgan.", color: "bg-rose-100 text-rose-600" },
  { icon: FaCalendarCheck, title: "Har 2 oyda ota-onalar yig'ilishi", desc: "O'quvchi natijalari muntazam ravishda ota-onalarga yetkaziladi.", color: "bg-indigo-100 text-indigo-600" },
  { icon: FaSms, title: "SMS/xabarnomalar", desc: "Natijalar bo'yicha ota-onalarga SMS orqali xabar beriladi.", color: "bg-cyan-100 text-cyan-600" },
  { icon: FaMedal, title: "Tajribali ustozlar", desc: "Tajribali va sertifikatga ega o'qituvchilar jamoasi.", color: "bg-yellow-100 text-yellow-700" },
]

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { y: 24 }, show: { y: 0, transition: { duration: 0.4 } } }

export default function WhyUs() {
  return (
    <section id="why-us" className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-block bg-primary/10 text-primary font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
            Ta'lim sharoiti
          </span>
          <h2 className="font-heading font-black text-3xl md:text-4xl text-maintext mb-4">
            QORAKO'L ILM NURI da <span className="text-primary">ta'lim sharoiti</span>
          </h2>
          <p className="text-secondary text-lg max-w-xl mx-auto">
            Boshqa markazlardan farqimiz — yaratilgan sharoitda ko'rinadi
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {advantages.map((adv, i) => (
            <motion.div
              key={i}
              variants={item}
              className="bg-white rounded-3xl p-7 border border-gray-100 hover:border-primary/20 hover:shadow-lg transition-all duration-300"
            >
              <div className={`w-[52px] h-[52px] rounded-2xl flex items-center justify-center mb-5 ${adv.color.split(' ')[0]}`}>
                <adv.icon className={adv.color.split(' ')[1]} size={22} />
              </div>
              <h3 className="font-heading font-bold text-maintext text-lg mb-2">{adv.title}</h3>
              <p className="text-secondary text-sm leading-relaxed">{adv.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-12 bg-gradient-to-r from-primary to-blue-600 rounded-3xl p-8 md:p-10 text-white text-center">
          <h3 className="font-heading font-black text-2xl md:text-3xl mb-3">Bugun harakat qiling!</h3>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">
            Yangi guruh tez orada to'ladi. Hoziroq ro'yxatdan o'ting va o'rin band qiling.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/apply" aria-label="Ariza topshirish sahifasiga o'tish"
              className="bg-accent hover:bg-yellow-500 text-white font-bold px-8 py-4 rounded-2xl transition-all hover:shadow-xl">
              Ariza topshirish
            </Link>
            <a href="tel:+998995701705" aria-label="Qo'ng'iroq qilish"
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-8 py-4 rounded-2xl transition-all">
              Qo'ng'iroq qilish
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
