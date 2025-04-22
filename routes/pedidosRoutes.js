const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Rota para obter os pedidos finalizados de um cliente com status de avaliação
router.get('/pedidos-cliente/:id', (req, res) => {
  const usuarioId = req.params.id;

  const sql = `
    SELECT p.id, p.data_pedido, p.status,
      EXISTS (
        SELECT 1 FROM reviews r WHERE r.pedido_id = p.id
      ) AS avaliado
    FROM pedidos p
    WHERE p.cliente_id = ? AND p.status = 'finalizado'
    ORDER BY p.data_pedido DESC
  `;

  db.query(sql, [usuarioId], (err, results) => {
    if (err) {
      console.error('Erro ao buscar pedidos do cliente:', err);
      return res.status(500).json({ erro: 'Erro ao buscar pedidos.' });
    }

    // Transformar 0/1 do banco em booleano
    const pedidos = results.map(p => ({
      ...p,
      avaliado: Boolean(p.avaliado)
    }));

    res.json(pedidos);
  });
});

module.exports = router;
