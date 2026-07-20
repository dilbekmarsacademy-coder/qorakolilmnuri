import { motion } from 'framer-motion'
import { FaMedal, FaUserCheck, FaChartLine, FaGraduationCap, FaBook, FaClock } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const advantages = [
  { icon: FaMedal, title: "11+ Yil Tajriba", desc: "Qorako'lda eng ko'p yillik tajribaga ega ta'lim markazi.", color: "bg-blue-100 text-primary" },
  { icon: FaGraduationCap, title: "90% Grant Natijalari", desc: "Har yili o'quvchilarning 90%dan ortig'i davlat granti sohibi bo'ladi.", color: "bg-amber-100 text-amber-600" },
  { icon: FaChartLine, title: "IELTS Band 8 gacha", desc: "Noldan boshlab Band 8 gacha. O'quvchilarimiz xalqaro miqyosda tan olingan.", color: "bg-green-100 text-green-600" },
  { icon: FaUserCheck, title: "Individual Yondashuv", desc: "Har bir o'quvchining darajasiga qarab o'quv rejasi. Max 8-10 kishi.", color: "bg-purple-100 text-purple-600" },
  { icon: FaBook, title: "Zamonaviy Dasturlar", desc: "DTM, IELTS, SAT va xalqaro standartlarga mos o'quv materiallari.", color: "bg-teal-100 text-teal-600" },
  { icon: FaClock, title: "Qulay Jadval", desc: "Ertalab va kechki smenalar — vaqtni o'zingiz tanlaysiz.", color: "bg-rose-100 text-rose-600" },
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
            Nima uchun biz?
          </span>
          <h2 className="font-heading font-black text-3xl md:text-4xl text-maintext mb-4">
            Ilm Nuri da o'qishning <span className="text-primary">6 ta afzalligi</span>
          </h2>
          <p className="text-secondary text-lg max-w-xl mx-auto">
            Boshqa markazlardan farqimiz — natijada ko'rinadi
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
            <a href="tel:+998997087604" aria-label="Qo'ng'iroq qilish"
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-8 py-4 rounded-2xl transition-all">
              Qo'ng'iroq qilish
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
