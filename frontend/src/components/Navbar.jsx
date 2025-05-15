import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Réservation d'Événements
        </Link>
        <div className="flex gap-4">
          <Link to="/" className="hover:text-blue-200">
            Événements
          </Link>
          
          {!user ? (
            <>
              <Link to="/login" className="hover:text-blue-200">
                Connexion
              </Link>
              <Link to="/register" className="hover:text-blue-200">
                Inscription
              </Link>
            </>
          ) : (
            <>
              {user.role === 'ADMIN' && (
                <Link to="/admin" className="hover:text-blue-200">
                  Admin
                </Link>
              )}
              {user.role === 'CLIENT' && (
                <Link to="/bookings" className="hover:text-blue-200">
                  Mes Réservations
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="hover:text-blue-200"
              >
                Déconnexion
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 