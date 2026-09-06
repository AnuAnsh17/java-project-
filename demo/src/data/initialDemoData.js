export const initialDemoData = {
  currentStudent: {
    id: "st-101",
    name: "Aarav Mehta",
    email: "aarav.mehta@tsdcem.ac.in",
    rollNo: "IT202401",
    department: "Information Technology",
    year: "Second Year",
    division: "Division B",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
    memberships: ["Coding Club", "Technical Committee"],
    positions: [
      { title: "President", organization: "Coding Club", badge: "Student Leader" },
      { title: "Secretary", organization: "Technical Committee", badge: "Committee Office Bearer" }
    ],
    attendancePercentage: 88.5,
    pendingAssignmentsCount: 2
  },

  currentFaculty: {
    id: "fac-201",
    name: "Dr. Rohan Sharma",
    email: "rohan.sharma@tsdcem.ac.in",
    department: "Computer Engineering",
    designation: "Associate Professor",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    subjects: ["Java Programming (IT302)", "Distributed Systems (IT401)"],
    assignedClasses: ["SE IT Division A", "BE IT Division B"]
  },

  currentAdmin: {
    id: "adm-001",
    name: "Dr. K. V. Subramanian",
    email: "admin@tsdcem.ac.in",
    role: "Dean of Academic Affairs & Chief Administrator",
    department: "College Administration"
  },

  students: [
    { id: "st-101", rollNo: "IT202401", name: "Aarav Mehta", email: "aarav.mehta@tsdcem.ac.in", branch: "Information Technology", year: "Second Year", division: "B", attendancePercentage: 88.5, assignmentStatus: "Up-to-date", status: "Active" },
    { id: "st-102", rollNo: "IT202402", name: "Ananya Roy", email: "ananya.roy@tsdcem.ac.in", branch: "Information Technology", year: "Second Year", division: "B", attendancePercentage: 92.0, assignmentStatus: "Submitted", status: "Active" },
    { id: "st-103", rollNo: "IT202403", name: "Rohan Verma", email: "rohan.verma@tsdcem.ac.in", branch: "Information Technology", year: "Second Year", division: "A", attendancePercentage: 81.2, assignmentStatus: "Pending", status: "Active" },
    { id: "st-104", rollNo: "CS202415", name: "Priya Sharma", email: "priya.sharma@tsdcem.ac.in", branch: "Computer Engineering", year: "Third Year", division: "A", attendancePercentage: 95.0, assignmentStatus: "Submitted", status: "Active" },
    { id: "st-105", rollNo: "EX202422", name: "Vikram Singh", email: "vikram.singh@tsdcem.ac.in", branch: "Electronics & Telecom", year: "Final Year", division: "B", attendancePercentage: 78.4, assignmentStatus: "Overdue", status: "Active" }
  ],

  faculty: [
    { id: "fac-201", name: "Dr. Rohan Sharma", email: "rohan.sharma@tsdcem.ac.in", department: "Computer Engineering", designation: "Associate Professor", subjectsCount: 2, classesCount: 2, status: "Active" },
    { id: "fac-202", name: "Prof. Sunita Patil", email: "sunita.patil@tsdcem.ac.in", department: "Information Technology", designation: "Assistant Professor", subjectsCount: 2, classesCount: 3, status: "Active" },
    { id: "fac-203", name: "Dr. Amit Deshmukh", email: "amit.deshmukh@tsdcem.ac.in", department: "Electronics & Telecom", designation: "Professor & HOD", subjectsCount: 1, classesCount: 2, status: "Active" }
  ],

  posts: [
    {
      id: "post-1",
      author: "Aarav Mehta",
      authorRole: "President, Coding Club",
      authorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
      time: "2 hours ago",
      category: "Events",
      title: "Annual TechFest Hackathon 2026 Announced!",
      content: "We are thrilled to announce HackCampus 2026 sponsored by leading tech companies. 24 hours of non-stop coding, mentorship, cash prizes up to Rs 50,000!",
      upvotes: 42,
      downvotes: 1,
      userVoted: null,
      comments: [
        { id: "c-1", author: "Ananya Roy", time: "1 hour ago", text: "Can Second Year IT students participate individually or in teams?" },
        { id: "c-2", author: "Aarav Mehta", time: "45 mins ago", text: "Teams of 2 to 4 students are mandatory. Registration opens tomorrow!" }
      ]
    },
    {
      id: "post-2",
      author: "IT Cell Administrator",
      authorRole: "Official Campus Infrastructure",
      authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
      time: "5 hours ago",
      category: "General",
      title: "High-Speed Wi-Fi Upgrade in Engineering Block B & C",
      content: "New Wi-Fi access points have been deployed across Block B and C labs. Please re-authenticate using your @tsdcem.ac.in credentials.",
      upvotes: 85,
      downvotes: 3,
      userVoted: 'up',
      comments: [
        { id: "c-3", author: "Rohan Verma", time: "3 hours ago", text: "Verified! Speed in Lab 3 is over 100 Mbps now." }
      ]
    },
    {
      id: "post-3",
      author: "Ananya Roy",
      authorRole: "Coding Club Member",
      authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
      time: "1 day ago",
      category: "Academics",
      title: "Java Assignment 4 — Spring Boot REST APIs Doubt Thread",
      content: "If anyone is facing issues configuring Spring Data JPA with MySQL database dialect in IT302, post your questions here!",
      upvotes: 19,
      downvotes: 0,
      userVoted: null,
      comments: []
    }
  ],

  clubs: [
    { id: "club-1", name: "Coding Club", type: "Technical", description: "Competitive programming, open source development, and hackathons.", lead: "Aarav Mehta", membersCount: 145, isMember: true, image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80" },
    { id: "club-2", name: "Robotics & Automation Club", type: "Technical", description: "Autonomous robotics, IoT systems, ROS2, and embedded electronics.", lead: "Priya Sharma", membersCount: 88, isMember: false, image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=400&q=80" },
    { id: "club-3", name: "Cultural & Drama Club", type: "Cultural", description: "Music, dance, street plays, and annual college fest management.", lead: "Rohan Verma", membersCount: 110, isMember: false, image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=400&q=80" }
  ],

  committees: [
    { id: "com-1", name: "Student Council 2026", category: "Governance", description: "Official elected student representative body for campus governance.", lead: "General Secretary", membersCount: 24, isMember: false },
    { id: "com-2", name: "Technical Advisory Committee", category: "Academics", description: "Oversees technical workshops, lab infrastructure, and symposiums.", lead: "Dr. Amit Deshmukh", membersCount: 12, isMember: true }
  ],

  events: [
    { id: "ev-1", title: "Campus Hackathon 2026", organizer: "Coding Club", date: "2026-10-15", venue: "Seminar Hall 1", status: "Registration Open", registeredCount: 128, isRegistered: true, description: "24-hour hackathon to build solutions for real-world campus & civic challenges." },
    { id: "ev-2", title: "Robotics Workshop on ROS2", organizer: "Robotics Club", date: "2026-10-20", venue: "Robotics Lab B-2", status: "Upcoming", registeredCount: 45, isRegistered: false, description: "Hands-on workshop covering Robot Operating System 2 and gazebo simulation." },
    { id: "ev-3", title: "Annual Fest — SPANDAN 2026", organizer: "Cultural Committee", date: "2026-11-05", venue: "College Auditorium", status: "Announced", registeredCount: 310, isRegistered: false, description: "Inter-college cultural extravaganza with music, dance, art, and drama events." }
  ],

  notices: [
    { id: "not-1", title: "Mid-Semester Examination Schedule — Autumn 2026", category: "Exam", priority: "High", date: "2026-09-02", publisher: "Exam Cell Controller", content: "The mid-semester examinations for SE, TE, and BE students will commence on September 25, 2026. Detailed timetable attached." },
    { id: "not-2", title: "Mandatory 75% Attendance Criteria Compliance Notice", category: "Academic", priority: "Urgent", date: "2026-08-28", publisher: "Dean Academic Affairs", content: "Students failing to maintain 75% attendance in theory and practicals will not be permitted for end-semester exams." },
    { id: "not-3", title: "Library Extended Hours for Final Year Projects", category: "Infrastructure", priority: "Normal", date: "2026-08-20", publisher: "Central Library", content: "Central library reading halls will remain open till 10:00 PM on weekdays for BE project research work." }
  ],

  elections: [
    {
      id: "el-1",
      title: "Student Council General Secretary Election 2026",
      status: "Active",
      date: "2026-09-12",
      totalVotes: 412,
      userVoted: false,
      candidates: [
        { id: "cand-1", name: "Aarav Mehta", department: "SE IT", manifesto: "Improving lab Wi-Fi, 24/7 library access, and transparent event budgets.", votes: 245 },
        { id: "cand-2", name: "Vikram Singh", department: "BE EXTC", manifesto: "Better sports equipment, inter-branch tournaments, and gym upgrade.", votes: 167 }
      ]
    },
    {
      id: "el-2",
      title: "Coding Club President Election 2026-27",
      status: "Upcoming",
      date: "2026-09-28",
      totalVotes: 0,
      userVoted: false,
      candidates: [
        { id: "cand-3", name: "Ananya Roy", department: "SE IT", manifesto: "Focus on open source contributions, weekly DSA sprints, and industry mentorship.", votes: 0 }
      ]
    }
  ],

  assignments: [
    { id: "asgn-1", title: "Java Assignment 4 — Spring Boot REST APIs", subject: "Java Programming (IT302)", targetClass: "SE IT Division B", deadline: "2026-09-15T23:59", totalMarks: 20, status: "Pending", submissionsCount: 18, instructions: "Create a Spring Boot REST API for student registration with GET, POST, PUT, DELETE endpoints." },
    { id: "asgn-2", title: "Data Structures Lab Report 3", subject: "Data Structures (IT201)", targetClass: "SE IT Division B", deadline: "2026-09-10T23:59", totalMarks: 15, status: "Submitted", submissionsCount: 42, instructions: "Implement Binary Search Tree operations (Insert, Delete, Inorder traversal) in C++/Java." },
    { id: "asgn-3", title: "Distributed Systems Quiz 1", subject: "Distributed Systems (IT401)", targetClass: "BE IT Division A", deadline: "2026-09-20T23:59", totalMarks: 25, status: "Pending", submissionsCount: 5, instructions: "Solve questions on RPC, RMI, and Lamport Clock synchronization algorithms." }
  ],

  submissions: [
    { id: "sub-1", rollNo: "IT202401", studentName: "Aarav Mehta", assignmentTitle: "Data Structures Lab Report 3", submissionDate: "2026-09-08 14:30", fileName: "IT202401_DS_Lab3.zip", status: "Graded", marks: 18, totalMarks: 20, feedback: "Excellent implementation of BST deletion logic!" },
    { id: "sub-2", rollNo: "IT202402", studentName: "Ananya Roy", assignmentTitle: "Data Structures Lab Report 3", submissionDate: "2026-09-08 16:10", fileName: "IT202402_DS_Lab3.zip", status: "Submitted", marks: null, totalMarks: 20, feedback: "" },
    { id: "sub-3", rollNo: "IT202403", studentName: "Rohan Verma", assignmentTitle: "Java Assignment 4", submissionDate: "2026-09-09 11:20", fileName: "IT202403_Java_Assign4.zip", status: "Submitted", marks: null, totalMarks: 20, feedback: "" }
  ],

  attendance: {
    overallPercentage: 88.5,
    totalAttended: 53,
    totalClassesHeld: 60,
    subjects: [
      { code: "IT302", name: "Java Programming", attended: 22, total: 24, percentage: 91.6 },
      { code: "IT201", name: "Data Structures", attended: 19, total: 22, percentage: 86.3 },
      { code: "IT401", name: "Distributed Systems", attended: 12, total: 14, percentage: 85.7 }
    ],
    history: [
      { id: "att-1", date: "2026-09-05", subject: "Java Programming (IT302)", class: "SE IT Division B", presentCount: 42, absentCount: 3, totalCount: 45, percentage: 93.3 },
      { id: "att-2", date: "2026-09-04", subject: "Data Structures (IT201)", class: "SE IT Division B", presentCount: 39, absentCount: 6, totalCount: 45, percentage: 86.6 }
    ]
  },

  teams: [
    {
      id: "team-1",
      name: "SE IT Java Project Group 5",
      subject: "Java Programming (IT302)",
      targetClass: "SE IT Division B",
      description: "Academic group for developing the Campus Connect Spring Boot backend and REST APIs.",
      faculty: "Dr. Rohan Sharma",
      members: [
        { id: "st-101", rollNo: "IT202401", name: "Aarav Mehta", email: "aarav.mehta@tsdcem.ac.in" },
        { id: "st-102", rollNo: "IT202402", name: "Ananya Roy", email: "ananya.roy@tsdcem.ac.in" }
      ],
      discussions: [
        { id: "td-1", author: "Dr. Rohan Sharma", time: "Yesterday", text: "Please review the entity relationship diagram for the user module before Friday." },
        { id: "td-2", author: "Aarav Mehta", time: "5 hours ago", text: "Understood Professor. We have pushed the DB schema draft to the team repository." }
      ]
    }
  ],

  announcements: [
    { id: "ann-1", title: "Lab Experiment 5 Guidelines & Submission Deadline", target: "SE IT Division B", priority: "Important", date: "2026-09-05", message: "Make sure your Spring Data JPA entities map properly to the MySQL database tables before submitting." },
    { id: "ann-2", title: "Class Test Announcement — Distributed Systems", target: "BE IT Division A", priority: "Normal", date: "2026-09-04", message: "A 20-minute class test on Lamport Logical Clocks will be conducted on Monday during lecture." }
  ],

  complaints: [
    { id: "cmp-1", title: "Broken Air Conditioner in IT Lab 3", category: "Infrastructure", description: "The AC in IT Lab 3 has been malfunctioning for 3 days, causing high temperatures during practicals.", date: "2026-09-03", submittedBy: "Aarav Mehta", isAnonymous: false, status: "Under Review" },
    { id: "cmp-2", title: "Canteen Hygiene & Pricing Inquiry", category: "Canteen", description: "Water filter near canteen counter needs servicing.", date: "2026-09-01", submittedBy: "Anonymous Student", isAnonymous: true, status: "Resolved" }
  ],

  reports: [
    { id: "rep-1", reportedItem: "Post #3 Comment", reportedUser: "Student #402", reason: "Inappropriate language in forum thread", status: "Pending Review", date: "2026-09-04" },
    { id: "rep-2", reportedItem: "User Profile #18", reportedUser: "User #109", reason: "Impersonation of college faculty", status: "Resolved", date: "2026-09-02" }
  ],

  notifications: [
    { id: "notif-1", title: "Assignment Graded", text: "Dr. Rohan Sharma graded Data Structures Lab Report 3 (18/20)", time: "2 hours ago", isRead: false },
    { id: "notif-2", title: "New Announcement", text: "SE IT Division B: Lab Experiment 5 Guidelines published", time: "1 day ago", isRead: true }
  ]
};
