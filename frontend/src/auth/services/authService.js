import api from '../../services/api';

export const authService = {
  validateCollegeEmail(email) {
    if (!email) return false;
    const cleanEmail = email.trim().toLowerCase();
    return cleanEmail.endsWith('@tsdcem.ac.in');
  },

  async login(email, password) {
    if (!this.validateCollegeEmail(email)) {
      throw new Error('Campus Connect is restricted to authorized @tsdcem.ac.in accounts.');
    }
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  async register(details) {
    if (!this.validateCollegeEmail(details.email)) {
      throw new Error('Use your official @tsdcem.ac.in college email.');
    }
    const response = await api.post('/auth/register', details);
    return response.data;
  },

  async me() {
    const response = await api.get('/auth/me');
    return response.data;
  }
};
