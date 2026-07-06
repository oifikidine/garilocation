// routes/vehiculeRoutes.js - Les adresses de l'API véhicules
const express = require('express');
const router = express.Router();
const vehiculeController = require('../controllers/vehiculeController');

router.get('/', vehiculeController.getAllVehicules);      // GET /api/vehicules
router.get('/:id', vehiculeController.getVehiculeById);   // GET /api/vehicules/:id
router.post('/', vehiculeController.createVehicule);     // POST /api/vehicules
router.put('/:id', vehiculeController.updateVehicule);      // PUT /api/vehicules/:id
router.delete('/:id', vehiculeController.deleteVehicule);   // DELETE /api/vehicules/:id

module.exports = router;