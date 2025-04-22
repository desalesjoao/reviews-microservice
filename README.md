
# 🧾 Reviews Microservice Versão 1.0 - Delivery System

Este é um microsserviço responsável por gerenciar **avaliações de pedidos** dentro de um sistema de delivery. Ele permite que os usuários (clientes) avaliem os pedidos após finalizados, e possibilita a visualização do histórico de reviews.

---

## ✅ Funcionalidades

- Login de usuários
- Avaliação de pedidos com nota e comentário
- Visualização do histórico de avaliações
- Associação das avaliações ao restaurante correspondente

---

## 🛠 Tecnologias Utilizadas

- **Node.js** + **Express.js**
- **MySQL** (hospedado no Railway)
- **Cors** e **dotenv** para segurança e configuração
- **HTML, CSS e JavaScript** no frontend (pasta `/public`)

---

## 📁 Estrutura do Projeto

```
REVIEW-MICROSERVICE/
├── config/          # Conexão com o banco de dados
│   └── db.js
├── controllers/     # Funções que controlam a lógica de cada rota
├── models/          # Modelos de dados
├── routes/          # Arquivos de rotas
├── public/          # Frontend estático
├── .env             # Configurações do banco
├── index.js         # Arquivo principal
└── package.json
```

---

## ⚙️ Instalação e Execução

```bash
# 1. Clonar o repositório
git clone https://github.com/seu-usuario/review-microservice.git

# 2. Acessar a pasta
cd reviews-microservice

# 3. Instalar dependências
npm install

# 4. Criar um arquivo .env com as credenciais do banco
DB_HOST=shortline.proxy.rlwy.net
DB_PORT=25800
DB_USER=root
DB_PASSWORD=BIzjLvSMkBWyAyffjXWkXVTOcygvPCde
DB_NAME=railway

# 5. Iniciar o servidor
node index.js
```

---

## 🧪 Exemplos de Requisições

### 🔐 Login

**POST** `/login`
```json
{
  "email": "cliente@email.com",
  "senha": "123456"
}
```

### 📦 Criar Pedido

**POST** `/api/pedidos`
```json
{
  "usuario_id": 1,
  "restaurante_id": 2
}
```

### ⭐ Avaliar Pedido

**POST** `/api/reviews`
```json
{
  "pedido_id": 10,
  "usuario_id": 1,
  "nota": 5,
  "comentario": "Comida excelente!",
  "restaurante_id": 2
}
```

### 📜 Ver Histórico de Avaliações

**GET** `/api/reviews/usuario/:id`

---

## 🧠 Observações

- O frontend simples para avaliação está na pasta `public/`
- Os dados do usuário logado são armazenados com `sessionStorage`
- Os pedidos avaliados aparecem em **verde** e são movidos para o final da lista
- O sistema **não permite avaliação duplicada** para o mesmo pedido

---
# reviews_microservice
