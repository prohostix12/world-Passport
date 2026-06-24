'use client';
import { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AOSInit from '@/components/AOSInit';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Globe, GraduationCap, DollarSign, FileCheck, Plane, BookOpen,
  MapPin, Users, Star, ChevronRight, ArrowRight, CheckCircle,
  Clock, Award, Briefcase, TrendingUp, Building2, BadgeCheck,
  Landmark, FlaskConical, Zap, Search, ExternalLink, Loader2,
} from 'lucide-react';

/* ── University type from DB ── */
interface UniversityDB {
  _id: string;
  name: string;
  country: string;
  city?: string;
  type?: string;
  description?: string;
  image?: string;
  ranking?: string;
  website?: string;
  availableCourses?: string;
  degreeLevels?: string[];
  studyFields?: string[];
  tuitionFee?: string;
  scholarshipAvailable?: boolean;
}

/* ── Country Data ── */
// Static countries array removed - data now generated dynamically from DB

/* ── Program Levels ── */
const programLevels = [
  {
    level: "Bachelor's", duration: '3–4 years', cost: '€8k–20k/yr',
    intake: 'Sep / Feb', color: '#3B82F6',
    img: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80',
    perks: ['Foundation degree', 'Wide subject choice', 'Exchange programs'],
  },
  {
    level: "Master's", duration: '1–2 years', cost: '€10k–25k/yr',
    intake: 'Sep / Feb', color: '#FF3B3B',
    img: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&q=80',
    perks: ['Specialised expertise', 'High ROI', 'Industry connections'],
  },
  {
    level: 'PhD', duration: '3–4 years', cost: 'Often funded',
    intake: 'Rolling', color: '#00C9B0',
    img: 'https://images.unsplash.com/photo-1532094349884-543559373509?w=600&q=80',
    perks: ['Research stipend', 'Global recognition', 'Academic career path'],
  },
  {
    level: 'MBA', duration: '1–2 years', cost: '€15k–40k/yr',
    intake: 'Sep', color: '#FFB800',
    img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80',
    perks: ['Leadership skills', 'Global network', 'C-suite career'],
  },
];

/* ── Scholarships ── */
const scholarships = [
  { name: 'DAAD Scholarship', country: '🇩🇪', amount: '€861/month', coverage: 90, color: '#3B82F6', type: 'Government' },
  { name: 'Erasmus+ Grant', country: '🇪🇺', amount: '€800–1,200/month', coverage: 75, color: '#FF3B3B', type: 'EU Program' },
  { name: 'Holland Scholarship', country: '🇳🇱', amount: '€5,000 one-time', coverage: 60, color: '#FF6B00', type: 'University' },
  { name: 'Sweden SI Scholarship', country: '🇸🇪', amount: 'Full tuition + living', coverage: 95, color: '#00C9B0', type: 'Government' },
];

/* ── Services ── */
const services = [
  { icon: BookOpen, title: 'Program Selection', desc: 'AI-matched program recommendations from 100+ partner universities tailored to your profile.', color: '#3B82F6' },
  { icon: FileCheck, title: 'Application Support', desc: 'End-to-end application: SOP, LOR, CV, transcripts — all expertly crafted and reviewed.', color: '#FF3B3B' },
  { icon: DollarSign, title: 'Scholarship Guidance', desc: 'We identify scholarships worth thousands of euros and guide you through every application.', color: '#00C9B0' },
  { icon: Plane, title: 'Visa Assistance', desc: 'Step-by-step student visa support with our near-100% approval success rate.', color: '#FFB800' },
  { icon: Globe, title: 'Pre-Departure Briefing', desc: 'Cultural orientation, housing, banking, SIM cards — everything ready before you fly.', color: '#A855F7' },
  { icon: GraduationCap, title: 'Post-Arrival Support', desc: 'On-ground assistance and alumni network access from arrival to graduation.', color: '#FF6B00' },
];

