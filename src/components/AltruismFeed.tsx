import React, { useState } from 'react';
import {
  Heart,
  Sparkles,
  MessageCircle,
  Share2,
  PlusCircle,
  ShieldCheck,
  Star,
  Play,
  Volume2,
  VolumeX,
  X,
  Send,
  Award,
  Video,
  Image as ImageIcon
} from 'lucide-react';
import { KindnessReel, UserProfile } from '../types';

interface AltruismFeedProps {
  reels: KindnessReel[];
  currentUser: UserProfile;
  onAddReel: (newReel: KindnessReel) => void;
  onToggleSpark: (reelId: string) => void;
}

export const AltruismFeed: React.FC<AltruismFeedProps> = ({
  reels,
  currentUser,
  onAddReel,
  onToggleSpark,
}) => {
  const [selectedReel, setSelectedReel] = useState<KindnessReel | null>(reels[0] || null);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const [activeCommentText, setActiveCommentText] = useState<string>('');
  const [commentsMap, setCommentsMap] = useState<Record<string, any[]>>(() => {
    const initialMap: Record<string, any[]> = {};
    reels.forEach((r) => {
      initialMap[r.id] = r.comments || [];
    });
    return initialMap;
  });

  // Upload story state
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newType, setNewType] = useState<'video' | 'photo'>('video');
  const [newMediaUrl, setNewMediaUrl] = useState('');
  const [newTags, setNewTags] = useState('#KindGrid, #MutualAid, #NeighborhoodHero');

  const handleAddComment = (reelId: string) => {
    if (!activeCommentText.trim()) return;
    const newComment = {
      id: `c_${Date.now()}`,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      text: activeCommentText.trim(),
      time: 'Just now',
    };
    setCommentsMap((prev) => ({
      ...prev,
      [reelId]: [newComment, ...(prev[reelId] || [])],
    }));
    setActiveCommentText('');
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDescription.trim()) return;

    const created: KindnessReel = {
      id: `reel_${Date.now()}`,
      author: {
        id: currentUser.id,
        name: currentUser.name,
        username: currentUser.username,
        avatar: currentUser.avatar,
        socialRating: currentUser.socialRating,
        karmaLevel: currentUser.karmaLevel,
      },
      title: newTitle,
      description: newDescription,
      type: newType,
      mediaUrl: newMediaUrl || (newType === 'video'
        ? 'https://assets.mixkit.co/videos/preview/mixkit-group-of-volunteers-planting-trees-41484-large.mp4'
        : 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=800'),
      tags: newTags.split(',').map((t) => t.trim()),
      sparksCount: 1,
      commentsCount: 0,
      sharesCount: 0,
      createdAt: 'Just now',
      hasUserSparked: true,
      comments: [],
    };

    onAddReel(created);
    setSelectedReel(created);
    setShowUploadModal(false);
    setNewTitle('');
    setNewDescription('');
    setNewMediaUrl('');
  };

  return (
    <div className="space-y-6">
      {/* Top Section Header */}
      <div className="bg-indigo-600 rounded-2xl p-6 text-white shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
            <span>Altruism Social Media — The New Normal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Kindness Vlogs & Impact Stories
          </h1>
          <p className="text-xs sm:text-sm text-indigo-100 max-w-2xl mt-1">
            Celebrating real human goodness. Share short vlogs, photos, and stories of help provided to others. Get recognized, earn Karma points, and inspire a caring community.
          </p>
        </div>

        <button
          onClick={() => setShowUploadModal(true)}
          className="bg-white text-indigo-700 font-extrabold px-5 py-3 rounded-xl text-xs sm:text-sm shadow-md hover:bg-indigo-50 flex items-center gap-2 transition transform active:scale-95 shrink-0"
        >
          <PlusCircle className="w-5 h-5 stroke-[2.5]" />
          <span>Post Kindness Vlog / Photo</span>
        </button>
      </div>

      {/* Main Grid: Reel Player & Story List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Reel Player Showcase (7 Columns) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between relative min-h-[550px]">
          {selectedReel ? (
            <>
              {/* Media Container */}
              <div className="relative w-full h-[380px] sm:h-[450px] bg-slate-900 flex items-center justify-center overflow-hidden">
                {selectedReel.type === 'video' ? (
                  <video
                    src={selectedReel.mediaUrl}
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={selectedReel.mediaUrl}
                    alt={selectedReel.title}
                    className="w-full h-full object-cover"
                  />
                )}

                {/* Video Controls Overlay */}
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  {selectedReel.type === 'video' && (
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="p-2.5 bg-slate-900/80 hover:bg-slate-900 text-white rounded-full backdrop-blur-md transition border border-white/20"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                    </button>
                  )}
                </div>

                {/* Author Banner over media */}
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedReel.author.avatar}
                      alt={selectedReel.author.name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-400"
                    />
                    <div>
                      <div className="text-sm font-black text-white flex items-center gap-1.5">
                        <span>{selectedReel.author.name}</span>
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        <span className="text-[10px] bg-indigo-500/30 text-indigo-200 px-2 py-0.5 rounded-full font-bold border border-indigo-400/30">
                          {selectedReel.author.karmaLevel}
                        </span>
                      </div>
                      <div className="text-xs text-amber-300 font-bold flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-300" />
                        <span>{selectedReel.author.socialRating}★ Social Rating</span>
                      </div>
                    </div>
                  </div>

                  {/* Spark Button (Interactive Applause) */}
                  <button
                    onClick={() => onToggleSpark(selectedReel.id)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-xs shadow-md transition transform active:scale-90 ${
                      selectedReel.hasUserSparked
                        ? 'bg-rose-500 text-white shadow-rose-200'
                        : 'bg-white/90 text-slate-800 hover:bg-white'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${selectedReel.hasUserSparked ? 'fill-white text-white' : 'text-rose-500'}`} />
                    <span>{selectedReel.sparksCount} Sparks</span>
                  </button>
                </div>
              </div>

              {/* Story Information & Comments Section */}
              <div className="p-5 space-y-4 bg-white border-t border-slate-100">
                <div>
                  <h2 className="text-lg font-black text-slate-900">{selectedReel.title}</h2>
                  <p className="text-xs text-slate-600 leading-relaxed mt-1">{selectedReel.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {selectedReel.tags.map((tag, idx) => (
                      <span key={idx} className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Quick Reaction Chips */}
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                  {['🔥 Legend!', '❤️ Huge Help!', '🙌 Inspiration', '⚡ On Point!', '👑 Karma Hero'].map((sticker, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setActiveCommentText(sticker);
                        handleAddComment(selectedReel.id);
                      }}
                      className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 text-[11px] font-extrabold border border-slate-200 shrink-0 transition"
                    >
                      {sticker}
                    </button>
                  ))}
                </div>

                {/* Comment Section */}
                <div className="pt-3 border-t border-slate-100 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                    <span className="flex items-center gap-1.5">
                      <MessageCircle className="w-4 h-4 text-indigo-600" />
                      <span>Community Appreciation ({(commentsMap[selectedReel.id] || []).length})</span>
                    </span>
                    <span className="text-[10px] text-slate-400 font-normal">{selectedReel.createdAt}</span>
                  </div>

                  {/* Comment Input */}
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={activeCommentText}
                      onChange={(e) => setActiveCommentText(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddComment(selectedReel.id)}
                      placeholder="Write an encouraging comment or praise..."
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                    />
                    <button
                      onClick={() => handleAddComment(selectedReel.id)}
                      className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs transition"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Comments List */}
                  <div className="max-h-40 overflow-y-auto space-y-2.5 pr-1">
                    {(commentsMap[selectedReel.id] || []).length === 0 ? (
                      <p className="text-xs text-slate-400 italic">No comments yet. Be the first to spark encouragement!</p>
                    ) : (
                      (commentsMap[selectedReel.id] || []).map((c) => (
                        <div key={c.id} className="bg-slate-50 rounded-xl p-2.5 text-xs flex items-start gap-2.5 border border-slate-100">
                          <img src={c.userAvatar} alt="" className="w-6 h-6 rounded-full object-cover shrink-0 mt-0.5" />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-800">{c.userName}</span>
                              <span className="text-[10px] text-slate-400">{c.time}</span>
                            </div>
                            <p className="text-slate-600 text-[11px] mt-0.5">{c.text}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="p-12 text-center text-slate-500">Select a story to watch</div>
          )}
        </div>

        {/* Story Feed Selector List (5 Columns) */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider flex items-center justify-between">
            <span>Explore Altruism Feed</span>
            <span className="text-xs font-normal text-slate-500">{reels.length} stories</span>
          </h3>

          <div className="space-y-3.5 max-h-[600px] overflow-y-auto pr-1">
            {reels.map((reel) => (
              <div
                key={reel.id}
                onClick={() => setSelectedReel(reel)}
                className={`group p-3.5 rounded-2xl border cursor-pointer transition flex items-center gap-3.5 ${
                  selectedReel?.id === reel.id
                    ? 'bg-indigo-50/80 border-indigo-300 ring-1 ring-indigo-200'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {/* Thumbnail / Video icon */}
                <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                  <img src={reel.thumbnailUrl || reel.mediaUrl} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  {reel.type === 'video' && (
                    <div className="absolute inset-0 bg-slate-900/30 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-white text-indigo-700 flex items-center justify-center shadow-md">
                        <Play className="w-4 h-4 fill-indigo-700 ml-0.5 text-indigo-700" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Reel Meta */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 text-xs text-slate-700 font-bold mb-1">
                    <img src={reel.author.avatar} alt="" className="w-5 h-5 rounded-full object-cover" />
                    <span className="truncate">{reel.author.name}</span>
                    <span className="text-amber-500 text-[10px] font-semibold">{reel.author.socialRating}★</span>
                  </div>

                  <h4 className="font-extrabold text-xs text-slate-800 truncate group-hover:text-indigo-600 transition">
                    {reel.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5 leading-relaxed">
                    {reel.description}
                  </p>

                  <div className="flex items-center gap-3 text-[10px] text-slate-400 font-semibold mt-2">
                    <span className="flex items-center gap-1 text-rose-500 font-bold">
                      <Heart className="w-3 h-3 fill-rose-500" />
                      <span>{reel.sparksCount} Sparks</span>
                    </span>
                    <span>{(commentsMap[reel.id] || reel.comments || []).length} comments</span>
                    <span>{reel.createdAt}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upload Kindness Story Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <Video className="w-5 h-5 text-indigo-600" />
                <h3 className="font-extrabold text-lg text-slate-900">Share Your Kindness Story</h3>
              </div>
              <button
                onClick={() => setShowUploadModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 bg-slate-100 rounded-full transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Story Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g., Helped Neighbor Fix Roof After Storm"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Media Format</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setNewType('video')}
                    className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition ${
                      newType === 'video'
                        ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                        : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    <Video className="w-4 h-4" />
                    <span>Short Video Vlog</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewType('photo')}
                    className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition ${
                      newType === 'photo'
                        ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                        : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    <ImageIcon className="w-4 h-4" />
                    <span>Photo Story</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Media URL (MP4 Video or Image)</label>
                <input
                  type="url"
                  value={newMediaUrl}
                  onChange={(e) => setNewMediaUrl(e.target.value)}
                  placeholder="Leave empty for auto sample media"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description & Reflection</label>
                <textarea
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  rows={3}
                  placeholder="Share what happened, how it helped, and why mutual aid matters..."
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Hashtags</label>
                <input
                  type="text"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  placeholder="#KindGrid, #MutualHelp"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-2 rounded-xl text-xs shadow-md transition"
                >
                  Publish Story
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
