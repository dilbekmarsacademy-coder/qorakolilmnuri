import { useEffect, useState } from 'react'
import type { ElementType, ChangeEvent } from 'react'
import { supabase } from '../../lib/supabase'
import { FaSave, FaPhone, FaMapMarkerAlt, FaEnvelope, FaClock, FaTelegram, FaWhatsapp, FaInstagram, FaYoutube } from 'react-icons/fa'

type FieldProps = {
  label: string
  icon: ElementType
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  type?: string
}

// Komponent tashqarisida — focus bug yo'q
function Field({ label, icon: Icon, value, onChange, placeholder = '', type = 'text' }: FieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <div className="relative">
        <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary bg-white"
        />
      </div>
    </div>
  )
}

type Settings = {
  phone: string
  phone2: string
  email: string
  address: string
  working_hours: string
  telegram: string
  whatsapp: string
  instagram: string
  youtube: string
  map_embed: string
}

const defaults: Settings = {
  phone: '+998 99 708-76-04',
  phone2: '+998 94 244-35-36, +998 99 570-17-05',
  email: 'info@ilmnuri.uz',
  address: "Qorako'l shahri, Buxoro viloyati, O'zbekiston",
  working_hours: 'Dushanba–Shanba: 08:00–20:00',
  telegram: 'https://t.me/Dil_khan',
  whatsapp: 'https://wa.me/998997087604',
  instagram: 'https://instagram.com/ilmnuri.qorakol',
  youtube: 'https://youtube.com/@ilmnuri',
  map_embed: '',
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>(defaults)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('site_settings').select('key,value')
      if (data?.length) {
        const obj: Partial<Settings> = {}
        data.forEach(({ key, value }: { key: string; value: string }) => {
          obj[key as keyof Settings] = value
        })
        setSettings(prev => ({ ...prev, ...obj }))
      }
      setLoading(false)
    }
    load()
  }, [])

  const save = async () => {
    setSaving(true)
    const rows = Object.entries(settings).map(([key, value]) => ({ key, value }))
    await supabase.from('site_settings').upsert(rows, { onConflict: 'key' })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }


  if (loading) return <div className="text-center py-10 text-gray-400">Yuklanmoqda...</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-heading font-bold text-gray-800">Sozlamalar</h2>
          <p className="text-gray-500 text-sm mt-1">Sayt kontakt ma'lumotlari va ijtimoiy tarmoqlar</p>
        </div>
        <button onClick={save} disabled={saving}
          className="flex items-center gap-2 bg-primary hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-all hover:shadow-lg disabled:opacity-50">
          {saving ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <FaSave size={13} />}
          {saved ? '✓ Saqlandi!' : 'Saqlash'}
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Kontakt */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
          <h3 className="font-bold text-gray-700 mb-4 pb-2 border-b border-gray-100">📞 Kontakt</h3>
          <Field
                label="Asosiy telefon"
                icon={FaPhone}
                value={settings.phone}
                onChange={e => setSettings(p => ({ ...p, phone: e.target.value }))}
                placeholder="+998 99 708-76-04"
              />
          <Field
                label="Qo'shimcha telefon (ixtiyoriy)"
                icon={FaPhone}
                value={settings.phone2}
                onChange={e => setSettings(p => ({ ...p, phone2: e.target.value }))}
                placeholder="+998 90 000-00-00"
              />
          <Field
                label="Email"
                icon={FaEnvelope}
                value={settings.email}
                onChange={e => setSettings(p => ({ ...p, email: e.target.value }))}
                placeholder="info@ilmnuri.uz"
                type="email"
              />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Manzil</label>
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-3.5 top-3.5 text-gray-400" size={14} />
              <textarea value={settings.address} onChange={e => setSettings(p => ({ ...p, address: e.target.value }))} rows={2}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary resize-none" />
            </div>
          </div>
          <Field
                label="Ish vaqti"
                icon={FaClock}
                value={settings.working_hours}
                onChange={e => setSettings(p => ({ ...p, working_hours: e.target.value }))}
                placeholder="Dushanba–Shanba: 08:00–20:00"
              />
        </div>

        {/* Ijtimoiy tarmoqlar */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
          <h3 className="font-bold text-gray-700 mb-4 pb-2 border-b border-gray-100">🌐 Ijtimoiy tarmoqlar</h3>
          <Field label="Telegram" icon={FaTelegram} value={settings.telegram} onChange={e => setSettings(p => ({ ...p, telegram: e.target.value }))} placeholder="https://t.me/..." />
          <Field label="WhatsApp" icon={FaWhatsapp} value={settings.whatsapp} onChange={e => setSettings(p => ({ ...p, whatsapp: e.target.value }))} placeholder="https://wa.me/998..." />
          <Field label="Instagram" icon={FaInstagram} value={settings.instagram} onChange={e => setSettings(p => ({ ...p, instagram: e.target.value }))} placeholder="https://instagram.com/..." />
          <Field label="YouTube" icon={FaYoutube} value={settings.youtube} onChange={e => setSettings(p => ({ ...p, youtube: e.target.value }))} placeholder="https://youtube.com/@..." />
        </div>

        {/* Google Maps */}
        <div className="md:col-span-2 bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-700 mb-4 pb-2 border-b border-gray-100">📍 Google Maps embed URL</h3>
          <p className="text-gray-500 text-xs mb-3">
            Google Maps da markazni toping → Share → Embed a map → Copy HTML dan faqat src="..." qismini oling
          </p>
          <textarea value={settings.map_embed} onChange={e => setSettings(p => ({ ...p, map_embed: e.target.value }))} rows={3}
            placeholder="https://www.google.com/maps/embed?pb=..."
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary resize-none font-mono" />
        </div>
      </div>
    </div>
  )
}
