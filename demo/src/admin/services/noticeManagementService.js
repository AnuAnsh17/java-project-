import api from '../../services/api';
import { mockNoticesAdmin } from '../mock/mockNotices';

let noticesStore = [...mockNoticesAdmin];

export const noticeManagementService = {
  async getNotices() {
    return Promise.resolve(noticesStore);
  },

  async createNotice(data) {
    const newNotice = {
      id: `notice-${Date.now()}`,
      title: data.title,
      issuingAuthority: data.issuingAuthority || "College Administration",
      audience: data.audience || "All Students",
      priority: data.priority || "Normal",
      publishDate: new Date().toLocaleDateString(),
      status: "Published",
      attachment: data.attachment || null
    };
    noticesStore.unshift(newNotice);
    return Promise.resolve(newNotice);
  },

  async archiveNotice(id) {
    noticesStore = noticesStore.map(n => n.id === id ? { ...n, status: "Archived" } : n);
    return Promise.resolve(noticesStore);
  }
};
