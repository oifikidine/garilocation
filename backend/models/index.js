// models/index.js - Assemblage des modèles et déclaration des relations
const Utilisateur = require('./Utilisateur');
const Vehicule = require('./Vehicule');
const Reservation = require('./Reservation');

// Un utilisateur A PLUSIEURS réservations (ta flèche 1 -> n)
Utilisateur.hasMany(Reservation, { foreignKey: 'utilisateur_id' });
// Une réservation APPARTIENT À un utilisateur
Reservation.belongsTo(Utilisateur, { foreignKey: 'utilisateur_id' });

// Un véhicule A PLUSIEURS réservations (ta 2ème flèche 1 -> n)
Vehicule.hasMany(Reservation, { foreignKey: 'vehicule_id' });
// Une réservation APPARTIENT À un véhicule
Reservation.belongsTo(Vehicule, { foreignKey: 'vehicule_id' });

module.exports = { Utilisateur, Vehicule, Reservation };