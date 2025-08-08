jest.setTimeout(20000); // 20 segundos para todos os testes deste arquivo

//const Post = require('../models/post.model');
const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

require('dotenv').config(); // Isso carrega o .env padrão

let db;
let TestPost;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 20000,
    socketTimeoutMS: 20000,
  });

  db = mongoose.connection.useDb('blog-api-test');
  TestPost = db.model('Post', require('../models/post.model').schema); // Usa o schema

  await TestPost.deleteMany({});
});


describe('GET /posts', () => {
  it('deve retornar 200', async () => {
    const res = await request(app).get('/posts');
    expect(res.statusCode).toBe(200);
  });
});

describe('Posts API', () => {
  it('GET /posts deve retornar lista vazia inicialmente', async () => {
    const res = await request(app).get('/posts');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('POST /posts deve criar um novo post', async () => {
    const newTestPost = {
      title: 'Teste',
      content: 'Conteúdo do teste',
      author: 'Autor Teste'
    };

    const res = await request(app)
      .post('/posts')
      .send(newTestPost);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.title).toBe(newTestPost.title);
  });

  it('GET /posts/:id deve retornar um post existente', async () => {
    const post = new TestPost({
      title: 'Post para teste',
      content: 'Conteúdo',
      author: 'Autor'
    });
    await post.save();

    const res = await request(app).get(`/posts/${post._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe(post.title);
  });

  it('PUT /posts/:id deve atualizar um post existente', async () => {
    const post = new TestPost({
      title: 'Post antigo',
      content: 'Conteúdo antigo',
      author: 'Autor'
    });
    await post.save();

    const updateData = {
      title: 'Post atualizado',
      content: 'Conteúdo atualizado',
      author: 'Autor atualizado'
    };

    const res = await request(app)
      .put(`/posts/${post._id}`)
      .send(updateData);

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe(updateData.title);
  });

  it('DELETE /posts/:id deve deletar um post', async () => {
    const post = new TestPost({
      title: 'Post para deletar',
      content: 'Conteúdo',
      author: 'Autor'
    });
    await post.save();

    const res = await request(app).delete(`/posts/${post._id}`);
    expect(res.statusCode).toBe(204);

    // Verifica se foi deletado
    const found = await TestPost.findById(post._id);
    expect(found).toBeNull();
  });

  it('GET /posts/search?term=teste deve retornar posts com termo', async () => {
    const posts = [
      { title: 'Teste 1', content: 'Conteúdo 1', author: 'Autor1' },
      { title: 'Outro post', content: 'Conteúdo teste', author: 'Autor2' },
      { title: 'Sem relação', content: 'Nada aqui', author: 'Autor3' },
    ];
    await TestPost.insertMany(posts);

    const res = await request(app).get('/posts/search').query({ term: 'teste' });

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
    expect(res.body[0].title.toLowerCase()).toContain('teste');
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
