// index.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./config/db');
const app = express();
const port = 3006;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Suas rotas
const authRoutes = require('./routes/authRoutes');
const clientesRoutes = require('./routes/clientesRoutes');
const pedidosRoutes = require('./routes/pedidosRoutes');

app.use(authRoutes);
app.use(clientesRoutes);
app.use(pedidosRoutes);

app.get('/', (req, res) => {
  res.send('Servidor de avaliações rodando com sucesso!');
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
