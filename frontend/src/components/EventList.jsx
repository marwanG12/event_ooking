import React, { useState, useEffect } from 'react';
import { events } from '../services/api';
import { useAuth } from '../context/AuthContext';

const EventList = () => {
  const [eventsList, setEventsList] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await events.getAll();
      setEventsList(response.data);
    } catch (err) {
      setError('Erreur lors du chargement des événements');
    }
  };

  const handleBooking = async (eventId) => {
    try {
      await events.book(eventId);
      setSuccessMessage('Réservation effectuée avec succès !');
      fetchEvents(); // Rafraîchir la liste pour mettre à jour remainingSeats
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la réservation');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Événements disponibles</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {successMessage}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventsList.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
              <p className="text-gray-600 mb-4">{event.description}</p>
              <div className="text-sm text-gray-500">
                <p>📍 {event.location}</p>
                <p>📅 {new Date(event.date).toLocaleDateString()}</p>
                <p>🪑 Places restantes : {event.remainingSeats}</p>
              </div>
              {user?.role === 'CLIENT' && event.remainingSeats > 0 && (
                <button
                  onClick={() => handleBooking(event.id)}
                  className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                >
                  Réserver
                </button>
              )}
              {event.remainingSeats === 0 && (
                <p className="mt-4 text-red-500 text-center font-semibold">
                  Complet
                </p>
              )}
              {!user && (
                <p className="mt-4 text-gray-500 text-center">
                  Connectez-vous pour réserver
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList; 