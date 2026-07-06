// Connexion à MySQL via Sequelize

// 1. On importe la classe Sequelize (le moule)
const { Sequelize } = require("sequelize");

// 2. On fabrique NOTRE connexion (l'objet) avec les infos du .env
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
    }
);

// 3. On exporte notre connexion
module.exports = sequelize;