/* ── Timeline ── */
const timeline = [
  { month: 'Month 1–2', title: 'Profile Assessment', desc: 'We evaluate your academics, goals, and budget to shortlist ideal programs.', icon: Star, color: '#3B82F6' },
  { month: 'Month 2–3', title: 'Application Prep', desc: 'SOP drafting, document collection, LOR coordination, CV polishing.', icon: FileCheck, color: '#FF3B3B' },
  { month: 'Month 3–4', title: 'Submit Applications', desc: 'Applications submitted to 5–8 universities with full tracking.', icon: Zap, color: '#00C9B0' },
  { month: 'Month 4–6', title: 'Receive Offers', desc: 'Offer letters arrive — we help you compare and accept the best one.', icon: Award, color: '#FFB800' },
  { month: 'Month 6–7', title: 'Visa & Finance', desc: 'Student visa application, scholarship disbursement, tuition deposit.', icon: BadgeCheck, color: '#A855F7' },
  { month: 'Month 7–8', title: 'Fly & Settle', desc: 'Pre-departure briefing, airport pick-up coordination, on-ground help.', icon: Plane, color: '#FF6B00' },
];

/* ── Demand bar ── */
function ScholarshipBar({ name, amount, coverage, color, country, type, index }: {
  name: string; amount: string; coverage: number; color: string;
  country: string; type: string; index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.12 }}
      className="rounded-2xl p-5 bg-white border border-gray-100 shadow-sm"
      style={{ border: '1px solid rgb(229,231,235)' }}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-lg">{country}</span>
            <span className="text-gray-900 font-semibold text-sm">{name}</span>
          </div>
          <span className="text-xs px-2 py-0.5 rounded-full font-medium"
            style={{ background: `${color}18`, color }}>{type}</span>
        </div>
        <div className="text-right">
          <div className="text-gray-900 font-bold text-sm">{amount}</div>
          <div className="text-gray-400 text-xs">coverage</div>
        </div>
      </div>
      <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgb(243,244,246)' }}>
        <motion.div className="h-full rounded-full"
          initial={{ width: 0 }} animate={inView ? { width: `${coverage}%` } : {}}
          transition={{ delay: index * 0.12 + 0.3, duration: 0.9, ease: 'easeOut' }}
          style={{ background: `linear-gradient(90deg, ${color}, ${color}99)` }} />
      </div>
      <div className="flex justify-between mt-1.5 text-xs text-gray-400">
        <span>0%</span><span style={{ color }}>{coverage}% covered</span>
      </div>
    </motion.div>
  );
}

