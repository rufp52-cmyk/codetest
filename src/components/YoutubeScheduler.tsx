import { useState } from 'react';
import { Play, Calendar, Star, Check, Bell, Search, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { YoutubeVideo, ScheduleItem } from '../data';

interface YoutubeSchedulerProps {
  videos: YoutubeVideo[];
  schedule: ScheduleItem[];
  onStatusChange?: (msg: string) => void;
}

export default function YoutubeScheduler({ videos, schedule, onStatusChange }: YoutubeSchedulerProps) {
  const [selectedVideo, setSelectedVideo] = useState<YoutubeVideo>(videos[0]);
  const [selectedArtistFilter, setSelectedArtistFilter] = useState<string>('ALL');
  const [alertsRegistered, setAlertsRegistered] = useState<string[]>(() => {
    const saved = localStorage.getItem('starship_schedule_alerts');
    return saved ? JSON.parse(saved) : [];
  });

  const handleVideoSelect = (video: YoutubeVideo) => {
    setSelectedVideo(video);
  };

  const handleRegisterAlert = (item: ScheduleItem) => {
    let freshAlerts: string[];
    if (alertsRegistered.includes(item.id)) {
      freshAlerts = alertsRegistered.filter((id) => id !== item.id);
      if (onStatusChange) onStatusChange(`Cancelled notification alert for ${item.artist}'s activity.`);
    } else {
      freshAlerts = [...alertsRegistered, item.id];
      if (onStatusChange) onStatusChange(`A notification reminder alert has been registered for: ${item.artist} - ${item.activity}!`);
    }
    localStorage.setItem('starship_schedule_alerts', JSON.stringify(freshAlerts));
    setAlertsRegistered(freshAlerts);
  };

  // Get list of unique artist filter items
  const filterArtists = ['ALL', '아이브 (IVE)', '우주소녀 (WJSN)', '몬스타엑스 (MONSTA X)', '크래비티 (CRAVITY)', '유연석', '이광수', '이동욱', '정세운'];

  const filteredSchedule = selectedArtistFilter === 'ALL'
    ? schedule
    : schedule.filter((item) => item.artist.includes(selectedArtistFilter) || selectedArtistFilter.includes(item.artist));

  return (
    <div className="py-6 w-full select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Column: Interactive YouTube Video Player */}
        <div className="col-span-1 lg:col-span-6 flex flex-col justify-between bg-zinc-950/40 border border-zinc-900 rounded-3xl p-5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 bg-amber-500/5 blur-2xl rounded-full"></div>
          
          <div className="space-y-4">
            {/* Header info */}
            <div className="flex justify-between items-center px-1">
              <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                Active YouTube MV Feed
              </span>
              <span className="inline-flex items-center gap-1.5 text-red-500 font-mono text-[10px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                OFFICIAL CHANNEL
              </span>
            </div>

            {/* Video Player Iframe container */}
            <div className="w-full aspect-video bg-zinc-900 border border-zinc-900 rounded-2xl overflow-hidden shadow-2xl relative group">
              <iframe
                title={selectedVideo.title}
                src={`https://www.youtube-nocookie.com/embed/${selectedVideo.videoId}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>

            {/* Title / Artist of selected video */}
            <div className="px-1.5">
              <h4 className="text-sm font-semibold text-white tracking-tight leading-snug line-clamp-1">
                {selectedVideo.title}
              </h4>
              <p className="text-[11px] font-mono text-zinc-500 mt-1 uppercase">
                {selectedVideo.artist} • Starship Entertainment 
              </p>
            </div>
          </div>

          {/* Video Selector list (Horizontal scroll bar) */}
          <div className="mt-5 space-y-2">
            <span className="text-[10px] font-mono tracking-widest text-[#a1a1aa] uppercase px-1.5 block">Select Video Track</span>
            <div className="flex gap-2.5 overflow-x-auto no-scrollbar py-1 px-1.5">
              {videos.map((vid) => {
                const isSelected = vid.id === selectedVideo.id;
                return (
                  <button
                    key={vid.id}
                    onClick={() => handleVideoSelect(vid)}
                    className={`flex items-center gap-2.5 p-1.5 pr-3 rounded-xl border shrink-0 transition-all cursor-pointer ${
                      isSelected 
                        ? 'bg-zinc-900/90 border-red-500/30 text-white' 
                        : 'bg-zinc-950/20 border-zinc-900/60 text-zinc-400 hover:bg-zinc-900/40 hover:text-white'
                    }`}
                  >
                    <div className="w-9 aspect-video rounded-md overflow-hidden relative border border-white/5 bg-zinc-900">
                      <img 
                        src={vid.thumbnailUrl} 
                        alt={vid.title} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      {isSelected && (
                        <div className="absolute inset-0 bg-red-600/20 flex items-center justify-center">
                          <Play className="w-3 h-3 fill-white text-white" />
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] font-semibold text-left font-mono tracking-tight max-w-[120px] truncate">
                      {vid.title.replace("아이브 (IVE)", "IVE").replace("MONSTA X (몬스타엑스)", "MONSTA X").replace("우주소녀 (WJSN)", "WJSN")}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column: Dynamic Scheduler Table */}
        <div className="col-span-1 lg:col-span-6 flex flex-col justify-between bg-zinc-950/40 border border-zinc-900 rounded-3xl p-5 relative overflow-hidden">
          
          <div className="space-y-4">
            
            {/* Filter controls at top of calendar */}
            <div className="flex flex-col sm:flex-row gap-2.5 sm:items-center justify-between px-1">
              <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                Activity Broadcast Scheduler
              </span>

              {/* Artist Select Filter */}
              <div className="flex items-center gap-1.5 bg-zinc-950/80 border border-zinc-900/80 px-2.5 py-1.5 rounded-lg">
                <Filter className="w-3 h-3 text-zinc-500" />
                <select
                  value={selectedArtistFilter}
                  onChange={(e) => setSelectedArtistFilter(e.target.value)}
                  className="bg-transparent text-[10px] font-bold text-zinc-300 font-mono tracking-wider uppercase focus:outline-none cursor-pointer"
                >
                  {filterArtists.map((artist) => (
                    <option key={artist} value={artist} className="bg-neutral-950 text-white font-sans">{artist}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Scheduler table body matching layout columns: Date, Artist, Activity */}
            <div className="border border-zinc-900 rounded-2xl overflow-hidden bg-zinc-950/60 max-h-[295px] overflow-y-auto no-scrollbar">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-zinc-900 text-[10px] font-mono tracking-widest text-zinc-500 uppercase bg-zinc-950/80">
                    <th className="py-3 px-4 font-semibold">Date</th>
                    <th className="py-3 px-3 font-semibold">Artist</th>
                    <th className="py-3 px-3 font-semibold">Activity</th>
                    <th className="py-3 px-3 font-semibold text-center w-12">Alert</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900/60 font-sans">
                  <AnimatePresence mode="popLayout">
                    {filteredSchedule.map((item) => {
                      const isAlerted = alertsRegistered.includes(item.id);
                      return (
                        <motion.tr
                          key={item.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className={`hover:bg-zinc-900/20 transition-all ${
                            item.isToday 
                              ? 'bg-amber-400/5 text-amber-100 border-l-2 border-l-amber-400' 
                              : ''
                          }`}
                        >
                          {/* Date Column */}
                          <td className="py-3 px-4 font-mono font-medium text-zinc-400 whitespace-nowrap">
                            <span className="flex items-center gap-1">
                              {item.isToday && (
                                <span className="inline-block px-1.5 py-0.5 text-[8px] font-extrabold uppercase tracking-wider bg-amber-400 text-black rounded font-mono animate-pulse">
                                  TODAY
                                </span>
                              )}
                              {item.date}
                            </span>
                          </td>

                          {/* Artist Column */}
                          <td className="py-3 px-3 font-bold text-zinc-100 whitespace-nowrap min-w-[100px]">
                            {item.artist}
                          </td>

                          {/* Activity Column */}
                          <td className="py-3 px-3 text-zinc-300 font-light max-w-xs leading-relaxed">
                            {item.activity}
                          </td>

                          {/* Alert trigger */}
                          <td className="py-3 px-3 text-center">
                            <button
                              onClick={() => handleRegisterAlert(item)}
                              className={`p-1.5 rounded-lg border transition-all cursor-pointer inline-flex items-center justify-center ${
                                isAlerted
                                  ? 'bg-amber-400 border-amber-400 text-black shadow-md'
                                  : 'bg-zinc-950 border-zinc-850 hover:border-zinc-700 text-zinc-500 hover:text-white'
                              }`}
                              title={isAlerted ? 'Alert Active (Tap to remove)' : 'Register Alert'}
                            >
                              {isAlerted ? <Check className="w-3 h-3 stroke-[3]" /> : <Bell className="w-3 h-3" />}
                            </button>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </AnimatePresence>
                  {filteredSchedule.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-zinc-500 font-mono text-xs">
                        No activities registered for this artist.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

          </div>

          {/* Footer schedule indicator */}
          <div className="mt-5 border-t border-zinc-900/60 pt-4 px-1 flex items-center justify-between text-xs text-zinc-500">
            <span className="flex items-center gap-1.5 font-mono text-[10pt]">
              <Calendar className="w-3.5 h-3.5 text-zinc-600" />
              Schedules current as of June 10, 2026.
            </span>
            <span className="text-[10px] font-mono text-emerald-400 font-semibold uppercase">● SYNCED LIVE</span>
          </div>

        </div>

      </div>
    </div>
  );
}
