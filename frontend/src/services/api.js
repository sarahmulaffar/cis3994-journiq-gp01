const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Reusable API request function
async function apiRequest(endpoint, options = {}) {
  const { method = 'GET', body, token } = options;

  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || 'Something went wrong.');
  }

  return result;
}

// Authentication API functions
export const authApi = {
  register: (userData) =>
    apiRequest('/api/auth/register', {
      method: 'POST',
      body: userData,
    }),

  login: (credentials) =>
    apiRequest('/api/auth/login', {
      method: 'POST',
      body: credentials,
    }),

  getSession: (token) =>
    apiRequest('/api/auth/session', { token }),

  logout: (token) =>
    apiRequest('/api/auth/logout', {
      method: 'POST',
      token,
    }),
};