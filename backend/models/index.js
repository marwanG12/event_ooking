const User = require('./User');
const Event = require('./Event');
const Booking = require('./Booking');

// Un User a plusieurs Booking
User.hasMany(Booking, {
    foreignKey: 'userId',
    as: 'bookings'
});

// Un Event a plusieurs Booking
Event.hasMany(Booking, {
    foreignKey: 'eventId',
    as: 'bookings'
});

// Un Booking appartient à un User
Booking.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
});

// Un Booking appartient à un Event
Booking.belongsTo(Event, {
    foreignKey: 'eventId',
    as: 'event'
});

module.exports = {
    User,
    Event,
    Booking
}; 