// models/Utilisateur.js - Le modèle de la table utilisateurs
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Utilisateur = sequelize.define('Utilisateur', {
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prenom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,              // deux comptes ne peuvent pas partager un email
  },
  mot_de_passe: {
    type: DataTypes.STRING,    // contiendra le HASH bcrypt, jamais le mot de passe en clair
    allowNull: false,
  },
  telephone: {
    type: DataTypes.STRING,    // STRING et pas INTEGER : le 0 initial + on ne calcule pas dessus
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'client',    // sécurité : personne ne s'auto-déclare admin à l'inscription
  },
}, {
  tableName: 'utilisateurs',
});

module.exports = Utilisateur;