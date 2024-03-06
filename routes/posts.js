// routes/posts.js
const express = require('express');
const router = express.Router();
const Post = require('../models/post');

// Index Route
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: 'desc' }).exec();
    res.render('index', { posts: posts });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

// New Route
router.get('/new', (req, res) => {
  res.render('new');
});

// Create Route
router.post('/', async (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  try {
    await post.save();
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.redirect('/new');
  }
});

module.exports = router;
