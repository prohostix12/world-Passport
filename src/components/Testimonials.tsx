'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const testimonials = [
  { name: 'Priya Sharma',    from: 'Delhi → Amsterdam',    university: 'University of Amsterdam', program: 'MSc Data Science',           quote: "GE Council made the impossible feel possible. From finding the right program to my visa approval — they were with me every step. Now I'm living my dream in Amsterdam!", rating: 5, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80', bg: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?w=800&q=80' },
  { name: 'Rahul Mehta',     from: 'Mumbai → Munich',      university: 'TU Munich',               program: 'MS Mechanical Engineering',  quote: "No hidden fees, transparent guidance, genuine care. They helped me secure admission to one of Germany's best engineering schools.", rating: 5, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80', bg: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80' },
  { name: 'Ananya Krishnan', from: 'Bangalore → Edinburgh', university: 'University of Edinburgh', program: 'MBA International Business', quote: "I was skeptical at first, but GE Council's counsellors truly understand the European university system. My family was worried, but now they're proud!", rating: 5, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80', bg: 'https://images.unsplash.com/photo-1486299267070-83823f5448dd?w=800&q=80' },
  { name: 'Vikram Patel',    from: 'Ahmedabad → Milan',    university: 'Bocconi University',      program: 'BSc Economics & Management', quote: 'Getting into Bocconi seemed like a dream. GE Council guided me through every requirement and my application stood out. Forever grateful!', rating: 5, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80', bg: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80' },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const t = testimonials[current];

  return (
    <section className="py-24 relative overflow-hidden bg-[#F8FAFF]">
      {/* Decorative quote marks */}
      <div className="absolute top-12 left-6 text-[160px] leading-none font-serif text-blue-100 pointer-events-none select-none">&ldquo;</div>
      <div className="absolute bottom-12 right-6 text-[160px] leading-none font-serif text-red-100 pointer-events-none select-none">&rdquo;</div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14" data-aos="fade-up">
          <span className="badge badge-red mb-4">Student Stories</span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-gray-900 mb-3">
            Real Stories, <span className="text-gradient-red">Real Impact</span>
          </h2>
          <p className="text-gray-500 text-lg">95% of our students achieve their educational goals</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-5 items-stretch" data-aos="fade-up" data-aos-delay="100">

          {/* Main testimonial card */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div key={current}
                initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.4 }}
                className="relative bg-white rounded-3xl overflow-hidden h-full min-h-[380px] shadow-md border border-gray-100">

                {/* Top accent */}
                <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-3xl"
                  style={{ background: 'linear-gradient(90deg, #2563EB, #DC2626)' }} />

                {/* Background image subtle */}
                <div className="absolute inset-0 opacity-[0.07]"
                  style={{ backgroundImage: `url('${t.bg}')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />

                {/* Quote icon */}
                <div className="absolute top-7 right-7">
                  <Quote size={44} className="text-blue-200" />
                </div>

                <div className="relative p-8 md:p-10 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex gap-1 mb-5">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} size={15} className="fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-700 text-lg md:text-xl leading-relaxed italic mb-8">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>

                  <div>
                    <div className="h-px bg-gray-100 mb-6" />
                    <div className="flex items-center justify-between flex-wrap gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full border-2 border-blue-300 flex-shrink-0 overflow-hidden">
                          <div className="w-full h-full"
                            style={{ backgroundImage: `url('${t.avatar}')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                        </div>
                        <div>
                          <div className="font-display font-bold text-gray-900">{t.name}</div>
                          <div className="text-blue-600 text-sm">{t.from}</div>
                        </div>
                      </div>
                      <div className="px-4 py-2 rounded-xl bg-blue-50 border border-blue-100 text-right">
                        <div className="text-gray-800 text-sm font-semibold">{t.university}</div>
                        <div className="text-gray-500 text-xs">{t.program}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Side panel */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            {testimonials.map((item, i) => (
              <button key={item.name} onClick={() => setCurrent(i)}
                className={`text-left rounded-2xl p-4 border transition-all duration-200 hover:translate-x-1 ${
                  i === current
                    ? 'bg-blue-50 border-blue-200 shadow-sm'
                    : 'bg-white border-gray-200 hover:border-blue-200'
                }`}>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full flex-shrink-0 border-2 overflow-hidden"
                    style={{ borderColor: i === current ? '#2563EB' : '#E5E7EB' }}>
                    <div className="w-full h-full"
                      style={{ backgroundImage: `url('${item.avatar}')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`font-semibold text-sm truncate ${i === current ? 'text-blue-700' : 'text-gray-700'}`}>{item.name}</div>
                    <div className="text-gray-400 text-xs truncate">{item.from}</div>
                    <div className="flex gap-0.5 mt-1">
                      {Array.from({ length: item.rating }).map((_, j) => (
                        <Star key={j} size={9} className={i === current ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-300 text-gray-300'} />
                      ))}
                    </div>
                  </div>
                  {i === current && (
                    <motion.div layoutId="t-dot" className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0" />
                  )}
                </div>
              </button>
            ))}

            {/* Navigation */}
            <div className="flex gap-2 mt-auto pt-3">
              <button
                onClick={() => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1))}
                className="w-11 h-11 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-blue-600 hover:border-blue-300 transition-all">
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1))}
                className="w-11 h-11 rounded-full bg-gradient-to-r from-[#2563EB] to-[#DC2626] flex items-center justify-center text-white hover:opacity-90 transition-all shadow-md">
                <ChevronRight size={16} />
              </button>
              <div className="flex items-center gap-1.5 ml-2">
                {testimonials.map((_, i) => (
                  <button key={i} onClick={() => setCurrent(i)}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: i === current ? 20 : 6, height: 6,
                      background: i === current ? '#2563EB' : '#D1D5DB',
                    }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
