'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { GraduationCap, MapPin, ExternalLink, Award } from 'lucide-react';

interface UniversityEntry {
  _id: string;
  name: string;
  country: string;
  city?: string;
  website?: string;
  ranking?: string;
  image?: string;
  description?: string;
}

/* Fallback static names for the marquee scroll */
const fallbackMarquee = [
  'University of Oxford', 'University of Cambridge', 'Sorbonne University', 'TU Munich',
  'University of Amsterdam', 'ETH Zurich', 'KU Leuven', 'University of Edinburgh',
  'Bocconi University', 'IE Business School', 'Leiden University', 'Uppsala University',
];

/* Country flag emoji lookup */
const flagMap: Record<string, string> = {
  germany: '🇩🇪', netherlands: '🇳🇱', france: '🇫🇷', sweden: '🇸🇪', spain: '🇪🇸',
  poland: '🇵🇱', italy: '🇮🇹', 'united kingdom': '🇬🇧', uk: '🇬🇧', switzerland: '🇨🇭',
  austria: '🇦🇹', belgium: '🇧🇪', ireland: '🇮🇪', portugal: '🇵🇹', denmark: '🇩🇰',
  norway: '🇳🇴', finland: '🇫🇮', czech: '🇨🇿', hungary: '🇭🇺', usa: '🇺🇸', canada: '🇨🇦',
  australia: '🇦🇺', india: '🇮🇳', japan: '🇯🇵', china: '🇨🇳',
};

const codeMap: Record<string, string> = {
  germany: 'DE', netherlands: 'NL', france: 'FR', sweden: 'SE', spain: 'ES',
  poland: 'PL', italy: 'IT', 'united kingdom': 'GB', uk: 'GB', switzerland: 'CH',
  austria: 'AT', belgium: 'BE', ireland: 'IE', portugal: 'PT', denmark: 'DK',
  norway: 'NO', finland: 'FI', czech: 'CZ', hungary: 'HU', usa: 'US', canada: 'CA',
  australia: 'AU', india: 'IN', japan: 'JP', china: 'CN',
};

function getFlag(country: string) {
  return flagMap[country.toLowerCase()] ?? '🏫';
}

function getCountryCode(country: string) {
  return codeMap[country.toLowerCase()] ?? country.substring(0, 2).toUpperCase();
}

/* Gradient palette for cards without images */
const gradients = [
  'from-violet-500 to-indigo-600',
  'from-blue-500 to-cyan-600',
  'from-rose-500 to-pink-600',
  'from-amber-500 to-orange-600',
  'from-emerald-500 to-teal-600',
  'from-purple-500 to-violet-600',
];

export default function Universities() {
  const [universities, setUniversities] = useState<UniversityEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/universities')
      .then(r => r.json())
      .then(data => setUniversities(data.universities || []))
      .catch(() => setUniversities([]))
      .finally(() => setLoading(false));
  }, []);

  /* Decide marquee names: prefer live DB names, fallback to static */
  const marqueeNames = universities.length > 0 ? universities.map(u => u.name) : fallbackMarquee;

  return (
    <section className="py-24 relative overflow-hidden bg-white" id="universities">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-14" data-aos="fade-up">
          <span className="badge badge-red mb-4">Our Network</span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-gray-900 mb-4">
            100+ Partner <span className="text-gradient">Universities</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Across 12 European countries — no gatekeeping, no hidden fees
          </p>
          <div className="mt-5 flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-red-300" />
            <div className="w-2 h-2 rounded-full bg-red-400" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-red-300" />
          </div>
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-14">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
                <div className="h-40 bg-gray-100" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-100 rounded w-3/4" />
                  <div className="h-3 bg-gray-100 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* University Cards Grid */}
        {!loading && universities.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-14">
            {universities.map((u, i) => {
              const countryCode = getCountryCode(u.country);
              return (
                <Link
                  key={u._id}
                  href={`/universities/${u._id}`}
                  data-aos="zoom-in"
                  data-aos-delay={i * 50}
                  className="group relative flex flex-col justify-end h-72 rounded-[24px] overflow-hidden border border-gray-200/30 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-slate-950 cursor-pointer"
                >
                  {/* Background Image / Fallback Gradient */}
                  {u.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={u.image}
                      alt={u.name}
                      className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:opacity-90 group-hover:scale-110 transition-all duration-500"
                      onError={e => { e.currentTarget.style.display = 'none'; }}
                    />
                  ) : (
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradients[i % gradients.length]} opacity-75`} />
                  )}

                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/30 to-transparent z-10" />

                  {/* Text Details overlaying the image */}
                  <div className="relative z-20 p-4 flex flex-col items-center text-center justify-end w-full">
                    {/* University Name */}
                    <h3 className="font-display font-bold text-white text-sm leading-tight mb-1 drop-shadow-md line-clamp-2 px-1">
                      {u.name}
                    </h3>

                    {/* Country */}
                    <span className="text-[10px] font-semibold text-sky-400 uppercase tracking-wider drop-shadow-sm">
                      {u.country}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Empty state (no DB universities) */}
        {!loading && universities.length === 0 && (
          <div className="text-center py-12 mb-14 text-gray-400">
            <GraduationCap size={40} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm">Universities will appear here once added by the admin.</p>
          </div>
        )}

        {/* Marquee strip */}
        <div data-aos="fade-up" className="relative overflow-hidden py-3">
          <div className="absolute left-0 top-0 bottom-0 w-28 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 w-28 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />
          <div className="flex gap-3 animate-marquee whitespace-nowrap">
            {[...marqueeNames, ...marqueeNames].map((name, i) => (
              <div key={i}
                className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gray-50 border border-gray-200 text-gray-700 text-sm font-medium flex-shrink-0 hover:border-violet-300 hover:text-violet-600 transition-all cursor-default">
                <div className="w-1.5 h-1.5 rounded-full bg-violet-500 flex-shrink-0" />
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
