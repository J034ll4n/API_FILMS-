const express = require('express');
const router = express.Router();
const controller = require('../controllers/filmeController');

router.get('/v1/controle-filmes/filme', controller.listarTodos);
router.get('/v1/controle-filmes/filme/:id', controller.buscarPorId);
router.get('/v1/controle-filmes/filtro/filme', controller.filtrarPorNome);
router.post('/v1/controle-filmes/filme', controller.inserirFilme);
router.put('/v1/controle-filmes/filme/:id', controller.atualizarFilme);
router.delete('/v1/controle-filmes/filme/:id', controller.deletarFilme);

module.exports = router;
