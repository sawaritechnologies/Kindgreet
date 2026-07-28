import { HelpRequest, KindnessReel, PrivateRoom, UserProfile, NotificationItem, JobListing, QuickProduct } from './types';

export const CURRENT_USER: UserProfile = {
  id: 'usr_me',
  name: 'Alex Rivera',
  username: 'alex_rivera',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  coverImage: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=1200',
  bio: 'Community organizer & passionate volunteer. Believer in mutual aid and neighborhood trust.',
  location: 'Oakridge Community, Sector 4',
  socialRating: 4.96,
  totalReviews: 38,
  karmaPoints: 1420,
  karmaLevel: 'Gold Hero',
  helpGivenCount: 29,
  helpReceivedCount: 9,
  volunteerHours: 74,
  joinedDate: 'Jan 2025',
  isVerified: true,
  badges: [
    {
      id: 'b1',
      name: 'Emergency Responder',
      icon: 'Siren',
      description: 'Responded to 5+ critical emergency requests within 15 minutes.',
      category: 'emergency',
    },
    {
      id: 'b2',
      name: 'Top Samaritan',
      icon: 'HeartHandshake',
      description: 'Maintained 4.9+ rating over 25+ completed acts of kindness.',
      category: 'rating',
    },
    {
      id: 'b3',
      name: 'Master Barterer',
      icon: 'ArrowLeftRight',
      description: 'Successfully completed 10 fair goods & skill barter exchanges.',
      category: 'barter',
    },
    {
      id: 'b4',
      name: '100h Altruism Club',
      icon: 'Award',
      description: 'Contributed over 70+ verified volunteer community hours.',
      category: 'volunteer',
    },
  ],
  reviews: [
    {
      id: 'rev_1',
      reviewerId: 'usr_sarah',
      reviewerName: 'Sarah Lin',
      reviewerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
      reviewerRating: 5.0,
      rating: 5,
      comment: 'Alex rushed over with a portable power generator during our storm outage! Saved my grandmother\'s medical equipment. Unbelievably kind human.',
      badgeAwarded: 'Emergency Responder',
      compensationType: 'VOLUNTEER',
      requestId: 'req_1',
      requestTitle: 'Urgent: Power backup for oxygen machine during storm',
      date: '2 days ago',
      helpfulCount: 14,
    },
    {
      id: 'rev_2',
      reviewerId: 'usr_marcus',
      reviewerName: 'Marcus Vance',
      reviewerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
      reviewerRating: 4.9,
      rating: 5,
      comment: 'Fair barter exchange! Alex gave me fresh organic garden veggies in exchange for fixing his kitchen sink plumbing. Smooth communication.',
      badgeAwarded: 'Master Barterer',
      compensationType: 'BARTER',
      date: '1 week ago',
      helpfulCount: 8,
    },
  ],
};

