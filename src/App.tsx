import React, { useState } from 'react';
import { Header } from './components/Header';
import { HelpBoard } from './components/HelpBoard';
import { CreateRequestModal } from './components/CreateRequestModal';
import { AltruismFeed } from './components/AltruismFeed';
import { PrivateChatRooms } from './components/PrivateChatRooms';
import { Leaderboard } from './components/Leaderboard';
import { UserProfileView } from './components/UserProfileView';
import { SocialRatingModal } from './components/SocialRatingModal';
import { KarmaMarketplace } from './components/KarmaMarketplace';
import { JobMarket } from './components/JobMarket';
import { QuickCommerce } from './components/QuickCommerce';

import {
  CURRENT_USER,
  MOCK_USERS,
  INITIAL_HELP_REQUESTS,
  INITIAL_KINDNESS_REELS,
  INITIAL_ROOMS,
  INITIAL_NOTIFICATIONS,
  INITIAL_JOBS,
  INITIAL_QUICK_PRODUCTS,
} from './mockData';
import {
  HelpRequest,
  KindnessReel,
  PrivateRoom,
  UserProfile,
  NotificationItem,
  CompensationType,
  JobListing,
  QuickProduct,
  QuickOrder,
} from './types';

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserProfile>(CURRENT_USER);
  const [allUsers, setAllUsers] = useState<UserProfile[]>(MOCK_USERS);
  const [requests, setRequests] = useState<HelpRequest[]>(INITIAL_HELP_REQUESTS);
  const [reels, setReels] = useState<KindnessReel[]>(INITIAL_KINDNESS_REELS);
  const [rooms, setRooms] = useState<PrivateRoom[]>(INITIAL_ROOMS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // New Job Market & Quick Commerce States
  const [jobs, setJobs] = useState<JobListing[]>(INITIAL_JOBS);
  const [quickProducts, setQuickProducts] = useState<QuickProduct[]>(INITIAL_QUICK_PRODUCTS);
  const [activeQuickOrders, setActiveQuickOrders] = useState<QuickOrder[]>([]);

  const [activeTab, setActiveTab] = useState<'board' | 'reels' | 'rooms' | 'leaderboard' | 'jobs' | 'quick_commerce' | 'marketplace' | 'profile'>('board');
  const [activeRoomId, setActiveRoomId] = useState<string | null>(INITIAL_ROOMS[0]?.id || null);

  const handleApplyJob = (jobId: string) => {
    setJobs((prev) =>
      prev.map((j) =>
        j.id === jobId ? { ...j, applicantsCount: j.applicantsCount + 1, isApplied: true } : j
      )
    );
  };

  const handlePostJob = (newJob: JobListing) => {
    setJobs((prev) => [newJob, ...prev]);
  };

  const handlePlaceQuickOrder = (newOrder: QuickOrder) => {
    setActiveQuickOrders((prev) => [newOrder, ...prev]);
  };

  // Handle Priority Boost Application from Karma Marketplace
  const handleApplyPriorityBoost = (requestId: string, boostType: 'pinned' | 'highlighted' | 'broadcast') => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === requestId
          ? {
              ...r,
              isPriorityBoosted: true,
              priorityBoostType: boostType,
            }
          : r
      )
    );
  };
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [selectedProfileUser, setSelectedProfileUser] = useState<UserProfile>(CURRENT_USER);

  // Social Rating Modal Target
  const [ratingTarget, setRatingTarget] = useState<{ user: UserProfile; room: PrivateRoom } | null>(null);

  // Emergency Count
  const emergencyCount = requests.filter((r) => r.urgency === 'EMERGENCY' && r.status === 'OPEN').length;

  // Unread Rooms Count
  const unreadRoomsCount = rooms.reduce((acc, r) => acc + (r.unreadCount || 0), 0);

  // Handle Open/Create Private Chat Room for a Help Request
  const handleOpenRoomForRequest = (req: HelpRequest) => {
    // Check if room exists
    const existing = rooms.find(
      (r) => r.requestId === req.id && r.participants.some((p) => p.id === currentUser.id)
    );

    if (existing) {
      setActiveRoomId(existing.id);
      setActiveTab('rooms');
    } else {
      // Find author user
      const authorUser =
        allUsers.find((u) => u.id === req.author.id) || {
          id: req.author.id,
          name: req.author.name,
          username: req.author.username,
          avatar: req.author.avatar,
          bio: 'KindGrid community member',
          location: 'Local Neighborhood',
          socialRating: req.author.socialRating,
          totalReviews: req.author.totalReviews || 12,
          karmaPoints: 950,
          karmaLevel: req.author.karmaLevel as any,
          helpGivenCount: 15,
          helpReceivedCount: 2,
          volunteerHours: 30,
          joinedDate: 'Jan 2025',
          isVerified: true,
          badges: [],
          reviews: [],
        };

      const newRoom: PrivateRoom = {
        id: `room_${Date.now()}`,
        requestId: req.id,
        requestTitle: req.title,
        requestUrgency: req.urgency,
        requestCategory: req.category,
        compensationType: req.compensationType,
        participants: [currentUser, authorUser],
        lastActivity: 'Just now',
        unreadCount: 0,
        status: 'ACTIVE',
        messages: [
          {
            id: `m_sys_${Date.now()}`,
            senderId: 'system',
            senderName: 'KindGrid System',
            senderAvatar: '',
            text: `Private Chat Room initialized for request: "${req.title}". Direct messaging, live calls & GPS location sharing active.`,
            timestamp: 'Just now',
            type: 'text',
          },
          {
            id: `m_init_${Date.now()}`,
            senderId: currentUser.id,
            senderName: currentUser.name,
            senderAvatar: currentUser.avatar,
            text: `Hello ${req.author.name}! I saw your ${req.compensationType} request: "${req.title}". I'm happy to assist you.`,
            timestamp: 'Just now',
            type: 'text',
          },
        ],
      };

      setRooms([newRoom, ...rooms]);
      setActiveRoomId(newRoom.id);
      setActiveTab('rooms');
    }
  };

  // Handle Send Message inside a room
  const handleSendMessage = (
    roomId: string,
    text: string,
    type: any = 'text',
    extraData: any = {}
  ) => {
    const newMsg = {
      id: `m_${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderAvatar: currentUser.avatar,
      text,
      timestamp: 'Just now',
      type,
      ...extraData,
    };

    setRooms((prevRooms) =>
      prevRooms.map((room) => {
        if (room.id === roomId) {
          return {
            ...room,
            messages: [...room.messages, newMsg],
            lastActivity: 'Just now',
          };
        }
        return room;
      })
    );

    // Simulated Auto Response from partner after 1.5s
    setTimeout(() => {
      setRooms((prevRooms) =>
        prevRooms.map((room) => {
          if (room.id === roomId) {
            const partner =
              room.participants.find((p) => p.id !== currentUser.id) || room.participants[0];
            const replyMsg = {
              id: `m_reply_${Date.now()}`,
              senderId: partner.id,
              senderName: partner.name,
              senderAvatar: partner.avatar,
              text: `Thank you Alex! I really appreciate your fast response. Let's coordinate exact location & details.`,
              timestamp: 'Just now',
              type: 'text',
            };
            return {
              ...room,
              messages: [...room.messages, replyMsg],
              lastActivity: 'Just now',
            };
          }
          return room;
        })
      );
    }, 1500);
  };

  // Handle Create Request
  const handleCreateRequest = (
    newReqData: Omit<HelpRequest, 'id' | 'createdAt' | 'status' | 'offersCount'>
  ) => {
    const newReq: HelpRequest = {
      ...newReqData,
      id: `req_${Date.now()}`,
      createdAt: 'Just now',
      status: 'OPEN',
      offersCount: 0,
    };

    setRequests([newReq, ...requests]);

    // Add alert notification
    const newNotif: NotificationItem = {
      id: `n_${Date.now()}`,
      type: newReq.urgency === 'EMERGENCY' ? 'EMERGENCY_ALERT' : 'NEW_OFFER',
      title: `${newReq.urgency} Request Published!`,
      message: `Your request "${newReq.title}" is live. Nearby Samaritans will be notified.`,
      timestamp: 'Just now',
      read: false,
    };
    setNotifications([newNotif, ...notifications]);
  };

  // Handle Reel Upload
  const handleAddReel = (newReel: KindnessReel) => {
    setReels([newReel, ...reels]);
    // Reward current user Karma
    setCurrentUser((prev) => ({
      ...prev,
      karmaPoints: prev.karmaPoints + 40,
    }));
  };

  // Toggle Sparks on Reel
  const handleToggleSpark = (reelId: string) => {
    setReels((prev) =>
      prev.map((r) => {
        if (r.id === reelId) {
          const hasSparked = !r.hasUserSparked;
          return {
            ...r,
            hasUserSparked: hasSparked,
            sparksCount: hasSparked ? r.sparksCount + 1 : r.sparksCount - 1,
          };
        }
        return r;
      })
    );
  };

  // Submit Social Rating
  const handleSubmitSocialRating = (
    targetUserId: string,
    rating: number,
    comment: string,
    badgeAwarded?: string,
    compensationType: CompensationType = 'VOLUNTEER'
  ) => {
    setAllUsers((prevUsers) =>
      prevUsers.map((u) => {
        if (u.id === targetUserId) {
          const newTotal = u.totalReviews + 1;
          const newRating = Number(
            ((u.socialRating * u.totalReviews + rating) / newTotal).toFixed(2)
          );
          const newReview = {
            id: `rev_${Date.now()}`,
            reviewerId: currentUser.id,
            reviewerName: currentUser.name,
            reviewerAvatar: currentUser.avatar,
            reviewerRating: rating,
            rating,
            comment,
            badgeAwarded,
            compensationType,
            date: 'Just now',
            helpfulCount: 1,
          };

          return {
            ...u,
            socialRating: newRating,
            totalReviews: newTotal,
            karmaPoints: u.karmaPoints + 50,
            reviews: [newReview, ...(u.reviews || [])],
          };
        }
        return u;
      })
    );

    // Give current user +30 Karma
    setCurrentUser((prev) => ({
      ...prev,
      karmaPoints: prev.karmaPoints + 30,
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-indigo-600 selection:text-white flex flex-col justify-between">
      {/* Top Main Navigation Header */}
      <Header
        currentUser={currentUser}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenCreateModal={() => setIsCreateModalOpen(true)}
        unreadRoomsCount={unreadRoomsCount}
        notifications={notifications}
        onSelectNotification={(n) => {
          if (n.roomId) {
            setActiveRoomId(n.roomId);
            setActiveTab('rooms');
          } else {
            setActiveTab('board');
          }
        }}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        emergencyCount={emergencyCount}
      />

      {/* Main App Canvas Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1">
        {activeTab === 'board' && (
          <HelpBoard
            requests={requests}
            onOpenRoom={handleOpenRoomForRequest}
            onOpenCreateModal={() => setIsCreateModalOpen(true)}
            searchQuery={searchQuery}
          />
        )}

        {activeTab === 'reels' && (
          <AltruismFeed
            reels={reels}
            currentUser={currentUser}
            onAddReel={handleAddReel}
            onToggleSpark={handleToggleSpark}
          />
        )}

        {activeTab === 'rooms' && (
          <PrivateChatRooms
            rooms={rooms}
            activeRoomId={activeRoomId}
            onSelectRoom={setActiveRoomId}
            onSendMessage={handleSendMessage}
            currentUser={currentUser}
            onOpenRatingModal={(user, room) => setRatingTarget({ user, room })}
          />
        )}

        {activeTab === 'leaderboard' && (
          <Leaderboard
            users={allUsers}
            onSelectUser={(u) => {
              setSelectedProfileUser(u);
              setActiveTab('profile');
            }}
          />
        )}

        {activeTab === 'marketplace' && (
          <KarmaMarketplace
            currentUser={currentUser}
            onUpdateCurrentUser={setCurrentUser}
            userRequests={requests.filter((r) => r.author.id === currentUser.id && r.status === 'OPEN')}
            onApplyPriorityBoost={handleApplyPriorityBoost}
          />
        )}

        {activeTab === 'jobs' && (
          <JobMarket
            jobs={jobs}
            currentUser={currentUser}
            onApplyJob={handleApplyJob}
            onPostJob={handlePostJob}
          />
        )}

        {activeTab === 'quick_commerce' && (
          <QuickCommerce
            products={quickProducts}
            currentUser={currentUser}
            onPlaceOrder={handlePlaceQuickOrder}
            activeOrders={activeQuickOrders}
          />
        )}

        {activeTab === 'profile' && (
          <UserProfileView
            user={selectedProfileUser}
            requests={requests}
            onOpenRoom={handleOpenRoomForRequest}
          />
        )}
      </main>

      {/* Create Help Request Modal */}
      <CreateRequestModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateRequest}
        currentUser={currentUser}
      />

      {/* Social Rating Modal */}
      <SocialRatingModal
        isOpen={!!ratingTarget}
        onClose={() => setRatingTarget(null)}
        targetUser={ratingTarget?.user || null}
        onSubmitRating={handleSubmitSocialRating}
      />

      {/* Global Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-indigo-600">KindGrid</span>
            <span>• Mutual Aid & Social Help Ecosystem</span>
          </div>
          <p>© 2026 KindGrid Community Foundation. Promoting local trust, emergency response, and human kindness.</p>
        </div>
      </footer>
    </div>
  );
}
