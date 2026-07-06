// server.js Point d'entrée de l'API GariLocation

// 1.on importe les outils
require('dotenv').config();// charge les variables du fichier .env
const express = require('express');
const cors = require('cors');

// 2.On crée notre application
const app = express();

// 3.ON met en places nos Middlewares 
app.use(cors());      // autorise le front React à appeler l'API
app.use(express.json());    // permet de lire le JSON envoyé dans les requêtes


// 4. On écrit nos routes

// Route de test 
app.get('/', (req, res) => {
    res.json({ message: 'API GARILocation en ligne'});
}) ;


// 5.Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});