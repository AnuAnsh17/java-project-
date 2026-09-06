import api from '../../services/api';
import { mockClubsData } from '../mock/mockClubs';

let clubsStore = [...mockClubsData];

export const clubService = {
  async getClubs() {
    return Promise.resolve(clubsStore);
  },

  async getClubById(id) {
    const club = clubsStore.find(c => c.id === id);
    return Promise.resolve(club || null);
  },

  async toggleJoinClub(id) {
    clubsStore = clubsStore.map(c => {
      if (c.id === id) {
        const isJoined = !c.isJoined;
        const count = isJoined ? c.membersCount + 1 : c.membersCount - 1;
        return { ...c, isJoined, membersCount: count };
      }
      return c;
    });
    return Promise.resolve(clubsStore.find(c => c.id === id));
  },

  async toggleFollowClub(id) {
    clubsStore = clubsStore.map(c => {
      if (c.id === id) {
        return { ...c, isFollowing: !c.isFollowing };
      }
      return c;
    });
    return Promise.resolve(clubsStore.find(c => c.id === id));
  }
};
