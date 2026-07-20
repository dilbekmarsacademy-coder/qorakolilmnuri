import { motion } from 'framer-motion'
import { FaTelegram, FaWhatsapp } from 'react-icons/fa'

export default function FloatingButtons() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <motion.a
        href="https://t.me/Arslonov_Sobir"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 bg-[#229ED9] hover:bg-[#1a8bbf] rounded-full flex items-center justify-center shadow-lg shadow-blue-400/40 transition-colors"
        title="Telegram orqali yozing"
        aria-label="Telegram orqali bog'lanish"
      >
        <FaTelegram size={26} className="text-white" />
      </motion.a>

      <motion.a
        href="https://wa.me/998997087604"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.2, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 bg-[#25D366] hover:bg-[#1db954] rounded-full flex items-center justify-center shadow-lg shadow-green-400/40 transition-colors"
        title="WhatsApp orqali yozing"
        aria-label="WhatsApp orqali bog'lanish"
      >
        <FaWhatsapp size={26} className="text-white" />
      </motion.a>
    </div>
  )
}