export const MOCK_USERS: UserProfile[] = [
  CURRENT_USER,
  {
    id: 'usr_sarah',
    name: 'Sarah Lin',
    username: 'sarah_lin',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    bio: 'Pediatric nurse & animal rescuer. Always ready to lend a helping hand.',
    location: 'Downtown Hillside, 1.2 km away',
    socialRating: 4.98,
    totalReviews: 52,
    karmaPoints: 2150,
    karmaLevel: 'Platinum Guardian',
    helpGivenCount: 46,
    helpReceivedCount: 6,
    volunteerHours: 120,
    joinedDate: 'Nov 2024',
    isVerified: true,
    badges: [
      { id: 'b_med', name: 'Medical Angel', icon: 'Cross', description: 'Certified first-aid & medical assistance provider.', category: 'emergency' },
      { id: 'b_top', name: 'Community Pillar', icon: 'ShieldCheck', description: 'Over 50 successful community aids.', category: 'community' }
    ],
    reviews: []
  },
  {
    id: 'usr_marcus',
    name: 'Marcus Vance',
    username: 'marcus_v',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    bio: 'Licensed electrician & carpenter. Happy to help neighbors or barter services!',
    location: 'West End, 2.5 km away',
    socialRating: 4.88,
    totalReviews: 29,
    karmaPoints: 1100,
    karmaLevel: 'Gold Hero',
    helpGivenCount: 22,
    helpReceivedCount: 7,
    volunteerHours: 45,
    joinedDate: 'Mar 2025',
    isVerified: true,
    badges: [],
    reviews: []
  },
  {
    id: 'usr_elena',
    name: 'Elena Rostova',
    username: 'elena_r',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
    bio: 'High school teacher & home baker. Believer in community barter and youth mentoring.',
    location: 'Northside Parks, 3.1 km away',
    socialRating: 4.92,
    totalReviews: 31,
    karmaPoints: 1350,
    karmaLevel: 'Gold Hero',
    helpGivenCount: 28,
    helpReceivedCount: 3,
    volunteerHours: 62,
    joinedDate: 'Feb 2025',
    isVerified: true,
    badges: [],
    reviews: []
  },
  {
    id: 'usr_david',
    name: 'David Chen',
    username: 'dchen_tech',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
    bio: 'Software engineer & bike mechanic enthusiast. Offering free tech repairs for elderly neighbors.',
    location: 'University District, 0.8 km away',
    socialRating: 4.95,
    totalReviews: 41,
    karmaPoints: 1680,
    karmaLevel: 'Platinum Guardian',
    helpGivenCount: 35,
    helpReceivedCount: 6,
    volunteerHours: 88,
    joinedDate: 'Dec 2024',
    isVerified: true,
    badges: [],
    reviews: []
  }
];

