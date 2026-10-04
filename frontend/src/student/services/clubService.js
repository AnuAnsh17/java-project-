import api from '../../services/api';

const mapClub = (club) => ({ ...club, leadership: [], announcements: [] });

export const clubService = {
  async getClubs() {
    const response = await api.get('/clubs');
    return response.data.map(mapClub);
  },
  async getClubById(id) {
    const response = await api.get(`/clubs/${id}`);
    return mapClub(response.data);
  }
};
