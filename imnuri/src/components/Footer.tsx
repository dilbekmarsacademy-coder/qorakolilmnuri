import { Link } from 'react-router-dom'
import { FaTelegram, FaWhatsapp, FaInstagram, FaYoutube, FaPhoneAlt, FaMapMarkerAlt, FaClock } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import logo from '../assets/logo.png'

const navLinks = [
  { label: "Bosh sahifa", href: "/" },
  { label: "Biz haqimizda", href: "/about" },
  { label: "Kurslar", href: "/courses" },
  { label: "Natijalar", href: "/results" },
  { label: "O'qituvchilar", href: "/teachers" },
  { label: "Ariza berish", href: "/apply" },
  { label: "Aloqa", href: "/contact" },
]

const courses = [
  { label: "Ingliz tili (IELTS)", href: "/courses/english" },
  { label: "Matematika", href: "/courses/math" },
  { label: "Kimyo", href: "/courses/chemistry" },
  { label: "Biologiya", href: "/courses/biology" },
  { label: "Huquq", href: "/courses/law" },
  { label: "Tarix", href: "/courses/history" },
]

const socials = [
  { icon: FaTelegram, href: "https://t.me/Arslonov_Sobir", color: "hover:bg-[#229ED9]", label: "Telegram" },
  { icon: FaWhatsapp, href: "https://wa.me/998997087604", color: "hover:bg-[#25D366]", label: "WhatsApp" },
  { icon: FaInstagram, href: "https://instagram.com/ilmnuri.qorakol", color: "hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500", label: "Instagram" },
  { icon: FaYoutube, href: "https://youtube.com/@ilmnuri", color: "hover:bg-red-600", label: "YouTube" },
]

export default function Footer() {
  return (
    <footer style={{ background: '#0d1b35' }} className="text-white">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <img
                src={logo}
                alt="Qorako'l Ilm Nuri Ta'lim Markazi"
                className="w-12 h-12 object-contain bg-white rounded-full p-0.5"
              />
              <div>
                <p className="font-heading font-bold text-white text-lg leading-tight">Ilm Nuri</p>
                <p className="text-white/50 text-xs leading-tight">Ta'lim Markazi</p>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Qorako'ldagi eng ishonchli ta'lim markazi. 11+ yillik tajriba bilan
              sizni maqsadingizga yetkazamiz.
            </p>

            <div className="flex gap-2">
              {socials.map(({ icon: Icon, href, color, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`w-9 h-9 bg-white/10 ${color} rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110`}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-heading font-bold text-white mb-5">Navigatsiya</h3>
            <ul className="space-y-3">
              {navLinks.map(link => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-white/60 hover:text-accent text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h3 className="font-heading font-bold text-white mb-5">Kurslar</h3>
            <ul className="space-y-3">
              {courses.map(c => (
                <li key={c.href}>
                  <Link
                    to={c.href}
                    className="text-white/60 hover:text-accent text-sm transition-colors"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-bold text-white mb-5">Aloqa</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-accent mt-0.5 flex-shrink-0" size={15} />
                <span className="text-white/60 text-sm">Qorako'l shahri, Buxoro viloyati, O'zbekiston</span>
              </li>
              <li className="flex items-start gap-3">
                <FaPhoneAlt className="text-accent mt-0.5 flex-shrink-0" size={14} />
                <div className="flex flex-col gap-1">
                  <a href="tel:+998997087604" className="text-white/60 hover:text-white text-sm transition-colors">
                    +998 99 708-76-04
                  </a>
                  <a href="tel:+998942443536" className="text-white/60 hover:text-white text-sm transition-colors">
                    +998 94 244-35-36
                  </a>
                  <a href="tel:+998995701705" className="text-white/60 hover:text-white text-sm transition-colors">
                    +998 99 570-17-05
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <MdEmail className="text-accent flex-shrink-0" size={16} />
                <a href="mailto:info@ilmnuri.uz" className="text-white/60 hover:text-white text-sm transition-colors">
                  info@ilmnuri.uz
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FaClock className="text-accent mt-0.5 flex-shrink-0" size={14} />
                <div>
                  <p className="text-white/60 text-sm">Du–Shan: 08:00–20:00</p>
                  <p className="text-white/60 text-sm">Yakshanba: Dam olish</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Ilm Nuri Ta'lim Markazi. Barcha huquqlar himoyalangan.
          </p>
          <div className="flex gap-6">
            <span className="text-white/30 text-sm">Maxfiylik siyosati</span>
            <span className="text-white/30 text-sm">Foydalanish shartlari</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
