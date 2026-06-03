type AvatarProps = {
  name: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  gradient?: string
  emoji?: string
  imageUrl?: string
}

const gradients = [
  'linear-gradient(135deg, #1B4F8A 0%, #2563EB 100%)',
  'linear-gradient(135deg, #0d9488 0%, #0891b2 100%)',
  'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
  'linear-gradient(135deg, #dc2626 0%, #ea580c 100%)',
  'linear-gradient(135deg, #059669 0%, #065f46 100%)',
  'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
  'linear-gradient(135deg, #db2777 0%, #9d174d 100%)',
  'linear-gradient(135deg, #2563EB 0%, #1B4F8A 100%)',
]

const sizes = {
  sm: 'w-10 h-10 text-sm',
  md: 'w-14 h-14 text-base',
  lg: 'w-20 h-20 text-xl',
  xl: 'w-28 h-28 text-3xl',
}

function getInitials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map(n => n[0])
    .join('')
    .toUpperCase()
}

function getGradient(name: string) {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  return gradients[Math.abs(hash) % gradients.length]
}

export default function Avatar({ name, size = 'md', gradient, emoji, imageUrl }: AvatarProps) {
  const bg = gradient ?? getGradient(name)
  const cls = sizes[size]

  if (imageUrl) {
    return (
      <div className={`${cls} rounded-full overflow-hidden flex-shrink-0 ring-4 ring-white shadow-lg`}>
        <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
      </div>
    )
  }

  return (
    <div
      className={`${cls} rounded-full flex items-center justify-center flex-shrink-0 ring-4 ring-white shadow-lg font-heading font-bold text-white`}
      style={{ background: bg }}
    >
      {emoji ?? getInitials(name)}
    </div>
  )
}
