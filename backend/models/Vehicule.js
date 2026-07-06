// Le modèle de la table vehicules

// 1. On importe les outils et notre connexion
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// 2. On définit le modèle : chaque champ = une colonne de mon schéma
const Vehicule = sequelize.define('Vehicule', {
  marque: {
    type: DataTypes.STRING,      // STRING = VARCHAR
    allowNull: false,            // obligatoire
  },
  modele: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  annee: {
    type: DataTypes.INTEGER,
  },
  prix_jour: {
    type: DataTypes.DECIMAL(10, 2),  // 10 chiffres max, 2 après la virgule
    allowNull: false,
  },
  nb_places: {
    type: DataTypes.INTEGER,
  },
  carburant: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.TEXT,        // TEXT = texte long
  },
  image_url: {
    type: DataTypes.STRING,
  },
  disponible: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,          // un nouveau véhicule est disponible par défaut
  },
}, {
  tableName: 'vehicules',        // nom exact de la table dans MySQL
});

module.exports = Vehicule;