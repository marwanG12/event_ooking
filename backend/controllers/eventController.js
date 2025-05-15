const { Event } = require('../models');

const getAllEvents = async (req, res) => {
    try {
        const events = await Event.findAll({
            order: [['date', 'ASC']]
        });
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des événements', error: error.message });
    }
};

const createEvent = async (req, res) => {
    try {
        const { title, description, location, date, capacity } = req.body;
        
        const event = await Event.create({
            title,
            description,
            location,
            date,
            capacity,
            remainingSeats: capacity
        });

        res.status(201).json({
            message: 'Événement créé avec succès',
            event
        });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de l\'événement', error: error.message });
    }
};

const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        
        const event = await Event.findByPk(id);
        if (!event) {
            return res.status(404).json({ message: 'Événement non trouvé' });
        }

        await event.destroy();
        res.json({ message: 'Événement supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de l\'événement', error: error.message });
    }
};

module.exports = {
    getAllEvents,
    createEvent,
    deleteEvent
}; 