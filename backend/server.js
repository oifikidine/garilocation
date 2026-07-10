// server.js Point d'entrée de l'API GariLocation

// 1.on importe les outils
require('dotenv').config();// charge les variables du fichier .env
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const connectMongo = require('./config/mongodb');
const { Utilisateur, Vehicule, Reservation } = require('./models');
const vehiculeRoutes = require('./routes/vehiculeRoutes');
const authRoutes = require('./routes/authRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const avisRoutes = require('./routes/avisRoutes');

// 2.On crée notre application
const app = express();

// 3.ON met en places nos Middlewares 
app.use(cors());      // autorise le front React à appeler l'API
app.use(express.json());    // permet de lire le JSON envoyé dans les requêtes

// Connexion aux bases de données
sequelize.authenticate()
  .then(() => console.log('MySQL connecté'))
  .catch((error) => console.error('Erreur MySQL :', error.message));

connectMongo();

// Synchronisation des modèles : Sequelize crée les tables si elles n'existent pas
sequelize.sync()
  .then(() => console.log('Tables synchronisées'))
  .catch((error) => console.error('Erreur sync :', error.message));


// 4. On écrit nos routes
app.use('/api/vehicules', vehiculeRoutes);

app.use('/api/auth', authRoutes);

app.use('/api/reservations', reservationRoutes);

app.use('/api/avis', avisRoutes);

// Route de test 
app.get('/', (req, res) => {
    res.json({ message: 'API GARILocation en ligne'});
}) ;


// 5.Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});