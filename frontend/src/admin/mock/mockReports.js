export const mockReportsAdmin = [
  {
    id: "cmp-101",
    subject: "Unsafe electrical wiring near IT Lab 304",
    category: "Infrastructure & Safety",
    dateSubmitted: "Sep 01, 2026",
    status: "Under Review", // "Submitted" | "Under Review" | "Investigating" | "Resolved" | "Rejected"
    identityMode: "Identified", // "Identified" | "Anonymous"
    reporterName: "Ansh Sharma",
    reporterEmail: "ansh.sharma@tsdcem.ac.in",
    description: "Exposed wires near server rack 2 in Lab 304 pose a safety hazard.",
    assignedAdmin: "Admin Support 1",
    internalNotes: "Maintenance team notified to inspect rack 2 wiring.",
    resolutionResponse: null
  },
  {
    id: "cmp-102",
    subject: "Noise disturbance near Quiet Study Area",
    category: "Club / Committee",
    dateSubmitted: "Sep 03, 2026",
    status: "Submitted",
    identityMode: "Anonymous",
    reporterName: null, // Anonymous submission
    reporterEmail: null,
    description: "Loud music playing near library reading rooms during afternoon study hours.",
    assignedAdmin: null,
    internalNotes: null,
    resolutionResponse: null
  }
];
