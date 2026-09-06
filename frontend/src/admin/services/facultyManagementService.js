import api from '../../services/api';
import { mockFacultyAdmin } from '../mock/mockFaculty';

let facultyStore = [...mockFacultyAdmin];

export const facultyManagementService = {
  async getFaculty() {
    return Promise.resolve(facultyStore);
  },

  async toggleStatus(id) {
    facultyStore = facultyStore.map(f => {
      if (f.id === id) {
        return { ...f, status: f.status === 'Active' ? 'Suspended' : 'Active' };
      }
      return f;
    });
    return Promise.resolve(facultyStore);
  }
};
