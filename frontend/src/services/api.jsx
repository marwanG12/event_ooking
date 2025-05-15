import axios from 'axios';

const API_URL = 'http://localhost:3001';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export const auth = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
};

export const events = {
  getAll: () => api.get('/events'),
  create: (eventData) => api.post('/events', eventData),
  delete: (id) => api.delete(`/events/${id}`),
};

export const bookings = {
  create: (eventId) => api.post('/bookings', { eventId }),
  getUserBookings: () => api.get('/bookings/my-bookings'),
};

export default api; 