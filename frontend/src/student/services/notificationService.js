import api from '../../services/api';
import { mockNotificationsData } from '../mock/mockNotifications';

let notifsStore = [...mockNotificationsData];

export const notificationService = {
  async getNotifications() {
    return Promise.resolve(notifsStore);
  },

  async markAsRead(id) {
    notifsStore = notifsStore.map(n => n.id === id ? { ...n, isRead: true } : n);
    return Promise.resolve(notifsStore);
  }
};
