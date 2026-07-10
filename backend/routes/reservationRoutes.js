// routes/reservationRoutes.js
const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const { verifierToken, verifierAdmin } = require('../middlewares/auth');

router.post('/', verifierToken, reservationController.createReservation);
router.get('/mes-reservations', verifierToken, reservationController.getMesReservations);
router.get('/', verifierToken, verifierAdmin, reservationController.getAllReservations);
router.put('/:id/statut', verifierToken, verifierAdmin, reservationController.updateStatut);

module.exports = router;