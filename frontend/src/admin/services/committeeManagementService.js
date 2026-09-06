import api from '../../services/api';
import { mockCommitteesAdmin } from '../mock/mockCommittees';

let committeesStore = [...mockCommitteesAdmin];

export const committeeManagementService = {
  async getCommittees() {
    return Promise.resolve(committeesStore);
  },

  async createCommittee(data) {
    const newComm = {
      id: `comm-${Date.now()}`,
      name: data.name,
      category: data.category || "Governance",
      leader: data.leader || "Unassigned",
      membersCount: 1,
      status: "Active",
      officeBearers: []
    };
    committeesStore.unshift(newComm);
    return Promise.resolve(newComm);
  }
};
