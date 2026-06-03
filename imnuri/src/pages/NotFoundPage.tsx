import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <motion.div
        initial={{ y: 30 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <div className="font-heading font-black text-8xl text-primary mb-4">404</div>
        <div className="text-6xl mb-6">🔍</div>
        <h1 className="font-heading font-bold text-2xl text-maintext mb-3">
          Sahifa topilmadi
        </h1>
        <p className="text-secondary mb-8 leading-relaxed">
          Siz qidirayotgan sahifa mavjud emas yoki ko'chirilgan.
          Bosh sahifaga qaytib ko'ring.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="bg-primary hover:bg-blue-700 text-white font-semibold px-8 py-3.5 rounded-2xl transition-all hover:shadow-lg"
          >
            Bosh sahifaga qaytish
          </Link>
          <Link
            to="/contact"
            className="border-2 border-gray-200 hover:border-primary text-secondary hover:text-primary font-semibold px-8 py-3.5 rounded-2xl transition-all"
          >
            Aloqa
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
