import api from '../../services/api';
import { mockStudentsAdmin } from '../mock/mockStudents';

let studentsStore = [...mockStudentsAdmin];

export const studentManagementService = {
  async getStudents() {
    return Promise.resolve(studentsStore);
  },

  async toggleStatus(id) {
    studentsStore = studentsStore.map(s => {
      if (s.id === id) {
        return { ...s, status: s.status === 'Active' ? 'Suspended' : 'Active' };
      }
      return s;
    });
    return Promise.resolve(studentsStore);
  }
};
