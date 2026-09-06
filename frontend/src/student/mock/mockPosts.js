export const mockCategories = [
  "General", "Academics", "Placements", "Campus Life", "Events", "Technology", "Sports", "Entertainment", "First Year"
];

export const mockPostsData = [
  {
    id: "post-1",
    authorName: "Rohan Varma",
    authorRole: "SE IT Student",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    timeAgo: "2 hours ago",
    category: "Technology",
    title: "Tips for preparing for TSDCEM Annual Hackathon 2026?",
    content: "Hey everyone! The Coding Club announced Hackatron 2026. What tech stacks are most popular for solving the problem statements?",
    votes: 42,
    userVoted: 1, // 1 for upvote, -1 for downvote, 0 for none
    commentsCount: 8,
    comments: [
      {
        id: "c-1",
        authorName: "Ansh Sharma",
        authorRole: "Coding Club President",
        timeAgo: "1 hour ago",
        content: "React + Spring Boot is a super reliable stack for full-stack prototypes. Make sure your API contracts are well defined!"
      },
      {
        id: "c-2",
        authorName: "Priya Nair",
        authorRole: "TE Computer Student",
        timeAgo: "45 mins ago",
        content: "Focus on problem understanding during the first 2 hours rather than jumping straight into code."
      }
    ]
  },
  {
    id: "post-2",
    authorName: "Sneha Patil",
    authorRole: "TE Computer Student",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    timeAgo: "5 hours ago",
    category: "Placements",
    title: "Upcoming Pre-Placement Talk by TechCorp Solutions",
    content: "Training & Placement Cell will be hosting TechCorp tomorrow at 11 AM in the Main Auditorium. Mandatory for TE/BE students.",
    votes: 89,
    userVoted: 0,
    commentsCount: 12,
    comments: []
  },
  {
    id: "post-3",
    authorName: "Aarav Mehta",
    authorRole: "FE EXTC Student",
    authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    timeAgo: "1 day ago",
    category: "First Year",
    title: "Where can we get previous year question papers for Engineering Mathematics II?",
    content: "If anyone has notes or PYQs from last semester, please share the drive link or library references!",
    votes: 27,
    userVoted: 0,
    commentsCount: 5,
    comments: []
  }
];