export const INITIAL_HELP_REQUESTS: HelpRequest[] = [
  {
    id: 'req_1',
    title: 'EMERGENCY: Urgent O-Negative Blood Donor or Transport needed for Elder',
    description: 'My grandmother is admitted at City General Hospital Room 304. We urgently need 1 unit of O-Negative blood donor or immediate ride assistance from Elm Street to Hospital due to heavy rain.',
    category: 'Emergency & Safety',
    urgency: 'EMERGENCY',
    compensationType: 'VOLUNTEER',
    compensationDetails: '100% Volunteer / Urgent Emergency Aid',
    locationName: 'City General Hospital / Elm St',
    distanceKm: 0.5,
    latitude: 37.7749,
    longitude: -122.4194,
    author: {
      id: 'usr_sarah',
      name: 'Sarah Lin',
      username: 'sarah_lin',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
      socialRating: 4.98,
      totalReviews: 52,
      karmaLevel: 'Platinum Guardian'
    },
    createdAt: '12 mins ago',
    status: 'OPEN',
    offersCount: 5,
    tags: ['Blood Donor', 'Hospital Transport', 'Urgent Emergency'],
    imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600',
    contactPreference: 'emergency_direct'
  },
  {
    id: 'req_2',
    title: 'BARTER: Sourdough Bread & Garden Herbs for Bicycle Tire Repair',
    description: 'I have 2 loaves of freshly baked organic sourdough bread and fresh basil/rosemary. Seeking a neighbor who can help me replace a popped rear bike tire tube!',
    category: 'Barter & Goods Exchange',
    urgency: 'STANDARD',
    compensationType: 'BARTER',
    compensationDetails: 'Barter: Fresh Artisan Sourdough + Herbs in exchange for Bike Repair',
    locationName: 'Oakridge West, 1.4 km',
    distanceKm: 1.4,
    latitude: 37.7833,
    longitude: -122.4167,
    author: {
      id: 'usr_elena',
      name: 'Elena Rostova',
      username: 'elena_r',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
      socialRating: 4.92,
      totalReviews: 31,
      karmaLevel: 'Gold Hero'
    },
    createdAt: '1 hour ago',
    status: 'OPEN',
    offersCount: 3,
    tags: ['Barter', 'Sourdough', 'Bike Maintenance'],
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'req_3',
    title: 'PAID HELP: Assistance moving heavy wooden bookshelf to 2nd Floor ($45)',
    description: 'Looking for 1 strong helper for 40 minutes to lift a solid oak bookshelf up one flight of stairs. Offering $45 cash or bank transfer plus cold drinks/snacks!',
    category: 'Community & Labor',
    urgency: 'URGENT',
    compensationType: 'PAID',
    compensationDetails: '$45 Cash / Bank Transfer + Refreshments',
    locationName: 'Maple Avenue, 2.1 km',
    distanceKm: 2.1,
    latitude: 37.7690,
    longitude: -122.4280,
    author: {
      id: 'usr_marcus',
      name: 'Marcus Vance',
      username: 'marcus_v',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
      socialRating: 4.88,
      totalReviews: 29,
      karmaLevel: 'Gold Hero'
    },
    createdAt: '2 hours ago',
    status: 'OPEN',
    offersCount: 2,
    tags: ['Paid Assistance', 'Moving', 'Furniture Lift'],
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'req_4',
    title: 'VOLUNTEER: Free Math & Physics Tutoring for High School Students',
    description: 'Offering 2 hours of free weekend tutoring for students preparing for exams who cannot afford private tuition. Virtual or at Oakridge Public Library.',
    category: 'Education & Mentorship',
    urgency: 'STANDARD',
    compensationType: 'VOLUNTEER',
    compensationDetails: '100% Free Volunteer Mentorship',
    locationName: 'Oakridge Library, 0.8 km',
    distanceKm: 0.8,
    latitude: 37.7710,
    longitude: -122.4120,
    author: {
      id: 'usr_david',
      name: 'David Chen',
      username: 'dchen_tech',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
      socialRating: 4.95,
      totalReviews: 41,
      karmaLevel: 'Platinum Guardian'
    },
    createdAt: '4 hours ago',
    status: 'OPEN',
    offersCount: 7,
    tags: ['Free Tutoring', 'STEM', 'Education Access']
  },
  {
    id: 'req_me_1',
    title: 'VOLUNTEER: Need Portable Water Pump for Community Garden Bed Wash',
    description: 'Organizing our neighborhood community garden cleanup this Saturday! Seeking a neighbor who can lend a portable water hose pump or pressure washer for 2 hours.',
    category: 'Food & Essentials',
    urgency: 'URGENT',
    compensationType: 'VOLUNTEER',
    compensationDetails: 'Free Fresh Organic Garden Produce + Karma Rating',
    locationName: 'Sector 4 Community Garden, 0.3 km',
    distanceKm: 0.3,
    latitude: 37.7755,
    longitude: -122.4180,
    author: {
      id: 'usr_me',
      name: 'Alex Rivera',
      username: 'alex_rivera',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
      socialRating: 4.96,
      totalReviews: 38,
      karmaLevel: 'Gold Hero'
    },
    createdAt: '30 mins ago',
    status: 'OPEN',
    offersCount: 3,
    tags: ['Community Garden', 'Tools Lending', 'Volunteer Work']
  },
  {
    id: 'req_5',
    title: 'URGENT: Temporary Fostering for 2 Rescued Kittens (3 days)',
    description: 'Found 2 healthy 6-week kittens stranded near park. Need a temporary foster caregiver for 3 days while animal shelter opens on Monday. Supplies & food provided!',
    category: 'Elderly & Pet Care',
    urgency: 'URGENT',
    compensationType: 'VOLUNTEER',
    compensationDetails: 'Volunteer Fostering (All Kitten Supplies Provided)',
    locationName: 'Greenwood Park, 1.8 km',
    distanceKm: 1.8,
    latitude: 37.7620,
    longitude: -122.4200,
    author: {
      id: 'usr_sarah',
      name: 'Sarah Lin',
      username: 'sarah_lin',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
      socialRating: 4.98,
      totalReviews: 52,
      karmaLevel: 'Platinum Guardian'
    },
    createdAt: '5 hours ago',
    status: 'OPEN',
    offersCount: 4,
    tags: ['Pet Foster', 'Animal Rescue', 'Kindness']
  }
];

