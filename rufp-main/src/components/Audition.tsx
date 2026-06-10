import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Users, Award, HelpCircle, CheckCircle, Upload, X, AlertCircle } from 'lucide-react';

interface AuditionProps {
  onStatusChange?: (msg: string) => void;
}

interface ApplicationForm {
  name: string;
  birthYear: string;
  gender: string;
  email: string;
  phone: string;
  category: string;
  introduction: string;
  agreeToTerms: boolean;
}

export default function Audition({ onStatusChange }: AuditionProps) {
  const [showModal, setShowModal] = useState(false);
  const [formsSubmitted, setFormsSubmitted] = useState<ApplicationForm[]>(() => {
    const saved = localStorage.getItem('starship_auditions');
    return saved ? JSON.parse(saved) : [];
  });

  const [formData, setFormData] = useState<ApplicationForm>({
    name: '',
    birthYear: '2008',
    gender: 'MALE',
    email: '',
    phone: '',
    category: 'VOCAL',
    introduction: '',
    agreeToTerms: false,
  });

  const [fileAttached, setFileAttached] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof ApplicationForm, string>>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
    if (errors[name as keyof ApplicationForm]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const tempErrors: Partial<Record<keyof ApplicationForm, string>> = {};
    if (!formData.name.trim()) tempErrors.name = 'Please enter your actual name.';
    if (!formData.email.trim() || !formData.email.includes('@')) tempErrors.email = 'Please provide a valid email.';
    if (!formData.phone.trim()) tempErrors.phone = 'Contact number is required.';
    if (!formData.introduction.trim()) tempErrors.introduction = 'Brief self-introduction is required.';
    if (!formData.agreeToTerms) tempErrors.agreeToTerms = 'You must agree to the privacy policy.';
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileAttached(file.name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newApplications = [...formsSubmitted, formData];
    localStorage.setItem('starship_auditions', JSON.stringify(newApplications));
    setFormsSubmitted(newApplications);
    
    // Reset
    setFormData({
      name: '',
      birthYear: '2008',
      gender: 'MALE',
      email: '',
      phone: '',
      category: 'VOCAL',
      introduction: '',
      agreeToTerms: false,
    });
    setFileAttached(null);
    setShowModal(false);

    if (onStatusChange) {
      onStatusChange(`Audition application successfully submitted for ${formData.name}!`);
    } else {
      alert(`Audition form successfully submitted! Welcome to Starship family.`);
    }
  };

  const removeApplication = (index: number) => {
    const fresh = formsSubmitted.filter((_, i) => i !== index);
    localStorage.setItem('starship_auditions', JSON.stringify(fresh));
    setFormsSubmitted(fresh);
  };

  return (
    <div className="py-6 w-full relative">
      
      {/* Audition Widescreen Graphic Panel (Matches Image 1 layout) */}
      <div className="relative rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-950 aspect-[21/9] sm:aspect-[2.35/1] xl:aspect-[3/1] shadow-2xl holo-glow flex items-center justify-center">
        
        {/* Deep, eyes focus image layout backdrop */}
        <div className="absolute inset-0 z-0 select-none">
          {/* We use highly optimized aesthetic eye close up images to blend into a mystic purple-pink backdrop exactly matching Starship Audition theme */}
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-[#2d1130]/90 to-neutral-950 mix-blend-multiply opacity-80 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop" 
            alt="Starship Audition Face" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-top opacity-35"
          />
        </div>

        {/* Floating stars details */}
        <div className="absolute top-10 left-10 w-2 h-2 bg-pink-400 rotate-45 rounded-sm animate-ping duration-1000 opacity-60"></div>
        <div className="absolute bottom-10 right-1/4 w-3.5 h-3.5 bg-purple-400 rotate-[15deg] rounded-sm animate-pulse opacity-40"></div>

        {/* Core Content Overlay */}
        <div className="relative z-20 text-center flex flex-col items-center justify-center p-6 sm:p-10 w-full max-w-4xl">
          <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.25em] text-[#9333ea] mb-2 uppercase">
            STARSHIP ENTERTAINMENT
          </span>
          
          <h3 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-widest text-white translate-y-[-2px] select-none font-serif">
            2026 Starship Audition
          </h3>
          
          <p className="text-[10px] sm:text-xs md:text-sm font-semibold tracking-[0.1em] text-zinc-300 mt-2 max-w-lg mx-auto leading-relaxed">
            BE THE NEXT STAR 
            <span className="block text-zinc-500 font-normal mt-1">
              "스타쉽과 함께 빛나는 꿈을 현실로 만들어갈 당신을 기다립니다."
            </span>
          </p>

          <div className="mt-6 md:mt-8 flex justify-center">
            <button 
              onClick={() => setShowModal(true)}
              className="bg-purple-600 border border-purple-500 text-white font-bold tracking-widest text-[10px] sm:text-xs px-8 py-3.5 rounded-full hover:bg-white hover:text-black hover:border-white hover:scale-105 transition-all shadow-[0_5px_20px_rgba(147,51,234,0.3)] group cursor-pointer"
            >
              APPLY NOW —&gt;
            </button>
          </div>
        </div>
      </div>

      {/* Audition Categories & Details matching layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6 px-4">
        <div className="bg-zinc-950/40 border border-zinc-900/60 p-4 rounded-2xl flex flex-col gap-1 text-center md:text-left">
          <div className="flex items-center gap-2 text-zinc-500 justify-center md:justify-start">
            <Calendar className="w-3.5 h-3.5 text-zinc-600" />
            <span className="text-[9px] font-mono font-semibold tracking-wider uppercase">접수 기간</span>
          </div>
          <p className="text-xs font-bold text-zinc-200 mt-1">2026.04.01 - 06.30</p>
          <span className="text-[9px] text-zinc-500 font-mono mt-0.5">Deadline: 23:59 (KST)</span>
        </div>

        <div className="bg-zinc-950/40 border border-zinc-900/60 p-4 rounded-2xl flex flex-col gap-1 text-center md:text-left">
          <div className="flex items-center gap-2 text-zinc-500 justify-center md:justify-start">
            <Award className="w-3.5 h-3.5 text-zinc-600" />
            <span className="text-[9px] font-mono font-semibold tracking-wider uppercase">지원 분야</span>
          </div>
          <p className="text-xs font-bold text-zinc-200 mt-1">VOCAL / RAP / DANCE</p>
          <span className="text-[9px] text-zinc-500 font-mono mt-0.5">ACTING / MODEL / PRODUCING</span>
        </div>

        <div className="bg-zinc-950/40 border border-zinc-900/60 p-4 rounded-2xl flex flex-col gap-1 text-center md:text-left">
          <div className="flex items-center gap-2 text-zinc-500 justify-center md:justify-start">
            <Users className="w-3.5 h-3.5 text-zinc-600" />
            <span className="text-[9px] font-mono font-semibold tracking-wider uppercase">지원 자격</span>
          </div>
          <p className="text-xs font-bold text-zinc-200 mt-1">MALE / FEMALE</p>
          <span className="text-[9px] text-zinc-500 font-mono mt-0.5">Born in 2005 - 2014</span>
        </div>

        <div className="bg-zinc-950/40 border border-zinc-900/60 p-4 rounded-2xl flex flex-col gap-1 text-center md:text-left">
          <div className="flex items-center gap-2 text-zinc-500 justify-center md:justify-start">
            <HelpCircle className="w-3.5 h-3.5 text-zinc-600" />
            <span className="text-[9px] font-mono font-semibold tracking-wider uppercase">지원 방법</span>
          </div>
          <p className="text-xs font-bold text-zinc-200 mt-1">OFFICIAL PORTAL FORM</p>
          <span className="text-[9px] text-zinc-500 font-mono mt-0.5">Self-photo & Video Attach</span>
        </div>
      </div>

      {/* Submitted Auditions Check List (Highly Interactive feature!) */}
      {formsSubmitted.length > 0 && (
        <div className="mt-8 bg-zinc-950/50 border border-zinc-900 rounded-3xl p-6">
          <h4 className="text-sm font-semibold text-zinc-400 tracking-wider font-mono mb-4 flex items-center gap-2 uppercase">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            Your Submitted Applications ({formsSubmitted.length})
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formsSubmitted.map((app, index) => (
              <div 
                key={index}
                className="bg-zinc-900/70 border border-zinc-800 p-4 rounded-2xl relative flex items-center justify-between group overflow-hidden"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-zinc-100">{app.name}</span>
                    <span className="text-[10px] bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full font-mono">{app.category}</span>
                  </div>
                  <p className="text-xs text-zinc-400 font-mono">{app.email} | {app.phone}</p>
                  <p className="text-[11px] text-zinc-500 tracking-wide font-light max-w-sm italic truncate">
                    "{app.introduction}"
                  </p>
                  <div className="flex items-center gap-1.5 pt-1 text-[10px] text-emerald-400 font-mono font-semibold">
                    <span className="inline-block w-2 bg-emerald-400 rounded-full h-2 animate-pulse" />
                    <span>STATUS: UNDER PORTFOLIO REVIEW</span>
                  </div>
                </div>

                <button 
                  onClick={() => removeApplication(index)}
                  className="z-10 p-1.5 text-zinc-600 hover:text-rose-500 bg-zinc-950 border border-zinc-850 hover:border-rose-950 rounded-lg hover:scale-110 transition-all cursor-pointer"
                  title="Withdraw application"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Interactive modal for application */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-neutral-950 border border-zinc-800 w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col"
            >
              {/* Head */}
              <div className="border-b border-zinc-900 p-5 flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-[#9333ea] font-mono tracking-widest text-[11px] uppercase">STARSHIP AUDITION</h4>
                  <p className="text-base font-bold text-white mt-0.5">Submit Audition Portfolio</p>
                </div>
                <button 
                  onClick={() => setShowModal(false)}
                  className="text-zinc-500 hover:text-white p-1 rounded-lg border border-transparent hover:border-zinc-800 transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Body - scrollable */}
              <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">Your Full Name *</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Jane Doe" 
                      className={`w-full bg-zinc-900 border ${errors.name ? 'border-rose-500' : 'border-zinc-800'} text-xs text-white px-3.5 py-2.5 rounded-xl focus:border-purple-500 focus:outline-none`}
                    />
                    {errors.name && <p className="text-[10px] text-rose-500 font-mono mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">Birth Year *</label>
                    <select 
                      name="birthYear"
                      value={formData.birthYear}
                      onChange={handleInputChange}
                      className="w-full bg-zinc-900 border border-zinc-800 text-xs text-white px-3.5 py-2.5 rounded-xl focus:border-purple-500 focus:outline-none cursor-pointer"
                    >
                      {Array.from({ length: 15 }, (_, i) => 2002 + i).map((year) => (
                        <option key={year} value={year}>{year} (Born)</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">Gender *</label>
                    <select 
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full bg-zinc-900 border border-zinc-800 text-xs text-white px-3.5 py-2.5 rounded-xl focus:border-purple-500 focus:outline-none cursor-pointer"
                    >
                      <option value="MALE">MALE / 남성</option>
                      <option value="FEMALE">FEMALE / 여성</option>
                      <option value="PREFER_NOT_TO_SAY">PREFER NOT TO SAY</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">Category *</label>
                    <select 
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full bg-zinc-900 border border-zinc-800 text-xs text-white px-3.5 py-2.5 rounded-xl focus:border-purple-500 focus:outline-none cursor-pointer"
                    >
                      <option value="VOCAL">VOCAL (보컬)</option>
                      <option value="RAP">RAP (랩)</option>
                      <option value="DANCE">DANCE (댄스)</option>
                      <option value="ACTING">ACTING (연기)</option>
                      <option value="MODEL">MODEL (모델)</option>
                      <option value="PRODUCING">PRODUCING (작곡/작사)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">Email Address *</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="star@example.com" 
                      className={`w-full bg-zinc-900 border ${errors.email ? 'border-rose-500' : 'border-zinc-800'} text-xs text-white px-3.5 py-2.5 rounded-xl focus:border-purple-500 focus:outline-none`}
                    />
                    {errors.email && <p className="text-[10px] text-rose-500 font-mono mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">Contact Number *</label>
                    <input 
                      type="tel" 
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+82-10-1234-5678" 
                      className={`w-full bg-zinc-900 border ${errors.phone ? 'border-rose-500' : 'border-zinc-800'} text-xs text-white px-3.5 py-2.5 rounded-xl focus:border-purple-500 focus:outline-none`}
                    />
                    {errors.phone && <p className="text-[10px] text-rose-500 font-mono mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">Brief Self Introduction (2-3 sentences) *</label>
                  <textarea 
                    name="introduction"
                    required
                    rows={3}
                    value={formData.introduction}
                    onChange={handleInputChange}
                    placeholder="Tell us why you deserve to be Starship\'s next global star and what makes you unique..."
                    className={`w-full bg-zinc-900 border ${errors.introduction ? 'border-rose-500' : 'border-zinc-800'} text-xs text-white px-3.5 py-2.5 rounded-xl focus:border-purple-500 focus:outline-none resize-none`}
                  />
                  {errors.introduction && <p className="text-[10px] text-rose-500 font-mono mt-1">{errors.introduction}</p>}
                </div>

                {/* File upload section */}
                <div>
                  <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">Attach Media (Demo / Selfie) *</label>
                  <div className="border border-dashed border-zinc-800 rounded-xl bg-zinc-950/60 p-5 text-center flex flex-col items-center justify-center hover:border-purple-500 transition-all cursor-pointer relative group">
                    <input 
                      type="file" 
                      id="form-file-attach"
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <Upload className="w-6 h-6 text-zinc-500 group-hover:text-purple-400 group-hover:scale-110 transition-all" />
                    <span className="text-xs text-zinc-300 font-semibold mt-2.5">
                      {fileAttached ? fileAttached : 'Drag & Drop files here, or tap to choose'}
                    </span>
                    <span className="text-[10px] text-zinc-500 mt-1">Accepts MP4, MP3, PNG, JPG inside 50MB</span>
                  </div>
                </div>

                {/* Terms agreement checkbox */}
                <div className="flex items-start gap-2.5 pt-1.5">
                  <input 
                    type="checkbox" 
                    id="agree-checkbox" 
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    className="mt-0.5 rounded accent-purple-600 border-zinc-800 focus:ring-0 cursor-pointer"
                  />
                  <label htmlFor="agree-checkbox" className="text-[11px] text-zinc-400 font-light cursor-pointer select-none">
                    I agree to the collection/use of personal data and security validation of portfolio attachments by Starship casting agents.
                  </label>
                </div>
                {errors.agreeToTerms && <p className="text-[10px] text-rose-500 font-mono">{errors.agreeToTerms}</p>}

                {/* Submit button */}
                <div className="pt-3">
                  <button 
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold tracking-widest text-xs py-3 rounded-xl transition-all shadow-md cursor-pointer"
                  >
                    SUBMIT AUDITION PORTFOLIO
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
