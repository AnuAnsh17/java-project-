import api from '../../services/api';

const mapComplaint = (item) => ({
  ...item,
  subject: item.title,
  status: ({ SUBMITTED: 'Submitted', UNDER_REVIEW: 'Under review' })[item.status] || item.status,
  identityMode: item.anonymous ? 'Anonymous' : 'Identified'
});

export const complaintService = {
  async getComplaints() {
    const response = await api.get('/complaints');
    return response.data.map(mapComplaint);
  },
  async submitComplaint(data) {
    const response = await api.post('/complaints', {
      title: data.subject,
      category: data.category,
      description: data.description,
      anonymous: data.identityMode === 'Anonymous'
    });
    return mapComplaint(response.data);
  }
};
