import api from '../../services/api';

export const adminService = {
  async getDashboardMetrics() {
    const [students, clubs, events, elections, complaints] = await Promise.all([
      api.get('/students'), api.get('/clubs'), api.get('/events'), api.get('/elections'), api.get('/complaints')
    ]);
    return {
      totalStudents: students.data.length,
      totalFaculty: students.data.filter((item) => item.role === 'FACULTY').length,
      activeClubs: clubs.data.length,
      activeCommittees: 0,
      upcomingEvents: events.data.length,
      activeElections: elections.data.filter((item) => item.status === 'ACTIVE').length,
      pendingReports: complaints.data.filter((item) => item.status === 'PENDING').length
    };
  }
};
