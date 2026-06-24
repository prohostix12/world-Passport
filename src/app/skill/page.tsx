'use client';
import { useState, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AOSInit from '@/components/AOSInit';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  CheckCircle, ArrowRight, Globe, Star,
  Briefcase, Award, BookOpen, Building2,
  GraduationCap, Monitor, BarChart3, ShoppingCart,
  Megaphone, Glasses, Home, Stethoscope,
  Brain, Cpu, ChevronDown, Wrench, Handshake,
  BadgeCheck, Phone, MapPin, ExternalLink,
} from 'lucide-react';

/* ── University & Program Data ── */
const universities = [
  {
    id: 'cit',
    name: 'Canadian Institute of Technology (CIT)',
    shortName: 'CIT',
    subtitle: 'C-DATA Tirana, Albania',
    color: '#3B82F6',
    img: 'https://images.unsplash.com/photo-1562774053-701939374585?w=600&q=80',
    description: 'The Canadian Institute of Technology (CIT), based in Tirana, Albania, is a recognized higher education institution committed to internationally aligned academic excellence, innovation, and applied learning.',
    leadership: [
      { name: 'Prof. Dr. Ramiz Zekaj', role: 'President' },
      { name: 'Prof. Dr. Ismail Kocayusufoglu', role: 'Rector' },
    ],
    programs: [
      {
        icon: Cpu,
        title: 'AI Video Creation – Smart & Sustainable',
        color: '#A855F7',
        highlights: [
          'Create professional videos using AI tools',
          'Smart scriptwriting & automated production',
          'AI-powered media analytics',
          'Content monetization strategies',
          'Freelancing opportunities in AI media',
        ],
        tools: 'Runway ML, ChatGPT, ElevenLabs',
      },
      {
        icon: Brain,
        title: 'Applied Data Science & Machine Learning for Business',
        color: '#3B82F6',
        highlights: [
          'Understand real-world data analysis',
          'Build machine learning models for business',
          'Predict trends using AI insights',
          'Ethical and responsible AI practices',
          'Data-driven decision making',
        ],
        tools: null,
      },
      {
        icon: ShoppingCart,
        title: 'Introduction to Logistics & Supply Chain Management',
        color: '#00C9B0',
        highlights: [
          'Understand modern supply chain systems',
          'Inventory and distribution management',
          'Cost optimization strategies',
          'KPI monitoring and performance analysis',
          'Risk management in logistics operations',
        ],
        tools: 'Excel, ERP Systems',
      },
      {
        icon: BarChart3,
        title: 'Business Intelligence & Data Analytics',
        color: '#FFB800',
        highlights: [
          'Transform data into business insights',
          'Design interactive dashboards and reports',
          'KPI tracking for business performance',
          'Data visualization for decision making',
          'Strategic analytics for organizations',
        ],
        tools: 'Power BI, Tableau, SQL',
      },
      {
        icon: Megaphone,
        title: 'Digital Marketing with AI',
        color: '#FF3B3B',
        highlights: [
          'AI-powered content creation strategies',
          'Smart campaign optimization techniques',
          'Customer behavior and audience analytics',
          'Marketing automation using AI tools',
          'Improve campaign ROI and performance',
        ],
        tools: 'ChatGPT, Canva AI, Google Analytics',
      },
      {
        icon: Glasses,
        title: 'Virtual Reality (VR) for Business Applications',
        color: '#FF6B00',
        highlights: [
          'Introduction to immersive VR technologies',
          'Business training and simulation solutions',
          'VR integration for modern enterprises',
          'Safety and operational applications',
          'Future trends in immersive technologies',
        ],
        tools: 'Unity, VR Headsets',
      },
    ],
  },
  {
    id: 'mua',
    name: 'Mediterranean University Albania',
    shortName: 'Mesdhetar',
    subtitle: 'Tirana, Albania',
    color: '#FF3B3B',
    img: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80',
    description: 'The Mediterranean University of Albania, based in Tirana, is a recognized private higher education institution dedicated to academic excellence, research development, and international cooperation.',
    leadership: [
      { name: 'Prof. Dr. Anastas Angjeli', role: 'Honorary President' },
      { name: 'Prof. Dr. Adrian Civici', role: 'Rector' },
    ],
    programs: [
      {
        icon: Home,
        title: 'Real Estate Broker Certification',
        color: '#3B82F6',
        highlights: [
          'Civil & Commercial Law',
          'Property Valuation',
          'Contract Drafting',
          'Tax Legislation',
          'Professional Ethics',
          'Practical Agency Training',
        ],
        tools: null,
      },
      {
        icon: Brain,
        title: 'Professional Training – Data Science & AI',
        color: '#A855F7',
        highlights: [
          'Data Structures & SQL',
          'Python for Data Science',
          'Probability & Statistics',
          'Machine Learning',
          'Deep Learning',
          'AI Tools Integration',
        ],
        tools: null,
      },
      {
        icon: Megaphone,
        title: 'Professional Training – Digital Marketing',
        color: '#FF3B3B',
        highlights: [
          'Digital Strategy & Market Research',
          'SEO & Website Development',
          'Social Media & Google Ads',
          'Data Analytics',
          'AI-Based Content Optimization',
          'Practical Campaign Development',
        ],
        tools: null,
      },
      {
        icon: Stethoscope,
        title: 'Health Administrator',
        color: '#00C9B0',
        highlights: [
          'Healthcare Systems & Policy',
          'Health Law & Ethics',
          'Hospital Operations & Finance',
          'Quality & Patient Safety',
          'Digital Health Systems',
          'Practical Training',
        ],
        tools: null,
      },
    ],
  },
];

