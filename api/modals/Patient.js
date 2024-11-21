const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db-config/dbconfig');

const Patient = sequelize.define('Patient', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role:{
        type: DataTypes.STRING,
        defaultValue : "patient"
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});


module.exports = Patient;
