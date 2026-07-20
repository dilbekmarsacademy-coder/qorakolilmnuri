import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { courses } from '../sections/Courses'
import { FaCheckCircle, FaArrowLeft, FaClock, FaUsers, FaChartLine } from 'react-icons/fa'

const courseDetails: Record<string, {
  topics: string[]
  schedule: string
  groupSize: string
  price: string
  requirements: string[]
  outcomes: string[]
}> = {
  english: {
    topics: ['Listening (tinglash)', 'Reading (o\'qish)', 'Writing (yozish)', 'Speaking (gapirish)', 'Vocabulary va Grammar', 'Mock test strategiyalari'],
    schedule: 'Kuniga 2 soat, haftasiga 5 kun',
    groupSize: 'Max 8 kishi',
    price: 'Narx bo\'yicha aloqaga chiqing',
    requirements: ['Hech qanday tayyorgarlik shart emas', 'Noldan boshlanadi', '16+ yosh tavsiya etiladi'],
    outcomes: ['IELTS Band 6.5-8.0', 'Xalqaro sertifikat', 'Xorijda o\'qish imkoni', 'Professional ingliz tili'],
  },
  math: {
    topics: ['Algebra va trigonometriya', 'Geometriya', 'Analiz elementlari', 'Ehtimollar nazariyasi', 'DTM test formati', 'Matematik mantiq'],
    schedule: 'Kuniga 1.5 soat, haftasiga 4 kun',
    groupSize: 'Max 10 kishi',
    price: 'Narx bo\'yicha aloqaga chiqing',
    requirements: ['Maktab matematikasi asosiy bilim', '9-sinf va undan yuqori'],
    outcomes: ['DTM 80-90 ball', 'Davlat granti', 'Analitik fikrlash', 'Muammo hal etish ko\'nikmalari'],
  },
  chemistry: {
    topics: ['Umumiy kimyo asoslari', 'Anorganik kimyo', 'Organik kimyo', 'Fizik kimyo', 'DTM test strategiyasi', 'Laboratoriya ishlari'],
    schedule: 'Kuniga 1.5 soat, haftasiga 4 kun',
    groupSize: 'Max 8 kishi',
    price: 'Narx bo\'yicha aloqaga chiqing',
    requirements: ['Maktab kimyo asoslari', '9-sinf va undan yuqori'],
    outcomes: ['DTM 80-90 ball', 'Tibbiyot instituti granti', 'Kimyo fani bo\'yicha chuqur bilim'],
  },
  biology: {
    topics: ['Hujayra biologiyasi', 'Botanika', 'Zoologiya', 'Anatomiya va fiziologiya', 'Genetika va evolyutsiya', 'Ekologiya'],
    schedule: 'Kuniga 1.5 soat, haftasiga 4 kun',
    groupSize: 'Max 8 kishi',
    price: 'Narx bo\'yicha aloqaga chiqing',
    requirements: ['Maktab biologiya asoslari', '9-sinf va undan yuqori'],
    outcomes: ['DTM 80-90 ball', 'Tibbiyot yo\'nalishi granti', 'Biologiya sohasida chuqur bilim'],
  },
  law: {
    topics: ['O\'zbekiston Konstitutsiyasi', 'Fuqarolik huquqi', 'Jinoyat huquqi', 'Ma\'muriy huquq', 'Mehnat huquqi', 'Xalqaro huquq asoslari'],
    schedule: 'Kuniga 1.5 soat, haftasiga 3-4 kun',
    groupSize: 'Max 10 kishi',
    price: 'Narx bo\'yicha aloqaga chiqing',
    requirements: ['Hech qanday maxsus tayyorgarlik shart emas', '10-sinf va undan yuqori'],
    outcomes: ['DTM 80-90 ball', 'Yuridik yo\'nalish granti', 'Huquqiy savodxonlik'],
  },
  history: {
    topics: ['Qadimgi dunyo tarixi', 'O\'rta asrlar', 'Yangi tarix', 'O\'zbekiston tarixi', 'Zamonaviy tarix', 'DTM xronologiya va sanalar'],
    schedule: 'Kuniga 1.5 soat, haftasiga 3-4 kun',
    groupSize: 'Max 10 kishi',
    price: 'Narx bo\'yicha aloqaga chiqing',
    requirements: ['Maktab tarix asoslari', '9-sinf va undan yuqori'],
    outcomes: ['DTM 80-90 ball', 'Gumanitar yo\'nalish granti', 'Tarixiy fikrlash ko\'nikmalari'],
  },
}

