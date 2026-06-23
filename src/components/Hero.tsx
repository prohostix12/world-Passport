'use client';
import { motion } from 'framer-motion';
import { ArrowRight, Play, GraduationCap, MapPin, CheckCircle, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#060C1F]">

      {/* ── Background image ── */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/assets/hero-students.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        {/* Very light dark overlay — just enough to keep text readable */}
        <div className="absolute inset-0 bg-[#060C1F]/30" />
        {/* Left text fade only — keeps right side of image clear */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#060C1F]/75 via-[#060C1F]/25 to-transparent pointer-events-none" />
        {/* Bottom fade into white section */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#060C1F] to-transparent pointer-events-none" />
      </div>

      {/* ── Content ── */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10 pt-28 pb-16">
        <div className="max-w-2xl">

          {/* Welcome pill */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 w-fit"
            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)' }}
          >
            <Sparkles size={13} className="text-blue-400" />
            <span className="text-white text-xs font-semibold tracking-widest uppercase">
              Welcome to World Passport
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="font-display font-black leading-[1.05] mb-6"
            style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)' }}
          >
            <span className="text-white">Transforming</span>{' '}
            <span className="text-white">Global</span>
            <br />
            <span className="text-white">Careers Through</span>
            <br />
            <span className="text-white">Education</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-slate-300 text-lg leading-relaxed mb-10 max-w-lg"
          >
            World Passport is a premier platform that transforms your international
            career aspirations into reality through world-class education.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            <Link
              href="/contact"
              className="rounded-full px-8 py-3.5 text-sm text-white font-semibold flex items-center gap-2 bg-blue shadow-[0_20px_40px_rgba(37,99,235,0.35)] transition-all duration-300 hover:shadow-[0_28px_60px_rgba(37,99,235,0.50)] hover:scale-105"
            >
              Start Your Journey <ArrowRight size={16} />
            </Link>
            <button className="rounded-full px-6 py-3.5 text-sm text-white font-semibold flex items-center gap-2 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <Play size={14} className="fill-white" /> Learn More
            </button>
          </motion.div>

          {/* Trust row */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5 }}
            className="flex flex-wrap items-center gap-6"
          >
            {[
              { icon: CheckCircle, text: '100+ Partner Universities', color: '#3B82F6' },
              { icon: CheckCircle, text: '10,000+ Students Placed',   color: '#DC2626' },
              { icon: CheckCircle, text: '12 European Countries',     color: '#3B82F6' },
            ].map(({ icon: Icon, text, color }) => (
              <div key={text} className="flex items-center gap-2">
                <Icon size={14} style={{ color }} />
                <span className="text-slate-300 text-xs font-medium">{text}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Floating badges — bottom-right area */}
        <div className="hidden lg:block">         

        </div>
      </div>

      {/* Bottom wave into white */}
      <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none" style={{ lineHeight: 0 }}>
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none" style={{ width: '100%', height: 60 }}>
          <path d="M0,40 C360,0 1080,80 1440,20 L1440,60 L0,60 Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
