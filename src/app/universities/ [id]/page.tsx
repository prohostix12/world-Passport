import connectDB from '@/lib/mongodb';
import { University, Course } from '@/lib/models';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AOSInit from '@/components/AOSInit';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  MapPin, 
  Globe, 
  Award, 
  BookOpen, 
  Clock, 
  DollarSign, 
  ArrowLeft, 
  ExternalLink,
  ChevronRight,
  GraduationCap
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

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  
  try {
    await connectDB();
    const university = await University.findById(id);
    if (!university) {
      return {
        title: 'University Not Found - GE Council',
        description: 'The requested university details could not be found.',
      };
    }
    return {
      title: `${university.name} - Study in ${university.country} | GE Council`,
      description: university.description 
        ? university.description.substring(0, 160) 
        : `Find courses, tuition fees, ranking, and admission information for ${university.name} in ${university.city || university.country}.`,
    };
  } catch {
    return {
      title: 'University Details - GE Council',
      description: 'Explore partner university information.',
    };
  }
}

export default async function UniversityDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  let university;
  let courses = [];

  try {
    await connectDB();
    university = await University.findById(id);
    if (!university) {
      notFound();
    }
    // Fetch courses related to this university
    courses = await Course.find({ university: university.name }).sort({ createdAt: -1 });
  } catch (err) {
    console.error('Error fetching university details:', err);
    notFound();
  }

  const defaultHeroBg = 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1920&q=80';
  const heroImage = university.image || defaultHeroBg;

  return (
    <main className="bg-slate-50 text-gray-900 min-h-screen flex flex-col">
      <AOSInit />
      <Navbar />

      {/* Hero Banner */}
      <section className="relative h-[45vh] md:h-[55vh] flex items-end overflow-hidden" id="uni-hero-banner">
        {/* Full-bleed Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={heroImage} 
            alt={university.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-10 md:pb-14">
          <Link 
            href="/#universities" 
            className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-semibold mb-6 transition-colors group bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10"
            id="back-to-home-link"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Universities
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white bg-violet-600/80 border border-violet-500/30 backdrop-blur-sm shadow-md">
              <span className="text-sm">{getFlag(university.country)}</span>
              {university.country}
            </span>
            {university.ranking && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-white bg-amber-500/80 border border-amber-400/30 backdrop-blur-sm shadow-md">
                <Award size={13} className="text-yellow-300" />
                Rank {university.ranking}
              </span>
            )}
          </div>

          <h1 className="font-display font-bold text-3xl md:text-5xl lg:text-6xl text-white tracking-tight leading-tight max-w-4xl" id="uni-title-heading">
            {university.name}
          </h1>

          {university.city && (
            <p className="flex items-center gap-2 text-white/80 text-base md:text-lg mt-3 font-medium">
              <MapPin size={18} className="text-violet-400" />
              {university.city}, {university.country}
            </p>
          )}
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow">
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Column: Description & Course Directory */}
          <div className="lg:col-span-2 space-y-10">
            {/* About Section */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm">
              <h2 className="font-display font-bold text-xl md:text-2xl text-slate-900 mb-5 pb-3 border-b border-slate-100">
                About the University
              </h2>
              {university.description ? (
                <p className="text-slate-600 text-sm md:text-base leading-relaxed whitespace-pre-line">
                  {university.description}
                </p>
              ) : (
                <p className="text-slate-400 text-sm italic">
                  No description available for this university. Contact our counseling team for detailed insights.
                </p>
              )}
            </div>

            {/* Courses / Programs Section */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm" id="uni-courses-section">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-3 border-b border-slate-100">
                <div>
                  <h2 className="font-display font-bold text-xl md:text-2xl text-slate-900">
                    Offered Programs
                  </h2>
                  <p className="text-slate-400 text-xs mt-0.5">
                    Explore undergraduate, graduate, and doctoral tracks
                  </p>
                </div>
                <span className="self-start sm:self-auto text-xs font-semibold px-3 py-1.5 rounded-full bg-violet-50 text-violet-600 border border-violet-100">
                  {courses.length} {courses.length === 1 ? 'Program' : 'Programs'} Listed
                </span>
              </div>

              {courses.length > 0 ? (
                <div className="space-y-4">
                  {courses.map((course) => (
                    <div 
                      key={course._id.toString()}
                      className="group rounded-2xl border border-slate-100 p-5 hover:border-violet-200 hover:shadow-md transition-all duration-300 bg-white"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                        <div>
                          <span className="inline-block text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 mb-2">
                            {course.level}
                          </span>
                          <h3 className="font-bold text-slate-800 text-base md:text-lg group-hover:text-violet-700 transition-colors">
                            {course.title}
                          </h3>
                        </div>
                        {course.tuitionFee && (
                          <div className="text-left sm:text-right shrink-0">
                            <span className="text-xs text-slate-400 block font-medium">Tuition Fee</span>
                            <span className="font-bold text-slate-950 text-sm sm:text-base flex items-center gap-0.5 sm:justify-end text-violet-600">
                              <DollarSign size={14} className="-mr-0.5" />
                              {course.tuitionFee}
                            </span>
                          </div>
                        )}
                      </div>

                      {course.description && (
                        <p className="text-slate-500 text-xs md:text-sm line-clamp-2 mb-4">
                          {course.description}
                        </p>
                      )}

                      <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-50">
                        <div className="flex flex-wrap gap-4 text-xs text-slate-400">
                          {course.duration && (
                            <span className="flex items-center gap-1.5">
                              <Clock size={13} className="text-slate-300" />
                              Duration: {course.duration}
                            </span>
                          )}
                          {course.intake && (
                            <span className="flex items-center gap-1.5">
                              <BookOpen size={13} className="text-slate-300" />
                              Intake: {course.intake}
                            </span>
                          )}
                        </div>
                        
                        <Link 
                          href={`/contact?university=${encodeURIComponent(university.name)}&course=${encodeURIComponent(course.title)}`}
                          className="flex items-center gap-1 text-xs font-semibold text-violet-600 hover:text-violet-800 group/btn transition-colors"
                        >
                          Enquire Now 
                          <ChevronRight size={13} className="group-hover/btn:translate-x-0.5 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 border border-dashed border-slate-200 rounded-2xl">
                  <GraduationCap size={44} className="mx-auto text-slate-300 mb-3" />
                  <p className="text-slate-500 text-sm font-medium">
                    No specific programs have been published by the admin.
                  </p>
                  <p className="text-slate-400 text-xs mt-1">
                    Contact our study abroad consultants to get a custom prospectus.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Sidebar Stats & CTA */}
          <div className="space-y-6">
            
            {/* Quick Facts Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-5">
              <h3 className="font-display font-bold text-lg text-slate-900">
                Quick Facts
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start justify-between pb-3.5 border-b border-slate-50">
                  <span className="text-sm text-slate-400 font-medium">Country</span>
                  <span className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                    <span>{getFlag(university.country)}</span>
                    {university.country}
                  </span>
                </div>
                {university.city && (
                  <div className="flex items-start justify-between pb-3.5 border-b border-slate-50">
                    <span className="text-sm text-slate-400 font-medium">Location</span>
                    <span className="text-sm font-bold text-slate-800">{university.city}</span>
                  </div>
                )}
                {university.ranking && (
                  <div className="flex items-start justify-between pb-3.5 border-b border-slate-50">
                    <span className="text-sm text-slate-400 font-medium">World Ranking</span>
                    <span className="text-sm font-bold text-slate-800 bg-amber-50 px-2 py-0.5 rounded-md text-amber-700 border border-amber-100">
                      Rank {university.ranking}
                    </span>
                  </div>
                )}
                <div className="flex items-start justify-between pb-1">
                  <span className="text-sm text-slate-400 font-medium">Total Courses</span>
                  <span className="text-sm font-bold text-slate-800">{courses.length} courses</span>
                </div>
              </div>

              {university.website && (
                <a 
                  href={university.website} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-xl border border-slate-200 font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors text-sm"
                  id="uni-website-button"
                >
                  Visit Official Website 
                  <ExternalLink size={14} className="text-slate-400" />
                </a>
              )}
            </div>

            {/* Consulting CTA Card */}
            <div className="bg-gradient-to-br from-violet-600 to-indigo-700 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
              {/* Subtle background circles */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-xl translate-x-4 -translate-y-4" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-x-10 translate-y-10" />

              <div className="relative z-10 space-y-5">
                <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
                  <GraduationCap size={24} className="text-white" />
                </div>
                
                <div>
                  <h3 className="font-display font-bold text-lg md:text-xl leading-snug">
                    Want to Study Here?
                  </h3>
                  <p className="text-white/80 text-sm mt-2 leading-relaxed">
                    Get end-to-end guidance from our top consultants. We handle application review, SOP editing, scholarships, and visa processing.
                  </p>
                </div>

                <Link 
                  href={`/contact?university=${encodeURIComponent(university.name)}`}
                  className="flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-xl bg-white text-violet-700 font-bold hover:bg-slate-50 transition-colors shadow-md text-sm cursor-pointer"
                  id="uni-counseling-cta"
                >
                  Get Free Counseling
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
