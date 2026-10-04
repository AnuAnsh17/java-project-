import api from '../../services/api';

const mapClub = (club) => ({ ...club, leader: club.president || 'Not assigned', status: 'Published' });

export const clubManagementService = {
  async getClubs() {
    const response = await api.get('/clubs');
    return response.data.map(mapClub);
  },
  async createClub(data) {
    const response = await api.post('/clubs', {
      name: data.name, category: data.category, president: data.leader,
      description: `${data.category} campus club`, department: 'All', membersCount: 0
    });
    return mapClub(response.data);
  },
  async deleteClub(id) { await api.delete(`/clubs/${id}`); }
};
