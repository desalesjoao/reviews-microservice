// bd.js
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'shortline.proxy.rlwy.net',
  port: 25800,
  user: 'root',
  password: 'BIzjLvSMkBWyAyffjXWkXVTOcygvPCde',
  database: 'railway',
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar no MySQL:', err.message);
  } else {
    console.log('Conectado ao banco de dados com sucesso!');
  }
});

module.exports = db;
