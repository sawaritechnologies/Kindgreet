import React, { useState } from 'react';
import {
  Sparkles,
  Award,
  ShieldCheck,
  Zap,
  CheckCircle,
  Star,
  Lock,
  Flame,
  Globe,
  Heart,
  TrendingUp,
  History,
  ChevronRight,
  Info,
  Check,
  Megaphone,
  Pin,
  Siren,
  Shield,
  Leaf,
  ArrowLeftRight,
  UserCheck,
  Crown,
  AlertCircle
} from 'lucide-react';
import {
  UserProfile,
  HelpRequest,
  Badge,
  KarmaMarketplaceItem,
  KarmaCategory,
  RedemptionRecord
} from '../types';

interface KarmaMarketplaceProps {
  currentUser: UserProfile;
  onUpdateCurrentUser: (updatedUser: UserProfile) => void;
  userRequests: HelpRequest[];
  onApplyPriorityBoost: (requestId: string, boostType: 'pinned' | 'highlighted' | 'broadcast') => void;
}

const MARKETPLACE_ITEMS: KarmaMarketplaceItem[] = [
  // --- DIGITAL BADGES ---
  {
    id: 'badge_crisis_responder',
    title: 'Crisis Responder Badge',
    description: 'Displays a glowing emergency icon on your profile & posts, highlighting your rapid response track record.',
    category: 'badge',
    cost: 400,
    icon: '🚨',
    rarity: 'Rare',
    popular: true,
    perks: [
      'Glowing siren icon beside your username',
      'Highlights your profile on emergency requests',
      '+10% bonus Karma on emergency fulfillments'
    ],
    badgeData: {
      id: 'bdg_crisis_resp',
      name: 'Crisis Responder',
      icon: '🚨',
      description: 'Verified fast emergency responder',
      category: 'emergency'
    }
  },
  {
    id: 'badge_master_samaritan',
    title: 'Master Samaritan Badge',
    description: 'Gold laurel badge on your profile indicating exceptional community dedication and 20+ verified fulfillments.',
    category: 'badge',
    cost: 750,
    icon: '🏆',
    rarity: 'Epic',
    popular: false,
    perks: [
      'Gold Laurel crown emblem on profile header',
      'Custom gold border around your chat avatars',
      'Unlocks ability to endorse other volunteers'
    ],
    badgeData: {
      id: 'bdg_master_sam',
      name: 'Master Samaritan',
      icon: '🏆',
      description: 'Gold tier community leader',
      category: 'rating'
    }
  },
  {
    id: 'badge_neighborhood_guardian',
    title: 'Neighborhood Guardian Shield',
    description: 'Shining shield emblem proving high community trust and safety clearance for elderly & family support.',
    category: 'badge',
    cost: 500,
    icon: '🛡️',
    rarity: 'Rare',
    perks: [
      'Guardian Shield badge on all request responses',
      'Filter priority on high-trust request categories',
      'Access to private neighborhood safety channels'
    ],
    badgeData: {
      id: 'bdg_guardian',
      name: 'Neighborhood Guardian',
      icon: '🛡️',
      description: 'High trust & neighborhood safety ally',
      category: 'community'
    }
  },
  {
    id: 'badge_eco_hero',
    title: 'Eco & Food Hero Badge',
    description: 'Special green leaf badge awarded for active participation in food redistribution, salvage, and zero-waste barter.',
    category: 'badge',
    cost: 350,
    icon: '🌿',
    rarity: 'Common',
    perks: [
      'Eco-leaf badge on Food & Essentials requests',
      'Featured in local Zero-Waste barter roundups'
    ],
    badgeData: {
      id: 'bdg_eco_hero',
      name: 'Eco & Food Hero',
      icon: '🌿',
      description: 'Active food salvage & zero waste advocate',
      category: 'barter'
    }
  },

  // --- VERIFIED COMMUNITY STATUS ---
  {
    id: 'verif_gold_check',
    title: 'KindGrid Verified Gold Checkmark',
    description: 'Official Gold Trust Checkmark displayed on all your Help Board posts, private chat rooms, and public vlogs.',
    category: 'verification',
    cost: 1000,
    icon: '👑',
    rarity: 'Legendary',
    popular: true,
    verificationTier: 'Gold Checkmark',
    perks: [
      'Gold verified checkmark next to your display name everywhere',
      'Priority response ranking on all local help requests',
      'Increases trust rating multiplier by 1.2x'
    ]
  },
  {
    id: 'verif_background_ally',
    title: 'Verified Ally Tier',
    description: 'Special verified status for medical assistance, childcare, and vulnerable family support.',
    category: 'verification',
    cost: 1200,
    icon: '⚡',
    rarity: 'Epic',
    verificationTier: 'Verified Ally',
    perks: [
      'Verified Ally badge on medical and transportation needs',
      'Allows creating emergency escalation requests',
      'Direct line to local community care teams'
    ]
  },
  {
    id: 'verif_elder_mentor',
    title: 'Community Elder & Mentor Status',
    description: 'Recognized neighborhood leader status with the ability to endorse newcomers and guide mutual aid ethics.',
    category: 'verification',
    cost: 1500,
    icon: '🎖️',
    rarity: 'Legendary',
    verificationTier: 'Community Elder',
    perks: [
      'Elder Mentor title on public profile',
      'Ability to award +10 Karma bonuses to helpful neighbors',
      'Monthly Karma stipend bonus (+100 PTS)'
    ]
  },

  // --- PRIORITY PLACEMENT ON HELP BOARD ---
  {
    id: 'priority_pin_24h',
    title: '24-Hour Help Request Pin',
    description: 'Pins one of your active Help Requests directly to the top of the Help Board with a "⚡ Priority Boosted" highlight.',
    category: 'priority_placement',
    cost: 300,
    icon: '📌',
    rarity: 'Common',
    boostType: 'pinned',
    popular: true,
    perks: [
      'Pins your request to #1 spot on Help Board for 24 hours',
      'Eye-catching gradient glow border & priority tag',
      'Average 3x faster response time from local helpers'
    ]
  },
  {
    id: 'priority_spotlight_3d',
    title: '3-Day Spotlight Need Boost',
    description: 'Spotlights your request in a prominent banner at the top of the Help Board and in daily neighborhood email digests.',
    category: 'priority_placement',
    cost: 600,
    icon: '🌟',
    rarity: 'Rare',
    boostType: 'highlighted',
    perks: [
      '3 full days of top spotlight positioning',
      'Highlighted in local Kindness Feed digests',
      'Unlimited push alert updates for volunteer matches'
    ]
  },
  {
    id: 'priority_broadcast_5km',
    title: 'Instant Neighborhood Broadcast',
    description: 'Broadcasts an urgent push alert to all verified helpers within a 5km radius for immediate assistance.',
    category: 'priority_placement',
    cost: 800,
    icon: '📢',
    rarity: 'Epic',
    boostType: 'broadcast',
    perks: [
      'Immediate alert sent to all active neighborhood volunteers',
      'Includes optional 15-second voice note broadcast',
      'Instant routing to nearest available driver or medical responder'
    ]
  }
];

