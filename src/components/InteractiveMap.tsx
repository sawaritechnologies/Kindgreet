import React, { useState } from 'react';
import { MapPin, Siren, Heart, DollarSign, ArrowLeftRight, MessageSquare, ShieldCheck, Star } from 'lucide-react';
import { HelpRequest } from '../types';

interface InteractiveMapProps {
  requests: HelpRequest[];
  onOpenRoom: (req: HelpRequest) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ requests, onOpenRoom }) => {
  const [activePin, setActivePin] = useState<HelpRequest | null>(requests[0] || null);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative min-h-[500px] flex flex-col justify-between">
      {/* Map Graphic Canvas Simulation */}
      <div className="relative w-full h-[450px] bg-slate-950 overflow-hidden flex items-center justify-center p-4">
        {/* Background Grid Pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(#10b981 1px, transparent 1px), radial-gradient(#3b82f6 1px, #020617 1px)',
            backgroundSize: '40px 40px',
            backgroundPosition: '0 0, 20px 20px',
          }}
        />

        {/* Radar / Distance Rings */}
        <div className="absolute w-[300px] h-[300px] rounded-full border border-emerald-500/10 animate-ping pointer-events-none" />
        <div className="absolute w-[500px] h-[500px] rounded-full border border-emerald-500/15 pointer-events-none" />

        {/* Center My Location Indicator */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
          <div className="w-5 h-5 rounded-full bg-cyan-400 border-2 border-white shadow-lg shadow-cyan-400/50 animate-pulse" />
          <span className="text-[10px] font-extrabold text-cyan-300 bg-slate-950/80 px-2 py-0.5 rounded-full mt-1 border border-cyan-500/30">
            You Are Here
          </span>
        </div>

        {/* Scatter Map Pins for Requests */}
        {requests.map((req, idx) => {
          // Offsets based on coordinates or index for demo visual scatter
          const offsets = [
            { top: '25%', left: '30%' },
            { top: '35%', left: '70%' },
            { top: '65%', left: '25%' },
            { top: '70%', left: '75%' },
            { top: '20%', left: '55%' },
            { top: '80%', left: '45%' },
          ];
          const pos = offsets[idx % offsets.length];
          const isSelected = activePin?.id === req.id;

          return (
            <div
              key={req.id}
              onClick={() => setActivePin(req)}
              style={{ top: pos.top, left: pos.left }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group transition transform hover:scale-125 ${
                isSelected ? 'scale-125 z-30' : ''
              }`}
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center shadow-2xl transition border-2 ${
                  req.urgency === 'EMERGENCY'
                    ? 'bg-red-500 text-white border-white animate-bounce shadow-red-500/50'
                    : req.compensationType === 'VOLUNTEER'
                    ? 'bg-emerald-500 text-slate-950 border-white shadow-emerald-500/40'
                    : req.compensationType === 'PAID'
                    ? 'bg-cyan-500 text-slate-950 border-white'
                    : 'bg-purple-500 text-white border-white'
                }`}
              >
                {req.urgency === 'EMERGENCY' ? (
                  <Siren className="w-4 h-4" />
                ) : req.compensationType === 'VOLUNTEER' ? (
                  <Heart className="w-4 h-4 fill-slate-950" />
                ) : req.compensationType === 'PAID' ? (
                  <DollarSign className="w-4 h-4 stroke-[3]" />
                ) : (
                  <ArrowLeftRight className="w-4 h-4 stroke-[2.5]" />
                )}
              </div>

              {/* Hover Tooltip Title */}
              <div className="opacity-0 group-hover:opacity-100 absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-slate-950 text-slate-100 text-[10px] font-bold px-2 py-1 rounded-md whitespace-nowrap shadow-xl border border-slate-800 transition pointer-events-none">
                {req.title}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Request Pin Detail Card Footer */}
      {activePin && (
        <div className="p-4 bg-slate-950/90 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                {activePin.compensationType}
              </span>
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                {activePin.author.socialRating}★ by {activePin.author.name}
              </span>
              <span className="text-xs text-slate-400 font-medium">• {activePin.locationName} ({activePin.distanceKm} km)</span>
            </div>
            <h4 className="font-extrabold text-sm text-slate-100">{activePin.title}</h4>
            <p className="text-xs text-slate-300 line-clamp-1">{activePin.description}</p>
          </div>

          <button
            onClick={() => onOpenRoom(activePin)}
            className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-5 py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition shadow-lg shadow-emerald-500/20 shrink-0"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Open Private Chat Room</span>
          </button>
        </div>
      )}
    </div>
  );
};
