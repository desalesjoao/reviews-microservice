const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Avaliar pedido
router.post('/api/reviews', (req, res) => {
  const { pedido_id, usuario_id, nota, comentario } = req.body;

  const sql = `
    INSERT INTO reviews (pedido_id, usuario_id, nota, comentario)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [pedido_id, usuario_id, nota, comentario], (err, result) => {
    if (err) {
      console.error('Erro ao inserir avaliação:', err);
      return res.status(500).json({ error: 'Erro ao inserir avaliação.' });
    }
    res.json({ message: 'Avaliação registrada com sucesso!' });
  });
});

// Histórico de avaliações do cliente
router.get('/api/reviews/:usuario_id', (req, res) => {
  const { usuario_id } = req.params;

  const sql = `
    SELECT * FROM reviews 
    WHERE usuario_id = ?
    ORDER BY data_avaliacao DESC
  `;

  db.query(sql, [usuario_id], (err, results) => {
    if (err) {
      console.error('Erro ao buscar avaliações:', err);
      return res.status(500).json({ error: 'Erro ao buscar avaliações.' });
    }

    res.json(results);
  });
});

module.exports = router;
