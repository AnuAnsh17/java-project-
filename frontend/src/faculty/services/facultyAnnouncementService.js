import api from '../../services/api';

const mapNotice = (notice) => ({
  ...notice,
  target: notice.category,
  date: notice.publishedAt,
  message: notice.content,
  priority: /urgent|important/i.test(notice.category || '') ? 'Important' : 'Normal'
});

export const facultyAnnouncementService = {
  async getAnnouncements() {
    const response = await api.get('/notices');
    return response.data.map(mapNotice);
  },
  async createAnnouncement(data) {
    const response = await api.post('/notices', {
      title: data.title,
      content: data.message,
      category: data.priority,
      publishedAt: new Date().toISOString().slice(0, 10)
    });
    return mapNotice(response.data);
  }
};
