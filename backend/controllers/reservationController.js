// controllers/reservationController.js - Logique des réservations
const { Op } = require('sequelize');
const { Reservation, Vehicule, Utilisateur } = require('../models');

// POST /api/reservations - créer une réservation (client connecté)
exports.createReservation = async (req, res) => {
  try {
    const { vehicule_id, date_debut, date_fin } = req.body;
    const utilisateur_id = req.utilisateur.id; // fourni par le token, pas par le client !

    // 1. Vérifications de base
    if (!vehicule_id || !date_debut || !date_fin) {
      return res.status(400).json({ message: 'Véhicule et dates obligatoires' });
    }
    if (new Date(date_debut) > new Date(date_fin)) {
      return res.status(400).json({ message: 'La date de début doit être avant la date de fin' });
    }
    if (new Date(date_debut) < new Date().setHours(0, 0, 0, 0)) {
      return res.status(400).json({ message: 'Impossible de réserver dans le passé' });
    }

    // 2. Le véhicule existe-t-il et est-il au catalogue ?
    const vehicule = await Vehicule.findByPk(vehicule_id);
    if (!vehicule || !vehicule.disponible) {
      return res.status(404).json({ message: 'Véhicule indisponible' });
    }

    // 3. COMPOSANT MÉTIER : vérification de chevauchement de dates
    // Deux périodes se chevauchent si : debut_existant <= fin_demandee ET fin_existant >= debut_demande
    const conflit = await Reservation.findOne({
      where: {
        vehicule_id,
        statut: { [Op.ne]: 'annulee' },          // on ignore les réservations annulées
        date_debut: { [Op.lte]: date_fin },       // lte = "inférieur ou égal"
        date_fin: { [Op.gte]: date_debut },       // gte = "supérieur ou égal"
      },
    });
    if (conflit) {
      return res.status(409).json({ message: 'Ce véhicule est déjà réservé sur ces dates' });
    }

    // 4. Calcul du prix total : nombre de jours x prix par jour
    const nbJours = Math.ceil((new Date(date_fin) - new Date(date_debut)) / (1000 * 60 * 60 * 24)) + 1;
    const prix_total = nbJours * vehicule.prix_jour;

    // 5. Création
    const reservation = await Reservation.create({
      utilisateur_id,
      vehicule_id,
      date_debut,
      date_fin,
      prix_total,
    });

    res.status(201).json(reservation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET /api/reservations/mes-reservations - les réservations du client connecté
exports.getMesReservations = async (req, res) => {
  try {
    const reservations = await Reservation.findAll({
      where: { utilisateur_id: req.utilisateur.id },
      include: [{ model: Vehicule, attributes: ['marque', 'modele', 'image_url'] }],
      order: [['date_debut', 'DESC']],
    });
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/reservations - TOUTES les réservations (admin)
exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.findAll({
      include: [
        { model: Vehicule, attributes: ['marque', 'modele'] },
        { model: Utilisateur, attributes: ['nom', 'prenom', 'email', 'telephone'] },
      ],
      order: [['createdAt', 'DESC']],
    });
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/reservations/:id/statut - changer le statut (admin) : confirmer ou annuler
exports.updateStatut = async (req, res) => {
  try {
    const reservation = await Reservation.findByPk(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: 'Réservation introuvable' });
    }
    const { statut } = req.body;
    if (!['en_attente', 'confirmee', 'annulee'].includes(statut)) {
      return res.status(400).json({ message: 'Statut invalide' });
    }
    await reservation.update({ statut });
    res.json(reservation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};