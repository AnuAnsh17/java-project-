import api from '../../services/api';
import { mockCommitteesData } from '../mock/mockCommittees';

export const committeeService = {
  async getCommittees() {
    return Promise.resolve(mockCommitteesData);
  },

  async getCommitteeById(id) {
    const comm = mockCommitteesData.find(c => c.id === id);
    return Promise.resolve(comm || null);
  }
};
