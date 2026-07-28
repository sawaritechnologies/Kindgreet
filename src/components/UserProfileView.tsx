import React, { useState } from 'react';
import {
  Star,
  ShieldCheck,
  Award,
  Sparkles,
  Heart,
  Calendar,
  MapPin,
  Clock,
  ArrowUpRight,
  UserCheck,
  MessageCircle,
  TrendingUp,
  FileText
} from 'lucide-react';
import { UserProfile, HelpRequest } from '../types';

interface UserProfileViewProps {
  user: UserProfile;
  requests: HelpRequest[];
  onOpenRoom?: (req: HelpRequest) => void;
}

export const UserProfileView: React.FC<UserProfileViewProps> = ({ user, requests }) => {
  const [activeTab, setActiveTab] = useState<'reviews' | 'history' | 'badges'>('reviews');

  // Filter requests posted by this user
  const userPostedRequests = requests.filter((r) => r.author.id === user.id);

  return (
    <div className="space-y-6">
      {/* Cover Banner & Profile Card */}
      <div className="relative bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        {/* Cover Photo */}
        <div className="h-44 sm:h-56 w-full bg-slate-100 relative">
          <img
            src={
              user.coverImage ||
              'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=1200'
            }
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/20 to-transparent" />
        </div>

        {/* Profile Content Container */}
        <div className="p-6 sm:p-8 -mt-16 sm:-mt-20 relative z-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover ring-4 ring-white shadow-xl shrink-0"
            />

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-3xl font-black text-slate-900 sm:text-white drop-shadow-sm">{user.name}</h1>
                <ShieldCheck className="w-6 h-6 text-indigo-600 sm:text-emerald-400" />
                <span className="text-xs bg-indigo-50 sm:bg-white/90 text-indigo-700 sm:text-indigo-900 font-bold px-2.5 py-0.5 rounded-full border border-indigo-100 sm:border-white">
                  Verified Member
                </span>
              </div>
              <p className="text-xs text-slate-500 sm:text-slate-200 font-semibold">@{user.username} • {user.location}</p>
              <p className="text-xs text-slate-700 sm:text-slate-100 max-w-lg mt-1 font-medium">{user.bio}</p>
            </div>
          </div>

          {/* Social Rating Gauge */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 text-center min-w-[200px] shrink-0 space-y-1 shadow-sm">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Social Rating Ledger
            </span>
            <div className="text-2xl sm:text-3xl font-black text-amber-500 flex items-center justify-center gap-1">
              <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
              <span>{user.socialRating}</span>
              <span className="text-xs text-slate-400 font-normal">/ 5.0</span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium">{user.totalReviews} peer evaluations received</p>
          </div>
        </div>

        {/* Four Key Impact Stats Grid */}
        <div className="p-6 border-t border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-50/50">
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-center shadow-xs">
            <span className="text-xs text-slate-500 font-medium block">Help Delivered</span>
            <span className="text-lg font-black text-emerald-600 mt-0.5 block">{user.helpGivenCount} Acts</span>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-center shadow-xs">
            <span className="text-xs text-slate-500 font-medium block">Help Received</span>
            <span className="text-lg font-black text-indigo-600 mt-0.5 block">{user.helpReceivedCount} Acts</span>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-center shadow-xs">
            <span className="text-xs text-slate-500 font-medium block">Karma Score</span>
            <span className="text-lg font-black text-amber-500 mt-0.5 block flex items-center justify-center gap-1">
              <Sparkles className="w-4 h-4 fill-amber-400 text-amber-400" />
              {user.karmaPoints}
            </span>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-center shadow-xs">
            <span className="text-xs text-slate-500 font-medium block">Volunteer Hours</span>
            <span className="text-lg font-black text-teal-600 mt-0.5 block">{user.volunteerHours} hrs</span>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('reviews')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition ${
            activeTab === 'reviews'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Social Ratings & Reviews ({user.reviews?.length || 0})
        </button>

        <button
          onClick={() => setActiveTab('badges')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition ${
            activeTab === 'badges'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Badges Collection ({user.badges?.length || 0})
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition ${
            activeTab === 'history'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          My Direct Listings ({userPostedRequests.length})
        </button>
      </div>

      {/* Tab Content Area */}
      {activeTab === 'reviews' ? (
        <div className="space-y-4">
          {(!user.reviews || user.reviews.length === 0) ? (
            <div className="p-12 text-center text-slate-500 bg-white border border-slate-200 rounded-2xl">
              No ratings recorded yet. Complete help requests to receive social reviews!
            </div>
          ) : (
            user.reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={rev.reviewerAvatar} alt="" className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-200" />
                    <div>
                      <h4 className="font-bold text-xs text-slate-800">{rev.reviewerName}</h4>
                      <p className="text-[10px] text-slate-400">{rev.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <div className="flex text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs font-extrabold text-amber-500">{rev.rating}.0</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed italic">"{rev.comment}"</p>

                <div className="flex flex-wrap items-center gap-2 pt-2 text-[10px]">
                  <span className="bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-full font-bold border border-indigo-100">
                    Mode: {rev.compensationType}
                  </span>
                  {rev.badgeAwarded && (
                    <span className="bg-amber-50 text-amber-800 px-2.5 py-0.5 rounded-full font-bold border border-amber-200 flex items-center gap-1">
                      <Award className="w-3 h-3 text-amber-600" />
                      Awarded Badge: {rev.badgeAwarded}
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      ) : activeTab === 'badges' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(!user.badges || user.badges.length === 0) ? (
            <div className="col-span-full p-12 text-center text-slate-500 bg-white border border-slate-200 rounded-2xl">
              No badges earned yet. Respond to emergency requests or barter fairly to unlock badges!
            </div>
          ) : (
            user.badges.map((b) => (
              <div
                key={b.id}
                className="bg-white border border-slate-200 rounded-2xl p-4 flex items-start gap-3.5 shadow-xs"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-200">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900">{b.name}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed mt-0.5">{b.description}</p>
                  <span className="inline-block text-[10px] text-emerald-600 font-bold uppercase mt-2">
                    Verified Community Achievement
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {userPostedRequests.length === 0 ? (
            <div className="p-12 text-center text-slate-500 bg-white border border-slate-200 rounded-2xl">
              You haven't posted any help requests yet.
            </div>
          ) : (
            userPostedRequests.map((req) => (
              <div
                key={req.id}
                className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between gap-4 shadow-xs"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                      {req.compensationType}
                    </span>
                    <span className="text-[10px] text-slate-400">{req.createdAt}</span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-800">{req.title}</h4>
                  <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{req.description}</p>
                </div>

                <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
                  Status: {req.status}
                </span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