export const KarmaMarketplace: React.FC<KarmaMarketplaceProps> = ({
  currentUser,
  onUpdateCurrentUser,
  userRequests,
  onApplyPriorityBoost
}) => {
  const [selectedCategory, setSelectedCategory] = useState<KarmaCategory | 'all' | 'history'>('all');
  const [redemptionHistory, setRedemptionHistory] = useState<RedemptionRecord[]>([
    {
      id: 'rec_1',
      itemId: 'badge_eco_hero',
      itemTitle: 'Eco & Food Hero Badge',
      category: 'badge',
      cost: 350,
      redeemedAt: '3 days ago'
    }
  ]);

  // Modal State for Priority Boost Selection
  const [boostItem, setBoostItem] = useState<KarmaMarketplaceItem | null>(null);
  const [selectedRequestId, setSelectedRequestId] = useState<string>(userRequests[0]?.id || '');
  const [successToast, setSuccessToast] = useState<string | null>(null);
  const [insufficientModalItem, setInsufficientModalItem] = useState<KarmaMarketplaceItem | null>(null);

  // Filter items
  const filteredItems = MARKETPLACE_ITEMS.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  // Calculate Next Karma Tier
  const getNextTier = () => {
    const pts = currentUser.karmaPoints;
    if (pts < 500) return { name: 'Silver Samaritan', req: 500, current: pts };
    if (pts < 1000) return { name: 'Gold Hero', req: 1000, current: pts };
    if (pts < 2000) return { name: 'Platinum Guardian', req: 2000, current: pts };
    return { name: 'Legendary Altruist', req: 5000, current: pts };
  };

  const nextTierInfo = getNextTier();
  const progressPercent = Math.min(100, Math.floor((nextTierInfo.current / nextTierInfo.req) * 100));

  // Handle Purchasing / Redeeming Item
  const handleRedeemClick = (item: KarmaMarketplaceItem) => {
    // Check if enough karma points
    if (currentUser.karmaPoints < item.cost) {
      setInsufficientModalItem(item);
      return;
    }

    // If Priority Placement, prompt request selector
    if (item.category === 'priority_placement') {
      setBoostItem(item);
      if (userRequests.length > 0) {
        setSelectedRequestId(userRequests[0].id);
      }
      return;
    }

    // Otherwise directly execute badge / verification purchase
    executeRedemption(item);
  };

  const executeRedemption = (item: KarmaMarketplaceItem, targetReqId?: string) => {
    // Deduct karma points
    const newPoints = currentUser.karmaPoints - item.cost;

    // Check if adding a badge
    let updatedBadges = [...currentUser.badges];
    if (item.badgeData && !updatedBadges.some((b) => b.id === item.badgeData?.id)) {
      updatedBadges.push(item.badgeData);
    }

    // Check if updating verification
    let isVerified = currentUser.isVerified;
    if (item.category === 'verification') {
      isVerified = true;
    }

    // Update user state
    onUpdateCurrentUser({
      ...currentUser,
      karmaPoints: newPoints,
      badges: updatedBadges,
      isVerified
    });

    // If priority boost
    if (item.category === 'priority_placement' && targetReqId) {
      onApplyPriorityBoost(targetReqId, item.boostType || 'pinned');
    }

    // Add to history
    const record: RedemptionRecord = {
      id: `rec_${Date.now()}`,
      itemId: item.id,
      itemTitle: item.title,
      category: item.category,
      cost: item.cost,
      redeemedAt: 'Just now',
      targetRequestId: targetReqId
    };
    setRedemptionHistory([record, ...redemptionHistory]);

    // Show toast
    setSuccessToast(`Successfully redeemed "${item.title}"! -${item.cost} Karma Points`);
    setTimeout(() => setSuccessToast(null), 4000);
    setBoostItem(null);
  };

  return (
    <div className="space-y-6">
      {/* Toast Banner */}
      {successToast && (
        <div className="bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-lg flex items-center justify-between animate-fade-in text-xs sm:text-sm font-bold">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-300 fill-amber-300" />
            <span>{successToast}</span>
          </div>
          <button onClick={() => setSuccessToast(null)} className="text-white/80 hover:text-white font-black text-xs">
            ✕
          </button>
        </div>
      )}

      {/* Header Banner: Karma Points Overview & Progress */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-700 via-indigo-600 to-purple-700 p-6 sm:p-8 text-white shadow-md">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300" />
              <span>Karma Point Marketplace</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Redeem Altruism Points for Real Perks & Recognition
            </h1>
            <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed">
              Every verified act of kindness, 5-star social rating, and barter trade earns Karma Points. Redeem them for digital badges, gold verification checkmarks, or pin your requests to the top of the Help Board!
            </p>
          </div>

          {/* Points Balance Card */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 w-full md:w-80 space-y-3 shrink-0 shadow-xl">
            <div className="flex items-center justify-between text-xs font-bold text-indigo-100">
              <span>Your Current Balance</span>
              <span className="bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full font-black text-[10px] uppercase">
                {currentUser.karmaLevel}
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">
                {currentUser.karmaPoints.toLocaleString()}
              </span>
              <span className="text-amber-300 font-extrabold text-sm uppercase">PTS</span>
            </div>

            {/* Progress to next tier */}
            <div className="space-y-1.5 pt-1 border-t border-white/10">
              <div className="flex justify-between text-[11px] text-indigo-100 font-semibold">
                <span>Next Rank: {nextTierInfo.name}</span>
                <span>{progressPercent}%</span>
              </div>
              <div className="h-2 w-full bg-black/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-amber-300 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-3 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              selectedCategory === 'all'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>All Offerings</span>
          </button>

          <button
            onClick={() => setSelectedCategory('badge')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              selectedCategory === 'badge'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-indigo-700 hover:bg-indigo-50'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-amber-500" />
            <span>Digital Badges</span>
          </button>

          <button
            onClick={() => setSelectedCategory('verification')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              selectedCategory === 'verification'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-indigo-700 hover:bg-indigo-50'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
            <span>Verified Status</span>
          </button>

          <button
            onClick={() => setSelectedCategory('priority_placement')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              selectedCategory === 'priority_placement'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-indigo-700 hover:bg-indigo-50'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>Priority Board Placement</span>
          </button>
        </div>

        <button
          onClick={() => setSelectedCategory('history')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${
            selectedCategory === 'history'
              ? 'bg-slate-900 text-white border-slate-900'
              : 'border-slate-200 text-slate-700 hover:bg-slate-100'
          }`}
        >
          <History className="w-3.5 h-3.5" />
          <span>My Redemption History ({redemptionHistory.length})</span>
        </button>
      </div>

      {/* Main Content View: Catalog Grid OR Redemption History */}
      {selectedCategory === 'history' ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
              <History className="w-5 h-5 text-indigo-600" />
              <span>Redemption History & Active Perks</span>
            </h3>
            <span className="text-xs text-slate-500 font-medium">
              Total Points Redeemed: {redemptionHistory.reduce((a, b) => a + b.cost, 0)} PTS
            </span>
          </div>

          {redemptionHistory.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-500 space-y-2">
              <p>You have not redeemed any items yet.</p>
              <button
                onClick={() => setSelectedCategory('all')}
                className="text-indigo-600 font-bold hover:underline"
              >
                Browse Marketplace Catalog →
              </button>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {redemptionHistory.map((rec) => (
                <div key={rec.id} className="py-3.5 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-700 font-bold flex items-center justify-center shrink-0 border border-indigo-100">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">{rec.itemTitle}</h4>
                      <p className="text-[11px] text-slate-500 font-medium">
                        Redeemed {rec.redeemedAt} • Mode:{' '}
                        <span className="uppercase text-indigo-700 font-semibold">{rec.category}</span>
                      </p>
                    </div>
                  </div>

                  <span className="font-mono font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 text-xs">
                    -{rec.cost} PTS
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map((item) => {
            const canAfford = currentUser.karmaPoints >= item.cost;
            const isOwned =
              item.category === 'badge' &&
              currentUser.badges.some((b) => b.name === item.title.replace(' Badge', ''));

            return (
              <div
                key={item.id}
                className={`relative bg-white border rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 hover:shadow-md ${
                  item.popular
                    ? 'border-indigo-300 ring-2 ring-indigo-100'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Top Badge Tags */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-2xl">{item.icon}</span>

                    <div className="flex items-center gap-1.5">
                      {item.popular && (
                        <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-2xs">
                          🔥 Popular
                        </span>
                      )}
                      <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-slate-200 uppercase">
                        {item.rarity || 'Perk'}
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-black text-slate-900 text-base leading-snug mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4 font-medium">
                    {item.description}
                  </p>

                  {/* Included Perks Bullet Points */}
                  <div className="space-y-1.5 mb-5 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                      Included Perks:
                    </span>
                    {item.perks.map((perk, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-700">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="font-medium">{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Pricing & Redeem Action */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-extrabold text-slate-900 font-mono">
                      {item.cost}
                    </span>
                    <span className="text-xs font-bold text-amber-600">PTS</span>
                  </div>

                  {isOwned ? (
                    <button
                      disabled
                      className="bg-emerald-50 text-emerald-700 font-bold px-4 py-2 rounded-xl text-xs border border-emerald-200 cursor-default flex items-center gap-1"
                    >
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Unlocked</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleRedeemClick(item)}
                      className={`font-extrabold px-4 py-2.5 rounded-xl text-xs shadow-xs transition flex items-center gap-1.5 active:scale-95 ${
                        canAfford
                          ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-100'
                          : 'bg-slate-100 text-slate-500 hover:bg-slate-200 border border-slate-200'
                      }`}
                    >
                      {canAfford ? (
                        <>
                          <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                          <span>Redeem Now</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-3.5 h-3.5 text-slate-400" />
                          <span>Needs {item.cost - currentUser.karmaPoints} PTS</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Priority Boost Request Selector Modal */}
      {boostItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-500 fill-amber-400" />
                <h3 className="font-extrabold text-base text-slate-900">
                  Select Request to Boost ({boostItem.title})
                </h3>
              </div>
              <button
                onClick={() => setBoostItem(null)}
                className="text-slate-400 hover:text-slate-600 font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 font-medium">
              Choose which of your active Help Board posts you would like to pin or spotlight using{' '}
              <strong className="text-indigo-700">{boostItem.cost} Karma Points</strong>.
            </p>

            {userRequests.length === 0 ? (
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 space-y-2">
                <p className="font-bold">You don't have any active open Help Requests yet.</p>
                <p>Post a request on the Help Board first, then apply your Priority Boost token!</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-60 overflow-y-auto">
                <label className="block text-xs font-bold text-slate-700">Your Active Requests:</label>
                {userRequests.map((req) => (
                  <label
                    key={req.id}
                    onClick={() => setSelectedRequestId(req.id)}
                    className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                      selectedRequestId === req.id
                        ? 'bg-indigo-50 border-indigo-300 ring-1 ring-indigo-200'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">{req.title}</h4>
                      <p className="text-[10px] text-slate-500">
                        Category: {req.category} • {req.locationName}
                      </p>
                    </div>
                    <input
                      type="radio"
                      name="requestBoostSelect"
                      checked={selectedRequestId === req.id}
                      onChange={() => setSelectedRequestId(req.id)}
                      className="text-indigo-600 focus:ring-indigo-500"
                    />
                  </label>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-800">
                Cost: <span className="text-amber-600">{boostItem.cost} PTS</span>
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setBoostItem(null)}
                  className="px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={userRequests.length === 0 || !selectedRequestId}
                  onClick={() => executeRedemption(boostItem, selectedRequestId)}
                  className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-extrabold px-5 py-2 rounded-xl text-xs shadow-xs transition"
                >
                  Confirm & Pin to Top
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Insufficient Karma Points Helper Modal */}
      {insufficientModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-amber-600 font-extrabold text-base">
              <AlertCircle className="w-5 h-5 text-amber-500" />
              <span>More Karma Points Needed</span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              You currently have <strong className="text-slate-900">{currentUser.karmaPoints} PTS</strong>, but{' '}
              <strong className="text-indigo-700">{insufficientModalItem.title}</strong> costs{' '}
              <strong className="text-amber-600">{insufficientModalItem.cost} PTS</strong>.
            </p>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-2">
              <span className="font-bold text-slate-800 block">How to earn Karma Points:</span>
              <ul className="space-y-1 text-[11px] text-slate-600 font-medium">
                <li>• Complete a volunteer or barter help request (+100 - 200 PTS)</li>
                <li>• Receive a 5-star Social Rating from a neighbor (+50 PTS)</li>
                <li>• Send a voice note update in private chat (+15 PTS)</li>
                <li>• Post a Kindness Story or Vlog (+40 PTS)</li>
              </ul>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setInsufficientModalItem(null)}
                className="bg-indigo-600 text-white font-bold px-4 py-2 rounded-xl text-xs hover:bg-indigo-700 transition"
              >
                Got It, Let's Earn Points!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
