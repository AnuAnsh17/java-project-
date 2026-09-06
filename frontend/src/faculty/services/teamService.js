import api from '../../services/api';
import { mockTeamsFaculty } from '../mock/mockTeams';

let teamsStore = [...mockTeamsFaculty];

export const teamService = {
  async getTeams() {
    return Promise.resolve(teamsStore);
  },

  async getTeamById(id) {
    const t = teamsStore.find(team => team.id === id);
    return Promise.resolve(t || null);
  },

  async createTeam(data) {
    const newTeam = {
      id: `team-${Date.now()}`,
      name: data.name,
      subject: data.subject || "Java Programming (IT302)",
      targetClass: data.targetClass || "SE IT Division A",
      academicYear: "2026-2027",
      membersCount: 1,
      description: data.description,
      announcements: [],
      members: [],
      discussions: []
    };
    teamsStore.unshift(newTeam);
    return Promise.resolve(newTeam);
  },

  async postDiscussion(teamId, text) {
    teamsStore = teamsStore.map(t => {
      if (t.id === teamId) {
        const newDisc = {
          id: `disc-${Date.now()}`,
          author: "Prof. Dr. R. K. Gupta",
          text,
          time: "Just now"
        };
        return { ...t, discussions: [...t.discussions, newDisc] };
      }
      return t;
    });
    return Promise.resolve(teamsStore.find(t => t.id === teamId));
  }
};
