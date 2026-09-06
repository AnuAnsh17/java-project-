import api from '../../services/api';

/**
 * Authentication Service Foundation
 * Formatted for integration with Spring Boot Auth Controller endpoints (/api/auth/*)
 */
export const authService = {
  /**
   * Validate college domain locally on frontend
   * Note: Server-side Spring Boot validation will strictly enforce domain restriction
   */
  validateCollegeEmail(email) {
    if (!email) return false;
    const cleanEmail = email.trim().toLowerCase();
    return cleanEmail.endsWith('@tsdcem.ac.in');
  },

  /**
   * Login request blueprint (prepared for REST API endpoint invocation)
   * @param {string} role - 'student' | 'faculty' | 'admin'
   * @param {string} email - college email ending with @tsdcem.ac.in
   * @param {string} password - raw user password
   */
  async login(role, email, password) {
    if (!this.validateCollegeEmail(email)) {
      throw new Error('Campus Connect is restricted to authorized @tsdcem.ac.in accounts.');
    }

    // Call to future backend REST API endpoint
    return api.post('/auth/login', { role, email, password });
  }
};
