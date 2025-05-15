const express = require('express');
const router = express.Router();
const { createBooking, getUserBookings, cancelBooking } = require('../controllers/bookingController');
const { authenticateJWT, checkRole } = require('../middleware/auth');

router.post('/', authenticateJWT, checkRole('CLIENT'), createBooking);
router.get('/my-bookings', authenticateJWT, getUserBookings);
router.delete('/:id', authenticateJWT, checkRole('CLIENT'), cancelBooking);

module.exports = router; 