// Create web server

// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import files
const { Comment } = require('./models');

// Create web server
const app = express();

app.use(bodyParser.json());
app.use(cors());

// Create comment
app.post('/api/comments', (req, res) => {
  Comment.create(req.body)
    .then(comment => res.status(201).json(comment))
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

// Get all comments
app.get('/api/comments', (req, res) => {
  Comment.find()
    .then(comments => res.json(comments.map(comment => comment.serialize())))
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

// Get comment by id
app.get('/api/comments/:id', (req, res) => {
  Comment.findById(req.params.id)
    .then(comment => res.json(comment.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

// Update comment by id
app.put('/api/comments/:id', (req, res) => {
  Comment.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .then(comment => res.json(comment.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

// Delete comment by id
app.delete('/api/comments/:id', (req, res) => {
  Comment.findByIdAndRemove(req.params.id)
    .then(() => res.status(204).end())
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

// Get all comments by post id
app.get('/api/comments/post/:postId', (req, res) => {
  Comment.find({ post: req.params.postId })
    .then(comments => res.json(comments.map(comment => comment.serialize())))
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

// Start server
let server

