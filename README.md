# Blog - API

API RESTful para gerenciamento de postagens de um blog acadêmico, desenvolvida com Node.js, Express e MongoDB. Suporta criação, listagem, edição, remoção e busca de postagens.

---

## 🚀 Tecnologias Utilizadas

- Node.js
- Express.js
- MongoDB + Mongoose
- Docker
- ReDoc (documentação da API)
- GitHub Actions (CI/CD)
- Jest / Supertest (testes automatizados)

---

## 📁 Estrutura do Projeto

```
projeto/
├── src/
│   ├── controllers/        # Controladores das rotas
│   ├── middlewares/        # Funções intermediárias (ex: logger)
│   ├── models/             # Modelos do MongoDB (Schemas)
│   ├── routes/             # Arquivos de rotas (endpoints)
│   ├── services/           # Regras de negócio
│   ├── tests/              # Testes automatizados
│   ├── app.js              # Configura o app (rotas, middlewares, docs)
│   └── server.js           # Sobe o servidor e conecta ao banco
├── .env                    # Variáveis de ambiente
├── Dockerfile              # Containerização da aplicação
├── docker-compose.yml      # Orquestra o app e o MongoDB
├── package.json            # Dependências e scripts
└── .github/workflows       # CI/CD com GitHub Actions
```

---

## 🔧 Como Rodar o Projeto Localmente

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/blog-api.git
cd blog-api
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Criar arquivo `.env`

```env
PORT=3000
MONGO_URI=mongodb+srv://<usuario>:<senha>@cluster.mongodb.net/blog
```

### 4. Subir o projeto

```bash
npm start
```

A aplicação ficará acessível em `http://localhost:3000`

---

## 📖 Documentação da API


### ReDoc

Disponível em: [http://localhost:3020/api-docs](http://localhost:3020/api-docs)

---

## 💡 Exemplos de Endpoints

- `GET /posts` - Lista todos os posts
- `GET /posts/:id` - Detalha um post
- `POST /posts` - Cria um novo post
- `PUT /posts/:id` - Atualiza um post existente
- `DELETE /posts/:id` - Remove um post

---

## ✅ Testes Automatizados

```bash
npm test
```

Inclui testes com Jest e Supertest para garantir o funcionamento da API.

---

## 🛠️ CI/CD

O deploy e os testes automatizados são realizados via GitHub Actions, definidos em `.github/workflows/main.yaml`.

---

## 🏠 Deploy (Render)

O projeto pode ser facilmente publicado no [Render](https://render.com/) com:

- Dockerfile e docker-compose prontos
- MongoDB Atlas como banco remoto

---

## 🙌 Contribuições

Contribuições são bem-vindas! Sinta-se livre para abrir issues ou pull requests.

---

> Projeto acadêmico criado para fins de aprendizagem e demonstração de boas práticas em desenvolvimento de APIs REST.

