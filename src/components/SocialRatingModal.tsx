import React, { useState } from 'react';
import { Star, Award, ShieldCheck, Heart, X, Sparkles, CheckCircle2 } from 'lucide-react';
import { UserProfile, CompensationType } from '../types';

interface SocialRatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetUser: UserProfile | null;
  onSubmitRating: (
    targetUserId: string,
    rating: number,
    comment: string,
    badgeAwarded?: string,
    compensationType?: CompensationType
  ) => void;
}

export const SocialRatingModal: React.FC<SocialRatingModalProps> = ({
  isOpen,
  onClose,
  targetUser,
  onSubmitRating,
}) => {
  if (!isOpen || !targetUser) return null;

  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>('');
  const [selectedBadge, setSelectedBadge] = useState<string>('Top Samaritan');
  const [compensationType, setCompensationType] = useState<CompensationType>('VOLUNTEER');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    onSubmitRating(targetUser.id, rating, comment.trim(), selectedBadge, compensationType);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 overflow-hidden">
        {isSuccess ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto ring-4 ring-emerald-100 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-black text-slate-900">Social Rating Submitted!</h3>
            <p className="text-xs text-slate-600 max-w-xs mx-auto">
              Your review for {targetUser.name} has been published to their global kindness ledger. Karma points awarded!
            </p>
          </div>
        ) : (
          <>
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <img
                  src={targetUser.avatar}
                  alt={targetUser.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500"
                />
                <div>
                  <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-1.5">
                    <span>Give Social Rating to {targetUser.name}</span>
                    <ShieldCheck className="w-4 h-4 text-indigo-600" />
                  </h3>
                  <p className="text-xs text-slate-500">Current Rating: {targetUser.socialRating}★ ({targetUser.totalReviews} ratings)</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-slate-700 bg-slate-100 rounded-full transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 pt-4">
              {/* Star Selector */}
              <div className="text-center space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  How would you rate this mutual help experience?
                </label>
                <div className="flex items-center justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 text-amber-400 hover:scale-125 transition-transform"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <div className="text-xs font-extrabold text-amber-600">
                  {rating === 5
                    ? '5.0 ★ — Exceptional Samaritan (Kind, Reliable & Empathetic)'
                    : rating === 4
                    ? '4.0 ★ — Great Helper (Punctual & Friendly)'
                    : rating === 3
                    ? '3.0 ★ — Adequate Assistance'
                    : '2.0 ★ — Needs Improvement'}
                </div>
              </div>

              {/* Mode of Fulfillment Confirmation */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  How was the help fulfilled?
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setCompensationType('VOLUNTEER')}
                    className={`py-2 px-1 rounded-xl border font-bold text-center transition ${
                      compensationType === 'VOLUNTEER'
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                        : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    💚 Volunteer
                  </button>
                  <button
                    type="button"
                    onClick={() => setCompensationType('PAID')}
                    className={`py-2 px-1 rounded-xl border font-bold text-center transition ${
                      compensationType === 'PAID'
                        ? 'bg-indigo-50 border-indigo-300 text-indigo-800'
                        : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    💵 Paid Fairly
                  </button>
                  <button
                    type="button"
                    onClick={() => setCompensationType('BARTER')}
                    className={`py-2 px-1 rounded-xl border font-bold text-center transition ${
                      compensationType === 'BARTER'
                        ? 'bg-purple-50 border-purple-300 text-purple-800'
                        : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    🔄 Barter Trade
                  </button>
                </div>
              </div>

              {/* Badge Awarding */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-amber-500" />
                  <span>Award Community Badge (Optional)</span>
                </label>
                <select
                  value={selectedBadge}
                  onChange={(e) => setSelectedBadge(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-medium"
                >
                  <option value="Top Samaritan">Top Samaritan (Empathetic & Reliable)</option>
                  <option value="Emergency Responder">Emergency Responder (Rapid Emergency Aid)</option>
                  <option value="Master Barterer">Master Barterer (Fair & Generous Exchange)</option>
                  <option value="Community Guardian">Community Guardian (Dedicated Volunteer)</option>
                </select>
              </div>

              {/* Review Comment */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Written Testimonial / Feedback
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={3}
                  placeholder={`Describe how ${targetUser.name} helped you or how smooth the interaction was...`}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 leading-relaxed font-medium"
                />
              </div>

              {/* Footer Actions */}
              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 flex items-center gap-1 font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Adds +50 Karma Points
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-5 py-2 rounded-xl text-xs transition shadow-xs"
                  >
                    Publish Rating
                  </button>
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
