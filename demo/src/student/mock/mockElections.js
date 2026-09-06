export const mockElectionsData = [
  {
    id: "elec-101",
    title: "Student Council Election 2026",
    position: "General Secretary",
    status: "Active", // "Active" | "Upcoming" | "Completed"
    startDate: "Sep 06, 2026 - 09:00 AM",
    endDate: "Sep 06, 2026 - 05:00 PM",
    userHasVoted: false,
    eligibleBranch: "All Branches (SE, TE, BE)",
    candidates: [
      {
        id: "cand-1",
        name: "Ansh Sharma",
        branch: "SE IT",
        manifesto: "Focusing on transparent student funding for clubs, digitalizing assignment submission, and improving campus Wi-Fi infrastructure.",
        votes: 142
      },
      {
        id: "cand-2",
        name: "Varun Kapoor",
        branch: "TE Computer",
        manifesto: "Enhancing industrial visits, placement preparation bootcamps, and hostel amenities.",
        votes: 118
      }
    ]
  }
];
