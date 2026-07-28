import React, { useState } from 'react';
import {
  Heart,
  Siren,
  Search,
  Bell,
  PlusCircle,
  Award,
  Sparkles,
  MessageSquare,
  ShieldCheck,
  Compass,
  Film,
  Trophy,
  User,
  X,
  ShoppingBag,
  Zap,
  Briefcase
} from 'lucide-react';
import { UserProfile, NotificationItem } from '../types';

interface HeaderProps {
  currentUser: UserProfile;
  activeTab: 'board' | 'reels' | 'rooms' | 'leaderboard' | 'jobs' | 'quick_commerce' | 'marketplace' | 'profile';
  setActiveTab: (tab: 'board' | 'reels' | 'rooms' | 'leaderboard' | 'jobs' | 'quick_commerce' | 'marketplace' | 'profile') => void;
  onOpenCreateModal: () => void;
  unreadRoomsCount: number;
  notifications: NotificationItem[];
  onSelectNotification: (notif: NotificationItem) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  emergencyCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  activeTab,
  setActiveTab,
  onOpenCreateModal,
  unreadRoomsCount,
  notifications,
  onSelectNotification,
  searchQuery,
  setSearchQuery,
  emergencyCount,
}) => {
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const unreadNotifsCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 text-slate-800 shadow-sm">
      {/* Top Emergency Ticker if active emergency exists */}
      {emergencyCount > 0 && (
        <div className="bg-red-500 text-white px-4 py-2 text-xs font-semibold flex items-center justify-between">
          <div className="flex items-center gap-2 max-w-7xl mx-auto w-full">
            <Siren className="w-4 h-4 animate-bounce shrink-0" />
            <span>
              <strong className="uppercase tracking-wide">Emergency Alert:</strong> {emergencyCount} urgent community request{emergencyCount > 1 ? 's' : ''} nearby requiring immediate support.
            </span>
          </div>
          <button
            onClick={() => setActiveTab('board')}
            className="hidden sm:inline-block bg-white text-red-600 px-3 py-1 rounded-lg text-xs font-bold hover:bg-slate-100 transition shadow-xs"
          >
            Respond Now
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Brand Logo */}
          <div
            onClick={() => setActiveTab('board')}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-md shadow-indigo-100 group-hover:scale-105 transition-transform">
              <Heart className="w-5 h-5 fill-white text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-slate-900">
                  Kind<span className="text-indigo-600">Grid</span>
                </span>
                <span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-indigo-100">
                  Mutual Aid
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block font-medium">Altruism & Social Trust Ecosystem</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search needs, barter offers, volunteers..."
              className="w-full bg-slate-50 border border-slate-200 rounded-full pl-10 pr-8 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Action CTAs & User Stats */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Create Help Request CTA */}
            <button
              onClick={onOpenCreateModal}
              className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-indigo-100 transition-all transform active:scale-95"
            >
              <PlusCircle className="w-4 h-4 stroke-[2.5]" />
              <span className="hidden sm:inline">Seek or Offer Help</span>
              <span className="sm:hidden">Post Need</span>
            </button>

            {/* Notifications Menu Toggle */}
            <div className="relative">
              <button
                onClick={() => setShowNotifMenu(!showNotifMenu)}
                className="p-2 text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-xl relative border border-slate-200 transition"
                title="Notifications"
              >
                <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                {unreadNotifsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                    {unreadNotifsCount}
                  </span>
                )}
              </button>

              {/* Dropdown Menu */}
              {showNotifMenu && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 overflow-hidden divide-y divide-slate-100">
                  <div className="p-3.5 bg-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-indigo-600" />
                      <span className="font-bold text-xs sm:text-sm text-slate-800">Live Community Alerts</span>
                    </div>
                    <span className="text-[11px] text-slate-500 font-medium">{notifications.length} total</span>
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center text-xs text-slate-500">No new alerts. You're up to date!</div>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n.id}
                          onClick={() => {
                            onSelectNotification(n);
                            setShowNotifMenu(false);
                          }}
                          className={`p-3.5 text-xs cursor-pointer hover:bg-slate-50 transition flex items-start gap-3 ${
                            !n.read ? 'bg-indigo-50/50 border-l-2 border-indigo-600' : ''
                          }`}
                        >
                          {n.senderAvatar ? (
                            <img src={n.senderAvatar} alt="" className="w-8 h-8 rounded-full object-cover shrink-0" />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 font-bold">
                              !
                            </div>
                          )}
                          <div className="flex-1">
                            <div className="font-semibold text-slate-800 flex items-center justify-between">
                              <span>{n.title}</span>
                              <span className="text-[10px] text-slate-400">{n.timestamp}</span>
                            </div>
                            <p className="text-slate-600 text-[11px] mt-0.5 line-clamp-2">{n.message}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Active Karma Streak Counter */}
            <div className="hidden sm:flex items-center gap-1.5 bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-fuchsia-500/10 border border-amber-200/80 px-3 py-1.5 rounded-full shadow-2xs">
              <span className="text-base animate-bounce">🔥</span>
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-black text-amber-600 uppercase tracking-wider leading-none">
                  14 Day Streak
                </span>
                <span className="text-[9px] font-bold text-slate-500 leading-tight">
                  Local Hero
                </span>
              </div>
            </div>

            {/* User Profile Pill / Rating Gauge with Instagram Story Ring */}
            <button
              onClick={() => setActiveTab('profile')}
              className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl p-1.5 sm:px-3 sm:py-1.5 transition group"
            >
              <div className="p-[2px] bg-gradient-to-tr from-amber-400 via-rose-500 to-fuchsia-600 rounded-full shadow-2xs group-hover:scale-105 transition transform">
                <div className="bg-white p-[1px] rounded-full">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-full object-cover"
                  />
                </div>
              </div>
              <div className="hidden lg:block text-left">
                <div className="text-xs font-bold text-slate-800 flex items-center gap-1">
                  <span>{currentUser.name}</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                </div>
                <div className="text-[10px] text-indigo-700 font-bold flex items-center gap-1">
                  <span className="text-amber-400">★</span>
                  <span>{currentUser.socialRating} ({currentUser.karmaLevel})</span>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <nav className="flex items-center justify-between border-t border-slate-100 pt-1.5 pb-1.5 overflow-x-auto no-scrollbar gap-1 text-xs sm:text-sm font-medium">
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('board')}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl transition ${
                activeTab === 'board'
                  ? 'bg-indigo-50 text-indigo-700 font-bold border border-indigo-100'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Compass className="w-4 h-4 text-indigo-600" />
              <span>Help Board</span>
            </button>

            <button
              onClick={() => setActiveTab('reels')}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl transition ${
                activeTab === 'reels'
                  ? 'bg-indigo-50 text-indigo-700 font-bold border border-indigo-100'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Film className="w-4 h-4 text-indigo-600" />
              <span>Kindness Stories & Vlogs</span>
              <span className="bg-indigo-100 text-indigo-700 text-[10px] px-2 py-0.5 rounded-full font-bold">
                Social Feed
              </span>
            </button>

            <button
              onClick={() => setActiveTab('rooms')}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl transition relative ${
                activeTab === 'rooms'
                  ? 'bg-indigo-50 text-indigo-700 font-bold border border-indigo-100'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <MessageSquare className="w-4 h-4 text-indigo-600" />
              <span>Private Chat Rooms</span>
              {unreadRoomsCount > 0 && (
                <span className="bg-amber-500 text-white font-bold text-[10px] px-1.5 py-0.2 rounded-full">
                  {unreadRoomsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('jobs')}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl transition ${
                activeTab === 'jobs'
                  ? 'bg-indigo-50 text-indigo-700 font-bold border border-indigo-100'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Briefcase className="w-4 h-4 text-indigo-600" />
              <span>KarmaWork Gigs</span>
              <span className="bg-indigo-100 text-indigo-800 text-[10px] px-2 py-0.5 rounded-full font-extrabold border border-indigo-200">
                Youth Network
              </span>
            </button>

            <button
              onClick={() => setActiveTab('quick_commerce')}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl transition ${
                activeTab === 'quick_commerce'
                  ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Zap className="w-4 h-4 text-emerald-600 fill-emerald-500 animate-pulse" />
              <span>KindDrop 10m</span>
              <span className="bg-emerald-100 text-emerald-900 text-[10px] px-2 py-0.5 rounded-full font-black border border-emerald-200">
                ⚡ Express
              </span>
            </button>

            <button
              onClick={() => setActiveTab('leaderboard')}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl transition ${
                activeTab === 'leaderboard'
                  ? 'bg-indigo-50 text-indigo-700 font-bold border border-indigo-100'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>Leaderboard & Ratings</span>
            </button>

            <button
              onClick={() => setActiveTab('marketplace')}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl transition ${
                activeTab === 'marketplace'
                  ? 'bg-indigo-50 text-indigo-700 font-bold border border-indigo-100'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
              <span>Karma Marketplace</span>
              <span className="bg-amber-100 text-amber-900 text-[10px] px-2 py-0.5 rounded-full font-black border border-amber-200">
                ✨ {currentUser.karmaPoints} PTS
              </span>
            </button>
          </div>

          <button
            onClick={() => setActiveTab('profile')}
            className={`hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl transition ${
              activeTab === 'profile'
                ? 'bg-indigo-50 text-indigo-700 font-bold border border-indigo-100'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <User className="w-4 h-4 text-indigo-600" />
            <span>My Impact</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
