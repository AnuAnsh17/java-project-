import api from '../../services/api';
import { mockAnnouncementsFaculty } from '../mock/mockAnnouncements';

let announcementsStore = [...mockAnnouncementsFaculty];

export const facultyAnnouncementService = {
  async getAnnouncements() {
    return Promise.resolve(announcementsStore);
  },

  async createAnnouncement(data) {
    const newAnn = {
      id: `ann-${Date.now()}`,
      title: data.title,
      target: data.target || "SE IT Division A",
      date: new Date().toLocaleDateString(),
      priority: data.priority || "Normal",
      message: data.message,
      status: "Published"
    };
    announcementsStore.unshift(newAnn);
    return Promise.resolve(newAnn);
  }
};
