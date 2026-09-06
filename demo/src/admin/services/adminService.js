import api from '../../services/api';

export const adminService = {
  async getProfile() {
    return Promise.resolve({
      name: "Dean of Student Affairs",
      email: "admin@tsdcem.ac.in",
      role: "College Administrator",
      unit: "Office of Student Governance & Administration",
      status: "Active"
    });
  },

  async getDashboardMetrics() {
    return Promise.resolve({
      totalStudents: 1250,
      totalFaculty: 85,
      activeClubs: 12,
      activeCommittees: 6,
      upcomingEvents: 8,
      activeElections: 1,
      pendingReports: 2
    });
  }
};
