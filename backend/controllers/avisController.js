// controllers/avisController.js - Avis clients (MongoDB)
const Avis = require('../models/Avis');
const { Utilisateur } = require('../models');

// POST /api/avis - déposer un avis (client connecté)
exports.createAvis = async (req, res) => {
  try {
    const { vehicule_id, note, commentaire } = req.body;
    if (!vehicule_id || !note) {
      return res.status(400).json({ message: 'Véhicule et note obligatoires' });
    }

    // On récupère le prénom du client pour l'affichage
    const utilisateur = await Utilisateur.findByPk(req.utilisateur.id);

    const avis = await Avis.create({
      vehicule_id,
      utilisateur_id: req.utilisateur.id,
      nom_affichage: utilisateur.prenom,
      note,
      commentaire,
    });

    res.status(201).json(avis);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET /api/avis/vehicule/:id - tous les avis d'un véhicule (public)
exports.getAvisByVehicule = async (req, res) => {
  try {
    const avis = await Avis.find({ vehicule_id: req.params.id }).sort({ createdAt: -1 });
    res.json(avis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};