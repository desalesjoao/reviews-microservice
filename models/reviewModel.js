const db = require('../config/db');

const createReview = (review, callbacreviewsk) => {
  const query = 'INSERT INTO  (pedido_id, usuario_id, nota, comentario) VALUES (?, ?, ?, ?)';
  const values = [review.pedido_id, review.usuario_id, review.nota, review.comentario];

  db.query(query, values, (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

module.exports = { createReview };
