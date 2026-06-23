'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import AdminLoginModal from './AdminLoginModal';

const links = [
  { href: '/', label: 'Home' },
  { href: '/skill', label: 'Skill' },
  { href: '/overseas', label: 'Overseas' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const pathname = usePathname();

  // Pages with light hero backgrounds need dark navbar text
  const isLightHero = pathname === '/about';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Determine text/style based on scroll + page type
  const isDark = scrolled || isLightHero;

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-3'
            : isLightHero
              ? 'bg-white/80 backdrop-blur-2xl border-b border-slate-200/50 shadow-sm py-4'
              : 'bg-transparent py-5'
        }`}
      >
        <div className={`max-w-7xl mx-auto flex items-center justify-between transition-all duration-500 ${
          scrolled 
            ? 'bg-white/80 backdrop-blur-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/60 rounded-full px-6 py-2 mx-4 lg:mx-auto' 
            : 'px-4 sm:px-6 lg:px-10 gap-4'
        }`}>

          {/* Logo */}
          <Link href="/" className="flex items-center group flex-shrink-0">
            <Logo size={36} animate={false} />
          </Link>

          {/* Center nav */}
          <nav className="hidden md:flex items-center">
            <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border transition-all duration-500 ${
              isDark
                ? 'bg-slate-50/80 border-slate-200/50 shadow-inner'
                : 'bg-white/10 backdrop-blur-md border-white/20'
            }`}>
              {links.map((link) => (
                <Link key={link.href} href={link.href}
                  className={`relative px-5 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
                    isDark ? 'text-slate-600 hover:text-violet-700' : 'text-white/90 hover:text-white'
                  }`}>
                  {pathname === link.href && (
                    <motion.div layoutId="nav-pill"
                      className={`absolute inset-0 rounded-full shadow-sm ${
                        isDark
                          ? 'bg-white border border-slate-200/60'
                          : 'bg-white/25 border border-white/30'
                      }`}
                      transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }} />
                  )}
                  <span className={`relative z-10 ${pathname === link.href && isDark ? 'text-violet-700' : ''}`}>
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>
          </nav>

          {/* Right CTAs */}
          <div className="hidden md:flex items-center gap-5 flex-shrink-0">
            <button
              onClick={() => setLoginOpen(true)}
              className={`text-sm font-bold transition-all hover:-translate-y-0.5 ${
                isDark ? 'text-slate-600 hover:text-violet-700' : 'text-white/90 hover:text-white'
              }`}
            >
              Login
            </button>
            <Link href="/partner" className={`premium-btn !px-7 !py-2.5 !text-sm !rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 ${scrolled ? '!bg-violet-600 !text-white !border-none' : ''}`}>
              Partner With Us
            </Link>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden w-11 h-11 rounded-full border flex items-center justify-center transition-all ${
              isDark
                ? 'bg-white shadow-sm border-slate-200 text-slate-700'
                : 'bg-white/10 backdrop-blur-md border-white/20 text-white'
            }`}>
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-24 z-40 bg-white/95 backdrop-blur-2xl border border-white/40 rounded-[2rem] p-6 flex flex-col gap-2 shadow-[0_20px_40px_rgb(0,0,0,0.1)]"
          >
            {links.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
                className={`px-5 py-3.5 rounded-2xl text-base font-bold transition-all ${
                  pathname === link.href
                    ? 'text-violet-700 bg-violet-50/80 shadow-inner'
                    : 'text-slate-600 hover:text-violet-700 hover:bg-slate-50'
                }`}>{link.label}</Link>
            ))}
            <div className="pt-5 mt-3 border-t border-slate-100 flex flex-col gap-3">
              <button
                onClick={() => { setMobileOpen(false); setLoginOpen(true); }}
                className="w-full py-4 rounded-2xl bg-slate-50 text-slate-700 hover:text-violet-700 hover:bg-slate-100 transition-all text-sm font-bold border border-slate-200/50"
              >
                Admin Login
              </button>
              <Link href="/partner" onClick={() => setMobileOpen(false)} className="premium-btn w-full text-center py-4 !rounded-2xl shadow-lg">
                Partner With Us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AdminLoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
