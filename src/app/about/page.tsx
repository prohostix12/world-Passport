'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AOSInit from '@/components/AOSInit';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Heart, Shield, Globe, Award, Clock, CheckCircle,
  ArrowRight, BookOpen, Target,
} from 'lucide-react';

const pillars = [
  { icon: Heart, title: 'Listen First', color: '#DC2626', desc: "Every student's story is unique. We listen carefully before we advise — no cookie-cutter solutions." },
  { icon: Globe, title: 'Global Network', color: '#2563EB', desc: '100+ partner universities across 12 European countries give you unmatched program options.' },
  { icon: Shield, title: 'Zero Hidden Fees', color: '#2563EB', desc: 'Complete transparency. What we quote is exactly what you pay — no surprises, ever.' },
  { icon: Clock, title: 'Lifetime Support', color: '#DC2626', desc: 'From first inquiry to graduation and beyond — our counsellors remain your trusted guides.' },
];

const team = [
  { name: 'Dr. Amit Kumar', role: 'Founder & CEO', years: '20+ years in education', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80', color: '#2563EB', bio: 'Former Oxford visiting scholar who turned his passion for education into a movement.' },
  { name: 'Priya Nair', role: 'Head of Overseas', years: '15+ years counselling', img: 'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?w=400&q=80', color: '#DC2626', bio: 'Guided 3,000+ students through European admissions with a near-perfect visa record.' },
  { name: 'Rohit Sharma', role: 'University Relations', years: 'Ex-Oxford alumni', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80', color: '#2563EB', bio: 'Built our European university network from 10 to 100+ institutions in four years.' },
  { name: 'Deepa Menon', role: 'Student Success', years: 'Supported 5,000+ students', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80', color: '#DC2626', bio: 'Leads our post-admission support team ensuring every student thrives abroad.' },
];

const offices = [
  { city: 'Mumbai', country: 'India', flag: '🇮🇳', type: 'Headquarters' },
  { city: 'Delhi', country: 'India', flag: '🇮🇳', type: 'Regional Office' },
  { city: 'Bangalore', country: 'India', flag: '🇮🇳', type: 'Regional Office' },
  { city: 'Frankfurt', country: 'Germany', flag: '🇩🇪', type: 'Europe Office' },
];

const awards = [
  { title: 'Most Trusted Education Agency', year: '2023', body: 'Education Today Awards' },
  { title: 'Best Overseas Counselling Service', year: '2022', body: 'Times Education' },
  { title: 'ISO 9001:2015 Certified', year: '2021', body: 'International Standards' },
  { title: 'Top 10 Education Consultants', year: '2020', body: 'India Education Summit' },
];

const statItems = [
  { val: '2015', label: 'Year Founded', color: '#2563EB' },
  { val: '10,000+', label: 'Students Served', color: '#DC2626' },
  { val: '100+', label: 'Partner Universities', color: '#2563EB' },
  { val: '12', label: 'European Countries', color: '#DC2626' },
];

export default function AboutPage() {
  return (
    <main className="bg-white text-gray-900 pt-[60px]">
      <AOSInit />
      <Navbar />

      {/* Hero — overseas-style full-bleed */}
      <section className="relative min-h-[100svh] sm:min-h-[90vh] flex flex-col justify-end overflow-hidden bg-[#f0f4ff]">

        {/* Full-bleed background image */}
        <img
          src="/assets/about.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* White overlay */}
        <div className="absolute inset-0 bg-[#060C1F]/55 pointer-events-none" />
        {/* Bottom fade into white */}
        {/* <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(180deg, transparent 30%, rgba(240,244,255,0.80) 80%, #f0f4ff 100%)' }} /> */}
        {/* Left fade so text is readable */}
        {/* <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to right, rgba(240,244,255,0.70) 0%, transparent 60%)' }} /> */}

        {/* Animated SVG accent lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice">
          {[
            { d: 'M 0 300 Q 400 100 800 300', color: '#2563EB', delay: 0 },
            { d: 'M 200 600 Q 600 250 1100 400', color: '#DC2626', delay: 1.0 },
            { d: 'M 100 150 Q 500 400 900 200', color: '#3B82F6', delay: 0.5 },
          ].map((p, i) => (
            <motion.path key={i} d={p.d} fill="none" stroke={p.color} strokeWidth="1.5"
              strokeDasharray="6 8" opacity={0.18}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.18 }}
              transition={{ delay: p.delay, duration: 2.5, ease: 'easeInOut' }} />
          ))}
        </svg>

        {/* Centered content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 pb-10 sm:pb-12 pt-28 sm:pt-36">
          <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>

            {/* Overline */}
            <div className="flex items-center justify-center gap-2 mb-6 text-sm">
              <BookOpen size={13} className="text-blue-600" />
              <span className="text-white text-xs font-semibold tracking-widest uppercase">Our Story</span>
            </div>

            <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-7xl text-white mb-5 leading-tight">
              A Decade of<br />
              <span className="text-white">Changing Lives</span>
            </h1>
            <p className="text-white text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">
              Founded in 2015 with one belief: no student should have to choose between their dreams and their family. Today, 10,000+ lives later, that belief drives everything we do.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-14">
              <Link href="/contact">
                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  className="px-8 py-4 rounded-full font-semibold text-white bg-blue-600 flex items-center gap-2 mx-auto sm:mx-0 shadow-lg"
                >
                  Work With Us <ArrowRight size={16} />
                </motion.button>
              </Link>
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                className="px-8 py-4 rounded-full font-semibold text-gray-700 border-2 border-gray-300 hover:border-blue-500 hover:text-blue-600 transition-all bg-white/70">
                Our Services
              </motion.button>
            </div>

            {/* Stats bar */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-px rounded-2xl overflow-hidden mx-auto max-w-2xl"
              style={{ border: '1px solid rgba(37,99,235,0.20)', background: 'rgba(255,255,255,0.70)', backdropFilter: 'blur(16px)' }}>
              {[
                { val: '2015', label: 'Founded', color: '#2563EB' },
                { val: '10,000+', label: 'Students Served', color: '#2563EB' },
                { val: '100+', label: 'Partner Universities', color: '#DC2626' },
                { val: '12', label: 'European Countries', color: '#DC2626' },
              ].map((s, i) => (
                <div key={s.label}
                  className={`flex-1 min-w-[80px] px-2 sm:px-4 py-3 sm:py-4 text-center ${i < 3 ? 'border-r border-gray-200' : ''}`}>
                  <div className="font-bold text-base sm:text-lg" style={{ color: s.color }}>{s.val}</div>
                  <div className="text-gray-500 text-[10px] sm:text-xs mt-0.5">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {statItems.map((s, i) => (
              <div key={s.label} data-aos="fade-up" data-aos-delay={i * 80}
                className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md p-6 text-center cursor-default transition-all hover:-translate-y-1">
                <div className="font-display font-bold text-3xl mb-1" style={{ color: s.color }}>{s.val}</div>
                <div className="text-gray-500 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div data-aos="fade-right">
              <span className="badge badge-blue mb-4">Our Mission</span>
              <h2 className="font-display font-bold text-4xl md:text-5xl text-gray-900 mb-5">
                Why We <span className="text-gradient">Exist</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-5">
                When we started in 2015, thousands of brilliant Indian students were giving up on international education — not because they weren&apos;t qualified, but because the process felt too opaque, too expensive, and too risky.
              </p>
              <p className="text-gray-500 text-base leading-relaxed mb-6">
                We built GEC to change that. By partnering directly with 100+ European universities, we removed the middlemen, eliminated hidden fees, and created a transparent pathway that any Indian family can trust.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Direct university partnerships — no agency markups',
                  'Transparent fee structure from day one',
                  'Counsellors who have studied abroad themselves',
                  'Dedicated support from inquiry to graduation',
                ].map(pt => (
                  <li key={pt} className="flex items-start gap-2.5 text-gray-600 text-sm">
                    <CheckCircle size={15} className="text-blue-600 mt-0.5 flex-shrink-0" /> {pt}
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-4 rounded-2xl p-4 bg-blue-50 border border-blue-100">
                <Award size={28} className="text-blue-600 flex-shrink-0" />
                <p className="text-gray-700 text-sm">
                  Recognised as <strong className="text-blue-700">India&apos;s Most Trusted Education Counselling Agency</strong>, 2023
                </p>
              </div>
            </div>

            <div className="space-y-4" data-aos="fade-left">
              {awards.map((a, i) => (
                <div key={a.title} data-aos="fade-left" data-aos-delay={i * 80}
                  className="flex items-center gap-4 rounded-2xl p-5 bg-white border border-gray-100 shadow-sm hover:shadow-md hover:translate-x-1 transition-all cursor-default">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-blue-50 border border-blue-100">
                    <Award size={20} className="text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="text-gray-900 font-semibold text-sm">{a.title}</div>
                    <div className="text-gray-400 text-xs mt-0.5">{a.body}</div>
                  </div>
                  <span className="text-blue-600 text-sm font-bold">{a.year}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14" data-aos="fade-up">
            <span className="badge badge-blue mb-4">Leadership</span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-gray-900 mb-3">
              Meet the Team
            </h2>
            <p className="text-gray-500 max-w-md mx-auto mb-14">Experienced counsellors who've lived the international education journey</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {team.map((member, i) => (
              <div key={member.name} data-aos="fade-up" data-aos-delay={i * 80}
                className="relative bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden cursor-default hover:shadow-md hover:-translate-y-2 transition-all">
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 transition-transform duration-700 hover:scale-105"
                    style={{ backgroundImage: `url('${member.img}')`, backgroundSize: 'cover', backgroundPosition: 'center top' }} />
                </div>
                <div className="p-6 relative z-10 bg-white">
                  <h3 className="font-display font-bold text-gray-900 mb-0.5">{member.name}</h3>
                  <div className="text-sm font-semibold mb-2" style={{ color: member.color }}>{member.role}</div>
                  <div className="text-gray-400 text-xs mb-3">{member.years}</div>
                  <p className="text-gray-500 text-xs leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offices */}
      <section className="py-24 bg-[#F8FAFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14" data-aos="fade-up">
            <span className="badge badge-blue mb-4">Presence</span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-gray-900 mb-3">
              Where We <span className="text-gradient">Operate</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {offices.map((o, i) => (
              <div key={o.city} data-aos="zoom-in" data-aos-delay={i * 80}
                className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 text-center cursor-default hover:shadow-md hover:-translate-y-1 transition-all">
                <div className="text-4xl mb-3">{o.flag}</div>
                <div className="font-display font-bold text-gray-900 mb-1">{o.city}</div>
                <div className="text-gray-400 text-xs mb-2">{o.country}</div>
                <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-blue-50 text-blue-600 border border-blue-200">
                  {o.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — white card with gradient border, matching Footer CTA style */}
      <section className="py-20 bg-[#F8FAFF]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            data-aos="fade-up"
            className="relative rounded-3xl p-10 md:p-14 text-center overflow-hidden bg-white"
            style={{
              border: '2px solid transparent',
              backgroundImage: 'linear-gradient(white, white), linear-gradient(135deg, #2563EB, #DC2626)',
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box',
            }}
          >
            {/* Subtle corner glows */}
            <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full opacity-[0.07] pointer-events-none"
              style={{ background: 'radial-gradient(circle, #2563EB, transparent)' }} />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full opacity-[0.07] pointer-events-none"
              style={{ background: 'radial-gradient(circle, #DC2626, transparent)' }} />

            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                style={{ background: 'linear-gradient(135deg, #EFF6FF, #FEF2F2)', border: '1px solid #BFDBFE' }}>
                <Target size={28} className="text-blue-600" />
              </div>
              <h2 className="font-display font-bold text-3xl md:text-5xl text-gray-900 mb-4">
                Ready to Begin Your <span className="text-gradient">Journey?</span>
              </h2>
              <p className="text-gray-500 text-lg mb-10 max-w-xl mx-auto">
                Join 10,000+ students who trusted GEC to guide them to world-class universities. Your story starts here.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/contact">
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    className="px-9 py-4 rounded-full font-semibold text-white shadow-md transition-all"
                    style={{ background: 'linear-gradient(135deg, #2563EB, #1D4ED8)' }}>
                    Book Free Consultation
                  </motion.button>
                </Link>
                <Link href="/overseas">
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    className="px-9 py-4 rounded-full font-semibold text-gray-700 bg-white border-2 border-gray-200 hover:border-red-400 hover:text-red-600 transition-all">
                    Explore Programs
                  </motion.button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
