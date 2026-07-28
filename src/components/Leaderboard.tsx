import React from 'react';
import {
  Trophy,
  Star,
  Award,
  ShieldCheck,
  Heart,
  Sparkles,
  Users,
  Flame,
  CheckCircle2,
  ArrowUpRight
} from 'lucide-react';
import { UserProfile } from '../types';

interface LeaderboardProps {
  users: UserProfile[];
  onSelectUser: (user: UserProfile) => void;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ users, onSelectUser }) => {
  // Sort users by social rating first, then karma points
  const sortedUsers = [...users].sort((a, b) => {
    if (b.socialRating !== a.socialRating) return b.socialRating - a.socialRating;
    return b.karmaPoints - a.karmaPoints;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-indigo-600 rounded-2xl p-6 sm:p-8 text-white shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider">
            <Trophy className="w-3.5 h-3.5 text-amber-300" />
            <span>Global Altruism & Trust Leaderboard</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Community Kindness Rankings
          </h1>
          <p className="text-xs sm:text-sm text-indigo-100 max-w-2xl leading-relaxed">
            Gamified recognition that incentivizes positive contributions. Members earn verified Social Ratings, Karma Points, and Badges for volunteer aid, fair barter, and emergency responses.
          </p>
        </div>

        {/* Global Impact Summary Stats */}
        <div className="grid grid-cols-3 gap-3 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 shrink-0">
          <div className="text-center px-2">
            <div className="text-lg sm:text-2xl font-black text-white">1,480+</div>
            <div className="text-[10px] text-indigo-100 uppercase font-bold">Helps Given</div>
          </div>
          <div className="text-center border-x border-white/20 px-2">
            <div className="text-lg sm:text-2xl font-black text-amber-300">4.94★</div>
            <div className="text-[10px] text-indigo-100 uppercase font-bold">Avg Trust</div>
          </div>
          <div className="text-center px-2">
            <div className="text-lg sm:text-2xl font-black text-white">385h</div>
            <div className="text-[10px] text-indigo-100 uppercase font-bold">Volunteered</div>
          </div>
        </div>
      </div>

      {/* Top 3 Podium Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {sortedUsers.slice(0, 3).map((user, index) => {
          const rank = index + 1;
          const isFirst = rank === 1;

          return (
            <div
              key={user.id}
              onClick={() => onSelectUser(user)}
              className={`relative rounded-2xl p-6 border cursor-pointer transition transform hover:-translate-y-1 shadow-sm flex flex-col justify-between ${
                isFirst
                  ? 'bg-amber-50/70 border-amber-300 ring-2 ring-amber-200'
                  : rank === 2
                  ? 'bg-white border-slate-200'
                  : 'bg-white border-slate-200'
              }`}
            >
              {/* Rank Badge */}
              <div className="absolute top-4 right-4">
                {isFirst ? (
                  <span className="w-10 h-10 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-black text-lg shadow-sm">
                    👑
                  </span>
                ) : (
                  <span className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center font-black text-xs">
                    #{rank}
                  </span>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-14 h-14 rounded-xl object-cover ring-2 ring-indigo-100"
                  />
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-1.5">
                      <span>{user.name}</span>
                      <ShieldCheck className="w-4 h-4 text-indigo-600" />
                    </h3>
                    <p className="text-xs text-indigo-700 font-bold">{user.karmaLevel}</p>
                    <p className="text-[11px] text-slate-500">{user.location}</p>
                  </div>
                </div>

                {/* Score Stats */}
                <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
                  <div>
                    <span className="text-slate-500 block text-[10px] font-medium">Social Rating</span>
                    <span className="font-extrabold text-amber-600 text-sm flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      {user.socialRating}★ ({user.totalReviews})
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] font-medium">Karma Points</span>
                    <span className="font-extrabold text-indigo-600 text-sm flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      {user.karmaPoints} pts
                    </span>
                  </div>
                </div>

                {/* Bio snippet */}
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{user.bio}</p>
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-600 font-bold">
                <span>{user.helpGivenCount} Acts of Help Delivered</span>
                <ArrowUpRight className="w-4 h-4 text-emerald-600" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Full Rankings Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-600" />
            <h3 className="font-black text-sm text-slate-900 uppercase tracking-wider">
              Verified Samaritan Leaderboard
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-medium">Sorted by Social Rating & Verified Acts</span>
        </div>

        <div className="divide-y divide-slate-100">
          {sortedUsers.map((user, idx) => (
            <div
              key={user.id}
              onClick={() => onSelectUser(user)}
              className="p-4 hover:bg-slate-50 cursor-pointer transition flex items-center justify-between gap-4 text-xs"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <span className="w-6 font-black text-slate-400 text-sm text-center">#{idx + 1}</span>
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover ring-1 ring-slate-200 shrink-0"
                />
                <div className="min-w-0">
                  <div className="font-bold text-slate-800 flex items-center gap-1.5">
                    <span className="truncate">{user.name}</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <span className="text-[10px] bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full border border-indigo-100 font-semibold shrink-0">
                      {user.karmaLevel}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 truncate">{user.bio}</p>
                </div>
              </div>

              <div className="flex items-center gap-6 shrink-0">
                <div className="text-right">
                  <span className="text-amber-500 font-extrabold flex items-center justify-end gap-1 text-sm">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {user.socialRating}★
                  </span>
                  <span className="text-[10px] text-slate-400">{user.totalReviews} reviews</span>
                </div>

                <div className="text-right hidden sm:block">
                  <span className="text-indigo-600 font-bold text-sm">{user.karmaPoints} pts</span>
                  <span className="text-[10px] text-slate-400">{user.helpGivenCount} helps given</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
