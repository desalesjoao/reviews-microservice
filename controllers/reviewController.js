const Review = require('../models/reviewModel');

const adicionarReview = (req, res) => {
  const { pedido_id, usuario_id, nota, comentario } = req.body;

  if (!pedido_id || !usuario_id || !nota) {
    return res.status(400).json({ mensagem: 'pedido_id, usuario_id e nota são obrigatórios' });
  }

  const novaReview = { pedido_id, usuario_id, nota, comentario };

  Review.createReview(novaReview, (err, result) => {
    if (err) {
      console.error('Erro ao salvar review:', err);
      return res.status(500).json({ mensagem: 'Erro ao salvar review' });
    }
    res.status(201).json({ mensagem: 'Review salva com sucesso!', id: result.insertId });
  });
};

module.exports = { adicionarReview };