const certificationModel = [
  { label: 'University Certification', value: 'Issued by Partner Institution', color: '#3B82F6' },
  { label: 'Program Delivery', value: 'Facilitated by SkillDad', color: '#A855F7' },
  { label: 'Internship & Career Support', value: 'Provided by SkillDad', color: '#00C9B0' },
];

const tools = [
  'YouTube', 'Meta', 'Instagram', 'Facebook', 'MOZ',
  'WordPress', 'LinkedIn', 'Claude', 'Google Ads', 'Semrush',
  'Google Tag Manager', 'Shopify', 'Google', 'Search Console', 'Google Analytics',
];

const partnerCompanies = [
  'Deloitte', 'Lufthansa', 'Vodafone', 'UBA', 'DATAMAX',
  'BTT BHT', 'DPSHTRR', 'EasyPay', 'BALFIN', 'Raiffeisen Bank',
  'McGraw Hill', 'CREDINS Bank', 'Digital Academy', 'Lindner',
  'AKU', 'OficinaHub', 'DAD Media', 'ProHotfix',
];

const certifications = [
  'Google Ads', 'Microsoft', 'Meta', 'LinkedIn',
  'Semrush', 'Pact for Skills', 'CIT', 'SkillDad',
  'PypeCRM', 'EIT',
];

