const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db-config/dbconfig');
const bcrypt = require('bcrypt');

const Patient = sequelize.define('Patient', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

// Hash password before creating a patient


module.exports = Patient;
