import api from '../../services/api';
import { mockAssignmentsData } from '../mock/mockAssignments';

let assignmentsStore = [...mockAssignmentsData];

export const assignmentService = {
  async getAssignments() {
    return Promise.resolve(assignmentsStore);
  },

  async getAssignmentById(id) {
    const asgn = assignmentsStore.find(a => a.id === id);
    return Promise.resolve(asgn || null);
  },

  async submitAssignment(id, fileData) {
    assignmentsStore = assignmentsStore.map(a => {
      if (a.id === id) {
        return {
          ...a,
          status: "Submitted",
          submissionDate: new Date().toLocaleString()
        };
      }
      return a;
    });
    return Promise.resolve(assignmentsStore.find(a => a.id === id));
  }
};
