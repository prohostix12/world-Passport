'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Globe, Share2, ExternalLink, Link2 } from 'lucide-react';
import Logo from './Logo';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/skill', label: 'Skill Development' },
  { href: '/overseas', label: 'Overseas Education' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
];
const socials = [
  { icon: Link2, href: '#', label: 'LinkedIn' },
  { icon: Share2, href: '#', label: 'Twitter' },
  { icon: ExternalLink, href: '#', label: 'Instagram' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">

        {/* CTA banner — white card with blue/red border */}
        <div
          data-aos="fade-up"
          className="relative rounded-3xl p-8 md:p-12 text-center mb-16 overflow-hidden bg-white"
          style={{
            border: '2px solid transparent',
            backgroundImage: 'linear-gradient(white, white), linear-gradient(135deg, #2563EB, #DC2626)',
            backgroundOrigin: 'border-box',
            backgroundClip: 'padding-box, border-box',
          }}
        >
          {/* Subtle corner accent blobs */}
          <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full opacity-[0.06] pointer-events-none"
            style={{ background: 'radial-gradient(circle, #2563EB, transparent)' }} />
          <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full opacity-[0.06] pointer-events-none"
            style={{ background: 'radial-gradient(circle, #DC2626, transparent)' }} />

          <div className="relative z-10">
            <div className="flex justify-center mb-6">
              <Logo size={80} animate={false} />
            </div>

            <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-gray-900 mb-4">
              Ready to <span className="text-gradient">Take Aim</span> at Your Future?
            </h2>
            <p className="text-gray-500 text-base sm:text-lg mb-8 max-w-xl mx-auto">
              Join 10,000+ students who trusted World Passport to guide them to world-class universities
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  className="px-8 py-3.5 rounded-full font-semibold text-white transition-all shadow-md"
                  style={{ background: 'linear-gradient(135deg, #2563EB, #1D4ED8)' }}>
                  Talk to Us Today
                </motion.button>
              </Link>
              <Link href="/overseas">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  className="px-8 py-3.5 rounded-full font-semibold text-gray-700 bg-white border-2 border-gray-200 hover:border-red-400 hover:text-red-600 transition-all">
                  Browse Programs
                </motion.button>
              </Link>
            </div>
          </div>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Logo size={52} animate={false} />
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs mb-5">
              Bridging Indian students with world-class European universities. Transparent. Trusted. Genuine.
            </p>
            <div className="flex gap-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a key={label} href={href} whileHover={{ scale: 1.1 }} aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-blue-600 hover:border-blue-300 transition-all">
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-gray-800 text-sm mb-4">Navigation</h4>
            <ul className="space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-gray-500 text-sm hover:text-blue-600 transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-gray-800 text-sm mb-4">Contact</h4>
            <ul className="space-y-3">
              {[
                { icon: Mail, text: 'bm@worldpassport.in' },
                { icon: Phone, text: '+91 9205031277' },
                { icon: MapPin, text: 'Ernakulam  Near st.Georges Syro-Malabar Church,Edapally' },
                // { icon: Globe,  text: 'gecouncil.com' },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3 text-sm text-gray-500">
                  <Icon size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} World Passport. All rights reserved.</p>
          <div className="flex gap-5">
            {['Privacy Policy', 'Terms of Service'].map((t) => (
              <Link key={t} href="#" className="text-gray-400 text-sm hover:text-blue-600 transition-colors">{t}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

