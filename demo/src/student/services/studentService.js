import api from '../../services/api';
import { currentUserStudent } from '../mock/mockStudents';

export const studentService = {
  async getProfile() {
    // API Blueprint: return api.get('/student/profile');
    return Promise.resolve(currentUserStudent);
  },

  async getActivity() {
    // API Blueprint: return api.get('/student/activity');
    return Promise.resolve([
      { type: "post", title: "Tips for preparing for TSDCEM Annual Hackathon 2026", date: "2 hours ago" },
      { type: "event", title: "Registered for Hackatron 2026", date: "Yesterday" },
      { type: "vote", title: "Voted in Student Council Election 2026", date: "Sep 06, 2026" }
    ]);
  }
};
