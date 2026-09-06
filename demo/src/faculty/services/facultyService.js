import api from '../../services/api';
import { currentFaculty } from '../mock/mockFaculty';

export const facultyService = {
  async getProfile() {
    return Promise.resolve(currentFaculty);
  },

  async getDashboardMetrics() {
    return Promise.resolve({
      assignedClassesCount: 2,
      pendingSubmissionsCount: 5,
      upcomingAssignmentsCount: 1,
      myTeamsCount: 2,
      todaysClasses: ["SE IT - Java Programming (10:00 AM)"]
    });
  }
};
