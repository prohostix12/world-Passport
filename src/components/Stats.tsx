'use client';
import AnimatedCounter from './AnimatedCounter';

const stats = [
  { label: 'Partner Universities', value: 100, suffix: '+', icon: '🎓', accent: '#2563EB', desc: 'Across 12 European nations' },
  { label: 'Students Enrolled', value: 10000, suffix: '+', icon: '👩‍🎓', accent: '#DC2626', desc: 'Dreams fulfilled since 2015' },
  { label: 'European Countries', value: 12, suffix: '', icon: '🌍', accent: '#2563EB', desc: 'From UK to Switzerland' },
  { label: 'Goal Achievement Rate', value: 95, suffix: '%', icon: '🎯', accent: '#DC2626', desc: 'Unmatched success record' },
];

export default function Stats() {
  return (
    <section className="relative py-24 overflow-hidden bg-white">
      {/* Top border */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      {/* Soft blue tint bg */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(37,99,235,0.05),transparent)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14" data-aos="fade-up">
          <span className="badge badge-blue mb-4">Our Impact</span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-gray-900">
            Numbers That <span className="text-black">Tell Our Story</span>
          </h2>
          <div className="mt-5 flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-blue-300" />
            <div className="w-2 h-2 rounded-full bg-blue-400" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-blue-300" />
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              data-aos="fade-up"
              data-aos-delay={i * 100}
              className="relative card-white overflow-hidden group cursor-default shadow-sm"
            >
              {/* Colored top accent */}
              <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl"
                style={{ background: `linear-gradient(90deg, transparent, ${stat.accent}, transparent)` }} />

              <div className="p-6 md:p-8 text-center">
                <div className="text-5xl mb-4">{stat.icon}</div>
                <div className="font-display font-bold text-4xl md:text-5xl mb-1" style={{ color: stat.accent }}>
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-gray-800 text-sm font-semibold mb-1">{stat.label}</div>
                <div className="text-gray-500 text-xs">{stat.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
