import connectDB from '@/lib/mongodb';
import { University, Course } from '@/lib/models';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AOSInit from '@/components/AOSInit';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  MapPin, Globe, Award, BookOpen, Clock, DollarSign, ArrowLeft,
  ExternalLink, GraduationCap, Building2, Calendar, CheckCircle2,
  Mail, Phone, Home, PlayCircle, Info, Users, BadgeCheck,
  Landmark, Star, FileText, Video, Image as ImageIcon, Phone as PhoneIcon,
  TrendingUp, ShieldCheck, Layers,
} from 'lucide-react';

interface PageProps {
  params: Promise<{ id: string }> | { id: string };
}

/* Country flag emoji lookup */
const flagMap: Record<string, string> = {
  germany: '🇩🇪', netherlands: '🇳🇱', france: '🇫🇷', sweden: '🇸🇪', spain: '🇪🇸',
  poland: '🇵🇱', italy: '🇮🇹', 'united kingdom': '🇬🇧', uk: '🇬🇧', switzerland: '🇨🇭',
  austria: '🇦🇹', belgium: '🇧🇪', ireland: '🇮🇪', portugal: '🇵🇹', denmark: '🇩🇰',
  norway: '🇳🇴', finland: '🇫🇮', czech: '🇨🇿', hungary: '🇭🇺', usa: '🇺🇸', canada: '🇨🇦',
  australia: '🇦🇺', india: '🇮🇳', japan: '🇯🇵', china: '🇨🇳',
};

function getFlag(country: string) {
  return flagMap[country.toLowerCase()] ?? '🏫';
}

/* Reusable info row for the sidebar */
function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  if (!value && value !== false) return null;
  return (
    <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-50 last:border-0 last:pb-0">
      <span className="text-sm text-slate-400 font-medium flex-shrink-0">{label}</span>
      <span className="text-sm font-bold text-slate-800 text-right">{value}</span>
    </div>
  );
}

/* Section card wrapper */
function SectionCard({ icon, title, iconColor, children }: {
  icon: React.ReactNode; title: string; iconColor: string; children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm">
      <h2 className="font-display font-bold text-xl md:text-2xl text-slate-900 mb-6 pb-4 border-b border-slate-100 flex items-center gap-3">
        <span className={`p-2 rounded-xl ${iconColor}`}>{icon}</span>
        {title}
      </h2>
      {children}
    </div>
  );
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  try {
    await connectDB();
    const university = await University.findById(id);
    if (!university) return { title: 'University Not Found - WorldPassport' };
    return {
      title: `${university.name} - Study in ${university.country} | WorldPassport`,
      description: university.description
        ? university.description.substring(0, 160)
        : `Find courses and admission information for ${university.name}.`,
    };
  } catch {
    return { title: 'University Details - WorldPassport' };
  }
}

