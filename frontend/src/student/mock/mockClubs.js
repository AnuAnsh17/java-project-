export const mockClubsData = [
  {
    id: "club-coding",
    name: "Coding Club",
    category: "Technical",
    logo: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=150&auto=format&fit=crop&q=80",
    cover: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80",
    description: "The official software development and competitive programming hub of TSDCEM.",
    membersCount: 240,
    isJoined: true,
    isFollowing: true,
    userPosition: "President",
    leadership: [
      { name: "Ansh Sharma", role: "President", email: "ansh.sharma@tsdcem.ac.in" },
      { name: "Rahul Verma", role: "Vice President", email: "rahul.v@tsdcem.ac.in" },
      { name: "Divya Shah", role: "Treasurer", email: "divya.s@tsdcem.ac.in" }
    ],
    announcements: [
      "Hackatron 2026 registration is now open! Check out the Events tab.",
      "Weekly LeetCode contest study session this Saturday at 4 PM."
    ]
  },
  {
    id: "club-robotics",
    name: "Robotics Club",
    category: "Technical",
    logo: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=150&auto=format&fit=crop&q=80",
    cover: "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?w=800&auto=format&fit=crop&q=80",
    description: "Building autonomous bots, IoT systems, and embedded hardware for national competitions.",
    membersCount: 180,
    isJoined: false,
    isFollowing: true,
    userPosition: null,
    leadership: [
      { name: "Vikram Joshi", role: "President", email: "vikram.j@tsdcem.ac.in" }
    ],
    announcements: [
      "Workshop on Arduino & ESP32 next Tuesday in Lab 304."
    ]
  },
  {
    id: "club-music",
    name: "Music & Cultural Club",
    category: "Cultural",
    logo: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=150&auto=format&fit=crop&q=80",
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=80",
    description: "Promoting vocal, instrumental, and performing arts across campus festivals.",
    membersCount: 310,
    isJoined: false,
    isFollowing: false,
    userPosition: null,
    leadership: [
      { name: "Rhea Sen", role: "President", email: "rhea.s@tsdcem.ac.in" }
    ],
    announcements: []
  }
];
