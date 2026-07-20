import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaUser, FaPhone, FaBook, FaClock, FaCheckCircle, FaTelegram, FaWhatsapp } from 'react-icons/fa'
import { submitApplication } from '../lib/submitApplication'
import PhoneInput, { getRawPhone } from '../components/PhoneInput'

const coursesList = [
  { name: 'Ingliz tili (IELTS)', icon: '🇬🇧' },
  { name: 'Matematika', icon: '📐' },
  { name: 'Kimyo', icon: '⚗️' },
  { name: 'Biologiya', icon: '🧬' },
  { name: 'Huquq', icon: '⚖️' },
  { name: 'Tarix', icon: '📜' },
  { name: 'Bir nechta fan', icon: '📚' },
]
const times = ['08:00–10:00', '10:00–12:00', '14:00–16:00', '16:00–18:00', '18:00–20:00']

type FormData = { name: string; phone: string; course: string; time: string; message: string }

export default function ApplyPage() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<FormData>({ name: '', phone: '', course: '', time: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const updateForm = (key: keyof FormData, value: string) =>
    setForm(prev => ({ ...prev, [key]: value }))

  const canNext = () => {
    if (step === 1) return form.name.trim().length >= 2
    if (step === 2) return /^\+998 \d{2}-\d{3}-\d{2}-\d{2}$/.test(form.phone)
    if (step === 3) return !!form.course
    return !!form.time
  }

  const handleSubmit = async () => {
    setLoading(true)
    setSubmitError(null)
    const { error } = await submitApplication({
      name: form.name,
      phone: getRawPhone(form.phone),
      course: form.course,
      preferred_time: form.time,
      message: form.message,
    })
    setLoading(false)
    if (error) {
      setSubmitError('Xatolik yuz berdi. Qayta urinib ko\'ring.')
    } else {
      setSubmitted(true)
    }
  }

  const steps = [
    { num: 1, label: "Ism-familiya", icon: FaUser, desc: "To'liq ismingiz" },
    { num: 2, label: "Telefon", icon: FaPhone, desc: "Aloqa raqami" },
    { num: 3, label: "Fan tanlash", icon: FaBook, desc: "O'qimoqchi bo'lgan fan" },
    { num: 4, label: "Vaqt", icon: FaClock, desc: "Qulay dars vaqti" },
  ]

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
              Ariza berish
            </span>
            <h1 className="font-heading font-black text-4xl md:text-5xl mb-4">
              Kelajagingizni bugun boshlang
            </h1>
            <p className="text-white/80 text-xl max-w-xl mx-auto">
              Ariza qoldiring — 1 soat ichida aloqaga chiqamiz va bepul sinov darsiga yozib olamiz
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 bg-background">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-5 gap-10">
            {/* Form panel */}
            <div className="md:col-span-3">
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                {!submitted ? (
                  <>
                    {/* Steps header */}
                    <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-1">
                      {steps.map((s, i) => (
                        <div key={s.num} className="flex items-center gap-2 flex-shrink-0">
                          <div className="flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                              step > s.num
                                ? 'bg-green-500 text-white'
                                : step === s.num
                                ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-110'
                                : 'bg-gray-100 text-secondary'
                            }`}>
                              {step > s.num ? <FaCheckCircle size={16} /> : <s.icon size={15} />}
                            </div>
                            <span className={`text-xs mt-1 font-medium ${step === s.num ? 'text-primary' : 'text-secondary'}`}>
                              {s.label}
                            </span>
                          </div>
                          {i < steps.length - 1 && (
                            <div className={`h-0.5 w-8 rounded mt-[-16px] transition-all ${step > s.num ? 'bg-green-500' : 'bg-gray-200'}`} />
                          )}
                        </div>
                      ))}
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={step}
                        initial={{ x: 20 }}
                        animate={{ x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="min-h-[280px]"
                      >
                        {step === 1 && (
                          <div>
                            <h2 className="font-heading font-bold text-2xl text-maintext mb-2">Ismingiz</h2>
                            <p className="text-secondary text-sm mb-6">To'liq ism va familiyangizni kiriting</p>
                            <label className="block font-semibold text-maintext text-sm mb-2">Ism va Familiya *</label>
                            <input
                              type="text"
                              value={form.name}
                              onChange={e => updateForm('name', e.target.value)}
                              placeholder="Masalan: Sarvar Karimov"
                              className="w-full px-4 py-3.5 border border-gray-200 rounded-2xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 text-maintext placeholder:text-secondary/50 bg-white font-body text-sm"
                              autoFocus
                            />
                          </div>
                        )}

                        {step === 2 && (
                          <div>
                            <h2 className="font-heading font-bold text-2xl text-maintext mb-2">Telefon raqam</h2>
                            <p className="text-secondary text-sm mb-6">Aloqa uchun telefon raqamingiz</p>
                            <label className="block font-semibold text-maintext text-sm mb-2">Telefon raqam *</label>
                            <PhoneInput
                              value={form.phone}
                              onChange={v => updateForm('phone', v)}
                              className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 bg-white font-body text-base text-maintext tracking-wide"
                            />
                          </div>
                        )}

                        {step === 3 && (
                          <div>
                            <h2 className="font-heading font-bold text-2xl text-maintext mb-2">Fan tanlang</h2>
                            <p className="text-secondary text-sm mb-6">Qaysi fandan o'qimoqchisiz?</p>
                            <div className="grid grid-cols-2 gap-2">
                              {coursesList.map(c => (
                                <button
                                  key={c.name}
                                  onClick={() => updateForm('course', c.name)}
                                  className={`p-3.5 rounded-xl text-sm font-medium border transition-all text-left flex items-center gap-2 ${
                                    form.course === c.name
                                      ? 'border-primary bg-primary/10 text-primary'
                                      : 'border-gray-200 bg-white text-secondary hover:border-primary/30'
                                  }`}
                                >
                                  <span>{c.icon}</span>
                                  <span>{c.name}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {step === 4 && (
                          <div>
                            <h2 className="font-heading font-bold text-2xl text-maintext mb-2">Qulay vaqt</h2>
                            <p className="text-secondary text-sm mb-6">Qaysi vaqt sizga qulay?</p>
                            <div className="space-y-2 mb-5">
                              {times.map(t => (
                                <button
                                  key={t}
                                  onClick={() => updateForm('time', t)}
                                  className={`w-full p-3.5 rounded-xl text-sm font-medium border transition-all text-left flex items-center gap-3 ${
                                    form.time === t
                                      ? 'border-primary bg-primary/10 text-primary'
                                      : 'border-gray-200 bg-white text-secondary hover:border-primary/30'
                                  }`}
                                >
                                  <FaClock className={form.time === t ? 'text-primary' : 'text-secondary'} size={14} />
                                  {t}
                                </button>
                              ))}
                            </div>
                            <div>
                              <label className="block font-semibold text-maintext text-sm mb-2">
                                Qo'shimcha izoh (ixtiyoriy)
                              </label>
                              <textarea
                                value={form.message}
                                onChange={e => updateForm('message', e.target.value)}
                                placeholder="Savollar, maxsus talablar yoki izohlar..."
                                rows={3}
                                className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 text-maintext placeholder:text-secondary/50 bg-white resize-none"
                              />
                            </div>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>

                    <div className="flex gap-3 mt-6">
                      {step > 1 && (
                        <button
                          onClick={() => setStep(s => s - 1)}
                          className="flex-1 py-4 rounded-2xl border border-gray-200 text-secondary font-semibold hover:bg-gray-50 transition-colors"
                        >
                          ← Orqaga
                        </button>
                      )}
                      {step < 4 ? (
                        <button
                          onClick={() => canNext() && setStep(s => s + 1)}
                          disabled={!canNext()}
                          className="flex-1 py-4 rounded-2xl bg-primary text-white font-bold disabled:opacity-40 hover:bg-blue-700 transition-all hover:shadow-lg disabled:cursor-not-allowed"
                        >
                          Davom etish →
                        </button>
                      ) : (
                        <button
                          onClick={handleSubmit}
                          disabled={!canNext() || loading}
                          className="flex-1 py-4 rounded-2xl bg-accent text-white font-bold disabled:opacity-40 hover:bg-yellow-500 transition-all hover:shadow-xl disabled:cursor-not-allowed"
                        >
                          {loading ? '⏳ Yuborilmoqda...' : '🚀 Ariza yuborish'}
                        </button>
                      )}
                    </div>

                    {submitError && (
                      <div className="mt-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-600 text-sm text-center">
                        ⚠️ {submitError}
                      </div>
                    )}
                    <p className="text-center text-secondary text-xs mt-4">
                      {step}/{steps.length} — Ma'lumotlaringiz xavfsiz saqlanadi
                    </p>
                  </>
                ) : (
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-10"
                  >
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <FaCheckCircle className="text-green-500" size={44} />
                    </div>
                    <h2 className="font-heading font-bold text-3xl text-maintext mb-3">
                      Ariza qabul qilindi! 🎉
                    </h2>
                    <p className="text-secondary text-lg leading-relaxed mb-4">
                      <strong>{form.name}</strong>, rahmat!<br />
                      Siz <strong>{form.course}</strong> bo'yicha ariza qoldirdingiz.
                    </p>
                    <p className="text-secondary mb-8">
                      1 soat ichida <strong className="text-primary">{form.phone}</strong> raqamiga qo'ng'iroq qilamiz.
                    </p>
                    <button
                      onClick={() => { setSubmitted(false); setStep(1); setForm({ name:'', phone:'', course:'', time:'', message:'' }) }}
                      className="text-primary font-semibold hover:underline text-sm"
                    >
                      Yana ariza berish
                    </button>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Sidebar info */}
            <div className="md:col-span-2 space-y-5">
              <div className="bg-white rounded-3xl p-6 border border-gray-100">
                <h3 className="font-heading font-bold text-xl text-maintext mb-5">📋 Ariza shartlari</h3>
                {[
                  { icon: "✅", text: "Ariza bepul va majburiyatsiz" },
                  { icon: "⚡", text: "1 soat ichida aloqaga chiqamiz" },
                  { icon: "🎁", text: "Sinov darsi bepul" },
                  { icon: "📅", text: "Jadval sizga mos keladi" },
                  { icon: "🔒", text: "Ma'lumotlar maxfiy saqlanadi" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 mb-3">
                    <span>{item.icon}</span>
                    <span className="text-secondary text-sm">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="bg-background rounded-3xl p-6 border border-gray-100">
                <h3 className="font-heading font-bold text-lg text-maintext mb-4">📞 Bevosita bog'lanish</h3>
                <div className="space-y-3">
                  <a
                    href="https://t.me/Arslonov_Sobir"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3.5 bg-[#229ED9]/10 hover:bg-[#229ED9]/20 border border-[#229ED9]/20 rounded-2xl text-[#229ED9] font-semibold text-sm transition-colors"
                  >
                    <FaTelegram size={18} /> Telegram
                  </a>
                  <a
                    href="https://wa.me/998997087604"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3.5 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/20 rounded-2xl text-[#25D366] font-semibold text-sm transition-colors"
                  >
                    <FaWhatsapp size={18} /> WhatsApp
                  </a>
                  <a
                    href="tel:+998997087604"
                    className="flex items-center gap-3 p-3.5 bg-primary/10 hover:bg-primary/15 border border-primary/15 rounded-2xl text-primary font-semibold text-sm transition-colors"
                  >
                    📞 +998 99 708-76-04
                  </a>
                </div>
              </div>

              <div
                className="rounded-3xl p-6 text-white text-center"
                style={{ background: 'linear-gradient(135deg, #1B4F8A, #2563EB)' }}
              >
                <p className="font-heading font-bold text-2xl text-accent mb-1">90%</p>
                <p className="font-semibold">o'quvchilarimiz grant oladi</p>
                <p className="text-white/70 text-sm mt-2">Siz ham keling va bu statistikaning bir qismi bo'ling!</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