export const INITIAL_KINDNESS_REELS: KindnessReel[] = [
  {
    id: 'reel_1',
    author: {
      id: 'usr_sarah',
      name: 'Sarah Lin',
      username: 'sarah_lin',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
      socialRating: 4.98,
      karmaLevel: 'Platinum Guardian'
    },
    title: 'Community Storm Recovery Mission 🌩️✨',
    description: 'When the storm hit yesterday, 14 neighbors from KindGrid joined forces in 30 minutes! We cleared fallen branches, shared backup generators, and made warm soup for 8 senior households. Helping others is the real social flex! ❤️',
    type: 'video',
    mediaUrl: 'https://assets.mixkit.co/videos/preview/mixkit-group-of-volunteers-planting-trees-41484-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=800',
    tags: ['#NeighborhoodHeroes', '#AltruismInAction', '#MutualAid', '#StormAid'],
    sparksCount: 382,
    commentsCount: 45,
    sharesCount: 89,
    createdAt: '3 hours ago',
    hasUserSparked: true,
    comments: [
      {
        id: 'c1',
        userName: 'Alex Rivera',
        userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
        text: 'So proud of our neighborhood response team! That warm vegetable soup was a lifesaver.',
        time: '2h ago'
      },
      {
        id: 'c2',
        userName: 'David Chen',
        userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
        text: 'This is what true social media should be about. Kindness over clout!',
        time: '1h ago'
      }
    ]
  },
  {
    id: 'reel_2',
    author: {
      id: 'usr_elena',
      name: 'Elena Rostova',
      username: 'elena_r',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
      socialRating: 4.92,
      karmaLevel: 'Gold Hero'
    },
    title: 'Barter Win: Piano Lessons for Homemade Jams 🎹🍯',
    description: 'Met young Leo through KindGrid barter! He gave me 4 jars of his family’s organic berry jam in exchange for 2 hours of beginner piano guidance. No cash needed, just human warmth!',
    type: 'photo',
    mediaUrl: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&q=80&w=1000',
    tags: ['#BarterEconomy', '#KindnessBarter', '#MusicExchange'],
    sparksCount: 219,
    commentsCount: 18,
    sharesCount: 34,
    createdAt: 'Yesterday',
    hasUserSparked: false,
    comments: []
  },
  {
    id: 'reel_3',
    author: {
      id: 'usr_david',
      name: 'David Chen',
      username: 'dchen_tech',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
      socialRating: 4.95,
      karmaLevel: 'Platinum Guardian'
    },
    title: 'Fixed 6 Laptops for Local School Kids! 💻⚡',
    description: 'Spent Saturday restoring donated laptops for students who didn\'t have computer access for homework. Huge thanks to everyone on KindGrid who donated spare RAM and chargers!',
    type: 'video',
    mediaUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-working-on-a-computer-circuit-41588-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=800',
    tags: ['#TechForGood', '#FreeRepair', '#EqualEducation'],
    sparksCount: 512,
    commentsCount: 62,
    sharesCount: 114,
    createdAt: '2 days ago',
    hasUserSparked: true,
    comments: []
  }
];

