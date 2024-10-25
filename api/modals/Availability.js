const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db-config/dbconfig');

const Availability = sequelize.define('Availability', {
    doctorId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Doctors',
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

module.exports = Availability;
