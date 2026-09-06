import api from '../../services/api';
import { mockSubmissionsFaculty } from '../mock/mockSubmissions';

let submissionsStore = [...mockSubmissionsFaculty];

export const submissionService = {
  async getSubmissions() {
    return Promise.resolve(submissionsStore);
  },

  async getSubmissionById(id) {
    const sub = submissionsStore.find(s => s.id === id);
    return Promise.resolve(sub || null);
  },

  async gradeSubmission(id, marks, feedback) {
    submissionsStore = submissionsStore.map(s => {
      if (s.id === id) {
        return {
          ...s,
          status: "Graded",
          marks: Number(marks),
          feedback: feedback
        };
      }
      return s;
    });
    return Promise.resolve(submissionsStore.find(s => s.id === id));
  }
};
