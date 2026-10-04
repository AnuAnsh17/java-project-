import api from '../../services/api';

const mapNotice = (notice) => ({
  ...notice,
  issuingAuthority: notice.author || 'Campus Connect',
  audience: 'Campus community',
  priority: notice.category || 'General',
  publishDate: notice.publishedAt,
  status: 'Published'
});

export const noticeManagementService = {
  async getNotices() {
    const response = await api.get('/notices');
    return response.data.map(mapNotice);
  },
  async createNotice(data) {
    const response = await api.post('/notices', {
      title: data.title,
      content: data.content,
      category: data.priority,
      publishedAt: new Date().toISOString().slice(0, 10)
    });
    return mapNotice(response.data);
  },
  async archiveNotice(id) {
    await api.delete(`/notices/${id}`);
    return this.getNotices();
  }
};
