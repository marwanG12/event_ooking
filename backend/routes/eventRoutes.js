const express = require('express');
const router = express.Router();
const { getAllEvents, createEvent, deleteEvent } = require('../controllers/eventController');
const { authenticateJWT, checkRole } = require('../middleware/auth');

router.get('/', getAllEvents);
router.post('/', authenticateJWT, checkRole('ADMIN'), createEvent);
router.delete('/:id', authenticateJWT, checkRole('ADMIN'), deleteEvent);

module.exports = router; 