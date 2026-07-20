import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { FaBars, FaTimes, FaPhoneAlt } from 'react-icons/fa'
import logo from '../assets/logo.png'

const navLinks = [
  { label: "Bosh sahifa", href: "/" },
  { label: "Biz haqimizda", href: "/about" },
  { label: "Kurslar", href: "/courses" },
  { label: "Natijalar", href: "/results" },
  { label: "O'qituvchilar", href: "/teachers" },
  { label: "Aloqa", href: "/contact" },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isDark = isHome && !scrolled

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !isHome
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <img
            src={logo}
            alt="Qorako'l Ilm Nuri Ta'lim Markazi"
            className={`w-11 h-11 object-contain ${isDark ? 'drop-shadow-md' : ''}`}
          />
          <div>
            <p className={`font-heading font-bold text-lg leading-tight ${isDark ? 'text-white' : 'text-primary'}`}>
              Ilm Nuri
            </p>
            <p className={`text-xs leading-tight ${isDark ? 'text-white/70' : 'text-secondary'}`}>
              Ta'lim Markazi
            </p>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const active = location.pathname === link.href
            return (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  active
                    ? 'bg-primary/10 text-primary'
                    : isDark
                    ? 'text-white/90 hover:text-white hover:bg-white/10'
                    : 'text-maintext hover:text-primary hover:bg-blue-50'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="tel:+998997087604"
            className={`flex items-center gap-2 text-sm font-medium ${isDark ? 'text-white' : 'text-maintext'}`}
          >
            <FaPhoneAlt className="text-accent" size={13} />
            <span>+998 99 708-76-04</span>
          </a>
          <Link
            to="/apply"
            className="bg-accent hover:bg-yellow-500 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-all duration-200 hover:shadow-lg hover:shadow-yellow-500/30 hover:scale-105"
          >
            Ariza berish
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`md:hidden p-2 rounded-lg transition-colors ${
            isDark ? 'text-white hover:bg-white/10' : 'text-primary hover:bg-blue-50'
          }`}
        >
          {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-gray-100 shadow-lg overflow-hidden"
          >
            <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                    location.pathname === link.href
                      ? 'bg-primary/10 text-primary'
                      : 'text-maintext hover:bg-blue-50 hover:text-primary'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-gray-100 flex flex-col gap-3">
                <a href="tel:+998997087604" className="flex items-center gap-2 text-primary font-medium px-4">
                  <FaPhoneAlt className="text-accent" size={13} />
                  +998 99 708-76-04
                </a>
                <Link
                  to="/apply"
                  onClick={() => setIsOpen(false)}
                  className="bg-accent text-white font-semibold px-5 py-3 rounded-xl text-sm text-center mx-4"
                >
                  Ariza berish
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
