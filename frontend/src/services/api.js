import axios from 'axios';

// Centralized Axios instance configured for Spring Boot REST API integration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Request Interceptor: Attach authorization headers when JWT token is present in security context
api.interceptors.request.use(
  (config) => {
    // Placeholder for authorization token attachment when backend Spring Security is connected
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Standard error handling & security response interception
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Intercept 401/403 security errors when real authentication API is live
    return Promise.reject(error);
  }
);

export default api;