export const INITIAL_ROOMS: PrivateRoom[] = [
  {
    id: 'room_1',
    requestId: 'req_1',
    requestTitle: 'EMERGENCY: Urgent O-Negative Blood Donor or Transport',
    requestUrgency: 'EMERGENCY',
    requestCategory: 'Emergency & Safety',
    compensationType: 'VOLUNTEER',
    participants: [
      CURRENT_USER,
      MOCK_USERS[1] // Sarah Lin
    ],
    lastActivity: '2 mins ago',
    unreadCount: 1,
    status: 'ACTIVE',
    agreementConfirmed: true,
    agreedCompensationDetails: 'Volunteer emergency medical transport to City General Hospital',
    messages: [
      {
        id: 'm1',
        senderId: 'usr_sarah',
        senderName: 'Sarah Lin',
        senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
        text: 'Hello Alex! Thank you so much for offering help on this emergency request. Are you nearby?',
        timestamp: '15 mins ago',
        type: 'text'
      },
      {
        id: 'm2',
        senderId: 'usr_me',
        senderName: 'Alex Rivera',
        senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
        text: 'Yes Sarah! I am 4 minutes away in my vehicle with first aid supplies. Sharing my real-time GPS location now.',
        timestamp: '12 mins ago',
        type: 'text'
      },
      {
        id: 'm3',
        senderId: 'usr_me',
        senderName: 'Alex Rivera',
        senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
        text: 'Live Location Pin Shared',
        timestamp: '12 mins ago',
        type: 'location',
        locationData: {
          lat: 37.7749,
          lng: -122.4194,
          address: 'Corner of Elm Street & 4th Avenue (En route)'
        }
      },
      {
        id: 'm4',
        senderId: 'usr_sarah',
        senderName: 'Sarah Lin',
        senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
        text: 'Bless you! I am standing outside Elm Street entrance with red coat.',
        timestamp: '5 mins ago',
        type: 'text'
      },
      {
        id: 'm_voice_sample',
        senderId: 'usr_sarah',
        senderName: 'Sarah Lin',
        senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
        text: '🎙️ Voice Note: Directions & ETA Update (0:12)',
        timestamp: '3 mins ago',
        type: 'voice',
        mediaUrl: 'https://actions.google.com/sounds/v1/human/applause_moderate.ogg',
        audioDuration: 12
      },
      {
        id: 'm5',
        senderId: 'system',
        senderName: 'KindGrid Ethics Guard',
        senderAvatar: '',
        text: 'Help Agreement Confirmed: Volunteer Assistance. Ethics Policy active.',
        timestamp: '2 mins ago',
        type: 'agreement_proposal',
        proposalData: {
          id: 'p1',
          compensationType: 'VOLUNTEER',
          details: 'Volunteer emergency medical transport to City General Hospital',
          status: 'accepted',
          proposedBy: 'usr_sarah'
        }
      }
    ]
  },
  {
    id: 'room_2',
    requestId: 'req_2',
    requestTitle: 'BARTER: Sourdough Bread for Bike Repair',
    requestUrgency: 'STANDARD',
    requestCategory: 'Barter & Goods Exchange',
    compensationType: 'BARTER',
    participants: [
      CURRENT_USER,
      MOCK_USERS[3] // Elena Rostova
    ],
    lastActivity: '1 hour ago',
    unreadCount: 0,
    status: 'ACTIVE',
    messages: [
      {
        id: 'bm1',
        senderId: 'usr_elena',
        senderName: 'Elena Rostova',
        senderAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
        text: 'Hi Alex! I saw your post. I have extra bike tire inner tubes and levers. Would love to trade for sourdough!',
        timestamp: '1 hour ago',
        type: 'text'
      }
    ]
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n1',
    type: 'EMERGENCY_ALERT',
    title: 'Emergency Aid Request Nearby!',
    message: 'Sarah Lin posted an Urgent Blood Donor / Hospital Transport request 0.5 km away.',
    timestamp: '15 mins ago',
    read: false,
    roomId: 'room_1',
    senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 'n2',
    type: 'RATING_RECEIVED',
    title: '5.0★ Social Rating Received!',
    message: 'Sarah Lin rated you 5 stars and awarded the "Emergency Responder" badge.',
    timestamp: '1 hour ago',
    read: true,
    senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 'n3',
    type: 'AGREEMENT_SIGNED',
    title: 'Barter Offer Accepted',
    message: 'Elena Rostova accepted your barter proposal for artisan sourdough.',
    timestamp: '2 hours ago',
    read: true,
    roomId: 'room_2'
  }
];

