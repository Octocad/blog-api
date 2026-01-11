const express = require('express');
const mongoose = require('mongoose');
const Post = require('../models/post.model.js');

const router = express.Router();

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

router.get('/', asyncHandler(async (req, res) => {
  const rawQ = req.query.q ?? req.query.term;
  if (!rawQ) {
    const posts = await Post.find({});
    return res.json(posts);
  }
  const q = String(rawQ);
  const filter = { $or: [
    { title: new RegExp(q, 'i') },
    { content: new RegExp(q, 'i') }
  ] };
  const posts = await Post.find(filter);
  res.json(posts);
}));

router.get('/search', asyncHandler(async (req, res) => {
  const term = req.query.term ?? req.query.q;
  if (!term) return res.json([]);
  const regex = new RegExp(String(term), 'i');
  const posts = await Post.find({
    $or: [
      { title: regex },
      { content: regex }
    ]
  });
  res.json(posts);
}));

const validateId = (req, res, next) => {
  const { id } = req.params;
  if (!id || id === 'undefined' || !mongoose.isValidObjectId(id)) {
    return res.status(400).send('ID inválido');
  }
  next();
};

router.get('/:id', validateId, asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).send('Post não encontrado');
  res.json(post);
}));

router.post('/', asyncHandler(async (req, res) => {
  const { title, content, author } = req.body;
  const post = new Post({ title, content, author });
  await post.save();
  res.status(201).json(post);
}));

router.put('/:id', validateId, asyncHandler(async (req, res) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!post) return res.status(404).send('Post não encontrado');
  res.json(post);
}));

router.delete('/:id', validateId, asyncHandler(async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.id);
  if (!post) return res.status(404).send('Post não encontrado');
  res.status(204).send();
}));

module.exports = router;