// models/Doctor.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db-config/dbconfig');

// Doctor model definition
const Doctor = sequelize.define('Doctor', {
    name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    specialization: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    profilePhoto: {
        type: DataTypes.STRING,
    },
    verificationToken: {
        type: DataTypes.STRING,
    },
    verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'doctor',
    },
});

// Import Availability and TimeSlot models after defining Doctor model
const Availability = require('./Availability');


// Define associations
Doctor.hasMany(Availability, { foreignKey: 'doctorId' }); // A doctor can have many availabilities

module.exports = Doctor;
