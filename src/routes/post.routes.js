const express = require('express');
const Post = require('../models/post.model.js');

const router = express.Router();

router.get('/', async (req, res) => {
  const { q } = req.query;
  const filter = q ? { $or: [
    { title: new RegExp(q, 'i') },
    { content: new RegExp(q, 'i') }
  ] } : {};
  const posts = await Post.find(filter);
  res.json(posts);
});

router.get('/search', async (req, res) => {
  const term = req.query.term;
  const posts = await Post.find({
    $or: [
      { title: { $regex: term, $options: 'i' } },
      { content: { $regex: term, $options: 'i' } }
    ]
  });
  res.json(posts);
});

router.get('/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).send('Post não encontrado');
  res.json(post);
});

router.post('/', async (req, res) => {
  const { title, content, author } = req.body;
  const post = new Post({ title, content, author });
  await post.save();
  res.status(201).json(post);
});

router.put('/:id', async (req, res) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!post) return res.status(404).send('Post não encontrado');
  res.json(post);
});

router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).send('Post não encontrado');
    res.status(204).send(); // Status 204 é mais adequado para DELETE
  } catch (err) {
    console.error('Erro ao deletar post:', err);
    res.status(500).send('Erro interno do servidor');
  }
});

module.exports = router;