import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaUser, FaPhone, FaBook, FaClock, FaCheckCircle, FaTelegram, FaWhatsapp } from 'react-icons/fa'
import { submitApplication } from '../lib/submitApplication'
import PhoneInput, { getRawPhone } from '../components/PhoneInput'

const courses = ['Ingliz tili (IELTS)', 'Matematika', 'Kimyo', 'Biologiya', 'Huquq', 'Tarix']
const times   = ['08:00–10:00', '10:00–12:00', '14:00–16:00', '16:00–18:00', '18:00–20:00']

type FormData = { name: string; phone: string; course: string; time: string }

// +998 XX-XXX-XX-XX to'liq formatda bo'lishi kerak
const PHONE_RE = /^\+998 \d{2}-\d{3}-\d{2}-\d{2}$/

export default function ApplySection() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<FormData>({ name: '', phone: '', course: '', time: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const update = (k: keyof FormData, v: string) => setForm(p => ({ ...p, [k]: v }))
  const canNext = () => {
    if (step === 1) return form.name.trim().length >= 2
    if (step === 2) return PHONE_RE.test(form.phone)
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
    })
    setLoading(false)
    if (error) {
      setSubmitError('Xatolik yuz berdi. Qayta urinib ko\'ring.')
    } else {
      setSubmitted(true)
    }
  }

  const steps = [
    { num: 1, label: 'Ism', icon: FaUser },
    { num: 2, label: 'Telefon', icon: FaPhone },
    { num: 3, label: 'Fan', icon: FaBook },
    { num: 4, label: 'Vaqt', icon: FaClock },
  ]

  return (
    <section id="apply" className="py-20 md:py-28 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ y: 20 }}
          animate={inView ? { y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-block bg-accent/10 text-amber-700 font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
            Ariza berish
          </span>
          <h2 className="font-heading font-black text-3xl md:text-4xl text-maintext mb-4">
            Kelajagingizni bugun boshlang
          </h2>
          <p className="text-secondary text-lg max-w-xl mx-auto">
            Ariza qoldiring — biz 1 soat ichida aloqaga chiqamiz
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Form */}
          <motion.div
            initial={{ y: 24 }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-gray-50 rounded-3xl p-8 border border-gray-100"
          >
            {!submitted ? (
              <>
                {/* Step indicators */}
                <div className="flex items-center gap-2 mb-8" role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={4}>
                  {steps.map((s, i) => (
                    <div key={s.num} className="flex items-center gap-2 flex-1">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                        step > s.num ? 'bg-green-500 text-white' : step === s.num ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-gray-200 text-secondary'
                      }`} aria-label={`Qadam ${s.num}: ${s.label}`}>
                        {step > s.num ? <FaCheckCircle size={14} /> : <s.icon size={14} />}
                      </div>
                      {i < steps.length - 1 && (
                        <div className={`flex-1 h-1 rounded-full transition-all ${step > s.num ? 'bg-green-500' : 'bg-gray-200'}`} />
                      )}
                    </div>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ x: 16 }}
                    animate={{ x: 0 }}
                    exit={{ x: -16 }}
                    transition={{ duration: 0.25 }}
                    className="min-h-[200px]"
                  >
                    {step === 1 && (
                      <div>
                        <label htmlFor="apply-name" className="block font-semibold text-maintext mb-2">Ism va Familiya</label>
                        <input
                          id="apply-name"
                          type="text"
                          value={form.name}
                          onChange={e => update('name', e.target.value)}
                          placeholder="Masalan: Sarvar Karimov"
                          autoFocus
                          className="w-full px-4 py-3.5 border border-gray-200 rounded-2xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 bg-white font-body text-sm text-maintext"
                        />
                      </div>
                    )}
                    {step === 2 && (
                      <div>
                        <label htmlFor="apply-phone" className="block font-semibold text-maintext mb-2">Telefon raqam</label>
                        <PhoneInput
                          id="apply-phone"
                          value={form.phone}
                          onChange={v => update('phone', v)}
                          className="w-full px-4 py-3.5 border border-gray-200 rounded-2xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 bg-white font-body text-base tracking-wide"
                        />
                        {form.phone && form.phone.length > 5 && !PHONE_RE.test(form.phone) && (
                          <p className="text-red-500 text-xs mt-2">Raqamni to'liq kiriting: +998 90-000-00-00</p>
                        )}
                      </div>
                    )}
                    {step === 3 && (
                      <div>
                        <p className="block font-semibold text-maintext mb-3">Fan tanlang</p>
                        <div className="grid grid-cols-2 gap-2">
                          {courses.map(c => (
                            <button
                              key={c}
                              type="button"
                              onClick={() => update('course', c)}
                              aria-pressed={form.course === c}
                              className={`p-3 rounded-xl text-sm font-medium border transition-all ${
                                form.course === c ? 'border-primary bg-primary/10 text-primary' : 'border-gray-200 bg-white text-secondary hover:border-primary/30'
                              }`}
                            >
                              {c}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    {step === 4 && (
                      <div>
                        <p className="block font-semibold text-maintext mb-3">Qulay vaqt</p>
                        <div className="space-y-2">
                          {times.map(t => (
                            <button
                              key={t}
                              type="button"
                              onClick={() => update('time', t)}
                              aria-pressed={form.time === t}
                              className={`w-full p-3.5 rounded-xl text-sm font-medium border text-left flex items-center gap-3 transition-all ${
                                form.time === t ? 'border-primary bg-primary/10 text-primary' : 'border-gray-200 bg-white text-secondary hover:border-primary/30'
                              }`}
                            >
                              <FaClock size={13} /> {t}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {submitError && (
                  <div className="mt-4 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-600 text-sm text-center">
                    ⚠️ {submitError}
                  </div>
                )}
                <div className="flex gap-3 mt-4">
                  {step > 1 && (
                    <button type="button" onClick={() => setStep(s => s - 1)} aria-label="Orqaga qaytish"
                      className="flex-1 py-3.5 rounded-2xl border border-gray-200 text-secondary font-semibold hover:bg-gray-50 transition-colors">
                      ← Orqaga
                    </button>
                  )}
                  {step < 4 ? (
                    <button type="button" onClick={() => canNext() && setStep(s => s + 1)} disabled={!canNext()}
                      aria-label="Keyingi qadamga o'tish"
                      className="flex-1 py-3.5 rounded-2xl bg-primary text-white font-bold disabled:opacity-40 hover:bg-blue-700 transition-all hover:shadow-lg disabled:cursor-not-allowed">
                      Davom etish
                    </button>
                  ) : (
                    <button type="button" onClick={handleSubmit} disabled={!canNext() || loading}
                      aria-label="Arizani yuborish"
                      className="flex-1 py-3.5 rounded-2xl bg-accent text-white font-bold disabled:opacity-40 hover:bg-yellow-500 transition-all hover:shadow-lg disabled:cursor-not-allowed">
                      {loading ? 'Yuborilmoqda...' : 'Ariza yuborish 🚀'}
                    </button>
                  )}
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                  <FaCheckCircle className="text-green-500" size={36} />
                </div>
                <h3 className="font-heading font-bold text-2xl text-maintext mb-3">Ariza qabul qilindi! 🎉</h3>
                <p className="text-secondary mb-6">
                  <strong>{form.name}</strong>, rahmat! 1 soat ichida{' '}
                  <strong className="text-primary">{form.phone}</strong> raqamiga aloqaga chiqamiz.
                </p>
                <button type="button" onClick={() => { setSubmitted(false); setStep(1); setForm({ name:'', phone:'', course:'', time:'' }) }}
                  className="text-primary font-semibold hover:underline text-sm">
                  Yana ariza berish
                </button>
              </div>
            )}
          </motion.div>

          {/* Info panel */}
          <motion.div
            initial={{ y: 24 }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="space-y-5"
          >
            <div className="bg-primary/5 border border-primary/15 rounded-3xl p-6">
              <h3 className="font-heading font-bold text-primary text-xl mb-4">📋 Ariza shartlari</h3>
              {['Ariza bepul va majburiyatsiz', '1 soat ichida siz bilan bog\'lanamiz', 'Sinov darsi bepul taqdim etiladi', 'Dars jadvalini o\'zingiz tanlaysiz'].map((t, i) => (
                <div key={i} className="flex items-center gap-3 mb-3">
                  <FaCheckCircle className="text-primary flex-shrink-0" size={14} />
                  <span className="text-secondary text-sm">{t}</span>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-3xl p-6 border border-gray-100">
              <h3 className="font-heading font-bold text-maintext text-lg mb-4">📞 Bevosita bog'lanish</h3>
              <div className="space-y-3">
                <a href="https://t.me/Arslonov_Sobir" target="_blank" rel="noopener noreferrer" aria-label="Telegram orqali bog'lanish"
                  className="flex items-center gap-3 p-3.5 bg-[#229ED9]/10 hover:bg-[#229ED9]/20 border border-[#229ED9]/20 rounded-2xl text-[#229ED9] font-semibold text-sm transition-colors">
                  <FaTelegram size={18} /> Telegram
                </a>
                <a href="https://wa.me/998997087604" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp orqali bog'lanish"
                  className="flex items-center gap-3 p-3.5 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/20 rounded-2xl text-[#25D366] font-semibold text-sm transition-colors">
                  <FaWhatsapp size={18} /> WhatsApp
                </a>
                <a href="tel:+998997087604" aria-label="Telefon orqali qo'ng'iroq qilish"
                  className="flex items-center gap-3 p-3.5 bg-primary/10 hover:bg-primary/15 border border-primary/15 rounded-2xl text-primary font-semibold text-sm transition-colors">
                  📞 +998 99 708-76-04
                </a>
              </div>
            </div>
            <div className="bg-accent/10 border border-accent/20 rounded-3xl p-5 text-center">
              <p className="text-amber-700 font-semibold text-sm">⚡ Yangi guruh tez orada to'ladi!</p>
              <p className="text-amber-600 text-xs mt-1">Hoziroq ariza qoldiring va o'rin band qiling.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
