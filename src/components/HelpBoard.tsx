import React, { useState } from 'react';
import {
  Siren,
  Heart,
  DollarSign,
  ArrowLeftRight,
  Filter,
  MapPin,
  Clock,
  MessageSquare,
  ShieldCheck,
  Star,
  Map as MapIcon,
  List,
  Sparkles,
  Share2,
  AlertTriangle,
  ChevronRight,
  Plus,
  Zap
} from 'lucide-react';
import { HelpRequest, CompensationType, UrgencyLevel, RequestCategory } from '../types';
import { InteractiveMap } from './InteractiveMap';

interface HelpBoardProps {
  requests: HelpRequest[];
  onOpenRoom: (req: HelpRequest) => void;
  onOpenCreateModal: () => void;
  searchQuery: string;
}

export const HelpBoard: React.FC<HelpBoardProps> = ({
  requests,
  onOpenRoom,
  onOpenCreateModal,
  searchQuery,
}) => {
  const [selectedMode, setSelectedMode] = useState<CompensationType | 'ALL'>('ALL');
  const [selectedUrgency, setSelectedUrgency] = useState<UrgencyLevel | 'ALL'>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<RequestCategory | 'ALL'>('ALL');
  const [maxDistance, setMaxDistance] = useState<number>(10);
  const [viewMode, setViewMode] = useState<'cards' | 'map'>('cards');

  // Filter and sort requests based on user controls & search
  const filteredRequests = requests
    .filter((req) => {
      if (selectedMode !== 'ALL' && req.compensationType !== selectedMode) return false;
      if (selectedUrgency !== 'ALL' && req.urgency !== selectedUrgency) return false;
      if (selectedCategory !== 'ALL' && req.category !== selectedCategory) return false;
      if (req.distanceKm > maxDistance) return false;
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchTitle = req.title.toLowerCase().includes(q);
        const matchDesc = req.description.toLowerCase().includes(q);
        const matchTag = req.tags.some((t) => t.toLowerCase().includes(q));
        const matchAuthor = req.author.name.toLowerCase().includes(q);
        if (!matchTitle && !matchDesc && !matchTag && !matchAuthor) return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (a.isPriorityBoosted && !b.isPriorityBoosted) return -1;
      if (!a.isPriorityBoosted && b.isPriorityBoosted) return 1;
      return 0;
    });

  return (
    <div className="space-y-6">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-indigo-600 p-6 sm:p-8 text-white shadow-sm">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
            <span>Open Mutual Aid Ecosystem</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
            Ask Directly for What You Need — Help or Be Helped.
          </h1>
          <p className="text-sm sm:text-base text-indigo-100 leading-relaxed">
            Connect directly with neighbors in emergencies or everyday needs. Choose your preferred mode:{' '}
            <strong className="text-white underline">100% Volunteer</strong>, <strong className="text-white underline">Fair Paid Compensation</strong>, or <strong className="text-white underline">Barter & Exchange</strong>. Every act builds trust through verified Social Ratings.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenCreateModal}
              className="bg-white text-indigo-700 hover:bg-indigo-50 font-extrabold px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-md flex items-center gap-2 transition"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Post Your Need or Offer</span>
            </button>
            <span className="text-xs text-indigo-100 flex items-center gap-1 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-300" /> Private encrypted rooms created for every response
            </span>
          </div>
        </div>
      </div>

      {/* Instagram/Snapchat-style Community Stories Tray */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-800">
          <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px] font-black text-slate-700">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
            </span>
            <span>Live Local Vibe Stories</span>
          </span>
          <span className="text-[11px] text-indigo-600 font-extrabold cursor-pointer hover:underline">
            View All Local Highlights →
          </span>
        </div>

        <div className="flex items-center gap-4 overflow-x-auto no-scrollbar py-1">
          {/* Create Story Button */}
          <div className="flex flex-col items-center gap-1 shrink-0 cursor-pointer group">
            <div className="relative p-[2px] rounded-full border-2 border-dashed border-indigo-400 group-hover:border-indigo-600 transition">
              <div className="w-14 h-14 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                <Plus className="w-6 h-6 stroke-[3]" />
              </div>
              <span className="absolute bottom-0 right-0 bg-indigo-600 text-white rounded-full p-0.5 ring-2 ring-white">
                <Sparkles className="w-3 h-3" />
              </span>
            </div>
            <span className="text-[11px] font-bold text-slate-800">Your Story</span>
          </div>

          {/* Local Helper Story Circles */}
          {[
            {
              id: 's1',
              name: 'Elena Vance',
              avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250',
              status: '🔥 3m ago',
              type: 'Food Salvage'
            },
            {
              id: 's2',
              name: 'Dr. Marcus',
              avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=250',
              status: '⚡ Rapid Medic',
              type: 'Emergency'
            },
            {
              id: 's3',
              name: 'Sarah Chen',
              avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
              status: '🎥 New Vlog',
              type: 'Tutoring'
            },
            {
              id: 's4',
              name: 'Devon Miles',
              avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
              status: '🚲 On Road',
              type: 'Deliveries'
            },
            {
              id: 's5',
              name: 'Maya Lin',
              avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=250',
              status: '🙌 Active Now',
              type: 'Shelter Support'
            }
          ].map((story) => (
            <div
              key={story.id}
              onClick={onOpenCreateModal}
              className="flex flex-col items-center gap-1 shrink-0 cursor-pointer group"
            >
              <div className="p-[2.5px] bg-gradient-to-tr from-amber-400 via-rose-500 to-fuchsia-600 rounded-full shadow-xs group-hover:scale-105 transition transform">
                <div className="bg-white p-[2px] rounded-full">
                  <img
                    src={story.avatar}
                    alt={story.name}
                    className="w-13 h-13 rounded-full object-cover"
                  />
                </div>
              </div>
              <span className="text-[11px] font-extrabold text-slate-800 truncate max-w-[70px]">
                {story.name.split(' ')[0]}
              </span>
              <span className="text-[9px] font-black bg-indigo-50 text-indigo-700 px-1.5 py-0.2 rounded-full border border-indigo-100">
                {story.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-4 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Mode Tabs (Volunteer vs Paid vs Barter) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 no-scrollbar">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1 hidden sm:inline">
              Mode:
            </span>
            <button
              onClick={() => setSelectedMode('ALL')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 ${
                selectedMode === 'ALL'
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              All Modes
            </button>
            <button
              onClick={() => setSelectedMode('VOLUNTEER')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shrink-0 ${
                selectedMode === 'VOLUNTEER'
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                  : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50'
              }`}
            >
              <Heart className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
              <span>Volunteer (Free)</span>
            </button>
            <button
              onClick={() => setSelectedMode('PAID')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shrink-0 ${
                selectedMode === 'PAID'
                  ? 'bg-blue-100 text-blue-800 border border-blue-200'
                  : 'text-slate-600 hover:text-blue-700 hover:bg-blue-50'
              }`}
            >
              <DollarSign className="w-3.5 h-3.5 text-blue-600" />
              <span>Paid Assistance</span>
            </button>
            <button
              onClick={() => setSelectedMode('BARTER')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shrink-0 ${
                selectedMode === 'BARTER'
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-100'
                  : 'text-slate-600 hover:text-indigo-700 hover:bg-indigo-50'
              }`}
            >
              <ArrowLeftRight className="w-3.5 h-3.5 text-indigo-600" />
              <span>Barter & Trade</span>
            </button>
          </div>

          {/* View Mode Toggle (Cards vs Map) */}
          <div className="flex items-center gap-2 self-end lg:self-auto">
            <div className="bg-slate-100 p-1 rounded-xl border border-slate-200 flex items-center">
              <button
                onClick={() => setViewMode('cards')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition ${
                  viewMode === 'cards' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <List className="w-3.5 h-3.5" />
                <span>List View</span>
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition ${
                  viewMode === 'map' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <MapIcon className="w-3.5 h-3.5" />
                <span>Local Map</span>
              </button>
            </div>
          </div>
        </div>

        {/* Second Row Filters: Urgency, Radius Slider & Category */}
        <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex flex-wrap items-center gap-3">
            {/* Urgency Filter */}
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-slate-500">Urgency:</span>
              <select
                value={selectedUrgency}
                onChange={(e) => setSelectedUrgency(e.target.value as any)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1 text-slate-800 focus:outline-none focus:border-indigo-500 font-medium"
              >
                <option value="ALL">All Urgencies</option>
                <option value="EMERGENCY">🚨 Emergency Only</option>
                <option value="URGENT">⚡ Urgent Needs</option>
                <option value="STANDARD">💬 Standard Needs</option>
              </select>
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-slate-500">Category:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as any)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1 text-slate-800 focus:outline-none focus:border-indigo-500 font-medium"
              >
                <option value="ALL">All Categories</option>
                <option value="Emergency & Safety">Emergency & Safety</option>
                <option value="Medical & Care">Medical & Care</option>
                <option value="Food & Essentials">Food & Essentials</option>
                <option value="Transport & Ride">Transport & Ride</option>
                <option value="Shelter & Housing">Shelter & Housing</option>
                <option value="Repair & Technical">Repair & Technical</option>
                <option value="Barter & Goods Exchange">Barter & Goods Exchange</option>
                <option value="Elderly & Pet Care">Elderly & Pet Care</option>
                <option value="Education & Mentorship">Education & Mentorship</option>
                <option value="Community & Labor">Community & Labor</option>
              </select>
            </div>
          </div>

          {/* Radius Selector */}
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-indigo-600" />
            <span className="font-semibold text-slate-500">Radius:</span>
            <input
              type="range"
              min="0.5"
              max="25"
              step="0.5"
              value={maxDistance}
              onChange={(e) => setMaxDistance(parseFloat(e.target.value))}
              className="w-24 accent-indigo-600"
            />
            <span className="font-bold text-indigo-700 w-12">{maxDistance} km</span>
          </div>
        </div>
      </div>

      {/* Main Content Area: Cards or Interactive Map */}
      {viewMode === 'map' ? (
        <InteractiveMap requests={filteredRequests} onOpenRoom={onOpenRoom} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredRequests.length === 0 ? (
            <div className="col-span-full py-16 text-center bg-white border border-slate-200 rounded-2xl p-8 space-y-3 shadow-sm">
              <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto" />
              <h3 className="text-lg font-bold text-slate-800">No matching help requests found</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Try widening your distance radius, changing your compensation filter, or be the first to post a request in this area!
              </p>
              <button
                onClick={onOpenCreateModal}
                className="mt-2 inline-flex items-center gap-2 bg-indigo-600 text-white font-bold px-4 py-2 rounded-xl text-xs hover:bg-indigo-700 transition"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Request</span>
              </button>
            </div>
          ) : (
            filteredRequests.map((req) => (
              <div
                key={req.id}
                className={`group relative bg-white border rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                  req.isPriorityBoosted
                    ? 'border-indigo-400 ring-2 ring-indigo-200 shadow-md bg-indigo-50/10'
                    : req.urgency === 'EMERGENCY'
                    ? 'border-red-300 ring-1 ring-red-200 bg-red-50/10'
                    : req.urgency === 'URGENT'
                    ? 'border-amber-300'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Priority Boost Banner Badge */}
                {req.isPriorityBoosted && (
                  <div className="absolute -top-3 right-4 bg-gradient-to-r from-amber-500 to-indigo-600 text-white font-black text-[10px] px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-1 uppercase tracking-wider">
                    <Zap className="w-3 h-3 text-amber-200 fill-amber-200" />
                    <span>Priority Boosted</span>
                  </div>
                )}

                {/* Top Request Badges */}
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    {/* Urgency Badge */}
                    {req.urgency === 'EMERGENCY' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-100 text-red-700 border border-red-200 text-[10px] font-black uppercase">
                        <Siren className="w-3.5 h-3.5" />
                        <span>EMERGENCY</span>
                      </span>
                    ) : req.urgency === 'URGENT' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-200 text-[10px] font-bold uppercase">
                        <span>⚡ URGENT</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200 text-[10px] font-medium">
                        <span>Standard</span>
                      </span>
                    )}

                    {/* Compensation Mode Badge */}
                    {req.compensationType === 'VOLUNTEER' ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 text-[10px] font-bold">
                        <Heart className="w-3 h-3 text-emerald-600 fill-emerald-600" />
                        <span>Volunteer</span>
                      </span>
                    ) : req.compensationType === 'PAID' ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200 text-[10px] font-bold">
                        <DollarSign className="w-3 h-3 text-blue-600" />
                        <span>Paid</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 text-[10px] font-bold">
                        <ArrowLeftRight className="w-3 h-3 text-indigo-600" />
                        <span>Barter</span>
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-bold text-slate-800 text-base leading-snug group-hover:text-indigo-600 transition line-clamp-2 mb-2">
                    {req.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-3">
                    {req.description}
                  </p>

                  {/* Image Attachment preview if present */}
                  {req.imageUrl && (
                    <div className="mb-3 rounded-xl overflow-hidden h-36 relative border border-slate-200">
                      <img src={req.imageUrl} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                  )}

                  {/* Compensation Details Box */}
                  <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 mb-3 text-xs">
                    <span className="text-slate-400 font-semibold block text-[10px] uppercase tracking-wider mb-0.5">
                      Terms / Compensation:
                    </span>
                    <span className="font-semibold text-slate-700">{req.compensationDetails}</span>
                  </div>

                  {/* Location & Tags */}
                  <div className="flex flex-wrap items-center gap-y-2 gap-x-3 text-[11px] text-slate-500 mb-4">
                    <span className="flex items-center gap-1 text-indigo-600 font-medium">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{req.locationName} ({req.distanceKm} km away)</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{req.createdAt}</span>
                    </span>
                  </div>
                </div>

                {/* Author Card & Action Footer */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                  {/* Author Meta */}
                  <div className="flex items-center gap-2">
                    <img
                      src={req.author.avatar}
                      alt={req.author.name}
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-slate-100"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-800 flex items-center gap-1">
                        <span>{req.author.name}</span>
                        <ShieldCheck className="w-3 h-3 text-indigo-600" />
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-indigo-700 font-bold">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        <span>{req.author.socialRating}★ ({req.author.totalReviews})</span>
                      </div>
                    </div>
                  </div>

                  {/* Direct Action: Open Private Chat Room */}
                  <button
                    onClick={() => onOpenRoom(req)}
                    className={`px-3.5 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs transition transform active:scale-95 ${
                      req.urgency === 'EMERGENCY'
                        ? 'bg-red-500 text-white hover:bg-red-600'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    }`}
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Initiate Help</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
