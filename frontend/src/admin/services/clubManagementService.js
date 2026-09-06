import api from '../../services/api';
import { mockClubsAdmin } from '../mock/mockClubs';

let clubsStore = [...mockClubsAdmin];

export const clubManagementService = {
  async getClubs() {
    return Promise.resolve(clubsStore);
  },

  async createClub(data) {
    const newClub = {
      id: `club-${Date.now()}`,
      name: data.name,
      category: data.category || "Technical",
      leader: data.leader || "Unassigned",
      membersCount: 1,
      status: "Active",
      createdDate: "Just now"
    };
    clubsStore.unshift(newClub);
    return Promise.resolve(newClub);
  },

  async toggleStatus(id) {
    clubsStore = clubsStore.map(c => c.id === id ? { ...c, status: c.status === 'Active' ? 'Inactive' : 'Active' } : c);
    return Promise.resolve(clubsStore);
  }
};
