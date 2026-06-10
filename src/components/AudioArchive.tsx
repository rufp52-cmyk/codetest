import { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, Music, SkipForward, Disc, ListMusic } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Album } from '../data';

interface AudioArchiveProps {
  albums: Album[];
}

export default function AudioArchive({ albums }: AudioArchiveProps) {
  const [selectedAlbum, setSelectedAlbum] = useState<Album>(albums[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(80);
  const [activeTrack, setActiveTrack] = useState<string>('');
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Set fallback active track name
    if (selectedAlbum.tracks.length > 0) {
      setActiveTrack(selectedAlbum.tracks[0]);
    }
  }, [selectedAlbum]);

  // Handle simulated audio play timeline
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= 180) { // Max song length 3 minutes (180s)
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  const handlePlayToggle = () => {
    setIsPlaying(!isPlaying);
  };

  const handleAlbumSelect = (album: Album) => {
    setSelectedAlbum(album);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="py-6 w-full select-none">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        
        {/* Left Side: Dynamic spinning Vinyl Sleeve player */}
        <div className="col-span-1 lg:col-span-7 flex flex-col items-center justify-center bg-zinc-950/40 border border-zinc-900 rounded-3xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-2xl rounded-full"></div>
          
          {/* Main Sleeve and Disc interaction container */}
          <div className="relative flex items-center justify-center w-full max-w-[420px] aspect-[4/3] py-2">
            
            {/* The Album Sleeve Cover (Left) */}
            <motion.div 
              key={`sleeve-${selectedAlbum.id}`}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative w-[210px] sm:w-[240px] aspect-square rounded-lg shadow-2xl z-30 overflow-hidden border border-white/10 select-none cursor-pointer holo-glow shrink-0"
              onClick={handlePlayToggle}
            >
              <img 
                src={selectedAlbum.coverUrl} 
                alt={selectedAlbum.title} 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              {/* Play symbol on hover */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
                <div className="p-3 bg-white/20 backdrop-blur-md rounded-full border border-white/30 text-white">
                  {isPlaying ? <Pause className="w-6 h-6 fill-white" /> : <Play className="w-6 h-6 fill-white ml-0.5" />}
                </div>
              </div>
            </motion.div>

            {/* Simulated Black Vinyl LP Record (half-slips out, spins when playing) */}
            <motion.div 
              key={`vinyl-${selectedAlbum.id}`}
              animate={{ 
                x: isPlaying ? 55 : 40,
                rotate: isPlaying ? 360 : 0
              }}
              transition={isPlaying ? {
                x: { duration: 0.3 },
                rotate: { repeat: Infinity, duration: 6, ease: 'linear' }
              } : { duration: 0.3 }}
              className="absolute w-[200px] sm:w-[230px] aspect-square rounded-full bg-neutral-900 shadow-xl z-10 border border-neutral-800 flex items-center justify-center outline-none select-none pointer-events-none"
              style={{ x: 40 }}
            >
              {/* Grooves of LP Record */}
              <div className="absolute inset-3 border border-neutral-800 rounded-full opacity-60"></div>
              <div className="absolute inset-6 border border-neutral-800 rounded-full opacity-50"></div>
              <div className="absolute inset-10 border border-neutral-800 rounded-full opacity-35"></div>
              <div className="absolute inset-14 border border-neutral-800 rounded-full opacity-20"></div>

              {/* Album cover center label */}
              <div className="w-[74px] h-[74px] rounded-full bg-zinc-800 overflow-hidden relative border-2 border-neutral-950 flex items-center justify-center">
                <img 
                  src={selectedAlbum.coverUrl} 
                  alt={selectedAlbum.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute w-4 h-4 bg-black border-2 border-neutral-950 rounded-full"></div>
              </div>
            </motion.div>
          </div>

          {/* Under-Title matches layout exactly */}
          <div className="text-center mt-6 w-full max-w-md px-4">
            <h4 className="text-base font-semibold text-white tracking-tight">
              {selectedAlbum.title}
            </h4>
            <p className="text-zinc-500 font-mono text-xs mt-1.5 flex items-center justify-center gap-2">
              <span>{selectedAlbum.artist}</span>
              <span className="text-zinc-700">|</span>
              <span>{selectedAlbum.releaseDate}</span>
            </p>

            {/* Custom Interactive Audio Player Controls */}
            <div className="mt-5 bg-zinc-950/80 border border-zinc-900 rounded-2xl p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="bg-amber-400/10 p-2 rounded-lg border border-amber-400/20 text-amber-400">
                    <Music className={`w-4 h-4 ${isPlaying ? 'animate-bounce' : ''}`} />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Now Playing</p>
                    <p className="text-xs font-semibold text-zinc-200 truncate max-w-[180px]">{activeTrack}</p>
                  </div>
                </div>

                {/* Animated Wave visualizer */}
                <div className="flex items-end gap-0.5 h-6">
                  {[1, 2, 3, 4, 5, 6, 7].map((bar) => {
                    const randomHeight = isPlaying ? [35, 65, 85, 45, 95, 25, 75][(bar + currentTime) % 7] : 15;
                    return (
                      <motion.div
                        key={bar}
                        animate={{ height: `${randomHeight}%` }}
                        transition={{ duration: 0.3 }}
                        className="w-[3px] bg-gradient-to-t from-zinc-700 via-amber-400 to-amber-300 rounded-full"
                      />
                    );
                  })}
                </div>
              </div>

              {/* Progress Slider */}
              <div className="space-y-1">
                <div className="relative">
                  <input
                    type="range"
                    min="0"
                    max="180"
                    value={currentTime}
                    onChange={(e) => setCurrentTime(Number(e.target.value))}
                    className="w-full h-1 bg-zinc-850 rounded-lg appearance-none cursor-pointer accent-amber-400 focus:outline-none"
                  />
                </div>
                <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                  <span>{formatTime(currentTime)}</span>
                  <span>3:00</span>
                </div>
              </div>

              {/* Playing controls buttons */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-1.5">
                  <button 
                    onClick={() => {
                      const list = selectedAlbum.tracks;
                      const curIdx = list.indexOf(activeTrack);
                      const nextTrack = list[(curIdx + 1) % list.length];
                      setActiveTrack(nextTrack);
                    }}
                    className="p-1.5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                    title="Next Track"
                  >
                    <SkipForward className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={handlePlayToggle}
                  className="w-9 h-9 rounded-full bg-white text-neutral-950 flex items-center justify-center hover:bg-amber-400 hover:scale-105 transition-all shadow cursor-pointer"
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 fill-black" />
                  ) : (
                    <Play className="w-4 h-4 fill-black ml-0.5" />
                  )}
                </button>

                {/* Vol range */}
                <div className="flex items-center gap-1.5 text-zinc-400">
                  <Volume2 className="w-3.5 h-3.5 text-zinc-500" />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className="w-14 h-0.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-zinc-400"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Right Side: Grid of other albums matches layout exactly */}
        <div className="col-span-1 lg:col-span-5 flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-4 px-2">
            <ListMusic className="w-4 h-4 text-zinc-500" />
            <span className="text-[11px] font-semibold tracking-widest text-zinc-500 uppercase font-mono">
              Release Catalog ({albums.length})
            </span>
          </div>

          <div className="space-y-3.5 max-h-[480px] overflow-y-auto no-scrollbar pr-1">
            {albums.map((album) => {
              const isSelected = album.id === selectedAlbum.id;
              return (
                <motion.div
                  key={album.id}
                  onClick={() => handleAlbumSelect(album)}
                  className={`flex items-center gap-4 p-3.5 rounded-2xl border transition-all duration-300 cursor-pointer select-none group relative ${
                    isSelected 
                      ? 'bg-zinc-900/90 border-amber-400/40 shadow-lg shadow-amber-400/5' 
                      : 'bg-zinc-950/20 border-zinc-900/60 hover:bg-zinc-900/40 hover:border-zinc-800'
                  }`}
                  whileHover={{ x: 4 }}
                >
                  {/* Glowing vertical bar on active */}
                  {isSelected && (
                    <div className="absolute left-0 top-3 bottom-3 w-[3px] bg-amber-400 rounded-r-md" />
                  )}

                  {/* Album thumbnail artwork */}
                  <div className="w-12 h-12 rounded-lg overflow-hidden border border-white/5 shadow shrink-0 relative">
                    <img 
                      src={album.coverUrl} 
                      alt={album.title} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Simulated play button hover */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <Play className="w-3.5 h-3.5 fill-white text-white" />
                    </div>
                  </div>

                  {/* Info details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-0.5 gap-2">
                      <span className="text-[10px] font-mono font-medium tracking-wider text-zinc-500 truncate max-w-[120px] uppercase">
                        {album.artist}
                      </span>
                      <span className="text-[9px] font-mono text-zinc-500 text-right">
                        {album.releaseDate}
                      </span>
                    </div>
                    <h5 className="text-xs font-semibold text-zinc-100 group-hover:text-white transition-colors truncate">
                      {album.title}
                    </h5>
                    
                    {/* Tracks Preview list */}
                    <p className="text-[10px] text-zinc-500 truncate font-mono mt-0.5">
                      Tracks: {album.tracks.slice(0, 3).join(', ')}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Quick info footer */}
          <div className="mt-5 border-t border-zinc-900/60 pt-4 px-2 flex items-center justify-between text-xs text-zinc-500">
            <span className="flex items-center gap-1.5">
              <Disc className={`w-3.5 h-3.5 text-zinc-600 ${isPlaying ? 'animate-spin' : ''}`} />
              Simulated 192kbps FLAC lossless player
            </span>
            <span className="font-mono text-[10px]">VER. 1.4-AUDIO</span>
          </div>

        </div>

      </div>

    </div>
  );
}
