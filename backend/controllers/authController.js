// controllers/authController.js - Inscription et connexion
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Utilisateur } = require('../models');

// POST /api/auth/inscription - créer un compte
exports.inscription = async (req, res) => {
  try {
    // On extrait les champs envoyés par le client
    const { nom, prenom, email, mot_de_passe, telephone } = req.body;

    // On vérifie qu'un compte n'existe pas déjà avec cet email
    const existe = await Utilisateur.findOne({ where: { email } });
    if (existe) {
      return res.status(409).json({ message: 'Un compte existe déjà avec cet email' });
    }

    //on relève l'empreinte du mot de passe
    const hash = await bcrypt.hash(mot_de_passe, 10);

    //on enregistre avec l'empreinte, jamais le mot de passe
    const utilisateur = await Utilisateur.create({
      nom,
      prenom,
      email,
      mot_de_passe: hash,
      telephone,
    });

    // On renvoie le compte créé, sans exposer le hash
    res.status(201).json({
      id: utilisateur.id,
      nom: utilisateur.nom,
      prenom: utilisateur.prenom,
      email: utilisateur.email,
      role: utilisateur.role,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// POST /api/auth/connexion - se connecter
exports.connexion = async (req, res) => {
  try {
    const { email, mot_de_passe } = req.body;

    // On cherche le compte par email
    const utilisateur = await Utilisateur.findOne({ where: { email } });
    if (!utilisateur) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    // on compare l'empreinte du mot de passe tapé avec celle stockée
    const motDePasseValide = await bcrypt.compare(mot_de_passe, utilisateur.mot_de_passe);
    if (!motDePasseValide) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    // on fabrique le bracelet (token), signé avec notre secret
    const token = jwt.sign(
      { id: utilisateur.id, role: utilisateur.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // On renvoie le token + les infos utiles au front
    res.json({
      token,
      utilisateur: {
        id: utilisateur.id,
        prenom: utilisateur.prenom,
        role: utilisateur.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};