import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

// Configuration d'axios avec le token d'authentification
const api = axios.create({
  baseURL: API_URL,
});

// Intercepteur pour ajouter le token aux requêtes
api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

// Service pour les événements
export const events = {
  getAll: () => api.get('/events'),
  getById: (id) => api.get(`/events/${id}`),
  create: (data) => api.post('/events', data),
  update: (id, data) => api.put(`/events/${id}`, data),
  delete: (id) => api.delete(`/events/${id}`),
  book: (eventId) => api.post('/bookings', { eventId }),
};

// Service pour l'authentification
export const auth = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
};

// Service pour les réservations
export const bookings = {
  getUserBookings: () => api.get('/bookings/my-bookings'),
  cancelBooking: (bookingId) => api.delete(`/bookings/${bookingId}`),
};

export default api; 