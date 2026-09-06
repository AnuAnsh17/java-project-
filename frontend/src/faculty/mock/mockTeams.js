export const mockTeamsFaculty = [
  {
    id: "team-1",
    name: "SE IT — Java Programming (Group A)",
    subject: "Java Programming (IT302)",
    targetClass: "SE IT Division A",
    academicYear: "2026-2027",
    membersCount: 42,
    description: "Official academic group for Java Programming lectures, lab assignments, and project discussions.",
    announcements: [
      "Lab experiment 4 resources uploaded in course materials.",
      "Doubts session scheduled tomorrow at 3:30 PM."
    ],
    members: [
      { id: "std-101", name: "Ansh Sharma", email: "ansh.sharma@tsdcem.ac.in", rollNo: "2024-IT-042" },
      { id: "std-102", name: "Rohan Varma", email: "rohan.varma@tsdcem.ac.in", rollNo: "2024-IT-045" }
    ],
    discussions: [
      { id: "disc-1", author: "Ansh Sharma", text: "Prof., will thread deadlock questions be included in Mid-Sem?", time: "Yesterday" }
    ]
  },
  {
    id: "team-2",
    name: "Java Mini Project — Team 4",
    subject: "Java Programming (IT302)",
    targetClass: "SE IT Division A",
    academicYear: "2026-2027",
    membersCount: 4,
    description: "Project team for building Campus Connect backend REST APIs.",
    announcements: [
      "Sprint 1 review meeting on Friday."
    ],
    members: [
      { id: "std-101", name: "Ansh Sharma", email: "ansh.sharma@tsdcem.ac.in", rollNo: "2024-IT-042" }
    ],
    discussions: []
  }
];
