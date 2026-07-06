// Connexion à MongoDB via Mongoose

// On importe mongoose
const mongoose = require('mongoose');


// On crée la connexion
const connectMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connecté');
    } catch (error) {
        console.error('Erreur MongoDB :', error.message);
    }
    
};

// On exporte mongoose
module.exports = connectMongo;