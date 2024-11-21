const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db-config/dbconfig');
const Patient = require('./Patient'); // Make sure the path is correct
const Doctor = require('./Doctor'); // If applicable

const Consultation = sequelize.define('Consultation', {
    patientId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Patients', // Make sure this matches your table name in the database
            key: 'id',
        },
    },
    doctorId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Doctors', // Make sure this matches your table name in the database
            key: 'id',
        },
    },
    status: {
        type: DataTypes.ENUM('Pending','Accepted','Rejected', 'Completed'),
        defaultValue: 'Pending',
    },
    imagePath: {
        type: DataTypes.STRING,
    },
    timeSlot: {
        type: DataTypes.STRING,
       
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
});

// Define associations after the model is defined
Consultation.belongsTo(Patient, {
    foreignKey: 'patientId',
    targetKey: 'id',
});
Consultation.belongsTo(Doctor, {
    foreignKey : 'doctorId',
    targetKey: 'id',
});


module.exports = Consultation;