export const INITIAL_JOBS: JobListing[] = [
  {
    id: 'job_1',
    title: 'Community Tech Assistant & Hardware Setup Specialist',
    companyName: 'Oakridge Neighborhood Innovation Hub',
    poster: MOCK_USERS[1], // Dr. Marcus Vance (Rating 4.95★)
    location: 'Oakridge Sector 4 (0.8 km)',
    distanceKm: 0.8,
    type: 'PART_TIME',
    salaryRange: '$28 - $35 / hr',
    skillsRequired: ['WiFi Setup', 'Laptop Repair', 'Patience with Seniors', 'Altruist Mindset'],
    description: 'Looking for a tech-savvy neighbor to assist seniors with setting up smart phones, WiFi routers, and home accessibility tech twice a week. High Social Rating candidates get preference.',
    postedAt: '2 hours ago',
    applicantsCount: 6,
    minSocialRatingRequired: 4.5,
    perks: ['Flexible Schedule', 'Karma Bonus (+100 PTS)', 'Free High-Speed Mesh Access']
  },
  {
    id: 'job_2',
    title: 'Local Electric Bike Courier & Emergency Aid Responder',
    companyName: 'KindGrid Express Logistics',
    poster: MOCK_USERS[0], // Sarah Lin (Rating 4.98★)
    location: 'Central Metro Hub (0.4 km)',
    distanceKm: 0.4,
    type: 'QUICK_GIG',
    salaryRange: '$22 - $30 / hr + Instant Tips',
    skillsRequired: ['E-Bike Riding', 'Local Navigation', 'First Aid Basic', 'Fast Dispatch'],
    description: 'Deliver 10-minute quick commerce emergency supplies and food rescue packages across town. Priority dispatch for drivers with verified Samaritan badges!',
    postedAt: '15 mins ago',
    applicantsCount: 14,
    minSocialRatingRequired: 4.8,
    perks: ['Instant Daily Payout', 'Free E-Bike Charging', 'Emergency Insurance Covered']
  },
  {
    id: 'job_3',
    title: 'Urban Organic Rooftop Farmer & Salvage Lead',
    companyName: 'Green Neighborhood Co-op',
    poster: MOCK_USERS[3], // Elena Rostova (Rating 4.92★)
    location: 'Eco District Sector 2 (1.2 km)',
    distanceKm: 1.2,
    type: 'FULL_TIME',
    salaryRange: '$4,200 - $5,000 / month',
    skillsRequired: ['Organic Agriculture', 'Composting', 'Zero-Waste Logistics', 'Community Building'],
    description: 'Manage a 5,000 sq ft community rooftop garden, harvesting fresh veggies for local quick commerce distribution and neighborhood barter fairs.',
    postedAt: '1 day ago',
    applicantsCount: 9,
    minSocialRatingRequired: 4.2,
    perks: ['Fresh Organic Produce Stipend', 'Health Insurance', 'Co-Op Profit Sharing']
  },
  {
    id: 'job_4',
    title: 'High School STEM & Math Tutor (After School)',
    companyName: 'Youth Bright Minds Foundation',
    poster: MOCK_USERS[2], // David Miller (Rating 4.88★)
    location: 'Oakridge Library (0.5 km)',
    distanceKm: 0.5,
    type: 'STIPEND_VOLUNTEER',
    salaryRange: '$20 / hr Stipend + 200 Karma PTS/week',
    skillsRequired: ['Calculus', 'Python', 'Youth Mentorship', 'Patience'],
    description: 'Provide after-school tutoring for middle and high school students. A great gig for college students and tech pros looking to give back.',
    postedAt: '4 hours ago',
    applicantsCount: 4,
    minSocialRatingRequired: 4.0,
    perks: ['Verified Education Badge', 'Official University Credit', 'Flexible Hours']
  }
];

