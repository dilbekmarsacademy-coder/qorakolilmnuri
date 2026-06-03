import { motion } from 'framer-motion'
import { FaArrowRight, FaPlay, FaStar } from 'react-icons/fa'

const badges = [
  { text: "11+ Yil Tajriba", color: "bg-blue-100 text-primary" },
  { text: "90% Grant Sohibi", color: "bg-yellow-100 text-yellow-700" },
  { text: "IELTS Band 8", color: "bg-green-100 text-green-700" },
]

export default function Hero() {
  const handleScroll = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center"
      style={{
        background: 'linear-gradient(135deg, #0d2d5a 0%, #1B4F8A 50%, #1e5fa8 100%)',
      }}
    >
      {/* Fon bezaklari — alohida overflow-hidden ichida */}
      <div className="absolute inset-0 pointer-events-none" style={{ overflow: 'hidden' }}>
        <div
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full"
          style={{ background: 'rgba(255,255,255,0.05)', filter: 'blur(60px)' }}
        />
        <div
          className="absolute bottom-0 -left-24 w-80 h-80 rounded-full"
          style={{ background: 'rgba(244,165,27,0.08)', filter: 'blur(60px)' }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 pt-28 pb-16 grid md:grid-cols-2 gap-12 items-center w-full">

        {/* Chap — matn */}
        <div>
          <motion.div
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap gap-2 mb-6"
          >
            {badges.map((badge, i) => (
              <span key={i} className={`text-xs font-semibold px-3 py-1.5 rounded-full ${badge.color}`}>
                {badge.text}
              </span>
            ))}
          </motion.div>

          <motion.h1
            initial={{ y: 24 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading font-black text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6"
          >
            Kelajagingizni
            <br />
            <span className="text-accent">Biz Bilan</span>
            <br />
            Quring!
          </motion.h1>

          <motion.p
            initial={{ y: 16 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/80 text-lg leading-relaxed mb-8 max-w-md"
          >
            Qorako'lda 11 yildan ortiq faoliyat yuritayotgan Ilm Nuri ta'lim markazi —
            har yili yuzlab abituriyentlarni davlat grantigacha olib boradi.
          </motion.p>

          <motion.div
            initial={{ y: 16 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            <button
              onClick={() => handleScroll('#apply')}
              className="flex items-center gap-2 bg-accent hover:bg-yellow-500 text-white font-bold px-8 py-4 rounded-2xl text-base transition-all duration-200 hover:shadow-xl hover:shadow-yellow-500/30 hover:scale-105"
            >
              Ariza Berish <FaArrowRight />
            </button>
            <button
              onClick={() => handleScroll('#about')}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-2xl text-base border border-white/20 transition-all duration-200"
            >
              <FaPlay className="text-accent" /> Biz haqimizda
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center gap-4"
          >
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map(i => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                  style={{ background: 'linear-gradient(135deg, #60a5fa, #3b82f6)' }}
                >
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <div>
              <div className="flex text-accent gap-0.5 mb-0.5">
                {[...Array(5)].map((_, i) => <FaStar key={i} size={12} />)}
              </div>
              <p className="text-white/70 text-sm">3000+ muvaffaqiyatli bitiruvchi</p>
            </div>
          </motion.div>
        </div>

        {/* O'ng — vizual karta (floating badge yo'q, overflow muammosiz) */}
        <motion.div
          initial={{ x: 40 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="hidden md:block"
        >
          <div className="rounded-3xl p-8" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {[
                { num: "11+", label: "Yil faoliyat", icon: "📅" },
                { num: "90%", label: "Grant sohibi", icon: "🎓" },
                { num: "8.0", label: "IELTS band", icon: "🇬🇧" },
                { num: "3000+", label: "Bitiruvchi", icon: "👥" },
              ].map((item, i) => (
                <div key={i} className="rounded-2xl p-4 text-center" style={{ background: 'rgba(255,255,255,0.08)' }}>
                  <div className="text-2xl mb-1">{item.icon}</div>
                  <p className="font-heading font-black text-2xl text-accent">{item.num}</p>
                  <p className="text-white/70 text-xs mt-1">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl p-5 mb-4" style={{ background: 'rgba(244,165,27,0.15)', border: '1px solid rgba(244,165,27,0.25)' }}>
              <p className="text-white font-semibold text-center text-sm mb-3">Fanlar bo'yicha tayyorlov</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {['🇬🇧 Ingliz tili', '📐 Matematika', '⚗️ Kimyo', '🧬 Biologiya', '⚖️ Huquq', '📜 Tarix'].map(s => (
                  <span key={s} className="text-white text-xs px-3 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.15)' }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl p-4 flex items-center gap-3" style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.25)' }}>
              <div className="w-8 h-8 rounded-xl flex items-center justify-center text-green-400 text-lg flex-shrink-0">
                ✓
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Yangi guruh — Iyun 2026</p>
                <p className="text-white/60 text-xs">O'rin soni cheklangan</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <p className="text-white/40 text-xs tracking-widest uppercase">Pastga aylantiring</p>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full flex justify-center pt-1.5"
          style={{ border: '2px solid rgba(255,255,255,0.25)' }}
        >
          <div className="w-1 h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.5)' }} />
        </motion.div>
      </motion.div>
    </section>
  )
}
