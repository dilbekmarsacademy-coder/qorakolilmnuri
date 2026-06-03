import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaPhoneAlt, FaMapMarkerAlt, FaClock, FaTelegram, FaWhatsapp, FaInstagram, FaYoutube, FaCheckCircle } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', phone: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <div className="pt-20">
      {/* Hero */}
      <section
        className="py-20 text-white"
        style={{ background: 'linear-gradient(135deg, #0d2d5a 0%, #1B4F8A 100%)' }}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-8 text-center">
          <div>
            <span className="inline-block bg-white/10 text-white/80 text-sm px-4 py-1.5 rounded-full mb-6">
              Aloqa
            </span>
            <h1 className="font-heading font-black text-4xl md:text-5xl mb-4">
              Biz bilan bog'laning
            </h1>
            <p className="text-white/80 text-xl max-w-xl mx-auto">
              Savol va takliflar uchun — biz har doim siz uchun mavjudmiz
            </p>
          </div>
        </div>
      </section>

      {/* Contact info cards */}
      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              {
                icon: FaMapMarkerAlt,
                label: "Manzil",
                value: "Qorako'l shahri",
                sub: "Buxoro viloyati, O'zbekiston",
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
                sub: "",
                color: "bg-orange-100 text-orange-600",
                href: "mailto:info@ilmnuri.uz",
              },
              {
                icon: FaClock,
                label: "Ish vaqti",
                value: "Du–Sha: 08–20",
                sub: "Yakshanba: dam olish",
                color: "bg-purple-100 text-purple-600",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-all"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${item.color.split(' ')[0]}`}>
                  <item.icon className={item.color.split(' ')[1]} size={18} />
                </div>
                <p className="text-secondary text-xs mb-1">{item.label}</p>
                {'href' in item && item.href ? (
                  <a href={item.href} className="font-semibold text-maintext text-sm hover:text-primary transition-colors block">
                    {item.value}
                  </a>
                ) : (
                  <p className="font-semibold text-maintext text-sm">{item.value}</p>
                )}
                {item.sub && <p className="text-secondary text-xs mt-0.5">{item.sub}</p>}
              </motion.div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Form */}
            <motion.div
              initial={{ x: -30 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.7 }}
              className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm"
            >
              {!submitted ? (
                <>
                  <h2 className="font-heading font-bold text-2xl text-maintext mb-6">Xabar yuboring</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-maintext mb-2">Ismingiz *</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                        placeholder="Ism va familiya"
                        className="w-full px-4 py-3.5 border border-gray-200 rounded-2xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 placeholder:text-secondary/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-maintext mb-2">Telefon *</label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                        placeholder="+998 93 378-39-85"
                        className="w-full px-4 py-3.5 border border-gray-200 rounded-2xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 placeholder:text-secondary/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-maintext mb-2">Mavzu</label>
                      <input
                        type="text"
                        value={form.subject}
                        onChange={e => setForm(p => ({ ...p, subject: e.target.value }))}
                        placeholder="Xabar mavzusi"
                        className="w-full px-4 py-3.5 border border-gray-200 rounded-2xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 placeholder:text-secondary/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-maintext mb-2">Xabar *</label>
                      <textarea
                        required
                        rows={4}
                        value={form.message}
                        onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                        placeholder="Xabaringizni kiriting..."
                        className="w-full px-4 py-3.5 border border-gray-200 rounded-2xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 placeholder:text-secondary/50 resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 bg-primary hover:bg-blue-700 text-white font-bold rounded-2xl transition-all hover:shadow-lg disabled:opacity-50"
                    >
                      {loading ? 'Yuborilmoqda...' : 'Xabar yuborish'}
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                    <FaCheckCircle className="text-green-500" size={36} />
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-maintext mb-3">Xabar yuborildi!</h3>
                  <p className="text-secondary mb-6">Tez orada siz bilan bog'lanamiz.</p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name:'', phone:'', subject:'', message:'' }) }}
                    className="text-primary font-semibold hover:underline text-sm"
                  >
                    Yana xabar yuborish
                  </button>
                </div>
              )}
            </motion.div>

            {/* Map + Socials */}
            <div className="space-y-5">
              <motion.div
                initial={{ x: 30 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.7 }}
                className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm"
              >
                <div className="p-5 border-b border-gray-100">
                  <h3 className="font-heading font-bold text-maintext">📍 Qorako'l, Buxoro viloyati</h3>
                  <p className="text-secondary text-sm mt-1">Markazga kelish yo'nalishi</p>
                </div>
                <div className="h-56">
                  <iframe
                    title="Manzil"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d96000!2d63.85!3d39.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zUW9yYWtvJ2w!5e0!3m2!1suz!2s!4v1620000000000!5m2!1suz!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-3xl p-6 border border-gray-100"
              >
                <h3 className="font-heading font-bold text-lg text-maintext mb-4">Ijtimoiy tarmoqlar</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: FaTelegram, label: "Telegram", href: "https://t.me/Dil_khan", color: "bg-[#229ED9] hover:bg-[#1a8bbf]" },
                    { icon: FaWhatsapp, label: "WhatsApp", href: "https://wa.me/998933783985", color: "bg-[#25D366] hover:bg-[#1db954]" },
                    { icon: FaInstagram, label: "Instagram", href: "https://instagram.com/ilmnuri.qorakol", color: "bg-gradient-to-br from-purple-500 to-pink-500" },
                    { icon: FaYoutube, label: "YouTube", href: "https://youtube.com/@ilmnuri", color: "bg-red-600 hover:bg-red-700" },
                  ].map(({ icon: Icon, label, href, color }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 p-3.5 ${color} text-white rounded-2xl font-semibold text-sm transition-all hover:scale-105`}
                    >
                      <Icon size={16} /> {label}
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
