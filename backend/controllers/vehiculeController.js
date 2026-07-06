// controllers/vehiculeController.js - La logique des véhicules
const { Vehicule } = require('../models');

// GET /api/vehicules - renvoie tous les véhicules
exports.getAllVehicules = async (req, res) => {
  try {
    //demander tous les véhicules au modèle, puis renvoie-les en JSON
    const vehicule = await Vehicule.findAll();
    res.json(vehicule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/vehicules/:id - renvoie UN véhicule par son id
exports.getVehiculeById = async (req, res) => {
  try {
    //chercher le véhicule dont l'id est dans l'URL
    const vehicule = await Vehicule.findByPk(req.params.id);
    if (!vehicule) {
      return res.status(404).json({ message: 'Véhicule introuvable' });
    }
    res.json(vehicule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/vehicules - crée un nouveau véhicule
exports.createVehicule = async (req, res) => {
  try {
    // on crée le véhicule avec les données reçues dans le corps de la requête
    const nouveauVehicule = await Vehicule.create(req.body);
    res.status(201).json(nouveauVehicule);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// PUT /api/vehicules/:id - modifie un véhicule existant
exports.updateVehicule = async (req, res) => {
  try {
    // On cherche d'abord le véhicule (même logique que getVehiculeById)
    const vehicule = await Vehicule.findByPk(req.params.id);
    if (!vehicule) {
      return res.status(404).json({ message: 'Véhicule introuvable' });
    }
    // On met à jour uniquement les champs envoyés dans req.body
    await vehicule.update(req.body);
    res.json(vehicule);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE /api/vehicules/:id - supprime un véhicule
exports.deleteVehicule = async (req, res) => {
  try {
    const vehicule = await Vehicule.findByPk(req.params.id);
    if (!vehicule) {
      return res.status(404).json({ message: 'Véhicule introuvable' });
    }
    await vehicule.destroy();
    res.json({ message: 'Véhicule supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};