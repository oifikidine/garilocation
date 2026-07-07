// middlewares/auth.js - Les vigiles de l'API
const jwt = require('jsonwebtoken');

// Vigile 1 : vérifie que la personne est connectée (bracelet valide)
exports.verifierToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'Token manquant, connectez-vous' });
    }

    // on enlève le mot "Bearer" pour garder juste le token
    const token = authHeader.split(' ')[1];

    // contrôle de la signature
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    req.utilisateur = decode;   // on garde { id, role } pour la suite
    next();                     // ok, passe au contrôleur
  } catch (error) {
    res.status(401).json({ message: 'Token invalide ou expiré' });
  }
};

// Vigile 2 : vérifie que c'est un admin
exports.verifierAdmin = (req, res, next) => {
  if (req.utilisateur.role !== 'admin') {
    return res.status(403).json({ message: 'Accès réservé à l\'administrateur' });
  }
  next();
};