export default async function UniversityDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  let university: any;
  let courses: any[] = [];

  try {
    await connectDB();
    university = await University.findById(id).lean();
    if (!university) notFound();
    courses = await Course.find({ university: university.name }).sort({ createdAt: -1 }).lean();
  } catch (err) {
    console.error('Error fetching university details:', err);
    notFound();
  }

  const heroImage =
    university.image && university.image.startsWith('data:')
      ? university.image
      : university.image ||
        'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1920&q=80';

  return (
    <main className="bg-slate-50 text-gray-900 min-h-screen flex flex-col">
      <AOSInit />
      <Navbar />

      {/* ── Hero Banner ── */}
      <section className="relative h-[50vh] md:h-[60vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={heroImage} alt={university.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
          {/* Subtle top gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/20 to-transparent h-32" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-10 md:pb-16">
          <Link
            href="/overseas#universities"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-semibold mb-6 transition-colors group bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Universities
          </Link>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white bg-violet-600/80 border border-violet-500/30 backdrop-blur-sm shadow-md">
              <span className="text-sm">{getFlag(university.country)}</span> {university.country}
            </span>
            {university.type && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white bg-blue-500/80 border border-blue-400/30 backdrop-blur-sm shadow-md">
                <Building2 size={12} /> {university.type}
              </span>
            )}
            {university.ranking && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white bg-amber-500/80 border border-amber-400/30 backdrop-blur-sm shadow-md">
                <Award size={12} className="text-yellow-300" /> Rank #{university.ranking}
              </span>
            )}
            {university.featuredUniversity && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white bg-emerald-500/80 border border-emerald-400/30 backdrop-blur-sm shadow-md">
                <Star size={12} /> Featured
              </span>
            )}
            {university.internationalStudentsAccepted && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white bg-sky-500/80 border border-sky-400/30 backdrop-blur-sm shadow-md">
                <Users size={12} /> Intl. Students Welcome
              </span>
            )}
          </div>

          <h1 className="font-display font-bold text-3xl md:text-5xl lg:text-6xl text-white tracking-tight leading-tight max-w-4xl">
            {university.name}
          </h1>

          {(university.city || university.campusLocation) && (
            <p className="flex items-center gap-2 text-white/80 text-base md:text-lg mt-3 font-medium">
              <MapPin size={18} className="text-violet-400 flex-shrink-0" />
              {university.city}
              {university.campusLocation ? ` · ${university.campusLocation}` : ''}
              {`, ${university.country}`}
            </p>
          )}

          {university.website && (
            <a
              href={university.website.startsWith('http') ? university.website : `https://${university.website}`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-3 text-white/60 hover:text-white text-sm transition-colors"
            >
              <Globe size={14} /> {university.website.replace(/^https?:\/\//, '')}
              <ExternalLink size={12} />
            </a>
          )}
        </div>
      </section>

      {/* ── Quick Stats Strip ── */}
      <div className="bg-white border-b border-slate-100 shadow-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-0 overflow-x-auto">
            {[
              { label: 'Country', value: university.country, icon: '🌍' },
              { label: 'City', value: university.city, icon: '📍' },
              { label: 'Type', value: university.type, icon: '🏛️' },
              { label: 'Est.', value: university.establishedYear, icon: '📅' },
              { label: 'Ranking', value: university.ranking ? `#${university.ranking}` : null, icon: '🏅' },
              { label: 'Tuition/yr', value: university.tuitionFee, icon: '💰' },
            ]
              .filter(s => s.value)
              .map((s, i, arr) => (
                <div
                  key={s.label}
                  className={`flex items-center gap-2.5 px-4 py-3.5 flex-shrink-0 ${i < arr.length - 1 ? 'border-r border-slate-100' : ''}`}
                >
                  <span className="text-lg">{s.icon}</span>
                  <div>
                    <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide leading-none mb-0.5">{s.label}</div>
                    <div className="text-sm font-bold text-slate-800 whitespace-nowrap">{s.value}</div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <section className="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow">
        <div className="grid lg:grid-cols-3 gap-8 items-start">

          {/* ── Left / Main Column ── */}
          <div className="lg:col-span-2 space-y-6">

            {/* About */}
            <SectionCard
              icon={<Info size={20} className="text-violet-600" />}
              iconColor="bg-violet-50"
              title="About the University"
            >
              <p className="text-slate-600 text-sm md:text-base leading-relaxed whitespace-pre-line mb-6">
                {university.description || 'No description available. Contact our counseling team for detailed insights.'}
              </p>

              {/* Key stats grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-5 border-t border-slate-50">
                {university.establishedYear && (
                  <div className="text-center p-3 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="text-xl mb-1 block">📅</span>
                    <span className="text-xs text-slate-400 font-medium block mb-0.5">Established</span>
                    <span className="font-bold text-slate-800 text-sm">{university.establishedYear}</span>
                  </div>
                )}
                {university.campusLocation && (
                  <div className="text-center p-3 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="text-xl mb-1 block">🗺️</span>
                    <span className="text-xs text-slate-400 font-medium block mb-0.5">Campus</span>
                    <span className="font-bold text-slate-800 text-sm">{university.campusLocation}</span>
                  </div>
                )}
                <div className="text-center p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-xl mb-1 block">{university.internationalStudentsAccepted ? '✅' : '❌'}</span>
                  <span className="text-xs text-slate-400 font-medium block mb-0.5">Intl. Students</span>
                  <span className={`font-bold text-sm ${university.internationalStudentsAccepted ? 'text-emerald-600' : 'text-red-500'}`}>
                    {university.internationalStudentsAccepted ? 'Accepted' : 'Not Accepted'}
                  </span>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-xl mb-1 block">{university.accommodationAvailable ? '🏠' : '🚫'}</span>
                  <span className="text-xs text-slate-400 font-medium block mb-0.5">Accommodation</span>
                  <span className={`font-bold text-sm ${university.accommodationAvailable ? 'text-emerald-600' : 'text-slate-500'}`}>
                    {university.accommodationAvailable ? 'Available' : 'Not Available'}
                  </span>
                </div>
              </div>
            </SectionCard>

            {/* Academic Programs */}
            <SectionCard
              icon={<BookOpen size={20} className="text-blue-600" />}
              iconColor="bg-blue-50"
              title="Academic Programs"
            >
              {/* Available courses / programs */}
              <div className="mb-6">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Available Courses / Programs</h3>
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
                  <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">
                    {university.availableCourses || 'Contact us for a full list of programs.'}
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Degree Levels */}
                {university.degreeLevels && university.degreeLevels.length > 0 && (
                  <div>
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Degree Levels</h3>
                    <div className="flex flex-wrap gap-2">
                      {university.degreeLevels.map((lvl: string) => (
                        <span key={lvl} className="px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-semibold rounded-xl border border-blue-100 flex items-center gap-1.5">
                          <GraduationCap size={11} /> {lvl}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {/* Study Fields */}
                {university.studyFields && university.studyFields.length > 0 && (
                  <div>
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Fields of Study</h3>
                    <div className="flex flex-wrap gap-2">
                      {university.studyFields.map((field: string) => (
                        <span key={field} className="px-3 py-1.5 bg-violet-50 text-violet-700 text-xs font-semibold rounded-xl border border-violet-100 flex items-center gap-1.5">
                          <Layers size={11} /> {field}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Courses from Course model */}
              {courses.length > 0 && (
                <div className="mt-6 pt-5 border-t border-slate-50">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Listed Courses</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {courses.map((course: any) => (
                      <div key={course._id?.toString()} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h4 className="font-bold text-slate-800 text-sm leading-snug">{course.title}</h4>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-semibold flex-shrink-0">{course.level}</span>
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400">
                          {course.duration && <span className="flex items-center gap-1"><Clock size={10} />{course.duration}</span>}
                          {course.tuitionFee && <span className="flex items-center gap-1"><DollarSign size={10} />{course.tuitionFee}</span>}
                          {course.intake && <span className="flex items-center gap-1"><Calendar size={10} />{course.intake}</span>}
                        </div>
                        {course.description && <p className="text-xs text-slate-500 mt-2 leading-relaxed line-clamp-2">{course.description}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </SectionCard>

            {/* Admission Requirements */}
            <SectionCard
              icon={<CheckCircle2 size={20} className="text-emerald-600" />}
              iconColor="bg-emerald-50"
              title="Admission Requirements"
            >
              {!university.intakeMonths && !university.applicationDeadline && !university.minAcademicRequirement && !university.englishRequirement ? (
                <p className="text-slate-400 text-sm italic">No admission requirements listed. Contact us for details.</p>
              ) : (
                <div className="grid md:grid-cols-2 gap-5">
                  {university.intakeMonths && (
                    <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                      <span className="text-xs text-emerald-600 font-bold uppercase tracking-wide block mb-1 flex items-center gap-1.5">
                        <Calendar size={11} /> Intake Months
                      </span>
                      <span className="font-bold text-slate-800 text-sm">{university.intakeMonths}</span>
                    </div>
                  )}
                  {university.applicationDeadline && (
                    <div className="p-4 bg-rose-50 rounded-2xl border border-rose-100">
                      <span className="text-xs text-rose-600 font-bold uppercase tracking-wide block mb-1 flex items-center gap-1.5">
                        <Clock size={11} /> Application Deadline
                      </span>
                      <span className="font-bold text-slate-800 text-sm">{university.applicationDeadline}</span>
                    </div>
                  )}
                  {university.minAcademicRequirement && (
                    <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 md:col-span-2">
                      <span className="text-xs text-blue-600 font-bold uppercase tracking-wide block mb-1 flex items-center gap-1.5">
                        <TrendingUp size={11} /> Minimum Academic Requirement
                      </span>
                      <span className="font-bold text-slate-800 text-sm">{university.minAcademicRequirement}</span>
                    </div>
                  )}
                  {university.englishRequirement && (
                    <div className="p-4 bg-violet-50 rounded-2xl border border-violet-100 md:col-span-2">
                      <span className="text-xs text-violet-600 font-bold uppercase tracking-wide block mb-1 flex items-center gap-1.5">
                        <ShieldCheck size={11} /> English Language Requirement (IELTS / TOEFL / PTE)
                      </span>
                      <span className="font-bold text-slate-800 text-sm">{university.englishRequirement}</span>
                    </div>
                  )}
                </div>
              )}
            </SectionCard>

            {/* Media Gallery */}
            {((university.universityImages && university.universityImages.length > 0) || university.campusVideoUrl) && (
              <SectionCard
                icon={<ImageIcon size={20} className="text-rose-500" />}
                iconColor="bg-rose-50"
                title="Campus Gallery & Media"
              >
                {university.universityImages && university.universityImages.length > 0 && (
                  <div className={`grid gap-3 mb-5 ${university.universityImages.length === 1 ? 'grid-cols-1' : university.universityImages.length === 2 ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-3'}`}>
                    {university.universityImages.map((img: string, i: number) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={i}
                        src={img}
                        alt={`${university.name} campus ${i + 1}`}
                        className={`w-full object-cover rounded-2xl border border-gray-100 shadow-sm hover:opacity-90 transition-opacity ${i === 0 && university.universityImages.length >= 3 ? 'col-span-2 h-48' : 'h-36'}`}
                      />
                    ))}
                  </div>
                )}
                {university.campusVideoUrl && (
                  <a
                    href={university.campusVideoUrl}
                    target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 text-violet-600 hover:text-violet-700 font-bold text-sm bg-violet-50 hover:bg-violet-100 px-5 py-3 rounded-2xl border border-violet-100 transition-all"
                  >
                    <PlayCircle size={20} /> Watch Campus Video
                    <ExternalLink size={13} />
                  </a>
                )}
              </SectionCard>
            )}
          </div>

          {/* ── Right / Sidebar ── */}
          <div className="space-y-5">

            {/* Quick Facts */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
              <h3 className="font-display font-bold text-lg text-slate-900 mb-5 pb-3 border-b border-slate-100 flex items-center gap-2">
                <Landmark size={18} className="text-violet-500" /> Quick Facts
              </h3>
              <div className="space-y-3">
                <InfoRow label="Country" value={<span className="flex items-center gap-1.5">{getFlag(university.country)} {university.country}</span>} />
                <InfoRow label="City" value={university.city} />
                {university.campusLocation && <InfoRow label="Campus" value={university.campusLocation} />}
                <InfoRow label="Type" value={university.type} />
                {university.establishedYear && <InfoRow label="Established" value={university.establishedYear} />}
                {university.ranking && <InfoRow label="QS Ranking" value={`#${university.ranking}`} />}
                <InfoRow
                  label="Int'l Students"
                  value={
                    <span className={university.internationalStudentsAccepted ? 'text-emerald-600' : 'text-slate-400'}>
                      {university.internationalStudentsAccepted ? '✅ Accepted' : '❌ Not Accepted'}
                    </span>
                  }
                />
                <InfoRow
                  label="Featured"
                  value={university.featuredUniversity ? <span className="text-amber-500">⭐ Yes</span> : null}
                />
              </div>

              {university.website && (
                <a
                  href={university.website.startsWith('http') ? university.website : `https://${university.website}`}
                  target="_blank" rel="noopener noreferrer"
                  className="mt-5 flex items-center justify-center gap-2 w-full py-3 px-4 rounded-2xl border border-slate-200 font-bold text-slate-700 hover:bg-slate-50 hover:border-violet-200 hover:text-violet-700 transition-all text-sm"
                >
                  <Globe size={15} /> Visit Official Website <ExternalLink size={13} />
                </a>
              )}
            </div>

            {/* Financial Info */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
              <h3 className="font-display font-bold text-lg text-slate-900 mb-5 pb-3 border-b border-slate-100 flex items-center gap-2">
                <DollarSign size={18} className="text-amber-500" /> Financials
              </h3>
              <div className="space-y-3">
                {university.tuitionFee && (
                  <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-100">
                    <span className="text-xs text-amber-600 font-bold uppercase tracking-wide block mb-1">Tuition Fee (Per Year)</span>
                    <span className="font-bold text-slate-800 text-base">{university.tuitionFee}</span>
                  </div>
                )}
                {university.applicationFee && (
                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-wide block mb-1">Application Fee</span>
                    <span className="font-bold text-slate-800">{university.applicationFee}</span>
                  </div>
                )}
                {/* Scholarship */}
                <div className={`p-3.5 rounded-2xl border ${university.scholarshipAvailable ? 'bg-emerald-50 border-emerald-100' : 'bg-slate-50 border-slate-100'}`}>
                  <span className="text-xs font-bold uppercase tracking-wide block mb-1" style={{ color: university.scholarshipAvailable ? '#059669' : '#94a3b8' }}>
                    🎓 Scholarship
                  </span>
                  <span className={`font-bold text-sm ${university.scholarshipAvailable ? 'text-emerald-700' : 'text-slate-400'}`}>
                    {university.scholarshipAvailable ? 'Available' : 'Not Available'}
                  </span>
                  {university.scholarshipAvailable && university.scholarshipDetails && (
                    <p className="text-xs text-emerald-600 mt-1 leading-relaxed">{university.scholarshipDetails}</p>
                  )}
                </div>
                {/* Accommodation */}
                <div className={`p-3.5 rounded-2xl border ${university.accommodationAvailable ? 'bg-blue-50 border-blue-100' : 'bg-slate-50 border-slate-100'}`}>
                  <span className="text-xs font-bold uppercase tracking-wide block mb-1" style={{ color: university.accommodationAvailable ? '#2563eb' : '#94a3b8' }}>
                    🏠 Accommodation
                  </span>
                  <span className={`font-bold text-sm ${university.accommodationAvailable ? 'text-blue-700' : 'text-slate-400'}`}>
                    {university.accommodationAvailable ? 'Available' : 'Not Available'}
                  </span>
                  {university.accommodationAvailable && university.accommodationDetails && (
                    <p className="text-xs text-blue-600 mt-1 leading-relaxed">{university.accommodationDetails}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Information */}
            {(university.emailAddress || university.phoneNumber || university.address) && (
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                <h3 className="font-display font-bold text-lg text-slate-900 mb-5 pb-3 border-b border-slate-100 flex items-center gap-2">
                  <Mail size={18} className="text-violet-500" /> Contact Info
                </h3>
                <div className="space-y-3">
                  {university.emailAddress && (
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center flex-shrink-0">
                        <Mail size={14} className="text-violet-500" />
                      </div>
                      <a href={`mailto:${university.emailAddress}`} className="text-sm text-slate-600 hover:text-violet-600 transition-colors break-all font-medium">
                        {university.emailAddress}
                      </a>
                    </div>
                  )}
                  {university.phoneNumber && (
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center flex-shrink-0">
                        <Phone size={14} className="text-violet-500" />
                      </div>
                      <span className="text-sm text-slate-600 font-medium">{university.phoneNumber}</span>
                    </div>
                  )}
                  {university.address && (
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <MapPin size={14} className="text-violet-500" />
                      </div>
                      <span className="text-sm text-slate-600 leading-relaxed font-medium">{university.address}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* CTA Card */}
            <div className="bg-gradient-to-br from-violet-600 to-indigo-700 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-28 h-28 bg-white/5 rounded-full blur-xl translate-x-6 -translate-y-6" />
              <div className="absolute bottom-0 left-0 w-36 h-36 bg-white/5 rounded-full blur-2xl -translate-x-12 translate-y-12" />
              <div className="relative z-10 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center">
                  <GraduationCap size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg md:text-xl leading-snug">Want to Study Here?</h3>
                  <p className="text-white/75 text-sm mt-2 leading-relaxed">
                    Get end-to-end guidance from our experts — application review, SOP editing, scholarships, and visa processing.
                  </p>
                </div>
                <div className="space-y-2.5">
                  <Link
                    href={`/contact?university=${encodeURIComponent(university.name)}`}
                    className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-2xl bg-white text-violet-700 font-bold hover:bg-slate-50 transition-colors shadow-md text-sm"
                  >
                    Get Free Counseling
                  </Link>
                  <Link
                    href="/overseas"
                    className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-2xl border border-white/20 text-white/80 font-semibold hover:bg-white/10 transition-colors text-sm"
                  >
                    Browse More Universities
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
