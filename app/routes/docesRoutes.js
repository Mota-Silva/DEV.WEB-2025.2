const express = require('express');
const router = express.Router();
const docesController = require('../controllers/docesControllers');

router.get('/doces', docesController.getAllDoces);
router.get('/doces/:id', docesController.getDocesById);
router.post('/doces', docesController.createDoces);
router.put('/doces/:id', docesController.updateDoces);
router.delete('/doces/:id', docesController.deleteDoces);

module.exports = router;