export const INITIAL_QUICK_PRODUCTS: QuickProduct[] = [
  {
    id: 'qp_1',
    title: 'Farm Fresh Organic Sourdough Artisan Loaf',
    category: 'MEALS',
    price: 6.50,
    originalPrice: 8.00,
    etaMins: 9,
    seller: MOCK_USERS[3], // Elena Rostova - Rating 4.92★
    sellerStoreName: "Elena's Zero-Waste Bakery",
    sellerSocialRating: 4.92,
    isPreferredSeller: true, // High social rating seller preference
    image: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&q=80&w=400',
    description: 'Baked fresh 1 hour ago using wild yeast starter and organic wheat flour. Delivered hot in eco-packaging.',
    stock: 8,
    rating: 4.9,
    reviewsCount: 42,
    unit: '1 loaf (600g)',
    tags: ['Fresh Baked', 'Organic', 'Top Seller']
  },
  {
    id: 'qp_2',
    title: 'Emergency Portable First Aid & Wound Dressing Kit',
    category: 'MEDICINE',
    price: 14.99,
    originalPrice: 19.99,
    etaMins: 7,
    seller: MOCK_USERS[1], // Dr. Marcus Vance - Rating 4.95★
    sellerStoreName: 'Sector 4 Medical Aid Station',
    sellerSocialRating: 4.95,
    isPreferredSeller: true, // High social rating seller preference
    image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&q=80&w=400',
    description: 'Sterile gauze, antiseptic wipes, burn gel, bandages, and emergency whistle assembled by verified medical volunteers.',
    stock: 15,
    rating: 5.0,
    reviewsCount: 89,
    unit: '1 kit (28 pcs)',
    tags: ['Verified Medical', '7-Min Emergency', 'Crucial']
  },
  {
    id: 'qp_3',
    title: 'Fresh Organic Hass Avocados & Baby Spinach Bundle',
    category: 'GROCERIES',
    price: 4.20,
    originalPrice: 5.50,
    etaMins: 11,
    seller: MOCK_USERS[0], // Sarah Lin - Rating 4.98★
    sellerStoreName: 'Green Neighborhood Produce',
    sellerSocialRating: 4.98,
    isPreferredSeller: true, // Preferred seller
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&q=80&w=400',
    description: '3 ripe Hass avocados + 200g washed organic baby spinach salvaged directly from local green market harvest.',
    stock: 12,
    rating: 4.95,
    reviewsCount: 64,
    unit: '1 bundle',
    tags: ['Farm Fresh', '10-Min Delivery', 'Zero-Waste']
  },
  {
    id: 'qp_4',
    title: 'Fast Charger Power Bank 20,000mAh (Pre-Charged 100%)',
    category: 'TECH_ESSENTIALS',
    price: 18.50,
    originalPrice: 24.00,
    etaMins: 8,
    seller: MOCK_USERS[2], // David Miller - Rating 4.88★
    sellerStoreName: 'David Tech Lending & Surplus',
    sellerSocialRating: 4.88,
    isPreferredSeller: false,
    image: 'https://images.unsplash.com/photo-1609592424082-96c21e06497f?auto=format&fit=crop&q=80&w=400',
    description: 'Fully charged power bank with USB-C and Lightning cables included. Ready for power outages or emergency travel.',
    stock: 5,
    rating: 4.85,
    reviewsCount: 23,
    unit: '1 unit',
    tags: ['Pre-charged', 'Emergency Tech']
  },
  {
    id: 'qp_5',
    title: 'Hot Homemade Vegetable Lentil Soup & Garlic Toast',
    category: 'MEALS',
    price: 5.00,
    originalPrice: 7.00,
    etaMins: 12,
    seller: MOCK_USERS[3], // Elena Rostova - Rating 4.92★
    sellerStoreName: "Elena's Zero-Waste Kitchen",
    sellerSocialRating: 4.92,
    isPreferredSeller: true,
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=400',
    description: 'Hearty warm lentil soup made with fresh herbs, carrots, and sourdough garlic toast. Packed in thermal insulated bowl.',
    stock: 10,
    rating: 4.98,
    reviewsCount: 51,
    unit: '1 bowl (500ml)',
    tags: ['Warm Food', 'Comfort Meal', 'High Rating']
  }
];

