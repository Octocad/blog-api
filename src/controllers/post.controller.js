const PostService = require('../services/post.service');

const getAllPosts = (req, res) => {
  const posts = PostService.getAllPosts();
  res.json(posts);
};

const getPostById = (req, res) => {
  try {
    const post = PostService.getPostById(req.params.id);
    res.json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const createPost = (req, res) => {
  try {
    const newPost = PostService.createPost(req.body);
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updatePost = (req, res) => {
  try {
    const updatedPost = PostService.updatePost(req.params.id, req.body);
    res.json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const deletePost = (req, res) => {
  try {
    PostService.deletePost(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const searchPosts = (req, res) => {
  try {
    const posts = PostService.searchPosts(req.query.term);
    res.json(posts);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  searchPosts
};
