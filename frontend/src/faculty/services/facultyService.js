import api from '../../services/api';

export const facultyService = {
  async getDashboardMetrics() {
    const assignments = await api.get('/assignments');
    const records = assignments.data;
    return {
      assignedClassesCount: 0,
      pendingSubmissionsCount: 0,
      upcomingAssignmentsCount: records.filter((item) => item.status === 'PENDING').length,
      myTeamsCount: 0,
      todaysClasses: []
    };
  }
};
