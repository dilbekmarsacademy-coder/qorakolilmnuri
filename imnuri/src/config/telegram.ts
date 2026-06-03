const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN || 'YOUR_BOT_TOKEN_HERE'
const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID || 'YOUR_CHAT_ID_HERE'

export async function sendToTelegram(text: string): Promise<boolean> {
  if (BOT_TOKEN === 'YOUR_BOT_TOKEN_HERE') {
    console.warn('Telegram bot token sozlanmagan. .env faylini tekshiring.')
    return false
  }
  try {
    const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: 'Markdown' }),
    })
    return res.ok
  } catch (err) {
    console.error('Telegram xato:', err)
    return false
  }
}

export function buildApplyMessage(data: {
  name: string
  phone: string
  course: string
  time: string
  message?: string
}): string {
  return (
    `🎓 *Yangi ariza — Ilm Nuri Ta'lim Markazi*\n\n` +
    `👤 *Ism:* ${data.name}\n` +
    `📱 *Telefon:* ${data.phone}\n` +
    `📚 *Fan:* ${data.course}\n` +
    `⏰ *Qulay vaqt:* ${data.time}` +
    (data.message ? `\n💬 *Izoh:* ${data.message}` : '') +
    `\n\n🕐 _${new Date().toLocaleString('uz-UZ')}_`
  )
}

export function buildContactMessage(data: {
  name: string
  phone: string
  subject: string
  message: string
}): string {
  return (
    `📬 *Yangi xabar — Ilm Nuri Aloqa\n\n` +
    `👤 *Ism:* ${data.name}\n` +
    `📱 *Tel:* ${data.phone}\n` +
    `📌 *Mavzu:* ${data.subject}\n` +
    `💬 *Xabar:* ${data.message}\n\n` +
    `🕐 _${new Date().toLocaleString('uz-UZ')}_`
  )
}
