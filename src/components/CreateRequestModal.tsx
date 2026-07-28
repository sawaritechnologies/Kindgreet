import React, { useState } from 'react';
import {
  X,
  Siren,
  Heart,
  DollarSign,
  ArrowLeftRight,
  Sparkles,
  MapPin,
  ShieldCheck,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { HelpRequest, CompensationType, UrgencyLevel, RequestCategory, UserProfile } from '../types';

interface CreateRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newReq: Omit<HelpRequest, 'id' | 'createdAt' | 'status' | 'offersCount'>) => void;
  currentUser: UserProfile;
}

export const CreateRequestModal: React.FC<CreateRequestModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  currentUser,
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [urgency, setUrgency] = useState<UrgencyLevel>('STANDARD');
  const [compensationType, setCompensationType] = useState<CompensationType>('VOLUNTEER');
  const [compensationDetails, setCompensationDetails] = useState('');
  const [category, setCategory] = useState<RequestCategory>('Community & Labor');
  const [locationName, setLocationName] = useState('Oakridge Neighborhood, Sector 3');
  const [imageUrl, setImageUrl] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  // AI Assistant for auto-formatting
  const handleAiFormat = async () => {
    if (!description && !title) return;
    setIsAiLoading(true);
    try {
      const res = await fetch('/api/ai/help-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          task: 'draft_request',
          prompt: `${title} - ${description}`,
          category,
          urgency,
          mode: compensationType,
        }),
      });
      const data = await res.json();
      if (data.title) setTitle(data.title);
      if (data.description) setDescription(data.description);
      if (data.suggestedTags && Array.isArray(data.suggestedTags)) {
        setTagsInput(data.suggestedTags.join(', '));
      }
    } catch (err) {
      console.error('AI draft error:', err);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    let defaultCompDetails = compensationDetails;
    if (!defaultCompDetails) {
      if (compensationType === 'VOLUNTEER') defaultCompDetails = '100% Volunteer / Free Mutual Aid';
      else if (compensationType === 'PAID') defaultCompDetails = 'Paid assistance (Price to be agreed in chat)';
      else defaultCompDetails = 'Barter & Goods exchange (Open to trade proposals)';
    }

    onSubmit({
      title,
      description,
      category,
      urgency,
      compensationType,
      compensationDetails: defaultCompDetails,
      locationName: locationName || 'Oakridge Community',
      distanceKm: 0.3,
      latitude: 37.775,
      longitude: -122.418,
      author: {
        id: currentUser.id,
        name: currentUser.name,
        username: currentUser.username,
        avatar: currentUser.avatar,
        socialRating: currentUser.socialRating,
        totalReviews: currentUser.totalReviews,
        karmaLevel: currentUser.karmaLevel,
      },
      tags: tags.length ? tags : ['DirectHelp', 'CommunityAid'],
      imageUrl: imageUrl.trim() ? imageUrl.trim() : undefined,
      contactPreference: urgency === 'EMERGENCY' ? 'emergency_direct' : 'chat_only',
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Modal Header */}
        <div className="bg-indigo-600 p-6 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-md text-white flex items-center justify-center font-bold">
                +
              </span>
              <h2 className="text-xl font-black text-white">Direct Help Request</h2>
            </div>
            <p className="text-xs text-indigo-100 mt-0.5">
              Ask openly for what you require currently — volunteer, paid, or barter.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-indigo-100 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {/* Urgency Level Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              1. Urgency Level
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setUrgency('EMERGENCY')}
                className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition ${
                  urgency === 'EMERGENCY'
                    ? 'bg-red-50 border-red-300 text-red-800 font-bold ring-2 ring-red-200'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Siren className="w-5 h-5 text-red-600 mb-1" />
                <div>
                  <div className="text-xs font-extrabold text-red-900">🚨 Emergency</div>
                  <div className="text-[10px] text-slate-500 font-medium">Immediate distress/health</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setUrgency('URGENT')}
                className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition ${
                  urgency === 'URGENT'
                    ? 'bg-amber-50 border-amber-300 text-amber-900 font-bold ring-2 ring-amber-200'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <AlertCircle className="w-5 h-5 text-amber-600 mb-1" />
                <div>
                  <div className="text-xs font-bold text-amber-900">⚡ Urgent</div>
                  <div className="text-[10px] text-slate-500 font-medium">Needed within hours</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setUrgency('STANDARD')}
                className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition ${
                  urgency === 'STANDARD'
                    ? 'bg-indigo-50 border-indigo-300 text-indigo-900 font-bold ring-2 ring-indigo-200'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Heart className="w-5 h-5 text-indigo-600 mb-1" />
                <div>
                  <div className="text-xs font-bold text-indigo-900">💬 Standard</div>
                  <div className="text-[10px] text-slate-500 font-medium">General assistance/barter</div>
                </div>
              </button>
            </div>
          </div>

          {/* Fulfillment / Compensation Mode */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              2. Compensation / Fulfillment Mode
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setCompensationType('VOLUNTEER')}
                className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition ${
                  compensationType === 'VOLUNTEER'
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold ring-2 ring-emerald-200'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Heart className="w-5 h-5 text-emerald-600 fill-emerald-600 mb-1" />
                <div>
                  <div className="text-xs font-bold text-emerald-900">💚 Volunteer</div>
                  <div className="text-[10px] text-slate-500 font-medium">100% Free / Altruistic</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setCompensationType('PAID')}
                className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition ${
                  compensationType === 'PAID'
                    ? 'bg-indigo-50 border-indigo-300 text-indigo-900 font-bold ring-2 ring-indigo-200'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <DollarSign className="w-5 h-5 text-indigo-600 mb-1" />
                <div>
                  <div className="text-xs font-bold text-indigo-900">💵 Paid</div>
                  <div className="text-[10px] text-slate-500 font-medium">Money compensation</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setCompensationType('BARTER')}
                className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition ${
                  compensationType === 'BARTER'
                    ? 'bg-purple-50 border-purple-300 text-purple-900 font-bold ring-2 ring-purple-200'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <ArrowLeftRight className="w-5 h-5 text-purple-600 mb-1" />
                <div>
                  <div className="text-xs font-bold text-purple-900">🔄 Barter</div>
                  <div className="text-[10px] text-slate-500 font-medium">Exchange item/service</div>
                </div>
              </button>
            </div>
          </div>

          {/* Compensation Details Input */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Terms & Compensation Details
            </label>
            <input
              type="text"
              value={compensationDetails}
              onChange={(e) => setCompensationDetails(e.target.value)}
              placeholder={
                compensationType === 'VOLUNTEER'
                  ? 'e.g., Free volunteer assistance requested'
                  : compensationType === 'PAID'
                  ? 'e.g., $40 cash for 1 hour of labor + gas money'
                  : 'e.g., Exchanging fresh baked bread for bike tire tube repair'
              }
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 font-medium"
            />
          </div>

          {/* Category & Location Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 font-medium"
              >
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

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Location / Landmark</label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-indigo-600 absolute left-3 top-2.5 pointer-events-none" />
                <input
                  type="text"
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  placeholder="e.g., Elm Street & 4th Ave"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 font-medium"
                />
              </div>
            </div>
          </div>

          {/* Request Title & Description */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-700">
                What are you seeking or offering?
              </label>
              <button
                type="button"
                onClick={handleAiFormat}
                disabled={isAiLoading || (!title && !description)}
                className="text-xs text-indigo-700 hover:text-indigo-800 font-bold flex items-center gap-1 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200 transition disabled:opacity-50"
              >
                {isAiLoading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                )}
                <span>AI Refine & Format</span>
              </button>
            </div>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., URGENT: Need ride to hospital for elderly parent"
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 font-semibold"
            />

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Describe what you require in detail, timing, safety instructions, or barter specifications..."
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 leading-relaxed font-medium"
            />
          </div>

          {/* Optional Image URL & Tags */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Image URL (Optional)</label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Tags (comma separated)</label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="Emergency, Medical, BloodDonor"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 font-medium"
              />
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
            <span className="text-[11px] text-slate-500 flex items-center gap-1 font-medium">
              <ShieldCheck className="w-4 h-4 text-indigo-600" /> Subject to KindGrid Community Ethics & Ratings
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold px-6 py-2.5 rounded-xl text-xs shadow-xs transition transform active:scale-95"
              >
                Publish Help Request
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
