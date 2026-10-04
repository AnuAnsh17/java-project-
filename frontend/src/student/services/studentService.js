import api from '../../services/api';

export const studentService = {
  async getProfile(id) {
    const response = await api.get(`/students/${id}`);
    return response.data;
  },

  async getActivity() {
    return [];
  }
};
