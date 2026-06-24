'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AOSInit from '@/components/AOSInit';
import { motion } from 'framer-motion';
import {
  Building2, Mail, Phone, MapPin, CheckCircle,
  ArrowRight, Globe, Users, ShieldCheck, Briefcase
} from 'lucide-react';

export default function PartnerPage() {
  const [form, setForm] = useState({
    organizationName: '',
    contactPerson: '',
    email: '',
    phone: '',
    country: '',
    interest: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/partner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error('Submission failed');
      setStatus('success');
      setForm({ organizationName: '', contactPerson: '', email: '', phone: '', country: '', interest: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  const interests = [
    "Student Recruitment",
    "University Partnership",
    "Scholarship Partnership",
    "Internship Opportunities",
    "Exchange Programs",
    "Other"
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <AOSInit />
      <Navbar />

      <main className="flex-grow pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header Section */}
          <div className="text-center mb-16 max-w-3xl mx-auto" data-aos="fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 text-violet-700 font-semibold text-sm mb-6 border border-violet-200">
              <HandshakeIcon size={16} /> Partner With Us
            </div>
            <h1 className="font-display font-extrabold text-4xl md:text-5xl text-gray-900 mb-6">
              Let&apos;s Build the Future of <span className="text-violet-600">Global Education</span>
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed">
              We collaborate with universities, recruitment agencies, and organizations worldwide to create unparalleled opportunities for students. Join our growing network of global partners.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-12 lg:gap-8 items-start">
            {/* Left Info Panel */}
            <div className="lg:col-span-2 space-y-8" data-aos="fade-right">

              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                <h3 className="font-display font-bold text-2xl text-gray-900 mb-6">Why Partner With Us?</h3>
                <div className="space-y-6">
                  {[
                    { icon: Globe, title: 'Global Reach', desc: 'Access to a vast network of students across multiple continents.' },
                    { icon: ShieldCheck, title: 'Trusted Brand', desc: 'Over a decade of excellence in international education.' },
                    { icon: Users, title: 'Dedicated Support', desc: 'A committed team to manage student applications and queries.' },
                  ].map((feature, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-violet-50 text-violet-600 flex items-center justify-center flex-shrink-0">
                        <feature.icon size={24} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{feature.title}</h4>
                        <p className="text-sm text-gray-500 mt-1">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500 rounded-full blur-[80px] opacity-30" />
                <h3 className="font-display font-bold text-xl mb-6 relative z-10">Partnership Inquiries</h3>
                <div className="space-y-4 relative z-10">
                  <div className="flex items-center gap-3 text-slate-300">
                    <Mail size={18} className="text-violet-400" />
                    <span>bmworldpassport.in</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-300">
                    <Phone size={18} className="text-violet-400" />
                    <span>+91 6238067220</span>
                  </div>
                  <div className="flex items-start gap-3 text-slate-300">
                    <MapPin size={18} className="text-violet-400 mt-1 flex-shrink-0" />
                    <span> St.George Building, Ponekkara, Edappally, Ernakulam, Kerala 682024
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Form Panel */}
            <div className="lg:col-span-3" data-aos="fade-left">
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white border border-green-100 rounded-3xl shadow-sm p-12 text-center h-full flex flex-col justify-center items-center"
                >
                  <CheckCircle size={64} className="text-green-500 mx-auto mb-6" />
                  <h3 className="font-display font-bold text-3xl text-gray-900 mb-4">Request Received!</h3>
                  <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto">
                    Your partnership request has been received and will be reviewed by our team. We will get back to you shortly.
                  </p>
                  <button onClick={() => setStatus('idle')} className="text-violet-600 font-semibold hover:text-violet-700">
                    Submit Another Inquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 md:p-10 border border-gray-100 shadow-sm">
                  <h3 className="font-display font-bold text-2xl text-gray-900 mb-8">Partnership Application</h3>

                  {status === 'error' && (
                    <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-medium border border-red-100">
                      Failed to submit request. Please try again or contact us directly.
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Organization Name *</label>
                      <input type="text" required value={form.organizationName} onChange={e => setForm({ ...form, organizationName: e.target.value })}
                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                        placeholder="University or Company" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Person *</label>
                      <input type="text" required value={form.contactPerson} onChange={e => setForm({ ...form, contactPerson: e.target.value })}
                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                        placeholder="John Doe" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                      <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                        placeholder="john@example.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                      <input type="tel" required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                        placeholder="+1 234 567 8900" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Country *</label>
                      <input type="text" required value={form.country} onChange={e => setForm({ ...form, country: e.target.value })}
                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                        placeholder="e.g. United Kingdom" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Partnership Interest *</label>
                      <select required value={form.interest} onChange={e => setForm({ ...form, interest: e.target.value })}
                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all appearance-none cursor-pointer">
                        <option value="" disabled>Select an area of interest</option>
                        {interests.map(interest => (
                          <option key={interest} value={interest}>{interest}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mb-8">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Message (Optional)</label>
                    <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} rows={4}
                      className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all resize-none"
                      placeholder="Tell us more about how we can collaborate..." />
                  </div>

                  <button type="submit" disabled={status === 'loading'}
                    className="w-full py-4 rounded-2xl bg-gray-900 text-white font-bold text-lg hover:bg-violet-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-70">
                    {status === 'loading' ? 'Submitting...' : (
                      <>Submit Partnership Request <ArrowRight size={20} /></>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

const HandshakeIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 12l-4-4-3 3-3-3-4 4"></path>
    <path d="M12 20a4 4 0 0 1-4-4"></path>
    <path d="M16 16a4 4 0 0 1-4-4"></path>
  </svg>
);
