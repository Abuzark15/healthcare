const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db-config/dbconfig');

const Consultation = sequelize.define('Consultation', {
    patientId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Patients',
            key: 'id',
        },
    },
    doctorId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Doctors',
            key: 'id',
        },
    },
    status: {
        type: DataTypes.ENUM('Accepted', 'Confirmed', 'Completed'),
        defaultValue: 'Accepted',
    },
    imagePath: {
        type: DataTypes.STRING,
    },
});

module.exports = Consultation;
