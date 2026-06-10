import React, { useState } from 'react';
import { Star, Instagram, Youtube, HelpCircle, MapPin, MessageSquare, Send, X, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Footer() {
  const [showLocation, setShowLocation] = useState(false);
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [inquiryText, setInquiryText] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquirySubject, setInquirySubject] = useState('AUDITION');
  const [isSent, setIsSent] = useState(false);

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryText.trim() || !inquiryEmail.trim()) {
      alert('Please fill out all required fields.');
      return;
    }
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      setInquiryText('');
      setInquiryEmail('');
      setShowInquiryModal(false);
    }, 2000);
  };

  return (
    <footer className="bg-black text-zinc-400 py-10 px-6 border-t border-zinc-900 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        
        {/* Left Side: Logo & Business Info matches layout exactly */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span className="text-xl font-bold tracking-[0.2em] text-white flex items-center transition-colors group-hover:text-amber-400 select-none">
              ST
              <span className="relative">
                A
                <Star className="w-2.5 h-2.5 absolute -top-1.5 left-1/2 -translate-x-[45%] text-white fill-white group-hover:text-amber-400 group-hover:fill-amber-400" />
              </span>
              RSHIP
            </span>
          </div>

          <div className="space-y-1 text-zinc-500 font-sans tracking-wide">
            <p>회사명 : (주)스타쉽엔터테인먼트 | 대표 : 김시대, 이진성</p>
            <p>사업자등록번호 : 114-86-65214</p>
            <p className="flex items-center gap-1.5 flex-wrap">
              <span>주소 : 서울시 강남구 삼성로146길 4-5</span>
              <button 
                onClick={() => setShowLocation(!showLocation)}
                className="text-amber-400/80 hover:text-amber-400 hover:underline inline-flex items-center gap-0.5 font-semibold cursor-pointer whitespace-nowrap"
              >
                <MapPin className="w-3 h-3" />
                [지도로 주소 확인]
              </button>
            </p>
          </div>
        </div>

        {/* Right Side: Structured Social Links Grid & Interactive actions */}
        <div className="flex flex-col sm:flex-row gap-8 sm:gap-14 leading-relaxed shrink-0">
          
          {/* STARSHIP Main Social Links */}
          <div className="space-y-2.5">
            <h5 className="font-bold text-white tracking-widest text-[11px] uppercase flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
              스타쉽 (STARSHIP)
            </h5>
            <div className="flex items-center gap-3.5 text-zinc-500">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors" title="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors" title="Twitter / X">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors" title="YouTube">
                <Youtube className="w-4.5 h-4.5" />
              </a>
              <button onClick={() => setShowInquiryModal(true)} className="hover:text-amber-400 transition-colors cursor-pointer" title="Support / Inquiries">
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* STARSHIP Shop Social Links */}
          <div className="space-y-2.5">
            <h5 className="font-bold text-white tracking-widest text-[11px] uppercase flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
              스타쉽 스퀘어 (SQUARE)
            </h5>
            <div className="flex items-center gap-3.5 text-zinc-500">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors" title="Instagram Shop">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors" title="Twitter Shop">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors" title="Youtube Square">
                <Youtube className="w-4.5 h-4.5" />
              </a>
              <a href="https://starship-square.com" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors inline-flex items-center gap-0.5 cursor-pointer" title="Shop Website">
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Address interactive Maps popover panel */}
      {showLocation && (
        <div className="max-w-7xl mx-auto mt-6 bg-zinc-950 border border-zinc-900 rounded-2xl p-5 text-left relative overflow-hidden">
          <button 
            onClick={() => setShowLocation(false)}
            className="absolute top-4 right-4 text-zinc-500 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex flex-col md:flex-row gap-5 items-center">
            {/* Embedded mockup map */}
            <div className="w-full md:w-56 h-36 bg-zinc-900 border border-zinc-800 rounded-xl relative overflow-hidden shrink-0 select-none">
              <div className="absolute inset-0 bg-neutral-950 font-mono text-[9px] text-zinc-600 p-2 leading-relaxed flex flex-col justify-between">
                <div>
                  <p className="font-bold text-zinc-400">STARSHIP MAP LOCATOR</p>
                  <p className="mt-1">Lat: 37.525164 | Lng: 127.049441</p>
                </div>
                <div className="border border-zinc-900 p-1 bg-zinc-900/60 rounded">
                  <p className="text-zinc-500">Gangnam-gu Samseong-ro 146-gil 4-5</p>
                </div>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-bold text-white">Starship HQ Address & Transportation</h4>
              <p className="text-zinc-400 font-light leading-relaxed">
                Our main casting headquarters is situated in Gangnam-gu, Samseong-dong. 
                <span className="block mt-1 text-zinc-500">
                  Subway Route: Exit 3, Cheongdam Station (Line 7), 8-minute walk.
                </span>
              </p>
              <a 
                href="https://map.naver.com" 
                target="_blank" 
                rel="noreferrer" 
                className="text-xs text-amber-400 hover:underline font-semibold inline-flex items-center gap-1 mt-1 cursor-pointer"
              >
                Naver Maps Navigation —&gt;
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Global Inquiries message popup modal */}
      <AnimatePresence>
        {showInquiryModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4 text-left">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-neutral-950 border border-zinc-800 w-full max-w-md rounded-2xl overflow-hidden p-6 relative shadow-2xl"
            >
              <button 
                onClick={() => setShowInquiryModal(false)}
                className="absolute top-5 right-5 text-zinc-500 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <h4 className="text-base font-bold text-white mb-1.5">Direct Inquiry / Global Support</h4>
              <p className="text-xs text-zinc-500 mb-4 font-light">Have general questions? Send a direct dispatch to Starship HR team.</p>

              <form onSubmit={handleSendInquiry} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-1">Your Email</label>
                  <input 
                    type="email" 
                    required
                    value={inquiryEmail}
                    onChange={(e) => setInquiryEmail(e.target.value)}
                    placeholder="example@gmail.com"
                    className="w-full bg-zinc-900 border border-zinc-800 text-xs px-3 py-2.5 rounded-lg focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-1">Inquiry Category</label>
                  <select 
                    value={inquirySubject}
                    onChange={(e) => setInquirySubject(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 text-xs px-3 py-2.5 rounded-lg focus:border-amber-400 focus:outline-none cursor-pointer"
                  >
                    <option value="AUDITION">AUDITION HELP</option>
                    <option value="BUSINESS">BUSINESS COOP</option>
                    <option value="STORE">SQUARE / SHOP SERVICE</option>
                    <option value="PRESS">PRESS RELATIONS</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-1">Message Detail</label>
                  <textarea 
                    rows={4}
                    required
                    value={inquiryText}
                    onChange={(e) => setInquiryText(e.target.value)}
                    placeholder="Describe your inquiry in full detail..."
                    className="w-full bg-zinc-900 border border-zinc-800 text-xs px-3 py-2.5 rounded-lg focus:border-amber-400 focus:outline-none resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button 
                    type="submit"
                    className="w-full bg-white hover:bg-amber-400 hover:text-black font-bold tracking-widest text-xs py-2.5 rounded-lg text-black flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    {isSent ? (
                      <>
                        <span className="w-1.5 h-1.5 bg-black rounded-full animate-ping" />
                        DISPATCHING...
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        SEND INQUIRY
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto mt-8 border-t border-zinc-900/40 pt-6 text-center text-[10px] text-zinc-600">
        <p>© 2026 STARSHIP ENTERTAINMENT. All rights reserved. Created in compliance with official visual design parameters.</p>
      </div>
    </footer>
  );
}