export default function OverseasPage() {
  const [activeCountry, setActiveCountry] = useState('');
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [hoveredLevel, setHoveredLevel] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  /* ── DB universities state ── */
  const [dbUniversities, setDbUniversities] = useState<UniversityDB[]>([]);
  const [uniLoading, setUniLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/universities')
      .then(r => r.json())
      .then(data => {
        const unis = data.universities || [];
        setDbUniversities(unis);
        if (unis.length > 0 && !activeCountry) {
          const uniqueCountries = Array.from(new Set(unis.map((u: any) => u.country).filter(Boolean))) as string[];
          if (uniqueCountries.length > 0) {
            setActiveCountry(uniqueCountries[0].toLowerCase().replace(/\s+/g, '-'));
          }
        }
      })
      .catch(() => setDbUniversities([]))
      .finally(() => setUniLoading(false));
  }, []);

  /* ── Generate dynamic countries from DB ── */
  const dynamicCountries = Array.from(new Set(dbUniversities.map(u => u.country).filter(Boolean))).map((countryName, idx) => {
    const unisForCountry = dbUniversities.filter(u => u.country === countryName);
    const uniWithImage = unisForCountry.find(u => u.image);
    const uniWithFee = unisForCountry.find(u => u.tuitionFee);

    const colors = ['#3B82F6', '#FF6B00', '#FF3B3B', '#00C9B0', '#FFB800', '#A855F7'];
    const color = colors[idx % colors.length];

    const allFields = Array.from(new Set(unisForCountry.flatMap(u => u.studyFields || [])));
    const allDegrees = Array.from(new Set(unisForCountry.flatMap(u => u.degreeLevels || [])));

    return {
      id: countryName.toLowerCase().replace(/\s+/g, '-'),
      name: countryName,
      flag: '🌍', // fallback flag
      color: color,
      img: uniWithImage?.image || '', // admin added image
      tagline: 'Explore Universities',
      tag: '',
      stats: {
        unis: unisForCountry.length.toString(),
        avgCost: uniWithFee?.tuitionFee || '--',
        acceptance: '--',
        intl: '--',
      },
      highlights: allFields.length > 0 ? allFields.slice(0, 4) : ['Quality Education', 'Global Network'],
      topUnis: unisForCountry.slice(0, 4).map(u => ({ name: u.name, rank: u.ranking || '', field: u.type || '' })),
      programs: allDegrees.length > 0 ? allDegrees : ['Bachelors', 'Masters'],
      salary: '--'
    };
  });

  /* Universities for the active country (matched case-insensitively) */
  const activeCountryName = dynamicCountries.find(c => c.id === activeCountry)?.name ?? '';
  const countryUniversities = dbUniversities.filter(
    u => u.country.toLowerCase() === activeCountryName.toLowerCase()
  );

  /* Dynamic country image from the first university in that country that has an image, fallback to default */
  const activeCountryUniWithImage = countryUniversities.find(u => u.image);
  const countryImg = activeCountryUniWithImage?.image || dynamicCountries.find(c => c.id === activeCountry)?.img;

  /* Dynamic university count and tuition cost */
  const active = dynamicCountries.find(c => c.id === activeCountry) || dynamicCountries[0];
  const universityCount = countryUniversities.length > 0 ? `${countryUniversities.length}` : active?.stats?.unis;
  const activeCountryUniWithFee = countryUniversities.find(u => u.tuitionFee);
  const avgCostVal = activeCountryUniWithFee?.tuitionFee || active?.stats?.avgCost;

  /* Filtered universities for the search section */
  const filteredUniversities = dbUniversities.filter(u => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      u.name.toLowerCase().includes(q) ||
      u.country.toLowerCase().includes(q) ||
      (u.city && u.city.toLowerCase().includes(q)) ||
      (u.availableCourses && u.availableCourses.toLowerCase().includes(q))
    );
  });

  const heroRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const timelineInView = useInView(timelineRef, { once: true, margin: '-60px' });

  return (
    <main className="bg-white text-gray-900">

      <AOSInit />
      <Navbar />

      {/* ── Hero ── */}
      <section ref={heroRef} className="relative min-h-[100svh] sm:min-h-[95vh] flex flex-col justify-end overflow-hidden">

        {/* Full-bleed background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[#0F172A]" />
          <div className="absolute inset-0" style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80&auto=format')`,
            backgroundSize: 'cover', backgroundPosition: 'center 40%',
            opacity: 0.30,
          }} />
        </div>

        {/* Animated SVG flight paths */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice">
          {[
            { d: 'M 100 350 Q 400 150 700 280', color: '#3B82F6', delay: 0 },
            { d: 'M 300 500 Q 600 200 950 350', color: '#FF3B3B', delay: 1.2 },
            { d: 'M 50 200 Q 350 400 750 180', color: '#00C9B0', delay: 0.6 },
            { d: 'M 500 600 Q 800 300 1150 420', color: '#FFB800', delay: 1.8 },
          ].map((p, i) => (
            <motion.path key={i} d={p.d} fill="none" stroke={p.color} strokeWidth="1.5"
              strokeDasharray="6 8" opacity={0.25}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.25 }}
              transition={{ delay: p.delay, duration: 2.5, ease: 'easeInOut' }} />
          ))}
          {/* Plane dots on paths */}
          {[
            { cx: 400, cy: 230, color: '#3B82F6', delay: 2.5 },
            { cx: 650, cy: 275, color: '#FF3B3B', delay: 3.5 },
            { cx: 350, cy: 310, color: '#00C9B0', delay: 3.0 },
          ].map((dot, i) => (
            <motion.circle key={i} cx={dot.cx} cy={dot.cy} r="4" fill={dot.color}
              initial={{ opacity: 0, scale: 0 }} animate={{ opacity: [0, 1, 1, 0], scale: [0, 1.2, 1, 0] }}
              transition={{ delay: dot.delay, duration: 2, repeat: Infinity, repeatDelay: 4 }} />
          ))}
        </svg>

        {/* Centered hero content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 pb-10 pt-32">
          <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            {/* Breadcrumb-style label */}
            <div className="flex items-center justify-center gap-2 mb-6 text-sm text-white/50">
              <MapPin size={13} className="text-primary" />
              <span>India</span>
              <span className="text-primary">→</span>
              <span className="text-white font-semibold">Europe</span>
            </div>

            <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-7xl text-white mb-5 leading-tight">
              Where Will You<br />
              <span className="text-white">Study Next?</span>
            </h1>
            <p className="text-white/55 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
              6 countries. 400+ universities. 1 trusted guide.
              We handle everything from application to arrival — you just pack your bags.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
              <Link href="/contact">
                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  className="px-8 py-4 rounded-full font-semibold text-gray-900 flex items-center gap-2 mx-auto sm:mx-0 bg-white shadow-lg"
                  style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}>
                  Start Your Journey <ArrowRight size={16} />
                </motion.button>
              </Link>
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById('universities')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 rounded-full font-semibold text-white/80 border border-white/20 hover:border-blue-500/40 hover:text-white transition-all">
                Browse Universities
              </motion.button>
            </div>
          </motion.div>

          {/* Quick stats row */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-px rounded-2xl overflow-hidden mx-auto max-w-2xl"
            style={{ border: '1px solid rgba(255,255,255,0.10)', background: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(16px)' }}>
            {[
              { val: '10,000+', label: 'Students Placed', color: '#3B82F6' },
              { val: '98%', label: 'Visa Approval', color: '#00C9B0' },
              { val: '€2M+', label: 'Scholarships Won', color: '#FFB800' },
              { val: '6', label: 'Countries', color: '#FF3B3B' },
            ].map((s, i) => (
              <div key={s.label}
                className={`flex-1 min-w-[70px] sm:min-w-[100px] px-2 sm:px-4 py-3 sm:py-4 text-center ${i < 3 ? 'border-r border-white/6' : ''}`}>
                <div className="font-bold text-white text-base sm:text-lg" style={{ color: s.color }}>{s.val}</div>
                <div className="text-white/35 text-[10px] sm:text-xs mt-0.5">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Country destination strip at the bottom */}
        <div className="relative z-10 w-full"
          style={{ background: 'linear-gradient(180deg, transparent 0%, #0F172A 100%)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 pt-6">
            <p className="text-white/30 text-xs uppercase tracking-widest mb-4 text-center">Choose your destination</p>
            <div className="flex gap-3 justify-center flex-wrap">
              {dynamicCountries.map((c, i) => (
                <motion.button key={c.id}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.08 }}
                  whileHover={{ y: -4, scale: 1.05 }}
                  onClick={() => {
                    setActiveCountry(c.id);
                    document.getElementById('country-explorer')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl transition-all cursor-pointer"
                  style={{
                    background: activeCountry === c.id ? `${c.color}20` : 'rgba(255,255,255,0.10)',
                    border: `1px solid ${activeCountry === c.id ? c.color + '50' : 'rgba(255,255,255,0.10)'}`,
                    backdropFilter: 'blur(8px)',
                    boxShadow: activeCountry === c.id ? `0 0 20px ${c.color}25` : 'none',
                  }}>
                  <span className="text-xl">{c.flag}</span>
                  <div className="text-left">
                    <div className="text-white text-xs font-semibold leading-tight">{c.name}</div>
                    <div className="text-white/35 text-[10px] leading-tight">{c.stats.unis} unis</div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Browse All Universities (DB) ── */}
      <section id="universities" className="py-24 relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-10">
            <span className="badge badge-blue mb-4">Our Network</span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-gray-900 mb-3">
              Browse <span className="text-gradient">Universities</span>
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Explore all universities added by our team — click any card for full details
            </p>
          </motion.div>

          {/* Search Bar */}
          <div className="max-w-lg mx-auto mb-10">
            <div className="relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search by name, country, city or program…"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-transparent shadow-sm transition-all"
              />
            </div>
          </div>

          {uniLoading ? (
            <div className="flex items-center justify-center py-20 gap-3 text-gray-400">
              <Loader2 size={22} className="animate-spin text-violet-500" />
              <span className="text-sm font-medium">Loading universities…</span>
            </div>
          ) : filteredUniversities.length === 0 ? (
            <div className="text-center py-20">
              <GraduationCap size={48} className="mx-auto mb-4 text-gray-200" />
              <p className="text-gray-400 text-base font-medium">
                {searchQuery ? `No universities found for "${searchQuery}"` : 'No universities added yet.'}
              </p>
              <p className="text-gray-300 text-sm mt-1">
                {searchQuery ? 'Try a different search term.' : 'Admin can add universities via the dashboard.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filteredUniversities.map((uni, i) => {
                const gradients = [
                  'from-violet-500 to-indigo-600', 'from-blue-500 to-cyan-600',
                  'from-rose-500 to-pink-600', 'from-amber-500 to-orange-600',
                  'from-emerald-500 to-teal-600', 'from-purple-500 to-violet-600',
                ];
                return (
                  <motion.div key={uni._id}
                    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: (i % 8) * 0.06 }}>
                    <Link
                      href={`/universities/${uni._id}`}
                      className="group relative flex flex-col justify-end h-64 rounded-[24px] overflow-hidden border border-gray-200/30 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-slate-950 cursor-pointer"
                    >
                      {/* Background */}
                      {uni.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={uni.image}
                          alt={uni.name}
                          className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:opacity-90 group-hover:scale-110 transition-all duration-500"
                          onError={e => { e.currentTarget.style.display = 'none'; }}
                        />
                      ) : (
                        <div className={`absolute inset-0 bg-gradient-to-br ${gradients[i % gradients.length]} opacity-80`} />
                      )}
                      {/* Dark gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent z-10" />
                      {/* Ranking badge */}
                      {uni.ranking && (
                        <div className="absolute top-3 right-3 z-20 flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-400/90 text-slate-900 text-[10px] font-bold shadow">
                          <Award size={10} /> #{uni.ranking}
                        </div>
                      )}
                      {/* Text */}
                      <div className="relative z-20 p-4 flex flex-col items-center text-center justify-end w-full">
                        <h3 className="font-display font-bold text-white text-sm leading-tight mb-1 drop-shadow-md line-clamp-2 px-1">
                          {uni.name}
                        </h3>
                        <span className="text-[10px] font-semibold text-sky-400 uppercase tracking-wider drop-shadow-sm">
                          {uni.city ? `${uni.city}, ` : ''}{uni.country}
                        </span>
                        {uni.degreeLevels && uni.degreeLevels.length > 0 && (
                          <div className="flex flex-wrap gap-1 justify-center mt-2">
                            {uni.degreeLevels.slice(0, 2).map(lvl => (
                              <span key={lvl} className="text-[9px] px-2 py-0.5 rounded-full bg-white/15 text-white/80 font-medium">{lvl}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Show count */}
          {!uniLoading && filteredUniversities.length > 0 && (
            <p className="text-center text-xs text-gray-400 mt-8">
              Showing {filteredUniversities.length} {filteredUniversities.length === 1 ? 'university' : 'universities'}
              {searchQuery ? ` matching "${searchQuery}"` : ' in our network'}
            </p>
          )}
        </div>
      </section>

      {/* ── Country Explorer ── */}
      <section id="country-explorer" className="py-24 relative bg-[#F8FAFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-12">
            <span className="badge badge-blue mb-4">Destinations</span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-gray-900 mb-3">
              Explore <span className="text-gradient">Countries</span>
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">Click a country to see universities, costs, and career outcomes</p>
          </motion.div>

          {/* Tab buttons */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {dynamicCountries.map(c => (
              <motion.button key={c.id}
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
                onClick={() => setActiveCountry(c.id)}
                onHoverStart={() => setHoveredCountry(c.id)}
                onHoverEnd={() => setHoveredCountry(null)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all"
                style={{
                  background: activeCountry === c.id ? c.color : hoveredCountry === c.id ? `${c.color}18` : '#fff',
                  color: activeCountry === c.id ? '#fff' : 'rgb(75,85,99)',
                  border: `1px solid ${activeCountry === c.id ? c.color : hoveredCountry === c.id ? `${c.color}40` : 'rgb(229,231,235)'}`,
                  boxShadow: activeCountry === c.id ? `0 4px 20px ${c.color}55` : 'none',
                }}>
                <span className="text-base">{c.flag}</span> {c.name}
                {c.tag && activeCountry === c.id && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/15">{c.tag}</span>
                )}
              </motion.button>
            ))}
          </div>

          {active && (
            <AnimatePresence mode="wait">
              <motion.div key={activeCountry}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="grid lg:grid-cols-2 gap-6">

                {/* Left — image + stats */}
                <div className="relative rounded-3xl overflow-hidden min-h-[380px]"
                  style={{ border: `1px solid ${active.color}40` }}>
                  {/* Background image using img tag for reliable local file rendering */}
                  {countryImg && (
                    <img
                      src={countryImg}
                      alt={active.name}
                      aria-hidden="true"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                  {/* Only a subtle dark gradient at bottom for text readability */}
                  <div className="absolute inset-0"
                    style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.65) 100%)' }} />
                  <div className="absolute top-0 left-0 right-0 h-[3px]"
                    style={{ background: `linear-gradient(90deg, transparent, ${active.color}, transparent)` }} />

                  <div className="relative p-8 h-full flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-4xl">{active.flag}</span>
                        <div>
                          <h3 className="font-display font-bold text-2xl text-white">{active.name}</h3>
                          <p className="text-white/70 text-sm">{active.tagline}</p>
                        </div>
                      </div>
                      <span className="text-xs px-2.5 py-1 rounded-full font-bold tracking-wider uppercase"
                        style={{ background: `${active.color}30`, color: 'white', border: `1px solid ${active.color}60` }}>
                        {active.tag}
                      </span>
                    </div>

                    {/* Key stats */}
                    <div className="grid grid-cols-2 gap-3 mt-6">
                      {[
                        { label: 'Universities', value: universityCount, icon: Building2 },
                        { label: 'Avg. Cost', value: avgCostVal, icon: DollarSign },
                        { label: 'Acceptance', value: active.stats.acceptance, icon: CheckCircle },
                        { label: 'Intl Students', value: active.stats.intl, icon: Users },
                      ].map(({ label, value, icon: Icon }) => (
                        <div key={label} className="rounded-xl p-3 flex items-center gap-3"
                          style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', backdropFilter: 'blur(8px)' }}>
                          <Icon size={15} style={{ color: 'white', flexShrink: 0 }} />
                          <div>
                            <div className="text-white font-bold text-sm">{value}</div>
                            <div className="text-white/65 text-xs">{label}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Avg salary */}
                    <div className="mt-4 rounded-xl p-3 flex items-center justify-between"
                      style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', backdropFilter: 'blur(8px)' }}>
                      <span className="text-white/80 text-sm flex items-center gap-2"><Briefcase size={14} /> Avg. Graduate Salary</span>
                      <span className="font-bold text-white">{active.salary}</span>
                    </div>
                  </div>
                </div>

                {/* Right — universities + highlights */}
                <div className="flex flex-col gap-4">
                  {/* Universities in this country from DB */}
                  <div className="rounded-3xl p-6"
                    style={{ background: '#fff', border: '1px solid rgb(229,231,235)' }}>
                    <h4 className="font-display font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Landmark size={16} style={{ color: active.color }} /> Top Universities
                    </h4>

                    {uniLoading ? (
                      <div className="flex items-center justify-center py-8 gap-3 text-gray-400">
                        <Loader2 size={18} className="animate-spin" />
                        <span className="text-sm">Loading universities…</span>
                      </div>
                    ) : countryUniversities.length > 0 ? (
                      <div className="space-y-2.5">
                        {countryUniversities.map((uni, i) => {
                          const displayRank = uni.ranking
                            ? (uni.ranking.toLowerCase().includes('qs')
                              ? (uni.ranking.startsWith('#') ? uni.ranking : `#${uni.ranking}`)
                              : `#${uni.ranking.startsWith('#') ? uni.ranking.substring(1) : uni.ranking} QS`)
                            : null;

                          return (
                            <motion.div key={uni._id}
                              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.08 }}>
                              <Link href={`/universities/${uni._id}`}
                                className="flex items-center justify-between rounded-xl px-4 py-3 group hover:shadow-md transition-all cursor-pointer block"
                                style={{ background: '#F8FAFC', border: '1px solid rgb(229,231,235)' }}>
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                                    style={{ background: `${active.color}18`, color: active.color }}>
                                    {i + 1}
                                  </div>
                                  <div>
                                    <div className="text-gray-900 text-sm font-semibold group-hover:text-violet-600 transition-colors">{uni.name}</div>
                                    <div className="text-gray-400 text-xs">
                                      {uni.studyFields && uni.studyFields.length > 0 ? uni.studyFields[0] : (uni.type || 'General')}
                                    </div>
                                  </div>
                                </div>
                                {displayRank && (
                                  <span className="text-xs font-semibold px-2 py-1 rounded-full flex-shrink-0"
                                    style={{ background: `${active.color}10`, color: active.color }}>
                                    {displayRank}
                                  </span>
                                )}
                              </Link>
                            </motion.div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <GraduationCap size={32} className="mx-auto mb-3 text-gray-200" />
                        <p className="text-gray-400 text-sm">No universities added for {activeCountryName} yet.</p>
                        <p className="text-gray-300 text-xs mt-1">Admin can add universities via the dashboard.</p>
                      </div>
                    )}
                  </div>

                  {/* Highlights */}
                  <div className="rounded-3xl p-6"
                    style={{ background: '#fff', border: '1px solid rgb(229,231,235)' }}>
                    <h4 className="font-display font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Star size={16} style={{ color: active.color }} /> Why Study Here?
                    </h4>
                    <ul className="space-y-2.5">
                      {active.highlights.map((h, i) => (
                        <motion.li key={h}
                          initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.07 }}
                          className="flex items-start gap-2.5 text-sm text-gray-600">
                          <CheckCircle size={14} className="mt-0.5 flex-shrink-0" style={{ color: active.color }} />
                          {h}
                        </motion.li>
                      ))}
                    </ul>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {active.programs.map(p => (
                        <span key={p} className="text-xs px-2.5 py-1 rounded-full font-medium"
                          style={{ background: `${active.color}10`, color: active.color, border: `1px solid ${active.color}20` }}>
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>

      {/* ── Program Levels ── */}
      <section className="py-24 relative bg-white">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-14">
            <span className="badge badge-blue mb-4">Degree Types</span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-gray-900 mb-3">
              Choose Your <span className="text-gradient">Program Level</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {programLevels.map((p, i) => (
              <motion.div key={p.level}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }}
                onHoverStart={() => setHoveredLevel(p.level)}
                onHoverEnd={() => setHoveredLevel(null)}
                whileHover={{ y: -10 }}
                className="relative rounded-3xl overflow-hidden cursor-default group"
                style={{ border: `1px solid ${hoveredLevel === p.level ? p.color + '50' : p.color + '18'}`, minHeight: 320 }}>

                <div className="absolute top-0 left-0 right-0 h-[3px]"
                  style={{ background: `linear-gradient(90deg, transparent, ${p.color}, transparent)` }} />
                {/* Full-opacity image */}
                <div className="absolute inset-0 transition-all duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${p.img}')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                {/* Only bottom dark gradient so text is readable — no white wash */}
                <div className="absolute inset-0"
                  style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.72) 100%)' }} />
                <div className="absolute top-4 right-5 font-display font-black text-7xl select-none opacity-[0.15] text-white"
                  style={{ color: 'white' }}>{p.level[0]}</div>

                <div className="relative p-6 flex flex-col h-full justify-end" style={{ minHeight: 320 }}>
                  <div className="mt-auto">
                    <h3 className="font-display font-bold text-xl text-white mb-1">{p.level}</h3>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-white/80">
                        <Clock size={12} style={{ color: p.color }} />
                        <span>{p.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-white/80">
                        <DollarSign size={12} style={{ color: p.color }} />
                        <span>{p.cost}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-white/80">
                        <TrendingUp size={12} style={{ color: p.color }} />
                        <span>Intake: {p.intake}</span>
                      </div>
                    </div>
                    <ul className="space-y-1.5">
                      {p.perks.map(pk => (
                        <li key={pk} className="flex items-center gap-1.5 text-xs text-white/75">
                          <CheckCircle size={11} style={{ color: p.color, flexShrink: 0 }} /> {pk}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ boxShadow: `inset 0 0 0 1px ${p.color}40` }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Application Timeline ── */}
      <section className="py-24 relative bg-[#F8FAFF]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-16">
            <span className="badge badge-blue mb-4">Process</span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-gray-900 mb-3">
              Your <span className="text-gradient">8-Month Journey</span>
            </h2>
            <p className="text-gray-500 max-w-md mx-auto">From initial consultation to landing in Europe — we walk every step with you</p>
          </motion.div>

          <div ref={timelineRef} className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-px"
              style={{ background: 'linear-gradient(180deg, rgba(37,99,235,0.3) 0%, rgba(37,99,235,0.05) 100%)' }} />

            <div className="space-y-6">
              {timeline.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div key={step.title}
                    initial={{ opacity: 0, x: -30 }} animate={timelineInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: i * 0.12, duration: 0.5 }}
                    className="relative flex gap-6 group">

                    {/* Dot */}
                    <div className="relative z-10 flex-shrink-0">
                      <motion.div
                        initial={{ scale: 0 }} animate={timelineInView ? { scale: 1 } : {}}
                        transition={{ delay: i * 0.12 + 0.2, type: 'spring', bounce: 0.4 }}
                        className="w-16 h-16 rounded-2xl flex items-center justify-center"
                        style={{ background: `${step.color}18`, border: `1px solid ${step.color}35`, boxShadow: `0 0 15px ${step.color}10` }}>
                        <Icon size={22} style={{ color: step.color }} />
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 rounded-2xl p-5 group-hover:border-gray-300 transition-all"
                      style={{ background: '#fff', border: '1px solid rgb(229,231,235)' }}>
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="font-display font-bold text-gray-900">{step.title}</h3>
                        <span className="text-xs px-2.5 py-1 rounded-full font-semibold flex-shrink-0 ml-2"
                          style={{ background: `${step.color}10`, color: step.color }}>
                          {step.month}
                        </span>
                      </div>
                      <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Scholarships ── */}
      <section className="py-24 relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="badge badge-blue mb-4">Funding</span>
              <h2 className="font-display font-bold text-4xl md:text-5xl text-gray-900 mb-4">
                Scholarships<br /><span className="text-gradient">We Help You Win</span>
              </h2>
              <p className="text-gray-500 text-lg mb-6 leading-relaxed">
                We&apos;ve helped students secure over €2 million in scholarships. Our advisors know exactly which grants match your profile.
              </p>
              <ul className="space-y-3 mb-8">
                {['Profile-based scholarship matching', 'Essay and SOP coaching', 'Interview preparation', 'Scholarship calendar management'].map(pt => (
                  <li key={pt} className="flex items-center gap-2.5 text-gray-600 text-sm">
                    <CheckCircle size={15} className="text-primary flex-shrink-0" /> {pt}
                  </li>
                ))}
              </ul>
              <Link href="/contact">
                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  className="px-7 py-3.5 rounded-full font-semibold text-white flex items-center gap-2"
                  style={{ background: 'linear-gradient(135deg, #2563EB, #1D4ED8)', boxShadow: '0 4px 20px rgba(37,99,235,0.3)' }}>
                  Check My Eligibility <ArrowRight size={16} />
                </motion.button>
              </Link>
            </motion.div>

            <div className="space-y-4">
              {scholarships.map((s, i) => (
                <ScholarshipBar key={s.name} {...s} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="py-24 relative bg-[#F8FAFF]">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-14">
            <span className="badge badge-blue mb-4">Support</span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-gray-900 mb-3">
              Everything You <span className="text-gradient">Need</span>
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">End-to-end support so you can focus on your future, not the paperwork</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => {
              const Icon = s.icon;
              const isHov = hoveredService === s.title;
              return (
                <motion.div key={s.title}
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  onHoverStart={() => setHoveredService(s.title)}
                  onHoverEnd={() => setHoveredService(null)}
                  whileHover={{ y: -8 }}
                  className="relative rounded-3xl p-7 cursor-default transition-all"
                  style={{
                    background: '#fff',
                    border: `1px solid ${isHov ? s.color + '40' : 'rgb(229,231,235)'}`,
                    boxShadow: isHov ? '0 8px 30px rgba(0,0,0,0.08)' : '0 1px 3px rgba(0,0,0,0.04)',
                  }}>
                  <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: `linear-gradient(90deg, transparent, ${s.color}, transparent)`, opacity: isHov ? 1 : 0 }} />
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                    style={{ background: `${s.color}15`, border: `1px solid ${s.color}30`, boxShadow: isHov ? `0 0 20px ${s.color}20` : 'none' }}>
                    <Icon size={24} style={{ color: s.color }} />
                  </div>
                  <h3 className="font-display font-bold text-lg text-gray-900 mb-2">{s.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{s.desc}</p>
                  <div className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: s.color }}>
                    Learn more <ChevronRight size={12} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 relative" style={{ background: 'linear-gradient(to bottom right, #0F172A, #1E293B)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-3xl p-10 md:p-14 text-center"
            style={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.10)', boxShadow: '0 0 80px rgba(37,99,235,0.08)' }}>

            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
              style={{ background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.20)' }}>
              <Plane size={30} style={{ color: '#3B82F6' }} />
            </div>

            <h2 className="font-display font-bold text-3xl md:text-5xl text-white mb-4">
              Ready to Study in <span className="text-white">Europe?</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
              Book your free 30-minute consultation. Our advisors will map out your full journey — no commitment required.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  className="px-9 py-4 rounded-full font-semibold text-gray-900 bg-white shadow-lg"
                  style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}>
                  Book Free Consultation
                </motion.button>
              </Link>

            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-10 pt-8 border-t border-white/10">
              {[
                { icon: BadgeCheck, label: '98% Visa Success' },
                { icon: Users, label: '10,000+ Students' },
                { icon: Award, label: 'ISO Certified' },
                { icon: Globe, label: '6 Countries' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-gray-400 text-sm">
                  <Icon size={15} className="text-primary" /> {label}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}


