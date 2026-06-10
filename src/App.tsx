import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, Info, Sparkles, Star, Globe, Volume2, Search, X } from 'lucide-react';

import Header from './components/Header';
import ThreeDCarousel from './components/ThreeDCarousel';
import AudioArchive from './components/AudioArchive';
import Audition from './components/Audition';
import YoutubeScheduler from './components/YoutubeScheduler';
import Footer from './components/Footer';

import { 
  RECENT_RELEASES, 
  LATEST_ON_AIR, 
  AUDIO_ARCHIVE, 
  YOUTUBE_VIDEOS, 
  SCHEDULE_ITEMS 
} from './data';

export default function App() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  // Refs for smooth navigation scrolling
  const heroRef = useRef<HTMLDivElement>(null);
  const releasesRef = useRef<HTMLDivElement>(null);
  const onAirRef = useRef<HTMLDivElement>(null);
  const archiveRef = useRef<HTMLDivElement>(null);
  const auditionRef = useRef<HTMLDivElement>(null);
  const scheduleRef = useRef<HTMLDivElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(null);
    setTimeout(() => {
      setToastMessage(msg);
    }, 100);
  };

  const handleNavigate = (sectionId: string) => {
    const refs: Record<string, React.RefObject<HTMLDivElement | null>> = {
      hero: heroRef,
      about: releasesRef,
      talent: onAirRef,
      content: archiveRef,
      audition: auditionRef,
      careers: auditionRef, // Careers shares audition page or recruitment details
      support: scheduleRef,
      store: archiveRef, // Store can scroll to interactive music archive/shop
    };

    const targetRef = refs[sectionId];
    if (targetRef && targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      showToast(`Navigated to ${sectionId.toUpperCase()} Section`);
    } else {
      if (sectionId === 'store') {
        showToast("Opening Starship Merchandise Store... (Simulated)");
      } else {
        showToast(`Navigated to Starship ${sectionId.toUpperCase()}`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative flex flex-col font-sans overflow-x-hidden select-none">
      
      {/* Premium Notification Toast System */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-zinc-900/90 backdrop-blur-md text-white border border-zinc-800 px-5 py-3 rounded-2xl flex items-center gap-3.5 shadow-2xl max-w-sm sm:max-w-md"
          >
            <div className="bg-amber-400 p-1.5 rounded-lg text-black">
              <Sparkles className="w-4 h-4 fill-black" />
            </div>
            <p className="text-xs font-semibold tracking-wide pr-4 leading-relaxed font-sans">{toastMessage}</p>
            <button 
              onClick={() => setToastMessage(null)}
              className="text-zinc-500 hover:text-white shrink-0 ml-auto cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Header */}
      <Header onNavigate={handleNavigate} />

      {/* Landing Intro Hero Section */}
      <div 
        ref={heroRef}
        className="relative bg-black w-full min-h-[40vh] py-14 flex flex-col items-center justify-center text-center px-6 overflow-hidden border-b border-zinc-950"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-purple-950/10 via-black to-black z-0 pointer-events-none" />
        
        {/* Holographic glowing back-grid */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-56 bg-gradient-to-r from-amber-500/5 to-purple-500/5 blur-[120px] pointer-events-none z-0" />

        <div className="relative z-10 space-y-4 max-w-4xl select-none">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-2"
          >
            <Star className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
            <span className="text-[10px] md:text-xs font-mono font-bold tracking-[0.3em] text-zinc-500 uppercase">
              Official Artist & Actor Portal
            </span>
            <Star className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight uppercase font-sans"
          >
            We Are <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-purple-200">Starship</span> Entertainment
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xs md:text-sm text-zinc-500 font-light max-w-xl mx-auto leading-relaxed"
          >
            Pioneering the future of global music, cinema, and live performances. Home to IVE, Monsta X, WJSN, Cravity, and Korea's top screen artists.
          </motion.p>
        </div>
      </div>

      {/* Portal Main Body Grid */}
      <main className="flex-1 max-w-7xl mx-auto px-6 md:px-10 py-12 space-y-24 w-full">

        {/* SECTION 1: RECENT'S RELEASE */}
        <section 
          ref={releasesRef}
          id="about-section"
          className="scroll-mt-24 space-y-8"
        >
          <div className="text-center">
            <h2 className="bubble-heading text-4xl md:text-5xl inline-block">
              RECENT'S RELEASE
            </h2>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent mx-auto mt-4" />
          </div>

          <ThreeDCarousel items={RECENT_RELEASES} isReverseLayout={false} />
        </section>


        {/* SECTION 2: LATEST'S ON-AIR */}
        <section 
          ref={onAirRef}
          id="talent-section"
          className="scroll-mt-24 space-y-8"
        >
          <div className="text-center">
            <h2 className="bubble-heading text-4xl md:text-5xl inline-block">
              LATEST'S ON-AIR
            </h2>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent mx-auto mt-4" />
          </div>

          <ThreeDCarousel items={LATEST_ON_AIR} isReverseLayout={true} />
        </section>


        {/* SECTION 3: SHB AUDIO ARCHIVE (STARSHIP AUDIO ARCHIVE) */}
        <section 
          ref={archiveRef}
          id="content-section"
          className="scroll-mt-24 space-y-8"
        >
          <div className="text-center">
            <h2 className="bubble-heading text-4xl md:text-5xl inline-block">
              SHB AUDIO ARCHIVE
            </h2>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent mx-auto mt-4" />
          </div>

          <AudioArchive albums={AUDIO_ARCHIVE} />
        </section>


        {/* SECTION 4: AUDITION */}
        <section 
          ref={auditionRef}
          id="audition-section"
          className="scroll-mt-24 space-y-8"
        >
          <div className="text-center">
            <h2 className="bubble-heading text-4xl md:text-5xl inline-block">
              AUDITION
            </h2>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent mx-auto mt-4" />
          </div>

          <Audition onStatusChange={showToast} />
        </section>


        {/* SECTION 5: YOUTUBE MEDIA FEED & SCHEDULER BOARD */}
        <section 
          ref={scheduleRef}
          id="schedule-section"
          className="scroll-mt-24 space-y-8"
        >
          {/* Matches Image 1 layout: Left and Right side has the exact same "RELEASED YOUTUBE VIDEOS" bubble header */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-center">
            <div>
              <h2 className="bubble-heading text-3xl md:text-4xl inline-block">
                RELEASED YOUTUBE VIDEOS
              </h2>
              <div className="w-20 h-[1.5px] bg-red-600/30 mx-auto mt-3 rounded-full" />
            </div>

            <div className="mt-8 lg:mt-0">
              <h2 className="bubble-heading text-3xl md:text-4xl inline-block">
                RELEASED YOUTUBE VIDEOS
              </h2>
              <div className="w-20 h-[1.5px] bg-amber-500/30 mx-auto mt-3 rounded-full" />
            </div>
          </div>

          {/* Player + Scheduler Grid Body */}
          <YoutubeScheduler 
            videos={YOUTUBE_VIDEOS} 
            schedule={SCHEDULE_ITEMS} 
            onStatusChange={showToast}
          />
        </section>

      </main>

      {/* Brand Footer */}
      <Footer />
    </div>
  );
}
