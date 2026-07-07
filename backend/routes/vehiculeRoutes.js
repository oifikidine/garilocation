// routes/vehiculeRoutes.js - Les adresses de l'API véhicules
const express = require('express');
const router = express.Router();
const vehiculeController = require('../controllers/vehiculeController');
const { verifierToken, verifierAdmin } = require('../middlewares/auth');

router.get('/', vehiculeController.getAllVehicules);      // GET /api/vehicules
router.get('/:id', vehiculeController.getVehiculeById);   // GET /api/vehicules/:id
router.post('/', verifierToken, verifierAdmin, vehiculeController.createVehicule);
router.put('/:id', verifierToken, verifierAdmin, vehiculeController.updateVehicule);
router.delete('/:id', verifierToken, verifierAdmin, vehiculeController.deleteVehicule);

module.exports = router;