export const initialDemoData = {
  currentStudent: {
    id: "st-101",
    name: "Anurag Yadav",
    email: "anurag.yadav@tsdcem.ac.in",
    rollNo: "IT202501",
    department: "IT",
    branch: "IT",
    year: "Second Year",
    division: "C",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
    memberships: ["Coding Club", "Technical Committee"],
    positions: [
      { title: "Student Representative", organization: "Second Year IT Div C", badge: "Class Representative" },
      { title: "Executive Member", organization: "Coding Club", badge: "Technical Cell" }
    ],
    attendancePercentage: 88.5,
    pendingAssignmentsCount: 1
  },

  currentFaculty: {
    id: "fac-201",
    name: "Prof. Sumeet Rathod",
    email: "sumeet.rathod@tsdcem.ac.in",
    qualification: "MCA",
    department: "Information Technology",
    departments: "MCA, IT div C,D",
    designation: "Assistant Professor (MCA, IT div C,D)",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
    subjects: ["Java Programming (IT102)", "Web Technologies (IT202)", "Data Structures (IT104)"],
    assignedClasses: ["First Year IT Division C", "Second Year IT Division D"]
  },

  currentAdmin: {
    id: "adm-001",
    name: "Dr. K. V. Subramanian",
    email: "admin@tsdcem.ac.in",
    role: "Dean of Academic Affairs & Chief Administrator",
    department: "College Administration"
  },

  students: [
    { id: "st-101", rollNo: "IT202501", name: "Anurag Yadav", email: "anurag.yadav@tsdcem.ac.in", branch: "IT", year: "Second Year", division: "C", attendancePercentage: 88.5, assignmentStatus: "Graded (19/20)", status: "Active" },
    { id: "st-102", rollNo: "CE202512", name: "Atul Tiwari", email: "atul.tiwari@tsdcem.ac.in", branch: "CE", year: "First Year", division: "A", attendancePercentage: 85.0, assignmentStatus: "Submitted", status: "Active" },
    { id: "st-103", rollNo: "IT202408", name: "Hrishabh Soni", email: "hrishabh.soni@tsdcem.ac.in", branch: "IT", year: "Second Year", division: "B", attendancePercentage: 91.5, assignmentStatus: "Submitted", status: "Active" },
    { id: "st-104", rollNo: "AIDS202514", name: "Priya Sharma", email: "priya.sharma@tsdcem.ac.in", branch: "AIDS", year: "First Year", division: "A", attendancePercentage: 94.0, assignmentStatus: "Submitted", status: "Active" },
    { id: "st-105", rollNo: "ECS202419", name: "Aditya Kulkarni", email: "aditya.kulkarni@tsdcem.ac.in", branch: "ECS", year: "Second Year", division: "A", attendancePercentage: 79.5, assignmentStatus: "Pending", status: "Active" },
    { id: "st-106", rollNo: "IT202402", name: "Ananya Roy", email: "ananya.roy@tsdcem.ac.in", branch: "IT", year: "Second Year", division: "B", attendancePercentage: 92.0, assignmentStatus: "Submitted", status: "Active" }
  ],

  faculty: [
    { id: "fac-201", name: "Prof. Sumeet Rathod", email: "sumeet.rathod@tsdcem.ac.in", department: "Information Technology", qualification: "MCA", designation: "Assistant Professor (MCA, IT div C,D)", subjectsCount: 3, classesCount: 2, status: "Active" },
    { id: "fac-202", name: "Prof. Sunita Patil", email: "sunita.patil@tsdcem.ac.in", department: "Computer Engineering", qualification: "M.Tech CE", designation: "Associate Professor", subjectsCount: 2, classesCount: 2, status: "Active" },
    { id: "fac-203", name: "Dr. Amit Deshmukh", email: "amit.deshmukh@tsdcem.ac.in", department: "Electronics & Computer Science", qualification: "Ph.D ECS", designation: "Professor & HOD", subjectsCount: 2, classesCount: 2, status: "Active" },
    { id: "fac-204", name: "Prof. Rajesh Nair", email: "rajesh.nair@tsdcem.ac.in", department: "Artificial Intelligence & Data Science", qualification: "M.Tech AIDS", designation: "Assistant Professor", subjectsCount: 2, classesCount: 2, status: "Active" }
  ],

  posts: [
    {
      id: "post-1",
      author: "Anurag Yadav",
      authorRole: "Second Year IT • Div C",
      authorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
      time: "2 hours ago",
      category: "Events",
      title: "TSDCEM Annual TechFest Hackathon 2026 Announced!",
      content: "We are thrilled to announce HackTSDCEM 2026 organized by the Coding Club. 24 hours of non-stop coding, faculty mentorship, and exciting problem statements across Web, AI, and Cloud.",
      upvotes: 48,
      downvotes: 1,
      userVoted: null,
      comments: [
        { id: "c-1", author: "Atul Tiwari", authorRole: "First Year CE", time: "1 hour ago", text: "Are First Year students allowed to form inter-department teams with IT and CE?" },
        { id: "c-2", author: "Hrishabh Soni", authorRole: "Second Year IT", time: "40 mins ago", text: "Yes! Inter-branch teams of 2 to 4 students across CE, IT, ECS, and AIDS are encouraged." },
        { id: "c-3", author: "Anurag Yadav", authorRole: "Second Year IT • Div C", time: "25 mins ago", text: "Registration portal opens this Thursday on Campus Connect." }
      ]
    },
    {
      id: "post-2",
      author: "TSDCEM IT Cell",
      authorRole: "Official Infrastructure",
      authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
      time: "5 hours ago",
      category: "General",
      title: "High-Speed Wi-Fi Upgrade in Computer Labs & Library",
      content: "New Wi-Fi 6 access points have been deployed across IT and CE computer labs. Students can authenticate seamlessly using official @tsdcem.ac.in credentials.",
      upvotes: 94,
      downvotes: 2,
      userVoted: 'up',
      comments: [
        { id: "c-4", author: "Atul Tiwari", authorRole: "First Year CE", time: "3 hours ago", text: "Verified in Physics and Computing lab. Connection speed is extremely fast!" }
      ]
    },
    {
      id: "post-3",
      author: "Prof. Sumeet Rathod",
      authorRole: "Faculty, IT & MCA",
      authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
      time: "1 day ago",
      category: "Academics",
      title: "Java Programming (IT102) — Lab Assignment 3 Submission Reminder",
      content: "All First Year IT Division C students are requested to push their OOP Exception Handling source archives before Sunday midnight.",
      upvotes: 35,
      downvotes: 0,
      userVoted: null,
      comments: [
        { id: "c-5", author: "Anurag Yadav", authorRole: "Second Year IT • Div C", time: "18 hours ago", text: "Submitted on the portal Professor. Thank you for the multi-threading reference notes." },
        { id: "c-6", author: "Hrishabh Soni", authorRole: "Second Year IT", time: "12 hours ago", text: "Good luck First Years! Solid understanding of OOP in FY makes SY software engineering very smooth." }
      ]
    }
  ],

  clubs: [
    { id: "club-1", name: "Coding Club", type: "Technical", description: "Competitive programming, open source development, hackathons, and software engineering workshops.", lead: "Hrishabh Soni", membersCount: 145, isMember: true, image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80" },
    { id: "club-2", name: "Robotics & IoT Club", type: "Technical", description: "Embedded systems, autonomous rovers, microcontrollers, and IoT sensor networks for CE and ECS.", lead: "Aditya Kulkarni", membersCount: 88, isMember: false, image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=400&q=80" },
    { id: "club-3", name: "Cultural & Arts Club", type: "Cultural", description: "Drama, music, photography, and annual fest coordination at TSDCEM campus.", lead: "Atul Tiwari", membersCount: 110, isMember: false, image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=400&q=80" }
  ],

  committees: [
    { id: "com-1", name: "TSDCEM Student Council", category: "Governance", description: "Official elected student representative body coordinating student welfare and academic councils.", lead: "General Secretary", membersCount: 24, isMember: false },
    { id: "com-2", name: "Technical Advisory Committee", category: "Academics", description: "Faculty-student liaison committee overseeing lab infrastructure and technical competitions.", lead: "Prof. Sumeet Rathod", membersCount: 12, isMember: true }
  ],

  events: [
    { id: "ev-1", title: "HackTSDCEM 2026 Hackathon", organizer: "Coding Club", date: "2026-10-15", venue: "Central Computer Lab 1 & 2", status: "Registration Open", registeredCount: 128, isRegistered: true, description: "24-hour hackathon to build solutions for campus automation, education tech, and smart utilities." },
    { id: "ev-2", title: "Hands-on Workshop on Linux & Git", organizer: "Coding Club", date: "2026-09-22", venue: "IT Department Lab C", status: "Upcoming", registeredCount: 75, isRegistered: false, description: "Essential developer tooling workshop for First Year and Second Year engineering students." },
    { id: "ev-3", title: "SPANDAN 2026 — Annual Cultural Fest", organizer: "Cultural Committee", date: "2026-11-05", venue: "College Auditorium", status: "Announced", registeredCount: 310, isRegistered: false, description: "Inter-college cultural extravaganza featuring dance, drama, debate, and music performances." }
  ],

  notices: [
    { id: "not-1", title: "Mid-Semester Examination Timetable — Autumn 2026", category: "Exam", priority: "High", date: "2026-09-02", publisher: "Exam Cell Controller", content: "Mid-semester examination for First Year and Second Year (CE, IT, ECS, AIDS) students will commence on September 25, 2026." },
    { id: "not-2", title: "Mandatory 75% Attendance Compliance Notice", category: "Academic", priority: "Urgent", date: "2026-08-28", publisher: "Dean Academic Affairs", content: "Students are reminded that maintaining a minimum of 75% attendance across theory and lab sessions is mandatory as per University of Mumbai norms." },
    { id: "not-3", title: "Library Extended Hours for Academic Project Work", category: "Infrastructure", priority: "Normal", date: "2026-08-20", publisher: "Central Library", content: "Central library reading halls and digital reference stations will remain open until 8:30 PM on weekdays." }
  ],

  elections: [
    {
      id: "el-1",
      title: "TSDCEM Student Council Representative Election 2026",
      status: "Active",
      date: "2026-09-18",
      totalVotes: 384,
      userVoted: false,
      candidates: [
        { id: "cand-1", name: "Anurag Yadav", department: "IT (Second Year Div C)", manifesto: "Transparent club funding, digital lab queues, and extended library resources.", votes: 215 },
        { id: "cand-2", name: "Atul Tiwari", department: "CE (First Year Div A)", manifesto: "Better inter-branch sports tournaments, gymnasium timings, and coding workshops.", votes: 169 }
      ]
    },
    {
      id: "el-2",
      title: "Coding Club Core Committee Election 2026",
      status: "Upcoming",
      date: "2026-10-02",
      totalVotes: 0,
      userVoted: false,
      candidates: [
        { id: "cand-3", name: "Hrishabh Soni", department: "IT (Second Year Div B)", manifesto: "Focus on open-source project sprints, peer mentorship, and competitive coding training.", votes: 0 }
      ]
    }
  ],

  assignments: [
    { id: "asgn-1", title: "Java Assignment 3 — Exception Handling & Multi-Threading", subject: "Java Programming (IT102)", targetClass: "First Year IT Division C", deadline: "2026-09-15T23:59", totalMarks: 20, status: "Submitted", submissionsCount: 48, instructions: "Implement custom exception handling classes and thread synchronization for a banking simulation model." },
    { id: "asgn-2", title: "Web Technologies Lab Experiment 4 — Responsive UI Design", subject: "Web Technologies (IT202)", targetClass: "Second Year IT Division D", deadline: "2026-09-18T23:59", totalMarks: 20, status: "Pending", submissionsCount: 38, instructions: "Create a modular, accessible responsive dashboard layout using semantic HTML5 and clean CSS." },
    { id: "asgn-3", title: "Data Structures Practical 2 — Binary Search Trees", subject: "Data Structures (IT104)", targetClass: "First Year IT Division C", deadline: "2026-09-22T23:59", totalMarks: 15, status: "Pending", submissionsCount: 22, instructions: "Write clean C++/Java implementations of Binary Search Tree insertions, deletions, and recursive traversals." }
  ],

  submissions: [
    { id: "sub-1", rollNo: "IT202501", studentName: "Anurag Yadav", assignmentTitle: "Java Assignment 3", submissionDate: "2026-09-08 14:30", fileName: "IT202501_AnuragYadav_Java3.zip", status: "Graded", marks: 19, totalMarks: 20, feedback: "Outstanding exception hierarchy design and clean thread synchronization!" },
    { id: "sub-2", rollNo: "CE202512", studentName: "Atul Tiwari", assignmentTitle: "Java Assignment 3", submissionDate: "2026-09-08 16:15", fileName: "CE202512_AtulTiwari_Java3.zip", status: "Submitted", marks: null, totalMarks: 20, feedback: "" },
    { id: "sub-3", rollNo: "IT202408", studentName: "Hrishabh Soni", assignmentTitle: "Web Technologies Lab Experiment 4", submissionDate: "2026-09-09 11:20", fileName: "IT202408_HrishabhSoni_Web4.zip", status: "Graded", marks: 18, totalMarks: 20, feedback: "Clean layout and very responsive mobile viewport adaptation." }
  ],

  attendance: {
    overallPercentage: 88.5,
    totalAttended: 53,
    totalClassesHeld: 60,
    subjects: [
      { code: "IT102", name: "Java Programming", attended: 22, total: 24, percentage: 91.6 },
      { code: "IT104", name: "Data Structures", attended: 19, total: 22, percentage: 86.3 },
      { code: "IT202", name: "Web Technologies", attended: 12, total: 14, percentage: 85.7 }
    ],
    history: [
      { id: "att-1", date: "2026-09-05", subject: "Java Programming (IT102)", class: "First Year IT Division C", presentCount: 58, absentCount: 6, totalCount: 64, percentage: 90.6 },
      { id: "att-2", date: "2026-09-04", subject: "Data Structures (IT104)", class: "First Year IT Division C", presentCount: 56, absentCount: 8, totalCount: 64, percentage: 87.5 }
    ]
  },

  teams: [
    {
      id: "team-1",
      name: "FY IT Div C — Java Project Group 2",
      subject: "Java Programming (IT102)",
      targetClass: "First Year IT Division C",
      description: "Academic group for developing the Campus Connect software engineering prototype under Prof. Sumeet Rathod.",
      faculty: "Prof. Sumeet Rathod",
      members: [
        { id: "st-101", rollNo: "IT202501", name: "Anurag Yadav", email: "anurag.yadav@tsdcem.ac.in" },
        { id: "st-102", rollNo: "CE202512", name: "Atul Tiwari", email: "atul.tiwari@tsdcem.ac.in" },
        { id: "st-104", rollNo: "AIDS202514", name: "Priya Sharma", email: "priya.sharma@tsdcem.ac.in" }
      ],
      discussions: [
        { id: "td-1", author: "Prof. Sumeet Rathod", time: "Yesterday", text: "Please ensure all team members review the OOP abstraction boundaries for the assignment." },
        { id: "td-2", author: "Anurag Yadav", time: "5 hours ago", text: "Understood Professor. We have tested the class interfaces and pushed the source files." }
      ]
    }
  ],

  announcements: [
    { id: "ann-1", title: "Lab Practical 4 Instructions — First Year IT Div C", target: "First Year IT Division C", priority: "Important", date: "2026-09-05", message: "Make sure all students have their Java JDK 21 development environment configured before Thursday lab." },
    { id: "ann-2", title: "Second Year IT Div D — Project Synopsis Deadline", target: "Second Year IT Division D", priority: "Normal", date: "2026-09-04", message: "Please submit your group project proposals on the portal before Friday 4:00 PM." }
  ],

  complaints: [
    { id: "cmp-1", title: "Projector Display Quality in Computing Lab 3", category: "Infrastructure", description: "The projector in Computing Lab 3 has high flickering during afternoon lab sessions.", date: "2026-09-03", submittedBy: "Anurag Yadav", isAnonymous: false, status: "Under Review" },
    { id: "cmp-2", title: "Canteen Water Dispenser Maintenance", category: "Canteen", description: "Requesting routine servicing for the drinking water purifier on ground floor.", date: "2026-09-01", submittedBy: "Anonymous Student", isAnonymous: true, status: "Resolved" }
  ],

  reports: [
    { id: "rep-1", reportedItem: "Post #3 Spam Link", reportedUser: "Student #109", reason: "Spam commercial promotion in campus discussion", status: "Pending Review", date: "2026-09-04" }
  ],

  notifications: [
    { id: "notif-1", title: "Assignment Graded", text: "Prof. Sumeet Rathod graded Java Assignment 3 (19/20)", time: "2 hours ago", isRead: false },
    { id: "notif-2", title: "New Announcement", text: "First Year IT Division C: Lab Practical 4 Instructions published", time: "1 day ago", isRead: true }
  ]
};
