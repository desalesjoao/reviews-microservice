const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Rota de login
router.post('/login', (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: 'Dados incompletos.' });
  }

  const sql = `SELECT id, nome, email FROM usuarios WHERE email = ? AND senha = ?`;

  db.query(sql, [email, senha], (err, results) => {
    if (err) {
      console.error('Erro na consulta:', err);
      return res.status(500).json({ error: 'Erro no servidor' });
    }

    if (results.length > 0) {
      const usuario = results[0];
      return res.json(usuario);
    } else {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
  });
});

module.exports = router;
