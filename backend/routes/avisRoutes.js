// routes/avisRoutes.js
const express = require('express');
const router = express.Router();
const avisController = require('../controllers/avisController');
const { verifierToken } = require('../middlewares/auth');

router.post('/', verifierToken, avisController.createAvis);
router.get('/vehicule/:id', avisController.getAvisByVehicule);

module.exports = router;