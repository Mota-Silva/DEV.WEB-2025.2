const express = require('express');
const router = express.Router();
const salgadosController = require('../controllers/salgadosControllers');

router.get('/salgados', salgadosController.getAllSalgados);
router.get('/salgados/:id', salgadosController.getSalgadosById);
router.post('/salgados', salgadosController.createSalgados);
router.put('/salgados/:id', salgadosController.updateSalgados);
router.delete('/salgados/:id', salgadosController.deleteSalgados);

module.exports = router;