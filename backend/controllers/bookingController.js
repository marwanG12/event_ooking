const { Booking, Event, User } = require('../models');
const sequelize = require('../config/database');

const createBooking = async (req, res) => {
    const t = await sequelize.transaction();

    try {
        const { eventId } = req.body;
        const userId = req.user.id;

        const event = await Event.findByPk(eventId, { transaction: t });
        
        if (!event) {
            await t.rollback();
            return res.status(404).json({ message: 'Événement non trouvé' });
        }

        if (event.remainingSeats <= 0) {
            await t.rollback();
            return res.status(400).json({ message: 'Plus de places disponibles' });
        }

        // Vérifier si l'utilisateur n'a pas déjà réservé
        const existingBooking = await Booking.findOne({
            where: { userId, eventId },
            transaction: t
        });

        if (existingBooking) {
            await t.rollback();
            return res.status(400).json({ message: 'Vous avez déjà réservé pour cet événement' });
        }

        // Créer la réservation
        const booking = await Booking.create({
            userId,
            eventId
        }, { transaction: t });

        // Mettre à jour le nombre de places restantes
        await event.update({
            remainingSeats: event.remainingSeats - 1
        }, { transaction: t });

        await t.commit();

        res.status(201).json({
            message: 'Réservation effectuée avec succès',
            booking
        });
    } catch (error) {
        await t.rollback();
        res.status(500).json({ message: 'Erreur lors de la réservation', error: error.message });
    }
};

const getUserBookings = async (req, res) => {
    try {
        const userId = req.user.id;

        const bookings = await Booking.findAll({
            where: { userId },
            include: [{
                model: Event,
                as: 'event'
            }],
            order: [[{ model: Event, as: 'event' }, 'date', 'ASC']]
        });

        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des réservations', error: error.message });
    }
};

const cancelBooking = async (req, res) => {
    const t = await sequelize.transaction();

    try {
        const { id } = req.params;
        const userId = req.user.id;

        // Vérifier si la réservation existe et appartient à l'utilisateur
        const booking = await Booking.findOne({
            where: { id, userId },
            transaction: t
        });

        if (!booking) {
            await t.rollback();
            return res.status(404).json({ message: 'Réservation non trouvée' });
        }

        // Récupérer l'événement correspondant pour mettre à jour le nombre de places
        const event = await Event.findByPk(booking.eventId, { transaction: t });
        
        if (!event) {
            await t.rollback();
            return res.status(404).json({ message: 'Événement non trouvé' });
        }

        // Supprimer la réservation
        await booking.destroy({ transaction: t });

        // Mettre à jour le nombre de places restantes
        await event.update({
            remainingSeats: event.remainingSeats + 1
        }, { transaction: t });

        await t.commit();

        res.json({ message: 'Réservation annulée avec succès' });
    } catch (error) {
        await t.rollback();
        res.status(500).json({ message: 'Erreur lors de l\'annulation de la réservation', error: error.message });
    }
};

module.exports = {
    createBooking,
    getUserBookings,
    cancelBooking
}; 