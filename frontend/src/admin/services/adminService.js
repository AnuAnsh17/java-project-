import api from '../../services/api';

export const adminService = {
  async getDashboardMetrics() {
    const [students, clubs, events, elections, complaints] = await Promise.all([
      api.get('/students'), api.get('/clubs'), api.get('/events'), api.get('/elections'), api.get('/complaints')
    ]);
    return {
      metrics: {
        totalStudents: students.data.filter((item) => item.role === 'STUDENT').length,
        totalFaculty: students.data.filter((item) => item.role === 'FACULTY').length,
        activeClubs: clubs.data.length,
        upcomingEvents: events.data.length,
        activeElections: elections.data.filter((item) => item.status === 'ACTIVE').length,
        pendingReports: complaints.data.filter((item) => ['PENDING', 'SUBMITTED', 'UNDER_REVIEW', 'INVESTIGATING'].includes(item.status)).length
      },
      recentComplaints: complaints.data.slice(0, 3),
      recentElections: elections.data.slice(0, 3)
    };
  }
};
