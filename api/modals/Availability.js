// models/Availability.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db-config/dbconfig');

// Availability model definition
const Availability = sequelize.define('Availability', {
    doctorId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Doctors', // reference the Doctor table
            key: 'id',
        },
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    startTime: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    endTime: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

// Import Doctor and TimeSlot models after defining Availability model
//const Doctor = require('./Doctor');
//const TimeSlot = require('./TimeSlot');

// Define associations
//Availability.belongsTo(Doctor, { foreignKey: 'doctorId' }); // An availability belongs to one doctor
//Availability.hasMany(TimeSlot, { foreignKey: 'availabilityId' }); // An availability can have many time slots

module.exports = Availability;

