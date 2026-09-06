import api from '../../services/api';
import { mockComplaintsData } from '../mock/mockComplaints';

let complaintsStore = [...mockComplaintsData];

export const complaintService = {
  async getComplaints() {
    return Promise.resolve(complaintsStore);
  },

  async submitComplaint(data) {
    const newComplaint = {
      id: `cmp-${Date.now()}`,
      subject: data.subject,
      category: data.category || "General",
      dateSubmitted: "Just now",
      status: "Under Review",
      identityMode: data.identityMode || "Anonymous",
      description: data.description
    };
    complaintsStore.unshift(newComplaint);
    return Promise.resolve(newComplaint);
  }
};
