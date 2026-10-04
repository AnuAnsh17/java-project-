import api from '../../services/api';

export const noticeService = {
  async getNotices() {
    const response = await api.get('/notices');
    return response.data.map((notice) => ({
      ...notice,
      issuingAuthority: notice.author || 'Campus Connect',
      date: notice.publishedAt,
      isImportant: /exam|urgent|deadline/i.test(`${notice.title} ${notice.category}`)
    }));
  }
};
