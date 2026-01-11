const Post = require('../models/post.model');

// GET /posts
const getAllPosts = async () => {
  return await Post.find();
};

// GET /posts/:id
const getPostById = async (id) => {
  const post = await Post.findById(id);
  if (!post) throw new Error('Post não encontrado');
  return post;
};

// POST /posts
const createPost = async ({ title, content, author }) => {
  if (!title || !content || !author) {
    throw new Error('Campos obrigatórios: title, content, author');
  }

  const newPost = new Post({ title, content, author });
  return await newPost.save();
};

// PUT /posts/:id
const updatePost = async (id, { title, content, author }) => {
  const updatedPost = await Post.findByIdAndUpdate(
    id,
    { title, content, author },
    { new: true, runValidators: true }
  );
  if (!updatedPost) throw new Error('Post não encontrado');
  return updatedPost;
};

// DELETE /posts/:id
const deletePost = async (id) => {
  const deleted = await Post.findByIdAndDelete(id);
  if (!deleted) throw new Error('Post não encontrado');
};


const searchPosts = async (term) => {
  if (!term) throw new Error('Informe o termo de busca');
  const regex = new RegExp(term, 'i'); 
  return await Post.find({
    $or: [
      { title: regex },
      { content: regex }
    ]
  });
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  searchPosts
};
