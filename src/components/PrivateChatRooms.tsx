import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  Video,
  Phone,
  MapPin,
  Send,
  ShieldCheck,
  Star,
  FileCheck,
  CheckCircle,
  Plus,
  Mic,
  MicOff,
  VideoOff,
  PhoneOff,
  Heart,
  DollarSign,
  ArrowLeftRight,
  Sparkles,
  Paperclip,
  Image as ImageIcon,
  AlertCircle,
  Play,
  Pause,
  Square,
  Trash2,
  Volume2,
  Globe,
  Radio,
  Check,
  Download,
  Loader2
} from 'lucide-react';
import { PrivateRoom, ChatMessage, UserProfile, CompensationType } from '../types';

interface PrivateChatRoomsProps {
  rooms: PrivateRoom[];
  activeRoomId: string | null;
  onSelectRoom: (roomId: string) => void;
  onSendMessage: (roomId: string, text: string, type?: any, extraData?: any) => void;
  currentUser: UserProfile;
  onOpenRatingModal: (targetUser: UserProfile, room: PrivateRoom) => void;
}

// Subcomponent: Voice Message Audio Player for Chat Feed
const VoiceMessagePlayer: React.FC<{
  audioUrl: string;
  duration?: number;
  isMe: boolean;
  isPublic?: boolean;
}> = ({ audioUrl, duration = 0, isMe, isPublic }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch((e) => console.log('Audio playback notice:', e));
      setIsPlaying(true);
    }
  };

  const changeSpeed = () => {
    const nextSpeed = playbackSpeed === 1 ? 1.5 : playbackSpeed === 1.5 ? 2 : 1;
    setPlaybackSpeed(nextSpeed);
    if (audioRef.current) {
      audioRef.current.playbackRate = nextSpeed;
    }
  };

  const formatSecs = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = Math.floor(s % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const totalDurationStr = duration ? formatSecs(duration) : (audioRef.current?.duration ? formatSecs(audioRef.current.duration) : '0:12');
  const maxDur = duration || (audioRef.current?.duration || 12);
  const progressPercent = Math.min(100, Math.max(0, (currentTime / maxDur) * 100));

  return (
    <div
      className={`p-3 rounded-xl border space-y-2 min-w-[220px] sm:min-w-[280px] ${
        isMe
          ? 'bg-indigo-700/90 border-indigo-500 text-white shadow-xs'
          : 'bg-slate-50 border-slate-200 text-slate-800 shadow-xs'
      }`}
    >
      <audio ref={audioRef} src={audioUrl} preload="metadata" />

      <div className="flex items-center justify-between gap-2">
        <span className="text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 opacity-90">
          <Mic className="w-3.5 h-3.5" />
          <span>Voice Message</span>
        </span>
        {isPublic && (
          <span className="text-[9px] bg-amber-400 text-slate-950 font-black px-1.5 py-0.5 rounded flex items-center gap-1 shadow-xs">
            <Globe className="w-2.5 h-2.5" /> Public Broadcast
          </span>
        )}
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={togglePlay}
          className={`p-2.5 rounded-full font-bold transition shrink-0 ${
            isMe
              ? 'bg-white text-indigo-700 hover:bg-slate-100 shadow-xs'
              : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-xs'
          }`}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 fill-current" />
          ) : (
            <Play className="w-4 h-4 fill-current ml-0.5" />
          )}
        </button>

        {/* Waveform / Progress slider */}
        <div className="flex-1 space-y-1">
          <div className="h-2 w-full bg-black/10 rounded-full overflow-hidden relative">
            <div
              className={`h-full transition-all duration-100 ${isMe ? 'bg-white' : 'bg-indigo-600'}`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] opacity-85 font-mono font-semibold">
            <span>{formatSecs(currentTime)}</span>
            <span>{totalDurationStr}</span>
          </div>
        </div>

        {/* Speed toggle & download */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={changeSpeed}
            className={`px-1.5 py-0.5 rounded text-[10px] font-black border transition ${
              isMe
                ? 'border-white/30 text-white hover:bg-white/10'
                : 'border-slate-300 text-slate-700 hover:bg-slate-100'
            }`}
            title="Playback Speed"
          >
            {playbackSpeed}x
          </button>

          <a
            href={audioUrl}
            download="voice_message.webm"
            className={`p-1 rounded transition ${
              isMe ? 'text-white/80 hover:text-white' : 'text-slate-500 hover:text-slate-800'
            }`}
            title="Download Audio File"
          >
            <Download className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export const PrivateChatRooms: React.FC<PrivateChatRoomsProps> = ({
  rooms,
  activeRoomId,
  onSelectRoom,
  onSendMessage,
  currentUser,
  onOpenRatingModal,
}) => {
  const activeRoom = rooms.find((r) => r.id === activeRoomId) || rooms[0];

  const [messageText, setMessageText] = useState('');
  const [showCallModal, setShowCallModal] = useState(false);
  const [callType, setCallType] = useState<'video' | 'audio'>('video');
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [showAgreementModal, setShowAgreementModal] = useState(false);

  // Proposal modal state
  const [proposalMode, setProposalMode] = useState<CompensationType>('VOLUNTEER');
  const [proposalDetails, setProposalDetails] = useState('');

  // Voice Note Recording State
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [publishPublic, setPublishPublic] = useState(false);
  const [micError, setMicError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeRoom?.messages]);

  // Clean up timer & audio URLs on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  if (!activeRoom) {
    return (
      <div className="py-20 text-center bg-white border border-slate-200 rounded-2xl p-8 space-y-3 shadow-sm">
        <MessageSquare className="w-12 h-12 text-slate-400 mx-auto" />
        <h3 className="text-lg font-bold text-slate-800">No Private Chat Rooms Active</h3>
        <p className="text-xs text-slate-500">
          Respond to a help request from the Help Board to start a private chat room!
        </p>
      </div>
    );
  }

  const otherParticipant =
    activeRoom.participants.find((p) => p.id !== currentUser.id) || activeRoom.participants[0];

  // Voice Note Handlers
  const startRecording = async () => {
    setMicError(null);
    audioChunksRef.current = [];
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Microphone API not supported on this browser.');
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setAudioBlob(blob);
        setAudioUrl(url);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (err: any) {
      console.error('Microphone error:', err);
      setMicError(
        'Microphone permission was blocked or unavailable. Please check browser microphone permissions.'
      );
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const cancelRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);
    setAudioBlob(null);
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    setAudioUrl(null);
    setRecordingTime(0);
  };

  const handleSendVoiceNote = () => {
    if (!audioUrl) return;

    const formattedTime = `${Math.floor(recordingTime / 60)}:${(recordingTime % 60)
      .toString()
      .padStart(2, '0')}`;
    const textMsg = `🎙️ Voice Note (${formattedTime})`;

    onSendMessage(activeRoom.id, textMsg, 'voice', {
      mediaUrl: audioUrl,
      audioDuration: recordingTime || 12,
      isPublicBroadcast: publishPublic,
    });

    // Reset voice recording states
    setAudioBlob(null);
    setAudioUrl(null);
    setRecordingTime(0);
    setPublishPublic(false);
  };

  const handleSendText = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    onSendMessage(activeRoom.id, messageText.trim());
    setMessageText('');
  };

  const handleShareLocation = () => {
    onSendMessage(activeRoom.id, 'Live Location Shared', 'location', {
      locationData: {
        lat: 37.7749,
        lng: -122.4194,
        address: 'Oakridge Sector 4 (Real-time GPS Pin)',
      },
    });
  };

  const handleStartCall = (type: 'video' | 'audio') => {
    setCallType(type);
    setShowCallModal(true);
    onSendMessage(activeRoom.id, `Started ${type} call with ${otherParticipant.name}`, 'call_log');
  };

  const handleSendProposal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!proposalDetails.trim()) return;

    onSendMessage(activeRoom.id, `Help Agreement Proposal: ${proposalMode}`, 'agreement_proposal', {
      proposalData: {
        id: `prop_${Date.now()}`,
        compensationType: proposalMode,
        details: proposalDetails,
        status: 'pending',
        proposedBy: currentUser.id,
      },
    });

    setShowAgreementModal(false);
    setProposalDetails('');
  };

  const handleAcceptProposal = (msgId: string) => {
    onSendMessage(activeRoom.id, `Agreement Confirmed! Both parties agree to the terms.`, 'text');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 h-[calc(100vh-160px)] min-h-[600px]">
      {/* Left Sidebar: Rooms List (4 Columns) */}
      <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-4 flex flex-col justify-between overflow-hidden shadow-sm">
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-indigo-600" />
              <h2 className="font-black text-sm text-slate-900 uppercase tracking-wider">
                Private Chat Rooms
              </h2>
            </div>
            <span className="text-[10px] bg-indigo-50 text-indigo-700 font-bold px-2 py-0.5 rounded-full border border-indigo-100">
              Encrypted & Rated
            </span>
          </div>

          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
            {rooms.map((room) => {
              const partner =
                room.participants.find((p) => p.id !== currentUser.id) || room.participants[0];
              const isSelected = room.id === activeRoom.id;
              const lastMsg = room.messages[room.messages.length - 1];

              return (
                <div
                  key={room.id}
                  onClick={() => onSelectRoom(room.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition flex items-center gap-3 ${
                    isSelected
                      ? 'bg-indigo-50/80 border-indigo-300 ring-1 ring-indigo-200 shadow-xs'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100/80'
                  }`}
                >
                  <div className="relative">
                    <img
                      src={partner.avatar}
                      alt={partner.name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-200"
                    />
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-xs text-slate-800 truncate">{partner.name}</h4>
                      <span className="text-[10px] text-slate-400">{room.lastActivity}</span>
                    </div>

                    <p className="text-[11px] text-indigo-700 font-bold truncate mt-0.5">
                      {room.requestTitle || 'Private Help Coordination'}
                    </p>

                    <p className="text-[11px] text-slate-500 truncate mt-0.5">
                      {lastMsg ? lastMsg.text : 'Room created.'}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Community Safety Notice */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600 space-y-1">
          <div className="font-bold text-slate-800 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
            <span>KindGrid Mutual Aid Ethics</span>
          </div>
          <p>
            Openly state costs or barter items. Use voice notes for clear updates. Give a fair Social
            Rating after fulfillment!
          </p>
        </div>
      </div>

      {/* Right Main Chat View (8 Columns) */}
      <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
        {/* Chat Room Header */}
        <div className="p-4 bg-white border-b border-slate-200 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img
              src={otherParticipant.avatar}
              alt={otherParticipant.name}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-200"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-sm text-slate-900">{otherParticipant.name}</h3>
                <span className="text-xs text-amber-500 font-bold flex items-center gap-0.5">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>{otherParticipant.socialRating}★</span>
                </span>
                <span className="text-[10px] bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full border border-indigo-100 font-semibold">
                  {otherParticipant.karmaLevel}
                </span>
              </div>
              <p className="text-xs text-indigo-700 font-semibold truncate max-w-md">
                Req: {activeRoom.requestTitle || 'Direct Assistance'}
              </p>
            </div>
          </div>

          {/* Action Header Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleStartCall('video')}
              className="p-2.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-xl border border-indigo-200 transition"
              title="Live Video Call"
            >
              <Video className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleStartCall('audio')}
              className="p-2.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-xl border border-blue-200 transition"
              title="Voice Call"
            >
              <Phone className="w-4 h-4" />
            </button>

            <button
              onClick={() => onOpenRatingModal(otherParticipant, activeRoom)}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-3 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-xs transition"
            >
              <Star className="w-3.5 h-3.5 fill-slate-950" />
              <span className="hidden sm:inline">Rate Samaritan</span>
            </button>
          </div>
        </div>

        {/* Chat Messages Feed */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/50">
          {activeRoom.messages.map((msg) => {
            const isMe = msg.senderId === currentUser.id;
            const isSystem = msg.senderId === 'system';

            if (isSystem) {
              return (
                <div key={msg.id} className="my-2 text-center">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-slate-600 border border-slate-200 text-[11px] font-semibold shadow-xs">
                    <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{msg.text}</span>
                  </span>
                </div>
              );
            }

            return (
              <div
                key={msg.id}
                className={`flex items-start gap-2.5 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {!isMe && (
                  <img
                    src={msg.senderAvatar}
                    alt=""
                    className="w-7 h-7 rounded-full object-cover shrink-0 mt-1"
                  />
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-3 text-xs space-y-1.5 shadow-xs ${
                    isMe
                      ? 'bg-indigo-600 text-white rounded-tr-none'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3 text-[10px] opacity-80">
                    <span className="font-bold">{msg.senderName}</span>
                    <span>{msg.timestamp}</span>
                  </div>

                  {/* Special Message Types */}
                  {msg.type === 'voice' || msg.mediaUrl ? (
                    <VoiceMessagePlayer
                      audioUrl={msg.mediaUrl || ''}
                      duration={msg.audioDuration}
                      isMe={isMe}
                      isPublic={(msg as any).isPublicBroadcast}
                    />
                  ) : msg.type === 'location' && msg.locationData ? (
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 space-y-1 text-slate-800">
                      <div className="flex items-center gap-1.5 text-indigo-600 font-bold">
                        <MapPin className="w-4 h-4" />
                        <span>Real-Time GPS Pin</span>
                      </div>
                      <p className="text-slate-800 font-semibold">{msg.locationData.address}</p>
                      <a
                        href={`https://maps.google.com/?q=${msg.locationData.lat},${msg.locationData.lng}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block text-[10px] text-indigo-600 underline font-bold mt-1"
                      >
                        Open in Navigation App →
                      </a>
                    </div>
                  ) : msg.type === 'agreement_proposal' && msg.proposalData ? (
                    <div className="bg-amber-50/80 p-3 rounded-xl border border-amber-200 space-y-2 text-slate-800">
                      <div className="flex items-center justify-between text-amber-900 font-bold">
                        <span className="flex items-center gap-1">
                          <FileCheck className="w-4 h-4 text-amber-700" /> Help Agreement Terms
                        </span>
                        <span className="text-[10px] uppercase bg-amber-200 text-amber-900 font-bold px-2 py-0.5 rounded">
                          {msg.proposalData.compensationType}
                        </span>
                      </div>
                      <p className="text-slate-800 font-semibold">{msg.proposalData.details}</p>
                      <button
                        onClick={() => handleAcceptProposal(msg.id)}
                        className="w-full bg-emerald-600 text-white font-black py-1.5 rounded-lg text-xs hover:bg-emerald-700 transition shadow-xs"
                      >
                        ✓ Accept & Confirm Agreement
                      </button>
                    </div>
                  ) : (
                    <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                  )}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Microphone Access Error Notification */}
        {micError && (
          <div className="px-4 py-2 bg-red-50 border-t border-red-200 text-red-700 text-xs font-semibold flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{micError}</span>
            </div>
            <button
              onClick={() => setMicError(null)}
              className="text-red-800 hover:underline font-bold text-[11px]"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Quick Toolbar Row */}
        <div className="px-4 py-2 bg-white border-t border-slate-200 flex items-center justify-between text-xs gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={startRecording}
              className="flex items-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 px-3 py-1 rounded-xl font-bold transition shadow-2xs"
            >
              <Mic className="w-3.5 h-3.5 text-red-600" />
              <span>Record Voice Note</span>
            </button>

            <button
              type="button"
              onClick={handleShareLocation}
              className="flex items-center gap-1 bg-slate-50 hover:bg-slate-100 text-indigo-700 border border-slate-200 px-2.5 py-1 rounded-xl font-bold transition"
            >
              <MapPin className="w-3.5 h-3.5 text-indigo-600" />
              <span>Share Location</span>
            </button>

            <button
              type="button"
              onClick={() => setShowAgreementModal(true)}
              className="flex items-center gap-1 bg-slate-50 hover:bg-slate-100 text-amber-800 border border-slate-200 px-2.5 py-1 rounded-xl font-bold transition"
            >
              <FileCheck className="w-3.5 h-3.5 text-amber-600" />
              <span>Propose Terms</span>
            </button>
          </div>

          <span className="text-[11px] text-slate-400 hidden sm:inline font-medium">
            Mic API Enabled • Altruism Network
          </span>
        </div>

        {/* Message Input Box OR Active Voice Recording Bar */}
        {isRecording ? (
          <div className="p-3 bg-red-50 border-t border-red-200 flex items-center justify-between gap-3 animate-fade-in">
            <div className="flex items-center gap-3">
              <span className="relative flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-600"></span>
              </span>
              <div>
                <div className="text-xs font-black text-red-900 flex items-center gap-2">
                  <span>Recording Voice Note...</span>
                  <span className="font-mono text-xs bg-red-200/80 text-red-900 px-2 py-0.5 rounded font-bold">
                    00:{recordingTime < 10 ? `0${recordingTime}` : recordingTime}
                  </span>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <span className="w-1 h-3 bg-red-500 rounded animate-bounce"></span>
                  <span className="w-1 h-5 bg-red-600 rounded animate-bounce delay-75"></span>
                  <span className="w-1 h-2 bg-red-400 rounded animate-bounce delay-150"></span>
                  <span className="w-1 h-6 bg-red-600 rounded animate-bounce delay-100"></span>
                  <span className="w-1 h-3 bg-red-500 rounded animate-bounce"></span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={stopRecording}
                className="bg-red-600 hover:bg-red-700 text-white font-extrabold px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition"
              >
                <Square className="w-3.5 h-3.5 fill-current" />
                <span>Stop & Review</span>
              </button>

              <button
                type="button"
                onClick={cancelRecording}
                className="p-2 text-slate-500 hover:text-red-700 hover:bg-red-100 rounded-xl transition"
                title="Discard Recording"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : audioUrl ? (
          <div className="p-3 bg-indigo-50 border-t border-indigo-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-indigo-600 text-white font-bold">
                <Mic className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-indigo-950">
                  Voice Note Ready ({recordingTime || 12} seconds)
                </div>
                <audio src={audioUrl} controls className="h-7 w-48 mt-1 text-xs" />
              </div>
            </div>

            <div className="flex items-center gap-2 justify-end">
              <label className="flex items-center gap-1.5 text-xs text-indigo-900 font-bold bg-white px-2.5 py-1.5 rounded-xl border border-indigo-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={publishPublic}
                  onChange={(e) => setPublishPublic(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
                <Globe className="w-3.5 h-3.5 text-indigo-600" />
                <span>Feature Publicly</span>
              </label>

              <button
                type="button"
                onClick={cancelRecording}
                className="px-3 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 rounded-xl transition"
              >
                Discard
              </button>

              <button
                type="button"
                onClick={handleSendVoiceNote}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-black px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-md transition"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Publish Voice Note</span>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSendText} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Write a message, offer help, or ask details..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 font-medium"
            />
            <button
              type="button"
              onClick={startRecording}
              className="p-2.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl border border-red-200 transition shrink-0"
              title="Record Voice Note"
            >
              <Mic className="w-4 h-4" />
            </button>
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 shadow-md transition transform active:scale-95 shrink-0"
            >
              <Send className="w-4 h-4 stroke-[2.5]" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </form>
        )}
      </div>

      {/* Simulated Video / Voice Call Modal Overlay */}
      {showCallModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden p-6 space-y-6 text-center">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 animate-pulse">
                <Video className="w-3.5 h-3.5" />
                <span>Live Encrypted {callType === 'video' ? 'Video' : 'Voice'} Call Active</span>
              </span>
              <h2 className="text-xl font-black text-slate-900">{otherParticipant.name}</h2>
              <p className="text-xs text-slate-500">
                Coordinating help for: {activeRoom.requestTitle}
              </p>
            </div>

            {/* Video Feeds Simulation */}
            <div className="grid grid-cols-2 gap-4 h-52 sm:h-64">
              {/* Partner Feed */}
              <div className="relative bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center">
                <img
                  src={otherParticipant.avatar}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 bg-slate-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-xs">
                  {otherParticipant.name}
                </div>
              </div>

              {/* My Feed */}
              <div className="relative bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center">
                {isCameraOff ? (
                  <div className="text-slate-400 text-xs font-bold">Camera Off</div>
                ) : (
                  <img
                    src={currentUser.avatar}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute bottom-2 left-2 bg-slate-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-xs">
                  You
                </div>
              </div>
            </div>

            {/* Call Controls */}
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`p-3.5 rounded-full font-bold transition ${
                  isMuted
                    ? 'bg-red-500 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setIsCameraOff(!isCameraOff)}
                className={`p-3.5 rounded-full font-bold transition ${
                  isCameraOff
                    ? 'bg-red-500 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {isCameraOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setShowCallModal(false)}
                className="p-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full shadow-md transition"
                title="End Call"
              >
                <PhoneOff className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Propose Terms Modal */}
      {showAgreementModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 space-y-4">
            <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-amber-600" />
              <span>Propose Help Agreement Terms</span>
            </h3>

            <form onSubmit={handleSendProposal} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Fulfillment Mode
                </label>
                <select
                  value={proposalMode}
                  onChange={(e) => setProposalMode(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-medium"
                >
                  <option value="VOLUNTEER">💚 Volunteer (100% Free / Altruistic)</option>
                  <option value="PAID">💵 Paid by Money ($ Budget / Price)</option>
                  <option value="BARTER">🔄 Barter Trade (Item or Service Exchange)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Agreement Terms / Details
                </label>
                <textarea
                  value={proposalDetails}
                  onChange={(e) => setProposalDetails(e.target.value)}
                  rows={3}
                  placeholder="e.g. Free ride to hospital, or $35 cash for gas, or trading sourdough for bike tube..."
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 font-medium"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAgreementModal(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-amber-500 text-slate-950 font-bold px-4 py-1.5 rounded-xl text-xs hover:bg-amber-400 shadow-xs"
                >
                  Send Proposal to Chat
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
