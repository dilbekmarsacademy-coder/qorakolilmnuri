import { supabase } from './supabase'

type ApplicationData = {
  name: string
  phone: string
  course: string
  preferred_time: string
  message?: string
}

async function sendTelegram(text: string) {
  try {
    await fetch('/api/telegram', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    })
  } catch {
    // Telegram xato bo'lsa ham ariza saqlansin
  }
}

export async function submitApplication(data: ApplicationData): Promise<{ error: string | null }> {
  // 1. Supabase ga saqlash
  const { error } = await supabase.from('applications').insert([{
    name: data.name.trim(),
    phone: data.phone.trim(),
    course: data.course,
    preferred_time: data.preferred_time,
    message: data.message?.trim() || null,
    status: 'new',
  }])

  if (error) return { error: error.message }

  // 2. Serverless function orqali Telegramga yuborish
  const msg =
    `🎓 *Yangi ariza — Ilm Nuri*\n\n` +
    `👤 *Ism:* ${data.name}\n` +
    `📱 *Telefon:* ${data.phone}\n` +
    `📚 *Fan:* ${data.course}\n` +
    `⏰ *Vaqt:* ${data.preferred_time}` +
    (data.message ? `\n💬 *Izoh:* ${data.message}` : '') +
    `\n\n🕐 _${new Date().toLocaleString('uz-UZ')}_`

  await sendTelegram(msg)

  return { error: null }
}
