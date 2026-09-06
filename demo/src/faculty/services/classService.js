import api from '../../services/api';
import { mockClassesFaculty } from '../mock/mockClasses';
import { mockClassStudentsFaculty } from '../mock/mockStudents';

export const classService = {
  async getClasses() {
    return Promise.resolve(mockClassesFaculty);
  },

  async getClassById(id) {
    const cls = mockClassesFaculty.find(c => c.id === id);
    return Promise.resolve(cls || classesStore[0]);
  },

  async getClassStudents(classId) {
    return Promise.resolve(mockClassStudentsFaculty);
  }
};
