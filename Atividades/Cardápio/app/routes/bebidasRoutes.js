const express = require('express');
const router = express.Router();
const bebidasController = require('../controllers/bebidasControllers');

router.get('/bebidas', bebidasController.getAllBebidas);
router.get('/bebidas/:id', bebidasController.getBebidasById);
router.post('/bebidas', bebidasController.createBebidas);
router.put('/bebidas/:id', bebidasController.updateBebidas);
router.delete('/bebidas/:id', bebidasController.deleteBebidas);

module.exports = router;