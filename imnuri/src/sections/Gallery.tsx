import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const galleryItems = [
  { id: 1, label: "Ingliz tili darsi", category: "Darslar", color: "from-blue-400 to-blue-600", emoji: "📚" },
  { id: 2, label: "IELTS mock test", category: "Testlar", color: "from-emerald-400 to-green-600", emoji: "📝" },
  { id: 3, label: "O'quvchilar natijasi", category: "Natijalar", color: "from-amber-400 to-orange-500", emoji: "🏆" },
  { id: 4, label: "Matematika darsi", category: "Darslar", color: "from-purple-400 to-violet-600", emoji: "📐" },
  { id: 5, label: "Kimyo laboratoriya", category: "Darslar", color: "from-red-400 to-rose-600", emoji: "⚗️" },
  { id: 6, label: "Taqdimot kuni", category: "Tadbirlar", color: "from-teal-400 to-cyan-600", emoji: "🎤" },
  { id: 7, label: "Grant olganlar", category: "Natijalar", color: "from-pink-400 to-rose-500", emoji: "🎓" },
  { id: 8, label: "Yangi o'quv yili", category: "Tadbirlar", color: "from-indigo-400 to-blue-600", emoji: "🌟" },
  { id: 9, label: "Olimpiada g'oliblari", category: "Natijalar", color: "from-yellow-400 to-amber-500", emoji: "🥇" },
  { id: 10, label: "O'quvchilar gal", category: "Galereya", color: "from-cyan-400 to-blue-500", emoji: "👥" },
  { id: 11, label: "Ingliz tili haftaligi", category: "Tadbirlar", color: "from-lime-400 to-green-500", emoji: "🌍" },
  { id: 12, label: "Markaz ko'rinishi", category: "Galereya", color: "from-slate-400 to-gray-600", emoji: "🏫" },
]

const categories = ["Hammasi", "Darslar", "Natijalar", "Tadbirlar", "Galereya", "Testlar"]

const vp = { once: true, margin: '-80px' }

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("Hammasi")
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filtered = activeCategory === "Hammasi"
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory)

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)
  const prevItem = () => setLightboxIndex(i => i !== null ? (i - 1 + filtered.length) % filtered.length : null)
  const nextItem = () => setLightboxIndex(i => i !== null ? (i + 1) % filtered.length : null)

  return (
    <section id="gallery" className="py-20 md:py-28 bg-background" >
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }} viewport={vp}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="inline-block bg-teal-100 text-teal-700 font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
            Galereya
          </span>
          <h2 className="font-heading font-black text-3xl md:text-4xl text-maintext mb-4">
            Markaz hayotidan lavhalar
          </h2>
          <p className="text-secondary text-lg max-w-xl mx-auto">
            Darslar, tadbirlar va muvaffaqiyatli o'quvchilarimizning suratlari
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ y: 10 }}
          whileInView={{ y: 0 }} viewport={vp}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-2 justify-center mb-8"
        >
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-white text-secondary hover:bg-primary/5 hover:text-primary border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25, delay: i * 0.04 }}
                onClick={() => openLightbox(i)}
                className="group cursor-pointer relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-full h-44 bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                  <span className="text-6xl filter drop-shadow-md group-hover:scale-110 transition-transform duration-300">
                    {item.emoji}
                  </span>
                </div>
                <div className="p-3">
                  <p className="font-semibold text-maintext text-sm">{item.label}</p>
                  <span className="text-secondary text-xs">{item.category}</span>
                </div>
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300 flex items-center justify-center">
                  <span className="text-white font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity bg-primary/80 px-3 py-1.5 rounded-lg">
                    Kattalashtirish
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={e => e.stopPropagation()}
              className="relative max-w-2xl w-full bg-white rounded-3xl overflow-hidden"
            >
              <div className={`w-full h-80 bg-gradient-to-br ${filtered[lightboxIndex].color} flex items-center justify-center`}>
                <span className="text-9xl">{filtered[lightboxIndex].emoji}</span>
              </div>
              <div className="p-6">
                <p className="font-heading font-bold text-maintext text-xl">{filtered[lightboxIndex].label}</p>
                <p className="text-secondary text-sm mt-1">{filtered[lightboxIndex].category}</p>
                <p className="text-secondary text-xs mt-1">
                  {lightboxIndex + 1} / {filtered.length} — Rasm joylashtirilgach ko'rinadi
                </p>
              </div>

              <button onClick={closeLightbox} className="absolute top-4 right-4 w-9 h-9 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors">
                <FaTimes size={14} />
              </button>
              <button onClick={prevItem} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors">
                <FaChevronLeft size={14} />
              </button>
              <button onClick={nextItem} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors">
                <FaChevronRight size={14} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