export default function SkillPage() {
  const [activeUni, setActiveUni] = useState('cit');
  const [expandedProgram, setExpandedProgram] = useState<string | null>(null);
  const whyRef = useRef<HTMLDivElement>(null);
  const whyInView = useInView(whyRef, { once: true, margin: '-60px' });

  const uni = universities.find(u => u.id === activeUni)!;

  return (
    <main className="bg-white text-gray-900 min-h-screen">

      <AOSInit />
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative min-h-[100svh] sm:min-h-[88vh] flex flex-col justify-end overflow-hidden bg-[#060C1F]">

        {/* Background image — flight.png */}
        <img
          src="/assets/flight.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Light dark shadow overlay */}
        <div className="absolute inset-0 bg-[#060C1F]/55 pointer-events-none" />
        {/* Bottom fade into white page */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(180deg, transparent 25%, rgba(6,12,31,0.70) 80%, #060C1F 100%)' }} />
        {/* Subtle blue glow left */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
        {/* Subtle red glow right */}
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-red-500/10 blur-3xl pointer-events-none" />

        {/* Animated SVG accent lines — same as home/overseas */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice">
          {[
            { d: 'M 0 400 Q 400 150 900 350', color: '#2563EB', delay: 0 },
            { d: 'M 300 600 Q 700 200 1200 400', color: '#DC2626', delay: 1.2 },
            { d: 'M 100 200 Q 600 450 1100 180', color: '#3B82F6', delay: 0.6 },
          ].map((p, i) => (
            <motion.path key={i} d={p.d} fill="none" stroke={p.color} strokeWidth="1.5"
              strokeDasharray="6 8" opacity={0.18}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.18 }}
              transition={{ delay: p.delay, duration: 2.5, ease: 'easeInOut' }} />
          ))}
        </svg>

        {/* Content — centered, same as home style */}
        <div className="relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6 pb-14 pt-36">
          <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>

            {/* Welcome pill */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)' }}>
              <GraduationCap size={13} className="text-blue-400" />
              <span className="text-white text-xs font-semibold tracking-widest uppercase">SkillDad Programs</span>
            </div>

            <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.06] text-white mb-5">
              Preparing the Next Generation of{' '}
              <span className="text-white">Global Professionals</span>
            </h1>
            <p className="text-white/60 text-base sm:text-xl max-w-2xl mx-auto mb-10 sm:mb-12">
              University-affiliated professional certification programs in collaboration with
              recognized international higher education institutions.
            </p>

            {/* Stats bar — home page style */}
            <div className="flex flex-wrap items-center justify-center gap-px rounded-2xl overflow-hidden mx-auto w-fit"
              style={{ border: '1px solid rgba(255,255,255,0.10)', background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(16px)' }}>
              {[
                { val: '2',      label: 'Partner Universities', color: '#3B82F6' },
                { val: '10',     label: 'Programs',             color: '#2563EB' },
                { val: 'Online', label: 'Delivery',             color: '#DC2626' },
                { val: '100%',   label: 'Career Support',       color: '#3B82F6' },
              ].map((s, i) => (
                <div key={s.label} className={`px-4 sm:px-8 py-3 sm:py-4 text-center ${i < 3 ? 'border-r border-white/10' : ''}`}>
                  <div className="font-bold text-base sm:text-lg" style={{ color: s.color }}>{s.val}</div>
                  <div className="text-white/40 text-[10px] sm:text-xs mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CERTIFICATION MODEL ── */}
      <section className="py-16 bg-[#F8FAFF]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-center mb-10">
            <span className="badge badge-blue mb-3">Certification</span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-gray-900">
              How It <span className="text-gradient">Works</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {certificationModel.map((item, i) => (
              <motion.div key={item.label}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="rounded-2xl p-6 text-center"
                style={{ background: '#ffffff', border: '1px solid rgb(229,231,235)', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: `${item.color}10`, border: `1px solid ${item.color}20` }}>
                  <ArrowRight size={18} style={{ color: item.color }} />
                </div>
                <div className="text-gray-400 text-xs uppercase tracking-wider mb-2">{item.label}</div>
                <div className="text-gray-900 font-semibold text-sm">{item.value}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── UNIVERSITY TABS + PROGRAMS ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="text-center mb-12">
            <span className="badge badge-blue mb-3">Partner Universities</span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-gray-900">
              Choose Your <span className="text-gradient">University</span>
            </h2>
            <p className="text-slate-500 mt-3 max-w-lg mx-auto">
              Programs structured under institutional academic frameworks and aligned with global standards.
            </p>
          </motion.div>

          {/* University tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {universities.map((u) => (
              <motion.button
                key={u.id}
                onClick={() => { setActiveUni(u.id); setExpandedProgram(null); }}
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-250"
                style={activeUni === u.id ? {
                  background: u.color,
                  color: '#fff',
                  boxShadow: `0 4px 20px ${u.color}55`,
                } : {
                  background: '#ffffff',
                  color: 'rgb(75,85,99)',
                  border: '1px solid rgb(229,231,235)',
                }}
              >
                <Building2 size={15} />
                {u.shortName}
              </motion.button>
            ))}
          </div>

          {/* University detail + programs */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeUni}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }}
            >
              {/* University info card */}
              <div className="grid lg:grid-cols-3 gap-6 mb-10">
                <div className="lg:col-span-1 relative rounded-3xl overflow-hidden min-h-[320px]"
                  style={{ border: `1px solid ${uni.color}22`, background: '#081224' }}>
                  <div className="absolute inset-0"
                    style={{ backgroundImage: `url('${uni.img}')`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.5 }} />
                  <div className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, rgba(15,23,42,0.95) 0%, rgba(15,23,42,0.80) 55%, rgba(15,23,42,0.45) 100%)' }} />

                  <div className="absolute bottom-0 left-0 right-0 p-7">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: `${uni.color}22`, border: `1px solid ${uni.color}40` }}>
                        <Building2 size={22} style={{ color: uni.color }} />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-lg text-white leading-tight">{uni.name}</h3>
                        <span className="text-slate-300 text-xs">{uni.subtitle}</span>
                      </div>
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed">{uni.description}</p>
                  </div>
                </div>

                <div className="lg:col-span-2 flex flex-col gap-4">
                  {/* Leadership */}
                  <div className="rounded-3xl p-6"
                    style={{ background: '#F8FAFF', border: '1px solid rgb(229,231,235)' }}>
                    <h4 className="font-display font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Award size={16} style={{ color: uni.color }} /> Academic Leadership
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {uni.leadership.map((leader) => (
                        <div key={leader.name} className="flex items-center gap-3 rounded-2xl p-4"
                          style={{ background: '#F8FAFF', border: '1px solid rgb(229,231,235)' }}>
                          <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ background: `${uni.color}15`, border: `1px solid ${uni.color}30` }}>
                            <GraduationCap size={18} style={{ color: uni.color }} />
                          </div>
                          <div>
                            <div className="text-gray-900 font-semibold text-sm">{leader.name}</div>
                            <div className="text-gray-500 text-xs">{leader.role}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick stats */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { val: `${uni.programs.length}`, label: 'Programs', icon: BookOpen },
                      { val: 'Online', label: 'Delivery Mode', icon: Monitor },
                      { val: 'Yes', label: 'Career Support', icon: Briefcase },
                    ].map(({ val, label, icon: Icon }) => (
                      <div key={label} className="rounded-2xl p-4 text-center"
                        style={{ background: '#F8FAFF', border: '1px solid rgb(229,231,235)' }}>
                        <Icon size={16} className="mx-auto mb-2" style={{ color: uni.color }} />
                        <div className="font-display font-bold text-gray-900 text-lg">{val}</div>
                        <div className="text-gray-400 text-[10px]">{label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Programs grid */}
              <div className="mb-4">
                <h3 className="font-display font-bold text-2xl text-gray-900 mb-6 flex items-center gap-2">
                  <BookOpen size={20} style={{ color: uni.color }} /> Programs Offered
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {uni.programs.map((prog, i) => {
                  const Icon = prog.icon;
                  const isExpanded = expandedProgram === prog.title;
                  return (
                    <motion.div
                      key={prog.title}
                      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                      whileHover={{ y: -6 }}
                      className="relative rounded-3xl overflow-hidden cursor-pointer group"
                      style={{
                        background: '#ffffff',
                        border: '1px solid rgb(229,231,235)',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                      }}
                      onClick={() => setExpandedProgram(isExpanded ? null : prog.title)}
                    >
                      <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-3xl"
                        style={{ background: `linear-gradient(90deg, transparent, ${prog.color}, transparent)` }} />

                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                            style={{ background: `${prog.color}15`, border: `1px solid ${prog.color}30` }}>
                            <Icon size={22} style={{ color: prog.color }} />
                          </div>
                          <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown size={16} className="text-gray-400" />
                          </motion.div>
                        </div>

                        <h4 className="font-display font-bold text-gray-900 text-sm mb-3 leading-tight">{prog.title}</h4>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="overflow-hidden"
                            >
                              <div className="space-y-2 mb-4">
                                {prog.highlights.map((h) => (
                                  <div key={h} className="flex items-start gap-2">
                                    <CheckCircle size={13} className="flex-shrink-0 mt-0.5" style={{ color: prog.color }} />
                                    <span className="text-gray-600 text-xs leading-relaxed">{h}</span>
                                  </div>
                                ))}
                              </div>
                              {prog.tools && (
                                <div className="px-3 py-2 rounded-xl mb-2"
                                  style={{ background: `${prog.color}08`, border: `1px solid ${prog.color}20` }}>
                                  <span className="text-gray-400 text-[10px] uppercase tracking-wider">Tools: </span>
                                  <span className="text-gray-600 text-xs">{prog.tools}</span>
                                </div>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {!isExpanded && (
                          <div className="space-y-1.5">
                            {prog.highlights.slice(0, 3).map((h) => (
                              <div key={h} className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: prog.color }} />
                                <span className="text-gray-500 text-xs truncate">{h}</span>
                              </div>
                            ))}
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 opacity-40" style={{ background: prog.color }} />
                              <span className="text-gray-400 text-xs">+{prog.highlights.length - 3} more</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── INTERNSHIP & CAREER SUPPORT ── */}
      <section ref={whyRef} className="py-20 bg-[#F8FAFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={whyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }} className="text-center mb-12">
            <span className="badge badge-blue mb-3">Career Support</span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-gray-900">
              Internship & <span className="text-gradient">Placement Support</span>
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Professional development extends beyond certification. Our structured framework bridges academic learning with real industry opportunity.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Briefcase, title: 'Aligned Internships', desc: 'Internship facilitation aligned with your program specialization.' },
              { icon: Globe, title: 'Industry Exposure', desc: 'Meaningful industry exposure and applied learning experience.' },
              { icon: Award, title: 'Professional Profiling', desc: 'Professional profiling, CV guidance, and interview preparation.' },
              { icon: Star, title: 'Career Mentoring', desc: 'Career mentoring and structured placement assistance.' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.title}
                  initial={{ opacity: 0, y: 30 }} animate={whyInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.12 }}
                  whileHover={{ y: -6 }}
                  className="rounded-3xl p-6 group"
                  style={{ background: '#ffffff', border: '1px solid rgb(229,231,235)', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                    style={{ background: 'rgb(239,246,255)', border: '1px solid rgb(191,219,254)' }}>
                    <Icon size={22} className="text-blue-600" />
                  </div>
                  <h4 className="font-display font-bold text-gray-900 mb-2">{item.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TOOLS ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-center mb-12">
            <span className="badge badge-blue mb-3">
              <Wrench size={12} className="inline mr-1.5 -mt-0.5" />Tools
            </span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-gray-900">
              Industry <span className="text-gradient">Tools</span> We Cover
            </h2>
            <p className="text-gray-500 mt-3 max-w-lg mx-auto">
              Hands-on training with the platforms and tools that power today&apos;s digital economy.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3">
            {tools.map((tool, i) => (
              <motion.div key={tool}
                initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: i * 0.03 }}
                whileHover={{ y: -4, scale: 1.05 }}
                className="px-5 py-3 rounded-2xl font-semibold text-sm text-gray-700 cursor-default"
                style={{ background: '#F8FAFF', border: '1px solid rgb(229,231,235)' }}>
                {tool}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARTNER COMPANIES ── */}
      <section className="py-20 bg-[#F8FAFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-center mb-12">
            <span className="badge badge-red mb-3">
              <Handshake size={12} className="inline mr-1.5 -mt-0.5" />Partners
            </span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-gray-900">
              Partner <span className="text-gradient-red">Companies</span>
            </h2>
            <p className="text-gray-500 mt-3 max-w-lg mx-auto">
              Our programs are supported by leading global and regional organizations.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {partnerCompanies.map((company, i) => (
              <motion.div key={company}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.03 }}
                whileHover={{ y: -4, borderColor: 'rgba(37,99,235,0.40)' }}
                className="rounded-2xl p-4 flex items-center justify-center text-center cursor-default min-h-[72px] transition-all"
                style={{ background: '#ffffff', border: '1px solid rgb(229,231,235)' }}>
                <span className="text-gray-700 text-sm font-bold leading-tight">{company}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-center mb-12">
            <span className="badge badge-blue mb-3">
              <BadgeCheck size={12} className="inline mr-1.5 -mt-0.5" />Recognition
            </span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-gray-900">
              Our <span className="text-gradient">Certifications</span>
            </h2>
            <p className="text-gray-500 mt-3 max-w-lg mx-auto">
              Recognized and certified by leading global technology and education platforms.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {certifications.map((cert, i) => (
              <motion.div key={cert}
                initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4, scale: 1.05 }}
                className="px-6 py-4 rounded-2xl font-bold text-sm cursor-default flex items-center gap-2"
                style={{ background: '#ffffff', border: '1px solid rgb(229,231,235)', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                <BadgeCheck size={14} className="text-blue-600 flex-shrink-0" />
                <span className="text-gray-700">{cert}</span>
              </motion.div>
            ))}
          </div>

          {/* Contact info */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto rounded-3xl p-8"
            style={{ background: '#F8FAFF', border: '1px solid rgb(229,231,235)', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <h3 className="font-display font-bold text-xl text-gray-900 mb-6 text-center">Get in Touch</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 rounded-2xl p-4"
                style={{ background: '#ffffff', border: '1px solid rgb(229,231,235)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgb(239,246,255)', border: '1px solid rgb(191,219,254)' }}>
                  <Phone size={18} className="text-blue-600" />
                </div>
                <span className="text-gray-700 text-sm font-medium">+91 6238067220</span>
              </div>
              <div className="flex items-start gap-4 rounded-2xl p-4"
                style={{ background: '#ffffff', border: '1px solid rgb(229,231,235)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgb(239,246,255)', border: '1px solid rgb(191,219,254)' }}>
                  <MapPin size={18} className="text-blue-600" />
                </div>
                <span className="text-gray-700 text-sm font-medium leading-relaxed">
                  St.George Building, Ponekkara,<br />Edappally, Ernakulam, Kerala 682024
                </span>
              </div>
              <div className="flex items-center gap-4 rounded-2xl p-4"
                style={{ background: '#ffffff', border: '1px solid rgb(229,231,235)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgb(239,246,255)', border: '1px solid rgb(191,219,254)' }}>
                  <ExternalLink size={18} className="text-blue-600" />
                </div>
                <span className="text-gray-700 text-sm font-medium">www.worldpassport.in</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20"
        style={{ background: 'linear-gradient(to bottom right, #0F172A, #1E293B)' }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="rounded-3xl p-10 md:p-14"
            style={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.10)',
              boxShadow: '0 0 80px rgba(37,99,235,0.10), 0 0 40px rgba(220,38,38,0.06)' }}>
            <div className="flex justify-center mb-5">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />)}
              </div>
            </div>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-white mb-4">
              Ready to Get <span className="text-white">Certified?</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
              Enroll in a university-affiliated certification program and take the next step in your professional career.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-9 py-3.5 rounded-full font-semibold text-gray-900 bg-white shadow-lg transition-all flex items-center gap-2"
                  style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}>
                  Apply Now <ArrowRight size={17} />
                </motion.button>
              </Link>
              <Link href="/overseas">
                <motion.button
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                  className="px-9 py-3.5 rounded-full font-semibold text-white/80 border border-white/20 hover:border-blue-500/35 transition-all flex items-center gap-2">
                  <Globe size={17} className="text-blue-400" /> Explore Overseas
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