export default function CourseDetailPage() {
  const { subject } = useParams<{ subject: string }>()
  const course = courses.find(c => c.id === subject)
  const detail = subject ? courseDetails[subject] : null

  if (!course || !detail) {
    return <Navigate to="/courses" replace />
  }

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className={`py-20 md:py-24 bg-gradient-to-r ${course.color} text-white`}>
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div>
            <Link
              to="/courses"
              className="flex items-center gap-2 text-white/70 hover:text-white text-sm mb-8 transition-colors w-fit"
            >
              <FaArrowLeft size={13} />
              Barcha kurslar
            </Link>
            <div className="flex items-start gap-5">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0">
                {course.icon}
              </div>
              <div>
                <p className="text-white/70 text-sm mb-2">{course.tag}</p>
                <h1 className="font-heading font-black text-4xl md:text-5xl mb-3">{course.name}</h1>
                <p className="text-white/80 text-lg max-w-xl">{course.desc}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-6 mt-8">
              {[
                { icon: FaClock, label: detail.schedule },
                { icon: FaUsers, label: detail.groupSize },
                { icon: FaChartLine, label: course.level },
              ].map(({ icon: Icon, label }, i) => (
                <div key={i} className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2.5">
                  <Icon size={15} />
                  <span className="text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-3 gap-10">
            {/* Main content */}
            <div className="md:col-span-2 space-y-8">
              {/* Topics */}
              <motion.div
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-background rounded-3xl p-8"
              >
                <h2 className="font-heading font-bold text-2xl text-maintext mb-6">📚 O'quv dasturi</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {detail.topics.map((topic, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100">
                      <div className={`w-7 h-7 rounded-lg bg-gradient-to-r ${course.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                        {i + 1}
                      </div>
                      <span className="text-secondary text-sm">{topic}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Outcomes */}
              <motion.div
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="bg-green-50 border border-green-200 rounded-3xl p-8"
              >
                <h2 className="font-heading font-bold text-2xl text-maintext mb-6">🏆 Kurs natijasi</h2>
                <div className="space-y-3">
                  {detail.outcomes.map((outcome, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <FaCheckCircle className="text-green-500 flex-shrink-0" size={18} />
                      <span className="text-maintext font-medium">{outcome}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Requirements */}
              <motion.div
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="bg-background rounded-3xl p-8"
              >
                <h2 className="font-heading font-bold text-2xl text-maintext mb-6">📋 Talablar</h2>
                <div className="space-y-3">
                  {detail.requirements.map((req, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                      <span className="text-secondary">{req}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              <motion.div
                initial={{ x: 30 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-background border border-gray-100 rounded-3xl p-6 sticky top-28"
              >
                <h3 className="font-heading font-bold text-maintext text-xl mb-5">Ariza berish</h3>

                <div className="space-y-3 mb-6">
                  {[
                    { label: "Davomiyligi", value: course.duration },
                    { label: "Guruh hajmi", value: detail.groupSize },
                    { label: "Daraja", value: course.level },
                    { label: "Narx", value: detail.price },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-secondary text-sm">{item.label}</span>
                      <span className="font-semibold text-maintext text-sm">{item.value}</span>
                    </div>
                  ))}
                </div>

                <Link
                  to="/apply"
                  className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-white font-bold bg-gradient-to-r ${course.color} hover:shadow-lg transition-all mb-3`}
                >
                  Ariza topshirish
                </Link>
                <a
                  href="tel:+998997087604"
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border border-gray-200 text-secondary font-semibold text-sm hover:border-primary hover:text-primary transition-all"
                >
                  📞 Qo'ng'iroq qilish
                </a>

                <div className="mt-5 p-4 bg-accent/10 rounded-2xl text-center">
                  <p className="text-amber-700 font-semibold text-sm">
                    ⚡ Sinov darsi bepul!
                  </p>
                  <p className="text-amber-600 text-xs mt-1">Ariza qoldiring va tekshirib ko'ring</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
