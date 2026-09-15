import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Scan, Eye, Activity, Cpu, Radio, Shield, Terminal } from 'lucide-react';
import { cyberAudio } from '../../utils/cyberAudio';

interface CyberHUDOverlayProps {
  onOpenTerminal: () => void;
}

export default function CyberHUDOverlay({ onOpenTerminal }: CyberHUDOverlayProps) {
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [scanlinesEnabled, setScanlinesEnabled] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [heapMB, setHeapMB] = useState(48.2);
  const [activePackets, setActivePackets] = useState(148);

  useEffect(() => {
    setAudioEnabled(cyberAudio.isEnabled());

    const timer = setInterval(() => {
      setHeapMB(+(45 + Math.random() * 6).toFixed(1));
      setActivePackets(Math.floor(130 + Math.random() * 40));
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const toggleSound = () => {
    const next = cyberAudio.toggle();
    setAudioEnabled(next);
  };

  const toggleScanlines = () => {
    setScanlinesEnabled((prev) => !prev);
    cyberAudio.playClick();
  };

  return (
    <>
      {/* 1. Optional Sci-Fi CRT Scanline & Phosphor Grid Overlay */}
      {scanlinesEnabled && (
        <div
          className="fixed inset-0 pointer-events-none z-30 opacity-30 select-none overflow-hidden"
          style={{
            backgroundImage:
              'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.45) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03))',
            backgroundSize: '100% 3px, 6px 100%',
          }}
        />
      )}

      {/* 2. Precision Sci-Fi Viewport HUD Corner Brackets */}
      <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden text-[10px] font-mono text-cyan-500/40 select-none p-2 sm:p-4 hidden md:flex flex-col justify-between">
        {/* Top Corners */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <span className="text-cyan-400 font-bold">┌ [SYS.ONLINE]</span>
            <span className="text-slate-600">--</span>
            <span>NODE://PORTFOLIO.CORE</span>
          </div>
          <div className="flex items-center gap-2">
            <span>MEM: {heapMB}MB</span>
            <span className="text-slate-600">--</span>
            <span className="text-cyan-400 font-bold">[SEC.ENFORCED] ┐</span>
          </div>
        </div>

        {/* Bottom Corners */}
        <div className="flex justify-between items-end">
          <div className="flex items-center gap-2">
            <span className="text-cyan-400 font-bold">└ [COORDINATES]</span>
            <span className="text-slate-600">--</span>
            <span>LAT 10.8231° N · LON 106.6297° E</span>
          </div>
          <div className="flex items-center gap-2">
            <span>PACKETS: {activePackets}/s</span>
            <span className="text-slate-600">--</span>
            <span className="text-cyan-400 font-bold">[BUILD_V2.4.0] ┘</span>
          </div>
        </div>
      </div>

      {/* 3. Floating Quick Cyber Controls Bar (Top right beneath navbar) */}
      <div className="fixed top-20 right-4 z-40 hidden sm:flex items-center gap-2 font-mono">
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-950/85 border border-cyan-500/30 backdrop-blur-xl shadow-2xl text-xs">
          {/* Audio Synthesizer Toggle */}
          <button
            onClick={toggleSound}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-xl transition-all ${
              audioEnabled
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
            title={audioEnabled ? 'Futuristic Sound FX: ON (Click to mute)' : 'Futuristic Sound FX: MUTED (Click to activate)'}
          >
            {audioEnabled ? <Volume2 className="w-3.5 h-3.5 text-cyan-400 animate-pulse" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="text-[11px]">{audioEnabled ? 'SFX: ON' : 'SFX: OFF'}</span>
          </button>

          {/* CRT Scanline Toggle */}
          <button
            onClick={toggleScanlines}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-xl transition-all ${
              scanlinesEnabled
                ? 'bg-indigo-500/25 text-indigo-300 border border-indigo-500/50 font-bold shadow-[0_0_12px_rgba(99,102,241,0.3)]'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
            title="Toggle Holographic CRT Scanlines"
          >
            <Scan className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-[11px] hidden lg:inline">{scanlinesEnabled ? 'SCANLINES' : 'CLEAN'}</span>
          </button>

          {/* Terminal Quick Button */}
          <button
            onClick={() => {
              cyberAudio.playClick();
              onOpenTerminal();
            }}
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl text-emerald-400 hover:bg-emerald-500/10 border border-emerald-500/30 transition-all"
            title="Launch Terminal CLI"
          >
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[11px]">CLI</span>
          </button>
        </div>
      </div>
    </>
  );
}
