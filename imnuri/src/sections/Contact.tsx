import { motion } from 'framer-motion'
import { FaPhoneAlt, FaMapMarkerAlt, FaClock, FaTelegram, FaWhatsapp, FaInstagram, FaYoutube } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'

const contactInfo = [
  {
    icon: FaMapMarkerAlt,
    label: "Manzil",
    value: "Qorako'l shahri, Buxoro viloyati",
    sub: "O'zbekiston",
    color: "bg-blue-100 text-primary",
  },
  {
    icon: FaPhoneAlt,
    label: "Telefon",
    value: "+998 93 378-39-85",
    sub: "+998 93 378-39-85",
    color: "bg-green-100 text-green-600",
    href: "tel:+998933783985",
  },
  {
    icon: MdEmail,
    label: "Email",
    value: "info@ilmnuri.uz",
    sub: "marketing@ilmnuri.uz",
    color: "bg-orange-100 text-orange-600",
    href: "mailto:info@ilmnuri.uz",
  },
  {
    icon: FaClock,
    label: "Ish vaqti",
    value: "Dushanba–Shanba",
    sub: "08:00 – 20:00",
    color: "bg-purple-100 text-purple-600",
  },
]

const socials = [
  { icon: FaTelegram, label: "Telegram", href: "https://t.me/Dil_khan", color: "bg-[#229ED9] hover:bg-[#1a8bbf]" },
  { icon: FaWhatsapp, label: "WhatsApp", href: "https://wa.me/998933783985", color: "bg-[#25D366] hover:bg-[#1db954]" },
  { icon: FaInstagram, label: "Instagram", href: "https://instagram.com/ilmnuri.qorakol", color: "bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600" },
  { icon: FaYoutube, label: "YouTube", href: "https://youtube.com/@ilmnuri", color: "bg-red-600 hover:bg-red-700" },
]

const vp = { once: true, margin: '-80px' }

export default function Contact() {

  return (
    <section id="contact" className="py-20 md:py-28 bg-background">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }} viewport={vp}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block bg-primary/10 text-primary font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
            Aloqa
          </span>
          <h2 className="font-heading font-black text-3xl md:text-4xl text-maintext mb-4">
            Biz bilan bog'laning
          </h2>
          <p className="text-secondary text-lg max-w-xl mx-auto">
            Savol va takliflaringiz bor mi? Biz har doim siz uchun mavjudmiz!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact info */}
          <div>
            <motion.div
              initial={{ x: -30 }}
              whileInView={{ x: 0 }} viewport={vp}
              transition={{ duration: 0.7 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6"
            >
              {contactInfo.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ y: 20 }}
                  whileInView={{ y: 0 }} viewport={vp}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-all"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${item.color.split(' ')[0]}`}>
                    <item.icon className={item.color.split(' ')[1]} size={18} />
                  </div>
                  <p className="text-secondary text-xs mb-1">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="font-semibold text-maintext text-sm hover:text-primary transition-colors block">
                      {item.value}
                    </a>
                  ) : (
                    <p className="font-semibold text-maintext text-sm">{item.value}</p>
                  )}
                  <p className="text-secondary text-xs mt-0.5">{item.sub}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Social networks */}
            <motion.div
              initial={{ y: 20 }}
              whileInView={{ y: 0 }} viewport={vp}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-3xl p-6 border border-gray-100"
            >
              <h3 className="font-heading font-bold text-maintext mb-4">Ijtimoiy tarmoqlar</h3>
              <div className="grid grid-cols-2 gap-3">
                {socials.map(({ icon: Icon, label, href, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 p-3.5 ${color} text-white rounded-2xl font-semibold text-sm transition-all hover:scale-105 hover:shadow-md`}
                  >
                    <Icon size={18} />
                    {label}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Map */}
          <motion.div
            initial={{ x: 30 }}
            whileInView={{ x: 0 }} viewport={vp}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm"
          >
            <div className="p-5 border-b border-gray-100">
              <h3 className="font-heading font-bold text-maintext">
                📍 Biz bu yerda joylashmiz
              </h3>
              <p className="text-secondary text-sm mt-1">
                Qorako'l shahri, Buxoro viloyati, O'zbekiston
              </p>
            </div>
            <div className="relative h-72 md:h-80">
              <iframe
                title="Ilm Nuri Ta'lim Markazi manzili"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12000!2d63.85!3d39.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zUW9yYWtvJ2wsIE8nemJla2lzdG9u!5e0!3m2!1suz!2s!4v1620000000000!5m2!1suz!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute bottom-4 left-4 bg-white rounded-xl shadow-lg px-4 py-2 border border-gray-100">
                <p className="font-bold text-primary text-sm">Ilm Nuri Ta'lim Markazi</p>
                <p className="text-secondary text-xs">Qorako'l, Buxoro viloyati</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
