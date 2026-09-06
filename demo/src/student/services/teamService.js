import api from '../../services/api';
import { mockTeamsData } from '../mock/mockTeams';

export const teamService = {
  async getTeams() {
    return Promise.resolve(mockTeamsData);
  },

  async getTeamById(id) {
    const team = mockTeamsData.find(t => t.id === id);
    return Promise.resolve(team || teamsStore[0]);
  }
};
