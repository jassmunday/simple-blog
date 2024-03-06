// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const postRoutes = require('./routes/posts');
const indexRoutes = require('./routes/index');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

// Connect to MongoDB
const user1 = process.env.MONGO_USER;
const pswrd = process.env.MONGO_PS;

mongoose.connect(`mongodb+srv://${user1}:${pswrd}@cluster1.ncyrrnb.mongodb.net/blogAppDB`)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

// Middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/', indexRoutes); // Use index routes for the root path
app.use('/posts', postRoutes);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
