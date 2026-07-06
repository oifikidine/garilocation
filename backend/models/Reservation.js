// models/Reservation.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Reservation = sequelize.define('Reservation', {
  date_debut: {
    type: DataTypes.DATEONLY,   // DATEONLY = juste la date, sans l'heure
    allowNull: false,
  },
  date_fin: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  prix_total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  statut: {
    type: DataTypes.STRING,
    defaultValue: 'en_attente',  // une nouvelle réservation attend la validation
  },
}, {
  tableName: 'reservations',
});

module.exports = Reservation;