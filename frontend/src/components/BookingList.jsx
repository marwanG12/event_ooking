import React, { useState, useEffect } from 'react';
import { bookings } from '../services/api';

const BookingList = () => {
  const [bookingsList, setBookingsList] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await bookings.getUserBookings();
      setBookingsList(response.data);
    } catch (err) {
      setError('Erreur lors du chargement des réservations');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Mes Réservations</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {bookingsList.length === 0 ? (
        <p className="text-gray-500 text-center">Vous n'avez pas encore de réservations.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookingsList.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  {booking.event.title}
                </h3>
                <div className="text-sm text-gray-500">
                  <p>📍 {booking.event.location}</p>
                  <p>📅 {new Date(booking.event.date).toLocaleDateString()}</p>
                  <p className="mt-2 text-xs text-gray-400">
                    Réservé le : {new Date(booking.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingList; 