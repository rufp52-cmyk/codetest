import { useState } from 'react';
import { ChevronLeft, ChevronRight, Play, Server, ListMusic, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CarouselItem {
  id: string;
  title: string;
  artist?: string;
  cast?: string;
  type?: string;
  releaseDate: string;
  coverUrl: string;
  gradient: string;
  description?: string;
  tracks?: string[];
}

interface ThreeDCarouselProps {
  items: CarouselItem[];
  isReverseLayout?: boolean; // If true, description is on left, slider on right
}

export default function ThreeDCarousel({ items, isReverseLayout = false }: ThreeDCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const activeItem = items[activeIndex];

  // Helper to calculate translation, rotation and z-index for cover flow effect
  const getCardStyle = (index: number) => {
    const diff = index - activeIndex;
    
    // Simple wrapping difference for circular slides
    let offset = diff;
    if (diff < -items.length / 2) offset += items.length;
    if (diff > items.length / 2) offset -= items.length;

    const absOffset = Math.abs(offset);
    
    if (offset === 0) {
      return {
        zIndex: 30,
        opacity: 1,
        transform: 'translateX(0px) scale(1) rotateY(0deg)',
      };
    } else if (offset === -1 || (offset > 1 && offset === items.length - 1)) {
      // Left side
      return {
        zIndex: 20,
        opacity: 0.6,
        transform: 'translateX(-90px) scale(0.8) rotateY(35deg)',
      };
    } else if (offset === 1 || (offset < -1 && offset === -items.length + 1)) {
      // Right side
      return {
        zIndex: 20,
        opacity: 0.6,
        transform: 'translateX(90px) scale(0.8) rotateY(-35deg)',
      };
    } else {
      // Hidden or far background
      return {
        zIndex: 10,
        opacity: 0.2,
        transform: `translateX(${offset * 140}px) scale(0.6) rotateY(${offset > 0 ? -45 : 45}deg)`,
      };
    }
  };

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-6 w-full select-none overflow-hidden`}>
      {/* Description Panel (Usually on Right, Left when isReverseLayout is true) */}
      <div className={`col-span-1 lg:col-span-5 flex flex-col justify-center px-4 ${isReverseLayout ? 'lg:col-start-1 lg:order-1' : 'lg:col-start-8 lg:order-2'}`}>
        <motion.div
          key={activeItem.id}
          initial={{ opacity: 0, x: isReverseLayout ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4 text-center lg:text-left"
        >
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
            <span className="px-2.5 py-1 text-[10px] font-bold tracking-widest bg-zinc-900 border border-zinc-800 rounded-full text-zinc-400 uppercase">
              {activeItem.type || 'Starship Release'}
            </span>
            <span className="text-zinc-500 text-xs font-mono flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-zinc-600" />
              {activeItem.releaseDate}
            </span>
          </div>

          <h3 className="text-2xl font-bold tracking-tight text-white mb-1">
            {activeItem.title}
          </h3>
          
          {(activeItem.artist || activeItem.cast) && (
            <p className="text-sm font-semibold text-amber-400 tracking-wider">
              {activeItem.artist || activeItem.cast}
            </p>
          )}

          <p className="text-zinc-400 text-sm leading-relaxed font-light text-justify max-w-xl mx-auto lg:mx-0">
            {activeItem.description}
          </p>

          {/* Album Tracks if available */}
          {activeItem.tracks && (
            <div className="pt-2">
              <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-1 justify-center lg:justify-start">
                <ListMusic className="w-3.5 h-3.5 text-zinc-600" />
                Track Listings
              </p>
              <div className="flex flex-wrap gap-1.5 justify-center lg:justify-start">
                {activeItem.tracks.map((track, idx) => (
                  <span key={idx} className="bg-zinc-950 font-mono text-[11px] text-zinc-300 border border-zinc-900 px-3 py-1.5 rounded-md hover:border-zinc-800 transition-all">
                    {track}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Interactive Play Button */}
          <div className="pt-4 flex justify-center lg:justify-start">
            <button 
              onClick={() => {
                alert(`Playing: ${activeItem.title} - ${activeItem.artist || activeItem.cast}`);
              }}
              className="flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-full text-xs font-bold hover:bg-amber-400 hover:scale-105 transition-all shadow-md group cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-black group-hover:scale-110 transition-transform" />
              SPOTIFY PLAY
            </button>
          </div>
        </motion.div>
      </div>

      {/* 3D Cover Flow Slider (Usually on Left, Right when isReverseLayout is true) */}
      <div className={`col-span-1 lg:col-span-7 flex flex-col items-center justify-center relative min-h-[420px] ${isReverseLayout ? 'lg:col-start-6 lg:order-2' : 'lg:col-start-1 lg:order-1'}`}>
        
        {/* Decorative elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] bg-gradient-to-r from-amber-500/10 via-purple-500/5 to-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* The 3D Slider Container */}
        <div className="relative w-full max-w-[480px] h-[350px] flex items-center justify-center style-3d">
          {items.map((item, index) => {
            const cardStyle = getCardStyle(index);
            const isActive = index === activeIndex;

            return (
              <motion.div
                key={item.id}
                onClick={() => setActiveIndex(index)}
                style={{
                  zIndex: cardStyle.zIndex,
                  transformStyle: 'preserve-3d',
                  perspective: 1000
                }}
                animate={cardStyle}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className={`absolute w-[210px] md:w-[230px] aspect-[3/4] cursor-pointer transition-shadow rounded-2xl select-none`}
              >
                {/* Simulated Phone Frame when Active */}
                {isActive ? (
                  <div className="absolute inset-0 z-40 border-[5px] border-zinc-950 rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.15)] ring-2 ring-white/10 overflow-hidden pointer-events-none">
                    {/* Top Notch of Phone */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-4 bg-zinc-950 rounded-b-xl flex items-center justify-center z-50">
                      <div className="w-8 h-1 bg-zinc-800 rounded-full"></div>
                    </div>
                  </div>
                ) : null}

                {/* Album Cover Card with holographic effects */}
                <div className={`relative w-full h-full rounded-2xl overflow-hidden shadow-2xl holo-glow ${isActive ? 'ring-2 ring-white/30' : 'brightness-50'}`}>
                  {/* Background overlay gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-b ${item.gradient} opacity-85 mix-blend-multiply z-0`}></div>
                  
                  {/* Image */}
                  <img
                    src={item.coverUrl}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover mix-blend-normal z-0"
                  />

                  {/* Glassmorphic Info panel at the bottom of the active frame */}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-md p-3.5 border-t border-white/10 z-20">
                      <p className="text-[10px] uppercase font-mono tracking-widest text-[#a1a1aa] truncate">
                        {item.artist || item.cast}
                      </p>
                      <h4 className="text-sm font-semibold text-white truncate">
                        {item.title}
                      </h4>
                    </div>
                  )}

                  {/* Dark mask on inactive cards */}
                  {!isActive && (
                    <div className="absolute inset-0 bg-black/40 hover:bg-black/20 transition-all duration-300 z-10" />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Sliders Navigation Buttons */}
        <div className="flex items-center gap-6 mt-4 z-40">
          <button
            onClick={prevSlide}
            className="w-10 h-10 rounded-full border border-zinc-800 bg-zinc-950 hover:bg-white hover:text-black hover:border-white text-white flex items-center justify-center transition-all cursor-pointer shadow-lg"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="flex gap-1.5">
            {items.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeIndex ? 'w-8 bg-white' : 'w-1.5 bg-zinc-800 hover:bg-zinc-600'}`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="w-10 h-10 rounded-full border border-zinc-800 bg-zinc-950 hover:bg-white hover:text-black hover:border-white text-white flex items-center justify-center transition-all cursor-pointer shadow-lg"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
