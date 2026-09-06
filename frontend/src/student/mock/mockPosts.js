export const mockCategories = [
  "General", "Academics", "Placements", "Campus Life", "Events", "Technology", "First Year"
];

export const mockPostsData = [
  {
    id: "post-1",
    authorName: "Anurag Yadav",
    authorRole: "Second Year IT • Div C",
    authorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
    timeAgo: "2 hours ago",
    category: "Events",
    title: "TSDCEM Annual TechFest Hackathon 2026 Announced!",
    content: "The Coding Club is organizing HackTSDCEM 2026. 24 hours of non-stop innovation, mentorship, and problem statements across CE, IT, ECS, and AIDS tracks.",
    votes: 48,
    userVoted: 1,
    commentsCount: 3,
    comments: [
      {
        id: "c-1",
        authorName: "Atul Tiwari",
        authorRole: "First Year CE",
        timeAgo: "1 hour ago",
        content: "Can First Year students participate in cross-branch teams?"
      },
      {
        id: "c-2",
        authorName: "Hrishabh Soni",
        authorRole: "Second Year IT",
        timeAgo: "40 mins ago",
        content: "Yes! Cross-department teams between CE, IT, ECS, and AIDS are fully supported."
      },
      {
        id: "c-3",
        authorName: "Anurag Yadav",
        authorRole: "Second Year IT • Div C",
        timeAgo: "25 mins ago",
        content: "Registration opens on Campus Connect this Thursday!"
      }
    ]
  },
  {
    id: "post-2",
    authorName: "Prof. Sumeet Rathod",
    authorRole: "Faculty, IT & MCA",
    authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
    timeAgo: "5 hours ago",
    category: "Academics",
    title: "Java Programming (IT102) — Lab Assignment 3 Reminder",
    content: "First Year IT Division C students: please verify your exception handling test suites before uploading to the portal.",
    votes: 35,
    userVoted: 0,
    commentsCount: 1,
    comments: [
      {
        id: "c-4",
        authorName: "Anurag Yadav",
        authorRole: "Second Year IT • Div C",
        timeAgo: "3 hours ago",
        content: "Submitted on the portal Professor. Thank you for the references."
      }
    ]
  }
];
