export type UrgencyLevel = 'EMERGENCY' | 'URGENT' | 'STANDARD';
export type CompensationType = 'VOLUNTEER' | 'PAID' | 'BARTER';
export type RequestCategory =
  | 'Emergency & Safety'
  | 'Medical & Care'
  | 'Food & Essentials'
  | 'Transport & Ride'
  | 'Shelter & Housing'
  | 'Repair & Technical'
  | 'Barter & Goods Exchange'
  | 'Elderly & Pet Care'
  | 'Education & Mentorship'
  | 'Community & Labor';

export interface Badge {
  id: string;
  name: string;
  icon: string; // Lucide icon identifier or emoji
  description: string;
  category: 'emergency' | 'volunteer' | 'barter' | 'rating' | 'community';
}

export interface SocialRatingReview {
  id: string;
  reviewerId: string;
  reviewerName: string;
  reviewerAvatar: string;
  reviewerRating: number;
  rating: number; // 1 to 5
  comment: string;
  badgeAwarded?: string;
  compensationType: CompensationType;
  requestId?: string;
  requestTitle?: string;
  date: string;
  helpfulCount: number;
}

export interface UserProfile {
  id: string;
  name: string;
  username: string;
  avatar: string;
  coverImage?: string;
  bio: string;
  location: string;
  socialRating: number; // e.g. 4.95
  totalReviews: number;
  karmaPoints: number;
  karmaLevel: 'Bronze Samaritan' | 'Silver Samaritan' | 'Gold Hero' | 'Platinum Guardian' | 'Legendary Altruist';
  helpGivenCount: number;
  helpReceivedCount: number;
  volunteerHours: number;
  badges: Badge[];
  reviews: SocialRatingReview[];
  joinedDate: string;
  isVerified: boolean;
}

export interface HelpRequest {
  id: string;
  title: string;
  description: string;
  category: RequestCategory;
  urgency: UrgencyLevel;
  compensationType: CompensationType;
  compensationDetails: string; // e.g. "Free Volunteer", "$40 for gas & time", "Exchanging 5kg organic apples for lawn mowing"
  locationName: string;
  distanceKm: number;
  latitude: number;
  longitude: number;
  author: {
    id: string;
    name: string;
    username: string;
    avatar: string;
    socialRating: number;
    totalReviews: number;
    karmaLevel: string;
  };
  createdAt: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'FULFILLED';
  offersCount: number;
  tags: string[];
  imageUrl?: string;
  contactPreference?: 'chat_only' | 'chat_and_call' | 'emergency_direct';
  isPriorityBoosted?: boolean;
  priorityBoostType?: 'pinned' | 'highlighted' | 'broadcast';
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  timestamp: string;
  type: 'text' | 'image' | 'location' | 'agreement_proposal' | 'call_log' | 'rating_prompt' | 'voice';
  mediaUrl?: string;
  audioDuration?: number;
  locationData?: {
    lat: number;
    lng: number;
    address: string;
  };
  proposalData?: {
    id: string;
    compensationType: CompensationType;
    details: string;
    status: 'pending' | 'accepted' | 'declined';
    proposedBy: string;
  };
}

export interface PrivateRoom {
  id: string;
  requestId?: string;
  requestTitle?: string;
  requestUrgency?: UrgencyLevel;
  requestCategory?: RequestCategory;
  compensationType?: CompensationType;
  participants: UserProfile[];
  messages: ChatMessage[];
  status: 'ACTIVE' | 'FULFILLED' | 'CLOSED';
  lastActivity: string;
  unreadCount: number;
  agreementConfirmed?: boolean;
  agreedCompensationDetails?: string;
}

export interface KindnessReel {
  id: string;
  author: {
    id: string;
    name: string;
    username: string;
    avatar: string;
    socialRating: number;
    karmaLevel: string;
  };
  title: string;
  description: string;
  type: 'video' | 'photo';
  mediaUrl: string;
  thumbnailUrl?: string;
  tags: string[];
  sparksCount: number;
  commentsCount: number;
  sharesCount: number;
  associatedRequestId?: string;
  createdAt: string;
  hasUserSparked?: boolean;
  comments: {
    id: string;
    userName: string;
    userAvatar: string;
    text: string;
    time: string;
  }[];
}

export interface NotificationItem {
  id: string;
  type: 'NEW_OFFER' | 'INCOMING_CALL' | 'ROOM_INVITE' | 'RATING_RECEIVED' | 'AGREEMENT_SIGNED' | 'EMERGENCY_ALERT';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  roomId?: string;
  senderAvatar?: string;
}

export type KarmaCategory = 'badge' | 'verification' | 'priority_placement';

export interface KarmaMarketplaceItem {
  id: string;
  title: string;
  description: string;
  category: KarmaCategory;
  cost: number;
  icon: string; // lucide icon or emoji
  perks: string[];
  rarity?: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  badgeData?: Badge;
  verificationTier?: string;
  boostType?: 'pinned' | 'highlighted' | 'broadcast';
  popular?: boolean;
}

export interface RedemptionRecord {
  id: string;
  itemId: string;
  itemTitle: string;
  category: KarmaCategory;
  cost: number;
  redeemedAt: string;
  targetRequestId?: string;
}

export type JobType = 'QUICK_GIG' | 'PART_TIME' | 'FULL_TIME' | 'STIPEND_VOLUNTEER';

export interface JobListing {
  id: string;
  title: string;
  companyName: string;
  poster: UserProfile;
  location: string;
  distanceKm: number;
  type: JobType;
  salaryRange: string;
  skillsRequired: string[];
  description: string;
  postedAt: string;
  applicantsCount: number;
  minSocialRatingRequired?: number;
  isApplied?: boolean;
  perks: string[];
}

export type QuickCategory = 'GROCERIES' | 'MEDICINE' | 'EMERGENCY_TOOLS' | 'MEALS' | 'TECH_ESSENTIALS';

export interface QuickProduct {
  id: string;
  title: string;
  category: QuickCategory;
  price: number;
  originalPrice?: number;
  etaMins: number;
  seller: UserProfile;
  sellerStoreName: string;
  sellerSocialRating: number;
  isPreferredSeller?: boolean; // High social rating gives top priority placement!
  image: string;
  description: string;
  stock: number;
  rating: number;
  reviewsCount: number;
  unit: string;
  tags: string[];
}

export interface QuickOrderItem {
  product: QuickProduct;
  quantity: number;
}

export interface QuickOrder {
  id: string;
  items: QuickOrderItem[];
  totalAmount: number;
  deliveryAddress: string;
  status: 'DISPATCHED' | 'ON_THE_WAY' | 'DELIVERED';
  estimatedArrival: string;
  courierName: string;
  courierRating: number;
  createdAt: string;
}

