import api from '../../services/api';
import { mockElectionsData } from '../mock/mockElections';

let electionsStore = [...mockElectionsData];

export const electionService = {
  async getElections() {
    return Promise.resolve(electionsStore);
  },

  async getElectionById(id) {
    const el = electionsStore.find(e => e.id === id);
    return Promise.resolve(el || null);
  },

  async castVote(electionId, candidateId) {
    electionsStore = electionsStore.map(el => {
      if (el.id === electionId) {
        const updatedCandidates = el.candidates.map(cand => {
          if (cand.id === candidateId) {
            return { ...cand, votes: cand.votes + 1 };
          }
          return cand;
        });
        return { ...el, userHasVoted: true, candidates: updatedCandidates };
      }
      return el;
    });
    return Promise.resolve(electionsStore.find(e => e.id === electionId));
  }
};
