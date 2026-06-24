'use client';
import { useEffect, useState, useCallback, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Plus, Trash2, Loader2, X, LayoutDashboard, GraduationCap,
  BookOpen, Mail, LogOut, ChevronRight, Globe, ExternalLink, Pencil,
  CheckCircle2, AlertCircle, Upload, Handshake,
} from 'lucide-react';

/* ── Toast System ── */
type ToastType = 'success' | 'error';
interface ToastMsg { id: number; message: string; type: ToastType; }

function useToast() {
  const [toasts, setToasts] = useState<ToastMsg[]>([]);
  const counter = useRef(0);
  const show = (message: string, type: ToastType = 'success') => {
    const id = ++counter.current;
    setToasts(p => [...p, { id, message, type }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3500);
  };
  return { toasts, show };
}

function ToastContainer({ toasts }: { toasts: ToastMsg[] }) {
  return (
    <div className="fixed top-5 right-5 z-[100] flex flex-col gap-3 pointer-events-none">
      {toasts.map(t => (
        <div key={t.id}
          className="flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl text-sm font-semibold text-white animate-slideIn pointer-events-auto"
          style={{
            background: t.type === 'success'
              ? 'linear-gradient(135deg,#16A34A,#15803D)'
              : 'linear-gradient(135deg,#DC2626,#B91C1C)',
            boxShadow: t.type === 'success'
              ? '0 8px 30px rgba(22,163,74,0.4)'
              : '0 8px 30px rgba(220,38,38,0.4)',
            animation: 'slideIn 0.3s ease-out',
          }}
        >
          {t.type === 'success'
            ? <CheckCircle2 size={18} className="flex-shrink-0" />
            : <AlertCircle size={18} className="flex-shrink-0" />}
          <span>{t.message}</span>
        </div>
      ))}
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(60px) scale(0.95); }
          to   { opacity: 1; transform: translateX(0)   scale(1); }
        }
      `}</style>
    </div>
  );
}

/* ── Types ── */
interface ContactEntry { _id: string; name: string; email: string; phone?: string; subject?: string; message: string; createdAt: string; }
interface UniversityEntry {
  _id: string; name: string; image?: string; country: string; city: string; type: string;
  description: string; establishedYear?: string; campusLocation?: string; website?: string; ranking?: string;
  availableCourses: string; degreeLevels: string[]; studyFields: string[]; intakeMonths?: string;
  applicationDeadline?: string; minAcademicRequirement?: string; englishRequirement?: string;
  tuitionFee?: string; applicationFee?: string; scholarshipAvailable: boolean; scholarshipDetails?: string;
  internationalStudentsAccepted: boolean; accommodationAvailable: boolean; accommodationDetails?: string;
  universityImages: string[]; campusVideoUrl?: string; emailAddress?: string; phoneNumber?: string;
  address?: string; featuredUniversity: boolean; activeStatus: boolean; createdAt: string;
}
interface CourseEntry { _id: string; title: string; university: string; country: string; level: string; duration?: string; tuitionFee?: string; intake?: string; description?: string; createdAt: string; }
interface PartnerEntry { _id: string; organizationName: string; contactPerson: string; email: string; phone: string; country: string; interest: string; message?: string; status: 'Pending' | 'Approved' | 'Rejected'; createdAt: string; }

type Tab = 'dashboard' | 'universities' | 'courses' | 'contacts' | 'partners';

const EMPTY_UNI = {
  name: '', image: '', country: '', city: '', type: 'Public', description: '',
  establishedYear: '', campusLocation: '', website: '', ranking: '',
  availableCourses: '', degreeLevels: [] as string[], studyFields: [] as string[],
  intakeMonths: '', applicationDeadline: '', minAcademicRequirement: '', englishRequirement: '',
  tuitionFee: '', applicationFee: '', scholarshipAvailable: false, scholarshipDetails: '',
  internationalStudentsAccepted: false, accommodationAvailable: false, accommodationDetails: '',
  universityImages: [] as string[], campusVideoUrl: '', emailAddress: '', phoneNumber: '',
  address: '', featuredUniversity: false, activeStatus: true
};
const EMPTY_COURSE = { title: '', university: '', country: '', level: "Master's", duration: '', tuitionFee: '', intake: '', description: '' };

function isToday(d: string) {
  const date = new Date(d), now = new Date();
  return date.getDate() === now.getDate() && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
}

const inputCls = 'w-full px-3 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/25 focus:border-violet-500 transition-all placeholder-gray-400';
const labelCls = 'block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide';

/* ── Modal ── */
function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl p-7 z-10 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
            <X size={15} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

/* ── Stat Card ── */
function StatCard({ icon, label, value, color, onClick }: { icon: React.ReactNode; label: string; value: number | string; color: string; onClick?: () => void }) {
  return (
    <div onClick={onClick} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-3 hover:shadow-md transition-shadow group cursor-pointer">
      <div className="flex items-center justify-between">
        <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-white text-lg shadow-md" style={{ background: color }}>
          {icon}
        </div>
        <ChevronRight size={16} className="text-gray-300 group-hover:text-gray-500 transition-colors" />
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-400 mt-0.5">{label}</p>
      </div>
    </div>
  );
}

/* ── University Form ── */
const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100 space-y-4 mb-4">
    <h4 className="text-sm font-bold text-gray-800">{title}</h4>
    {children}
  </div>
);

function UniversityForm({
  form, setForm, onSubmit, onClose, saving, isEdit,
}: {
  form: typeof EMPTY_UNI;
  setForm: React.Dispatch<React.SetStateAction<typeof EMPTY_UNI>>;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
  saving: boolean;
  isEdit: boolean;
}) {
  const upd = (k: keyof typeof EMPTY_UNI) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [k]: e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value }));

  const toggleArray = (k: 'degreeLevels' | 'studyFields', val: string) => {
    setForm(p => {
      const arr = p[k] as string[];
      if (arr.includes(val)) return { ...p, [k]: arr.filter(x => x !== val) };
      return { ...p, [k]: [...arr, val] };
    });
  };

  const processFile = (file: File, isMultiple: boolean = false) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width, height = img.height;
        const MAX = 1200;
        if (width > height && width > MAX) { height = Math.round((height * MAX) / width); width = MAX; }
        else if (height > MAX) { width = Math.round((width * MAX) / height); height = MAX; }
        canvas.width = width; canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
          if (isMultiple) {
            setForm(p => ({ ...p, universityImages: [...p.universityImages, dataUrl] }));
          } else {
            setForm(p => ({ ...p, image: dataUrl }));
          }
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Section title="Basic Information">
        <div>
          <label className={labelCls}>University Name *</label>
          <input required className={inputCls} value={form.name} onChange={upd('name')} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div><label className={labelCls}>Country *</label><input required className={inputCls} value={form.country} onChange={upd('country')} /></div>
          <div><label className={labelCls}>City *</label><input required className={inputCls} value={form.city} onChange={upd('city')} /></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>University Type *</label>
            <select required className={inputCls} value={form.type} onChange={upd('type')}>
              <option value="Public">Public</option><option value="Private">Private</option>
              <option value="Community College">Community College</option><option value="Language School">Language School</option>
            </select>
          </div>
          <div><label className={labelCls}>Established Year</label><input className={inputCls} value={form.establishedYear} onChange={upd('establishedYear')} /></div>
        </div>
      </Section>

      <Section title="Details">
        <div><label className={labelCls}>Description *</label><textarea required rows={3} className={inputCls} value={form.description} onChange={upd('description')} /></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div><label className={labelCls}>Campus Location</label><input className={inputCls} value={form.campusLocation} onChange={upd('campusLocation')} /></div>
          <div><label className={labelCls}>Website URL</label><input className={inputCls} value={form.website} onChange={upd('website')} /></div>
        </div>
        <div><label className={labelCls}>Ranking</label><input className={inputCls} value={form.ranking} onChange={upd('ranking')} /></div>
      </Section>

      <Section title="Academic Information">
        <div><label className={labelCls}>Available Courses/Programs *</label><input required className={inputCls} placeholder="e.g. BSc Computer Science, MBA..." value={form.availableCourses} onChange={upd('availableCourses')} /></div>
        <div>
          <label className={labelCls}>Degree Levels</label>
          <div className="flex flex-wrap gap-3">
            {['Diploma', "Bachelor's", "Master's", 'PhD'].map(lvl => (
              <label key={lvl} className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.degreeLevels.includes(lvl)} onChange={() => toggleArray('degreeLevels', lvl)} /> {lvl}</label>
            ))}
          </div>
        </div>
        <div>
          <label className={labelCls}>Study Fields</label>
          <div className="flex flex-wrap gap-3">
            {['Engineering', 'Business', 'IT', 'Medicine', 'Arts', 'Science', 'Others'].map(f => (
              <label key={f} className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.studyFields.includes(f)} onChange={() => toggleArray('studyFields', f)} /> {f}</label>
            ))}
          </div>
        </div>
      </Section>

      <Section title="Admission Information">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div><label className={labelCls}>Intake Months</label><input className={inputCls} value={form.intakeMonths} onChange={upd('intakeMonths')} /></div>
          <div><label className={labelCls}>Application Deadline</label><input className={inputCls} value={form.applicationDeadline} onChange={upd('applicationDeadline')} /></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div><label className={labelCls}>Min Academic Req</label><input className={inputCls} value={form.minAcademicRequirement} onChange={upd('minAcademicRequirement')} /></div>
          <div><label className={labelCls}>English Req (IELTS/TOEFL)</label><input className={inputCls} value={form.englishRequirement} onChange={upd('englishRequirement')} /></div>
        </div>
      </Section>

      <Section title="Financial & Student Info">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div><label className={labelCls}>Tuition Fee (Per Year)</label><input className={inputCls} value={form.tuitionFee} onChange={upd('tuitionFee')} /></div>
          <div><label className={labelCls}>Application Fee</label><input className={inputCls} value={form.applicationFee} onChange={upd('applicationFee')} /></div>
        </div>
        <div className="flex flex-wrap items-center gap-3 mt-2">
          <label className="flex items-center gap-2 text-sm font-semibold"><input type="checkbox" checked={form.scholarshipAvailable} onChange={upd('scholarshipAvailable')} /> Scholarship Available</label>
          <label className="flex items-center gap-2 text-sm font-semibold"><input type="checkbox" checked={form.internationalStudentsAccepted} onChange={upd('internationalStudentsAccepted')} /> Int. Students Accepted</label>
          <label className="flex items-center gap-2 text-sm font-semibold"><input type="checkbox" checked={form.accommodationAvailable} onChange={upd('accommodationAvailable')} /> Accommodation Available</label>
        </div>
        <div><label className={labelCls}>Scholarship Details</label><input className={inputCls} value={form.scholarshipDetails} onChange={upd('scholarshipDetails')} /></div>
        <div><label className={labelCls}>Accommodation Details</label><input className={inputCls} value={form.accommodationDetails} onChange={upd('accommodationDetails')} /></div>
      </Section>

      <Section title="Media">
        <div>
          <label className={labelCls}>Main Image</label>
          <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && processFile(e.target.files[0])} className="text-sm mb-2" />
          {form.image && <img src={form.image} alt="Main" className="h-20 w-20 object-cover rounded mb-2 block" style={{ maxWidth: '120px' }} />}
        </div>
        <div>
          <label className={labelCls}>Gallery Images</label>
          <input type="file" accept="image/*" multiple onChange={(e) => { Array.from(e.target.files || []).forEach(f => processFile(f, true)) }} className="text-sm mb-2" />
          <div className="flex gap-2 flex-wrap">
            {form.universityImages.map((img, i) => (
              <img key={i} src={img} alt="Gallery" className="h-16 rounded cursor-pointer hover:opacity-50" onClick={() => setForm(p => ({ ...p, universityImages: p.universityImages.filter((_, idx) => idx !== i) }))} title="Click to remove" />
            ))}
          </div>
        </div>
        <div><label className={labelCls}>Campus Video URL</label><input className={inputCls} value={form.campusVideoUrl} onChange={upd('campusVideoUrl')} /></div>
      </Section>

      <Section title="Contact Information & Status">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div><label className={labelCls}>Email Address</label><input type="email" className={inputCls} value={form.emailAddress} onChange={upd('emailAddress')} /></div>
          <div><label className={labelCls}>Phone Number</label><input className={inputCls} value={form.phoneNumber} onChange={upd('phoneNumber')} /></div>
        </div>
        <div><label className={labelCls}>Address</label><input className={inputCls} value={form.address} onChange={upd('address')} /></div>
        <div className="flex flex-wrap items-center gap-3 mt-2">
          <label className="flex items-center gap-2 text-sm font-bold text-violet-600"><input type="checkbox" checked={form.featuredUniversity} onChange={upd('featuredUniversity')} /> Featured University</label>
          <label className="flex items-center gap-2 text-sm font-bold text-green-600"><input type="checkbox" checked={form.activeStatus} onChange={upd('activeStatus')} /> Active / Visible</label>
        </div>
      </Section>

      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-xl text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition-all">Cancel</button>
        <button type="submit" disabled={saving} className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2" style={{ background: 'linear-gradient(135deg,#6D28D9,#7C3AED)' }}>
          {saving && <Loader2 size={14} className="animate-spin" />}
          {isEdit ? 'Update University' : 'Save University'}
        </button>
      </div>
    </form>
  );
}


/* ── Main ── */
export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toasts, show: showToast } = useToast();

  /* data */
  const [contacts, setContacts] = useState<ContactEntry[]>([]);
  const [universities, setUniversities] = useState<UniversityEntry[]>([]);
  const [courses, setCourses] = useState<CourseEntry[]>([]);
  const [partners, setPartners] = useState<PartnerEntry[]>([]);
  const [loading, setLoading] = useState(true);

  /* search & filter for partners */
  const [partnerSearch, setPartnerSearch] = useState('');
  const [partnerCountryFilter, setPartnerCountryFilter] = useState('');
  const [partnerStatusFilter, setPartnerStatusFilter] = useState('');
  const [selectedPartner, setSelectedPartner] = useState<PartnerEntry | null>(null);

  /* modals */
  const [uniModal, setUniModal] = useState<'add' | 'edit' | null>(null);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingUni, setEditingUni] = useState<UniversityEntry | null>(null);

  /* forms */
  const [uniForm, setUniForm] = useState({ ...EMPTY_UNI });
  const [courseForm, setCourseForm] = useState({ ...EMPTY_COURSE });

  /* auth guard */
  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('adminLoggedIn') !== 'true') {
      router.replace('/');
    }
  }, [router]);

  /* fetch all */
  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [c, u, co, p] = await Promise.all([
        fetch('/api/contact').then(r => r.json()),
        fetch('/api/admin/universities').then(r => r.json()),
        fetch('/api/admin/courses').then(r => r.json()),
        fetch('/api/admin/partners').then(r => r.json()),
      ]);
      setContacts(c.contacts || []);
      setUniversities(u.universities || []);
      setCourses(co.courses || []);
      setPartners(p.partners || []);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const handleLogout = () => { sessionStorage.removeItem('adminLoggedIn'); router.replace('/'); };

  /* open edit modal */
  const openEdit = (u: UniversityEntry) => {
    setEditingUni(u);
    setUniForm({
      name: u.name, image: u.image || '', country: u.country, city: u.city || '',
      type: u.type || 'Public', description: u.description || '',
      establishedYear: u.establishedYear || '', campusLocation: u.campusLocation || '',
      website: u.website || '', ranking: u.ranking || '',
      availableCourses: u.availableCourses || '',
      degreeLevels: u.degreeLevels || [], studyFields: u.studyFields || [],
      intakeMonths: u.intakeMonths || '', applicationDeadline: u.applicationDeadline || '',
      minAcademicRequirement: u.minAcademicRequirement || '', englishRequirement: u.englishRequirement || '',
      tuitionFee: u.tuitionFee || '', applicationFee: u.applicationFee || '',
      scholarshipAvailable: u.scholarshipAvailable || false, scholarshipDetails: u.scholarshipDetails || '',
      internationalStudentsAccepted: u.internationalStudentsAccepted || false,
      accommodationAvailable: u.accommodationAvailable || false, accommodationDetails: u.accommodationDetails || '',
      universityImages: u.universityImages || [], campusVideoUrl: u.campusVideoUrl || '',
      emailAddress: u.emailAddress || '', phoneNumber: u.phoneNumber || '',
      address: u.address || '', featuredUniversity: u.featuredUniversity || false, activeStatus: u.activeStatus !== undefined ? u.activeStatus : true
    });
    setUniModal('edit');
  };

  /* open add modal */
  const openAdd = () => {
    setEditingUni(null);
    setUniForm({ ...EMPTY_UNI });
    setUniModal('add');
  };

  const closeUniModal = () => { setUniModal(null); setEditingUni(null); setUniForm({ ...EMPTY_UNI }); };

  /* delete university */
  const deleteUniversity = async (id: string) => {
    if (!confirm('Delete this university?')) return;
    const res = await fetch(`/api/admin/universities?id=${id}`, { method: 'DELETE' });
    if (res.ok) {
      setUniversities(p => p.filter(u => u._id !== id));
      showToast('University deleted successfully', 'success');
    } else {
      showToast('Failed to delete university', 'error');
    }
  };

  /* delete course */
  const deleteCourse = async (id: string) => {
    if (!confirm('Delete this course?')) return;
    const res = await fetch(`/api/admin/courses?id=${id}`, { method: 'DELETE' });
    if (res.ok) {
      setCourses(p => p.filter(c => c._id !== id));
      showToast('Course deleted successfully', 'success');
    } else {
      showToast('Failed to delete course', 'error');
    }
  };

  /* save university (add or edit) */
  const saveUniversity = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    try {
      if (uniModal === 'edit' && editingUni) {
        const res = await fetch(`/api/admin/universities?id=${editingUni._id}`, {
          method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(uniForm),
        });
        const data = await res.json();
        if (res.ok) {
          setUniversities(p => p.map(u => u._id === editingUni._id ? data.university : u));
          closeUniModal();
          showToast('University updated successfully! ✓', 'success');
        } else {
          showToast(`Error: ${data.error || 'Failed to update university'}`, 'error');
        }
      } else {
        const res = await fetch('/api/admin/universities', {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(uniForm),
        });
        const data = await res.json();
        if (res.ok) {
          setUniversities(p => [data.university, ...p]);
          closeUniModal();
          showToast('University added successfully! 🎓', 'success');
        } else {
          showToast(`Error: ${data.error || 'Failed to add university'}`, 'error');
        }
      }
    } catch (err) {
      showToast(`Network error: ${err instanceof Error ? err.message : 'Unknown error'}`, 'error');
    }
    setSaving(false);
  };

  /* save course */
  const saveCourse = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    try {
      const res = await fetch('/api/admin/courses', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(courseForm),
      });
      const data = await res.json();
      if (res.ok) {
        setCourses(p => [data.course, ...p]);
        setCourseForm({ ...EMPTY_COURSE });
        setShowCourseModal(false);
        showToast('Course added successfully! 📚', 'success');
      } else {
        showToast(`Error: ${data.error || 'Failed to add course'}`, 'error');
      }
    } catch (err) {
      showToast(`Network error: ${err instanceof Error ? err.message : 'Unknown error'}`, 'error');
    }
    setSaving(false);
  };

  /* partner actions & search filtering */
  const updatePartnerStatus = async (id: string, status: 'Pending' | 'Approved' | 'Rejected') => {
    try {
      const res = await fetch(`/api/admin/partners?id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setPartners(p => p.map(x => x._id === id ? { ...x, status } : x));
        showToast(`Request marked as ${status}`, 'success');
      } else {
        showToast('Failed to update status', 'error');
      }
    } catch {
      showToast('Network error updating status', 'error');
    }
  };

  const deletePartner = async (id: string) => {
    if (!confirm('Delete this partnership request?')) return;
    try {
      const res = await fetch(`/api/admin/partners?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setPartners(p => p.filter(x => x._id !== id));
        showToast('Partnership request deleted', 'success');
      } else {
        showToast('Failed to delete request', 'error');
      }
    } catch {
      showToast('Network error deleting request', 'error');
    }
  };

  const filteredPartners = partners.filter(p => {
    const term = partnerSearch.toLowerCase();
    const matchesSearch = p.organizationName.toLowerCase().includes(term) ||
      p.contactPerson.toLowerCase().includes(term) ||
      p.email.toLowerCase().includes(term);
    const matchesCountry = partnerCountryFilter ? p.country === partnerCountryFilter : true;
    const matchesStatus = partnerStatusFilter ? p.status === partnerStatusFilter : true;
    return matchesSearch && matchesCountry && matchesStatus;
  });

  const navItems: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { id: 'universities', label: 'Universities', icon: <GraduationCap size={18} /> },
    { id: 'courses', label: 'Courses', icon: <BookOpen size={18} /> },
    { id: 'contacts', label: 'Contact', icon: <Mail size={18} /> },
    { id: 'partners', label: 'Partner Requests', icon: <Handshake size={18} /> },
  ];

  return (
    <div className="flex min-h-screen bg-[#F4F6FB] font-sans">
      <ToastContainer toasts={toasts} />

      {/* ── MOBILE SIDEBAR OVERLAY ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── SIDEBAR ── */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen z-40 lg:z-20 flex flex-col transition-transform duration-300 flex-shrink-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        style={{ width: 240, background: '#181C2E', overflowY: 'auto' }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-6 border-b border-white/10">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg,#7C3AED,#4F46E5)' }}>
            <Globe size={18} className="text-white" />
          </div>
          <span className="text-white font-bold text-[15px] tracking-tight whitespace-nowrap">WorldPassport</span>
          <button onClick={() => setSidebarOpen(false)} className="ml-auto text-white/40 hover:text-white transition-colors lg:hidden">
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-6 px-3 space-y-1">
          {navItems.map(item => {
            const active = activeTab === item.id;
            return (
              <button key={item.id} onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }} title={item.label}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${active ? 'text-white shadow-lg' : 'text-white/50 hover:text-white hover:bg-white/8'}`}
                style={active ? { background: 'linear-gradient(135deg,#7C3AED,#6D28D9)', boxShadow: '0 4px 15px rgba(124,58,237,0.4)' } : {}}>
                <span className="flex-shrink-0">{item.icon}</span>
                <span className="whitespace-nowrap">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Back to Website */}
        <div className="px-3 py-4 border-t border-white/10">
          <button onClick={() => { router.push('/'); setSidebarOpen(false); }} title="Back to Website"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:text-white hover:bg-white/8 transition-all">
            <ExternalLink size={18} className="flex-shrink-0" />
            <span className="whitespace-nowrap">Back to Website</span>
          </button>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden min-w-0">

        {/* Top bar */}
        <header className="bg-white border-b border-gray-200/80 sticky top-0 z-10 shadow-sm">
          <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 gap-4">
            <div className="flex items-center gap-3">
              {/* Hamburger — mobile only */}
              <button
                onClick={() => setSidebarOpen(o => !o)}
                className="lg:hidden w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                aria-label="Open menu"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h2 className="text-base sm:text-lg font-bold text-gray-800 capitalize">
                {navItems.find(n => n.id === activeTab)?.label ?? 'Dashboard'}
              </h2>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-gray-800">bm@worldpassport.in</p>
                <p className="text-xs text-gray-400">Administrator</p>
              </div>
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm shadow" style={{ background: 'linear-gradient(135deg,#7C3AED,#4F46E5)' }}>A</div>
              <button onClick={handleLogout} title="Logout" className="flex items-center gap-1.5 px-2 sm:px-3 py-2 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all border border-red-100">
                <LogOut size={16} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">

          {/* ── DASHBOARD ── */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Welcome Banner */}
              <div className="rounded-3xl p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 overflow-hidden relative"
                style={{ background: 'linear-gradient(135deg,#6D28D9 0%,#7C3AED 40%,#a855f7 100%)' }}>
                <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full opacity-20" style={{ background: 'rgba(255,255,255,0.3)' }} />
                <div className="absolute right-24 -bottom-6 w-32 h-32 rounded-full opacity-15" style={{ background: 'rgba(255,255,255,0.3)' }} />
                <div className="relative z-10">
                  <h2 className="text-2xl font-extrabold text-white mb-1">Welcome to Admin Panel</h2>
                  <p className="text-violet-200 text-sm">Manage your Worldpassport website content and data</p>
                </div>
                <button onClick={() => router.push('/')}
                  className="relative z-10 flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-sm font-semibold border border-white/30 transition-all flex-shrink-0">
                  View Website <ChevronRight size={16} />
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                <StatCard icon={<GraduationCap size={22} />} label="Universities" value={loading ? '—' : universities.length} color="linear-gradient(135deg,#6D28D9,#7C3AED)" onClick={() => setActiveTab('universities')} />
                <StatCard icon={<BookOpen size={22} />} label="Courses" value={loading ? '—' : courses.length} color="linear-gradient(135deg,#0EA5E9,#2563EB)" onClick={() => setActiveTab('courses')} />
                <StatCard icon={<Mail size={22} />} label="Messages" value={loading ? '—' : contacts.length} color="linear-gradient(135deg,#10B981,#059669)" onClick={() => setActiveTab('contacts')} />
                <StatCard icon={<Handshake size={22} />} label="Partner Requests" value={loading ? '—' : partners.length} color="linear-gradient(135deg,#F59E0B,#D97706)" onClick={() => setActiveTab('partners')} />
                <StatCard icon={<Globe size={22} />} label="Countries" value={loading ? '—' : [...new Set(universities.map(u => u.country))].length} color="linear-gradient(135deg,#EF4444,#DC2626)" onClick={() => setActiveTab('universities')} />
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4">Quick Actions</h3>
                <div className="flex flex-wrap gap-3">
                  <button onClick={() => { setActiveTab('universities'); openAdd(); }}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white shadow-md transition-all hover:opacity-90 hover:scale-105"
                    style={{ background: 'linear-gradient(135deg,#6D28D9,#7C3AED)' }}>
                    <Plus size={15} /> Add University
                  </button>
                  <button onClick={() => { setActiveTab('courses'); setShowCourseModal(true); }}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white shadow-md transition-all hover:opacity-90 hover:scale-105"
                    style={{ background: 'linear-gradient(135deg,#0EA5E9,#2563EB)' }}>
                    <Plus size={15} /> Add Course
                  </button>
                  <button onClick={() => setActiveTab('contacts')}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white shadow-md transition-all hover:opacity-90 hover:scale-105"
                    style={{ background: 'linear-gradient(135deg,#10B981,#059669)' }}>
                    <Mail size={15} /> View Messages
                  </button>
                  <button onClick={() => setActiveTab('partners')}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white shadow-md transition-all hover:opacity-90 hover:scale-105"
                    style={{ background: 'linear-gradient(135deg,#F59E0B,#D97706)' }}>
                    <Handshake size={15} /> View Partner Requests
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── UNIVERSITIES ── */}
          {activeTab === 'universities' && (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Universities</h2>
                  <p className="text-sm text-gray-400 mt-0.5">{loading ? '…' : `${universities.length} universities • visible on website`}</p>
                </div>
                <button onClick={openAdd}
                  className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-sm font-semibold text-white shadow-md transition-all hover:opacity-90 hover:scale-105 w-full sm:w-auto justify-center"
                  style={{ background: 'linear-gradient(135deg,#6D28D9,#7C3AED)' }}>
                  <Plus size={16} /> Add University
                </button>
              </div>

              {loading ? <Spinner /> : universities.length === 0
                ? <Empty label="No universities yet. Click 'Add University' to get started — they'll appear live on the website." />
                : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {universities.map(u => (
                      <Link href={`/universities/${u._id}`} className="block" key={u._id}>
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all group overflow-hidden">
                          {/* Image */}
                          <div className="relative h-36 bg-gradient-to-br from-violet-100 to-indigo-100 overflow-hidden">
                            {u.image ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={u.image} alt={u.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={e => { e.currentTarget.style.display = 'none'; }} />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <GraduationCap size={40} className="text-violet-300" />
                              </div>
                            )}
                            {/* Action buttons - always visible on mobile, hover on desktop */}
                            <div className="absolute top-2 right-2 flex gap-1.5 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                              <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); openEdit(u); }} title="Edit"
                                className="w-8 h-8 rounded-lg bg-white/90 hover:bg-white flex items-center justify-center shadow transition-all text-violet-600">
                                <Pencil size={13} />
                              </button>
                              <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); deleteUniversity(u._id); }} title="Delete"
                                className="w-8 h-8 rounded-lg bg-white/90 hover:bg-red-50 flex items-center justify-center shadow transition-all text-red-500">
                                <Trash2 size={13} />
                              </button>
                            </div>
                            {/* Country badge */}
                            <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-full text-xs font-semibold text-white backdrop-blur-sm" style={{ background: 'rgba(109,40,217,0.8)' }}>
                              {u.country}{u.city ? ` · ${u.city}` : ''}
                            </div>
                          </div>

                          {/* Body */}
                          <div className="p-4">
                            <h3 className="font-bold text-gray-900 text-sm mb-1 line-clamp-2 leading-snug">{u.name}</h3>
                            <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
                              {u.ranking && <span className="flex items-center gap-1">🏅 {u.ranking}</span>}
                              {u.website && (
                                <a href={u.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline truncate max-w-[140px]">
                                  {u.website.replace(/^https?:\/\//, '')}
                                </a>
                              )}
                            </div>
                            {u.description && <p className="text-xs text-gray-400 line-clamp-2">{u.description}</p>}
                            <div className="mt-3 pt-3 border-t border-gray-50 flex items-center justify-between">
                              <span className="text-[10px] text-gray-300">{new Date(u.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                              <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold" style={{ background: '#F0FDF4', color: '#16A34A' }}>Live on site</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
            </div>
          )}

          {/* ── COURSES ── */}
          {activeTab === 'courses' && (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Courses</h2>
                  <p className="text-sm text-gray-400 mt-0.5">{loading ? '…' : `${courses.length} courses added`}</p>
                </div>
                <button onClick={() => setShowCourseModal(true)}
                  className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-sm font-semibold text-white shadow-md transition-all hover:opacity-90 hover:scale-105 w-full sm:w-auto justify-center"
                  style={{ background: 'linear-gradient(135deg,#0EA5E9,#2563EB)' }}>
                  <Plus size={16} /> Add Course
                </button>
              </div>

              {loading ? <Spinner /> : courses.length === 0
                ? <Empty label="No courses yet. Click 'Add Course' to get started." />
                : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {courses.map(c => (
                      <div key={c._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-all group">
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <span className="text-xs px-3 py-1 rounded-full font-semibold border" style={{ background: '#EFF6FF', color: '#2563EB', borderColor: '#BFDBFE' }}>{c.level}</span>
                          <button onClick={() => deleteCourse(c._id)} className="p-1.5 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"><Trash2 size={14} /></button>
                        </div>
                        <h3 className="font-bold text-gray-900 text-sm mb-1 leading-snug">{c.title}</h3>
                        <p className="text-xs font-medium mb-0.5" style={{ color: '#7C3AED' }}>{c.university}</p>
                        <p className="text-xs text-gray-400 mb-2">{c.country}</p>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400">
                          {c.duration && <span>⏱ {c.duration}</span>}
                          {c.tuitionFee && <span>💰 {c.tuitionFee}</span>}
                          {c.intake && <span>📅 {c.intake}</span>}
                        </div>
                        {c.description && <p className="text-xs text-gray-400 mt-2 line-clamp-2">{c.description}</p>}
                        <p className="text-[10px] text-gray-300 mt-3">{new Date(c.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                      </div>
                    ))}
                  </div>
                )}
            </div>
          )}

          {/* ── CONTACTS ── */}
          {activeTab === 'contacts' && (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900">Contact Submissions</h2>
                <p className="text-sm text-gray-400 mt-0.5">All inquiries from the contact form</p>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {loading ? <Spinner /> : contacts.length === 0 ? <Empty label="No contact submissions yet." /> : (
                  <div>
                    {/* Desktop Table */}
                    <div className="hidden sm:block overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-gray-50 text-left">
                            {['#', 'Name', 'Email', 'Phone', 'Subject', 'Message', 'Date'].map(h => (
                              <th key={h} className="px-5 py-3.5 text-xs font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {contacts.map((c, i) => (
                            <tr key={c._id} className={`border-t border-gray-50 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'} hover:bg-violet-50/30 transition-colors`}>
                              <td className="px-5 py-4 text-gray-300 font-mono text-xs">{i + 1}</td>
                              <td className="px-5 py-4 font-semibold text-gray-900 whitespace-nowrap">{c.name}</td>
                              <td className="px-5 py-4 text-blue-600 whitespace-nowrap"><a href={`mailto:${c.email}`} className="hover:underline">{c.email}</a></td>
                              <td className="px-5 py-4 text-gray-500 whitespace-nowrap">{c.phone || '—'}</td>
                              <td className="px-5 py-4 text-gray-500 max-w-[140px] truncate">{c.subject || '—'}</td>
                              <td className="px-5 py-4 text-gray-400 max-w-[200px] truncate" title={c.message}>{c.message}</td>
                              <td className="px-5 py-4 text-gray-300 text-xs whitespace-nowrap">{new Date(c.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {/* Mobile Cards */}
                    <div className="sm:hidden divide-y divide-gray-50">
                      {contacts.map((c, i) => (
                        <div key={c._id} className="p-4 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-gray-900 text-sm">{c.name}</span>
                            <span className="text-[10px] text-gray-300">{new Date(c.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                          </div>
                          <a href={`mailto:${c.email}`} className="block text-xs text-blue-600 hover:underline">{c.email}</a>
                          {c.phone && <p className="text-xs text-gray-500">{c.phone}</p>}
                          {c.subject && <span className="inline-block text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">{c.subject}</span>}
                          <p className="text-xs text-gray-400 line-clamp-3">{c.message}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── PARTNER REQUESTS ── */}
          {activeTab === 'partners' && (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900">Partner Requests</h2>
                <p className="text-sm text-gray-400 mt-0.5">All collaboration requests from the Partner With Us form</p>
              </div>

              {/* Search & Filter Controls */}
              <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-6 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search by organization name or contact..."
                    className={inputCls}
                    value={partnerSearch}
                    onChange={e => setPartnerSearch(e.target.value)}
                  />
                </div>
                <div className="sm:w-44">
                  <select
                    className={inputCls}
                    value={partnerCountryFilter}
                    onChange={e => setPartnerCountryFilter(e.target.value)}
                  >
                    <option value="">All Countries</option>
                    {[...new Set(partners.map(p => p.country))].filter(Boolean).sort().map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="sm:w-44">
                  <select
                    className={inputCls}
                    value={partnerStatusFilter}
                    onChange={e => setPartnerStatusFilter(e.target.value)}
                  >
                    <option value="">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>

              {/* Requests Table */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {loading ? (
                  <Spinner />
                ) : filteredPartners.length === 0 ? (
                  <Empty label="No partner requests found matching the search/filters." />
                ) : (
                  <div>
                    {/* Desktop Table */}
                    <div className="hidden md:block overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-gray-50 text-left">
                            {['#', 'Organization', 'Contact Person', 'Email', 'Phone', 'Country', 'Interest', 'Status', 'Actions'].map(h => (
                              <th key={h} className="px-5 py-3.5 text-xs font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {filteredPartners.map((p, i) => (
                            <tr key={p._id} className={`border-t border-gray-50 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'} hover:bg-violet-50/30 transition-colors`}>
                              <td className="px-5 py-4 text-gray-300 font-mono text-xs">{i + 1}</td>
                              <td className="px-5 py-4 font-semibold text-gray-900 whitespace-nowrap cursor-pointer hover:text-violet-600 transition-colors" onClick={() => setSelectedPartner(p)}>
                                {p.organizationName}
                              </td>
                              <td className="px-5 py-4 text-gray-600 whitespace-nowrap">{p.contactPerson}</td>
                              <td className="px-5 py-4 text-blue-600 whitespace-nowrap">
                                <a href={`mailto:${p.email}`} className="hover:underline">{p.email}</a>
                              </td>
                              <td className="px-5 py-4 text-gray-500 whitespace-nowrap">{p.phone}</td>
                              <td className="px-5 py-4 text-gray-500 whitespace-nowrap">{p.country}</td>
                              <td className="px-5 py-4 text-gray-500 whitespace-nowrap">
                                <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-gray-100 text-gray-600">
                                  {p.interest}
                                </span>
                              </td>
                              <td className="px-5 py-4 whitespace-nowrap">
                                <select
                                  value={p.status}
                                  onChange={(e) => updatePartnerStatus(p._id, e.target.value as any)}
                                  className={`text-xs font-semibold px-2 py-1 rounded-lg border focus:outline-none transition-colors cursor-pointer ${p.status === 'Approved'
                                      ? 'bg-green-50 text-green-700 border-green-200'
                                      : p.status === 'Rejected'
                                        ? 'bg-red-50 text-red-700 border-red-200'
                                        : 'bg-amber-50 text-amber-700 border-amber-200'
                                    }`}
                                >
                                  <option value="Pending">Pending</option>
                                  <option value="Approved">Approved</option>
                                  <option value="Rejected">Rejected</option>
                                </select>
                              </td>
                              <td className="px-5 py-4 whitespace-nowrap">
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => setSelectedPartner(p)}
                                    className="px-3 py-1 rounded-lg bg-violet-50 hover:bg-violet-100 text-violet-600 font-semibold text-xs transition-colors"
                                  >
                                    View
                                  </button>
                                  <button
                                    onClick={() => deletePartner(p._id)}
                                    className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
                                    title="Delete Request"
                                  >
                                    <Trash2 size={15} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {/* Mobile Cards */}
                    <div className="md:hidden divide-y divide-gray-50">
                      {filteredPartners.map((p, i) => (
                        <div key={p._id} className="p-4 space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <p className="font-bold text-gray-900 text-sm leading-tight truncate">{p.organizationName}</p>
                              <p className="text-xs text-gray-500 mt-0.5">{p.contactPerson} · {p.country}</p>
                            </div>
                            <select
                              value={p.status}
                              onChange={(e) => updatePartnerStatus(p._id, e.target.value as any)}
                              className={`text-xs font-semibold px-2 py-1 rounded-lg border focus:outline-none flex-shrink-0 ${p.status === 'Approved'
                                  ? 'bg-green-50 text-green-700 border-green-200'
                                  : p.status === 'Rejected'
                                    ? 'bg-red-50 text-red-700 border-red-200'
                                    : 'bg-amber-50 text-amber-700 border-amber-200'
                                }`}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Approved">Approved</option>
                              <option value="Rejected">Rejected</option>
                            </select>
                          </div>
                          <a href={`mailto:${p.email}`} className="block text-xs text-blue-600 hover:underline">{p.email}</a>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 font-medium">{p.interest}</span>
                            <span className="text-xs text-gray-400">{p.phone}</span>
                          </div>
                          <div className="flex gap-2 pt-1">
                            <button
                              onClick={() => setSelectedPartner(p)}
                              className="flex-1 py-1.5 rounded-lg bg-violet-50 hover:bg-violet-100 text-violet-600 font-semibold text-xs transition-colors"
                            >
                              View Details
                            </button>
                            <button
                              onClick={() => deletePartner(p._id)}
                              className="px-3 py-1.5 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 transition-all"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ── University Modal (Add / Edit) ── */}
      {uniModal && (
        <Modal title={uniModal === 'edit' ? 'Edit University' : 'Add University'} onClose={closeUniModal}>
          <UniversityForm form={uniForm} setForm={setUniForm} onSubmit={saveUniversity} onClose={closeUniModal} saving={saving} isEdit={uniModal === 'edit'} />
        </Modal>
      )}

      {/* ── Course Modal ── */}
      {showCourseModal && (
        <Modal title="Add Course" onClose={() => setShowCourseModal(false)}>
          <form onSubmit={saveCourse} className="space-y-4">
            <div>
              <label className={labelCls}>Course Title *</label>
              <input required className={inputCls} placeholder="e.g. MSc Data Science" value={courseForm.title} onChange={e => setCourseForm(p => ({ ...p, title: e.target.value }))} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>University *</label>
                <input required className={inputCls} placeholder="University of Amsterdam" value={courseForm.university} onChange={e => setCourseForm(p => ({ ...p, university: e.target.value }))} />
              </div>
              <div>
                <label className={labelCls}>Country *</label>
                <input required className={inputCls} placeholder="Netherlands" value={courseForm.country} onChange={e => setCourseForm(p => ({ ...p, country: e.target.value }))} />
              </div>
            </div>
            <div>
              <label className={labelCls}>Level *</label>
              <select required className={inputCls} value={courseForm.level} onChange={e => setCourseForm(p => ({ ...p, level: e.target.value }))}>
                {["Bachelor's", "Master's", "PhD", "MBA", "Certificate"].map(l => <option key={l}>{l}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className={labelCls}>Duration</label>
                <input className={inputCls} placeholder="2 years" value={courseForm.duration} onChange={e => setCourseForm(p => ({ ...p, duration: e.target.value }))} />
              </div>
              <div>
                <label className={labelCls}>Tuition Fee</label>
                <input className={inputCls} placeholder="€12k/yr" value={courseForm.tuitionFee} onChange={e => setCourseForm(p => ({ ...p, tuitionFee: e.target.value }))} />
              </div>
              <div>
                <label className={labelCls}>Intake</label>
                <input className={inputCls} placeholder="Sep / Feb" value={courseForm.intake} onChange={e => setCourseForm(p => ({ ...p, intake: e.target.value }))} />
              </div>
            </div>
            <div>
              <label className={labelCls}>Description</label>
              <textarea rows={3} className={`${inputCls} resize-none`} placeholder="Short description..." value={courseForm.description} onChange={e => setCourseForm(p => ({ ...p, description: e.target.value }))} />
            </div>
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setShowCourseModal(false)} className="flex-1 py-2.5 rounded-xl text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition-all">Cancel</button>
              <button type="submit" disabled={saving} className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-60 transition-all hover:opacity-90" style={{ background: 'linear-gradient(135deg,#0EA5E9,#2563EB)' }}>
                {saving && <Loader2 size={14} className="animate-spin" />} Save Course
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* ── Partner Details Modal ── */}
      {selectedPartner && (
        <Modal title="Partnership Request Details" onClose={() => setSelectedPartner(null)}>
          <div className="space-y-4">
            <div>
              <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wide">Organization Name</span>
              <p className="text-sm font-bold text-gray-900 mt-0.5">{selectedPartner.organizationName}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wide">Contact Person</span>
                <p className="text-sm font-semibold text-gray-800 mt-0.5">{selectedPartner.contactPerson}</p>
              </div>
              <div>
                <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wide">Country</span>
                <p className="text-sm font-semibold text-gray-800 mt-0.5">{selectedPartner.country}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wide">Email Address</span>
                <p className="text-sm font-semibold text-blue-600 mt-0.5">
                  <a href={`mailto:${selectedPartner.email}`} className="hover:underline">{selectedPartner.email}</a>
                </p>
              </div>
              <div>
                <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wide">Phone Number</span>
                <p className="text-sm font-semibold text-gray-800 mt-0.5">{selectedPartner.phone}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wide">Partnership Interest</span>
                <p className="text-sm font-semibold text-gray-800 mt-0.5">
                  <span className="px-2 py-0.5 bg-gray-100 rounded text-xs font-medium text-gray-600">
                    {selectedPartner.interest}
                  </span>
                </p>
              </div>
              <div>
                <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wide">Submission Date</span>
                <p className="text-sm font-semibold text-gray-800 mt-0.5">
                  {new Date(selectedPartner.createdAt).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
            <div>
              <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wide">Status</span>
              <div className="mt-1">
                <select
                  value={selectedPartner.status}
                  onChange={(e) => {
                    const newStatus = e.target.value as any;
                    updatePartnerStatus(selectedPartner._id, newStatus);
                    setSelectedPartner(p => p ? { ...p, status: newStatus } : null);
                  }}
                  className={`text-xs font-semibold px-2.5 py-1 rounded-lg border focus:outline-none transition-colors cursor-pointer ${selectedPartner.status === 'Approved'
                      ? 'bg-green-50 text-green-700 border-green-200'
                      : selectedPartner.status === 'Rejected'
                        ? 'bg-red-50 text-red-700 border-red-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>
            <div>
              <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wide">Message</span>
              <div className="mt-1 bg-gray-50 border border-gray-100 rounded-2xl p-4 text-sm text-gray-700 whitespace-pre-wrap max-h-48 overflow-y-auto leading-relaxed">
                {selectedPartner.message || <span className="text-gray-400 italic">No message provided.</span>}
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  if (confirm('Delete this partnership request?')) {
                    deletePartner(selectedPartner._id);
                    setSelectedPartner(null);
                  }
                }}
                className="px-4 py-2 rounded-xl text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-colors flex items-center gap-1.5"
              >
                <Trash2 size={14} /> Delete Request
              </button>
              <button
                type="button"
                onClick={() => setSelectedPartner(null)}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg,#6D28D9,#7C3AED)' }}
              >
                Close Details
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* ── Helpers ── */
function Spinner() {
  return (
    <div className="flex items-center justify-center py-20">
      <Loader2 className="w-6 h-6 text-violet-500 animate-spin" />
      <span className="ml-3 text-sm text-gray-400">Loading…</span>
    </div>
  );
}
function Empty({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-gray-300 bg-white rounded-2xl border border-gray-100">
      <svg className="w-14 h-14 mb-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
      </svg>
      <p className="text-sm text-center max-w-xs text-gray-400">{label}</p>
    </div>
  );
}
