import api from '../../services/api';
import { mockElectionsAdmin } from '../mock/mockElections';
import { mockCandidatesAdmin } from '../mock/mockCandidates';

let electionsStore = [...mockElectionsAdmin];
let candidatesStore = [...mockCandidatesAdmin];

export const electionManagementService = {
  async getElections() {
    return Promise.resolve(electionsStore);
  },

  async createElection(data) {
    const newEl = {
      id: `elec-${Date.now()}`,
      title: data.title,
      position: data.position,
      status: "Active",
      startDate: data.startDate || "2026-09-06T09:00",
      endDate: data.endDate || "2026-09-06T17:00",
      eligibleBranch: data.eligibleBranch || "All Branches",
      candidatesCount: 0,
      totalVotesCast: 0
    };
    electionsStore.unshift(newEl);
    return Promise.resolve(newEl);
  },

  async getCandidates() {
    return Promise.resolve(candidatesStore);
  },

  async updateCandidateStatus(id, status) {
    candidatesStore = candidatesStore.map(c => c.id === id ? { ...c, status } : c);
    return Promise.resolve(candidatesStore);
  },

  async getResults() {
    return Promise.resolve([
      { candidateName: "Ansh Sharma", position: "General Secretary", votes: 142, percentage: 54.6, isWinner: true },
      { candidateName: "Varun Kapoor", position: "General Secretary", votes: 118, percentage: 45.4, isWinner: false }
    ]);
  }
};
