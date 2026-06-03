import { useRef } from 'react'

type Props = {
  value: string
  onChange: (value: string) => void
  id?: string
  className?: string
}

// +998 XX-XXX-XX-XX formatiga keltiradi
function formatPhone(raw: string): string {
  // faqat raqamlarni qoldirish (998 dan keyin)
  const digits = raw.replace(/\D/g, '').replace(/^998/, '')
  const d = digits.slice(0, 9)

  if (d.length === 0) return '+998 '
  if (d.length <= 2) return `+998 ${d}`
  if (d.length <= 5) return `+998 ${d.slice(0, 2)}-${d.slice(2)}`
  if (d.length <= 7) return `+998 ${d.slice(0, 2)}-${d.slice(2, 5)}-${d.slice(5)}`
  return `+998 ${d.slice(0, 2)}-${d.slice(2, 5)}-${d.slice(5, 7)}-${d.slice(7, 9)}`
}

export function getRawPhone(formatted: string): string {
  return '+998' + formatted.replace(/\D/g, '').replace(/^998/, '')
}

export default function PhoneInput({ value, onChange, id, className }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value
    // +998 prefixini o'chirishga yo'l qo'ymaslik
    if (!raw.startsWith('+998')) {
      onChange('+998 ')
      return
    }
    onChange(formatPhone(raw))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = inputRef.current
    if (!input) return
    // +998 ni o'chirishga yo'l qo'ymaslik
    if (e.key === 'Backspace' && input.selectionStart !== null && input.selectionStart <= 5) {
      e.preventDefault()
    }
  }

  const handleFocus = () => {
    if (!value || value === '') {
      onChange('+998 ')
    }
    // Cursoni +998 dan keyin qo'yish
    setTimeout(() => {
      const input = inputRef.current
      if (input && input.value === '+998 ') {
        input.setSelectionRange(5, 5)
      }
    }, 0)
  }

  const displayValue = value || '+998 '

  return (
    <input
      ref={inputRef}
      id={id}
      type="tel"
      value={displayValue}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      placeholder="+998 90-000-00-00"
      maxLength={17}
      className={className}
      inputMode="numeric"
    />
  )
}
