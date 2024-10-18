const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db-config/dbconfig');
const bcrypt = require('bcrypt');

const Doctor = sequelize.define('Doctor', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    specialization: {
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
    profilePhoto: {
        type: DataTypes.STRING,
    },
});

// Hash password before creating a doctor


module.exports = Doctor;
