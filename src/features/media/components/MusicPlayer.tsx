/**
 * features/media/components/MusicPlayer.tsx
 * Portfolio OS module with a specific architectural responsibility.
 */
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Music, ListMusic, Activity } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

// We use some royalty-free placeholder tracks for the interface
const TRACKS = [
  {
    id: 1,
    title: "Chill Lofi Study",
    artist: "Lofi Vibes",
    cover: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=400&q=80",
    url: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3"
  },
  {
    id: 2,
    title: "Late Night Coding",
    artist: "Synthwave Beats",
    cover: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=400&q=80",
    url: "https://cdn.pixabay.com/download/audio/2022/10/25/audio_2eaeb2b9fc.mp3?filename=midnight-forest-124976.mp3"
  },
  {
    id: 3,
    title: "Morning Coffee",
    artist: "Acoustic Flow",
    cover: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=400&q=80",
    url: "https://cdn.pixabay.com/download/audio/2022/01/21/audio_31743c58bc.mp3?filename=good-morning-124673.mp3"
  }
];

export function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = TRACKS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.warn("Autoplay prevented:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setProgress(newTime);
    }
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setIsPlaying(true);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setIsPlaying(true);
  };

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="flex flex-col h-full bg-zinc-900 text-white font-sans selection:bg-pink-500/30 overflow-hidden">
      <audio 
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={nextTrack}
        onLoadedMetadata={handleTimeUpdate}
      />
      
      {/* Top Bar */}
      <div className="flex justify-between items-center p-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Music className="w-5 h-5 text-pink-500" />
          <span className="font-semibold tracking-tight">Apple Music Lite</span>
        </div>
        <button 
          onClick={() => setShowPlaylist(!showPlaylist)}
          className={cn("p-2 rounded-full transition-colors", showPlaylist ? "bg-white/20" : "hover:bg-white/10")}
        >
          <ListMusic className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Player Area */}
        <div className={cn("flex-1 p-8 flex flex-col items-center justify-center transition-all duration-500", showPlaylist && "scale-95 opacity-50")}>
          <motion.div 
            key={currentTrack.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-xs aspect-square bg-zinc-800 rounded-2xl shadow-2xl overflow-hidden mb-8"
          >
            <img 
              src={currentTrack.cover} 
              alt={currentTrack.title}
              className="w-full h-full object-cover transition-transform duration-10000 hover:scale-110"
            />
          </motion.div>

          <div className="w-full max-w-sm flex flex-col items-center text-center mb-8">
            <h2 className="text-2xl font-bold mb-1 truncate w-full">{currentTrack.title}</h2>
            <p className="text-pink-400 font-medium text-lg truncate w-full">{currentTrack.artist}</p>
          </div>

          <div className="w-full max-w-sm mb-8">
            <input 
              type="range" 
              min="0" 
              max={duration || 100} 
              value={progress} 
              onChange={handleProgressChange}
              className="w-full h-1.5 bg-zinc-700 rounded-full appearance-none cursor-pointer accent-pink-500 hover:h-2 transition-all"
            />
            <div className="flex justify-between mt-2 text-xs text-zinc-400 font-mono">
              <span>{formatTime(progress)}</span>
              <span>-{formatTime(duration - progress)}</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button onClick={prevTrack} className="p-3 text-zinc-300 hover:text-white transition-colors">
              <SkipBack className="w-6 h-6 fill-current" />
            </button>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-16 h-16 flex items-center justify-center bg-white text-black rounded-full hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/10"
            >
              {isPlaying ? <Pause className="w-7 h-7 fill-current" /> : <Play className="w-7 h-7 fill-current ml-1" />}
            </button>
            <button onClick={nextTrack} className="p-3 text-zinc-300 hover:text-white transition-colors">
              <SkipForward className="w-6 h-6 fill-current" />
            </button>
          </div>
        </div>

        {/* Playlist Sidebar */}
        <motion.div 
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: showPlaylist ? 250 : 0, opacity: showPlaylist ? 1 : 0 }}
          className="border-l border-white/10 bg-zinc-900/50 backdrop-blur-xl flex flex-col overflow-hidden"
        >
          <div className="p-4 font-semibold text-sm border-b border-white/10 min-w-[250px]">
            A Seguir
          </div>
          <div className="flex-1 overflow-auto p-2 min-w-[250px]">
            {TRACKS.map((track, idx) => (
              <button
                key={track.id}
                onClick={() => {
                  setCurrentTrackIndex(idx);
                  setIsPlaying(true);
                }}
                className={cn(
                  "w-full flex items-center gap-3 p-2 rounded-lg text-left transition-colors group",
                  idx === currentTrackIndex ? "bg-white/10" : "hover:bg-white/5"
                )}
              >
                <img src={track.cover} alt="" className="w-10 h-10 rounded object-cover shadow-sm" />
                <div className="flex-1 overflow-hidden">
                  <div className={cn("text-sm font-medium truncate", idx === currentTrackIndex && "text-pink-400")}>
                    {track.title}
                  </div>
                  <div className="text-xs text-zinc-400 truncate">{track.artist}</div>
                </div>
                {idx === currentTrackIndex && isPlaying && (
                  <Activity className="w-3 h-3 text-pink-500 animate-pulse" />
                )}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
