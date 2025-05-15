require('dotenv').config();
const { User, Event } = require('../models');
const sequelize = require('../config/database');
const bcrypt = require('bcrypt');

const seed = async () => {
    try {
        await sequelize.sync({ force: true });

        const admin = await User.create({
            name: 'Admin',
            email: 'admin@example.com',
            password: 'admin123',
            role: 'ADMIN'
        });

        const client = await User.create({
            name: 'Client Test',
            email: 'client@example.com',
            password: 'client123',
            role: 'CLIENT'
        });

        const events = await Event.bulkCreate([
            {
                title: 'Concert de Jazz',
                description: 'Une soirée jazz exceptionnelle avec les meilleurs artistes',
                location: 'Salle de Concert Paris',
                date: new Date('2024-06-15'),
                capacity: 100,
                remainingSeats: 100
            },
            {
                title: 'Festival de Rock',
                description: 'Un weekend de rock avec des groupes légendaires',
                location: 'Stade de France',
                date: new Date('2024-07-20'),
                capacity: 200,
                remainingSeats: 200
            }
        ]);

        console.log('Base de données initialisée avec succès !');
        process.exit(0);
    } catch (error) {
        console.error('Erreur lors de l\'initialisation:', error);
        process.exit(1);
    }
};

seed(); 