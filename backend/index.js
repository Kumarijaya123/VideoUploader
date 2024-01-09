const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path')
const app = express();

app.use(cors());
const mediaRoutes = require('./routes/media');

app.use('/api/v1/media', mediaRoutes);
app.use('/public', express.static(path.join(__dirname, 'public')))
app.use('/public/videos', express.static(path.join(__dirname, 'public/videos')));

const mongodbUri = 'mongodb://127.0.0.1:27017/videouploader';

mongoose.connect(mongodbUri, {
  useNewUrlParser: true,
  
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.log('Error connecting to MongoDB', err);
});

app.listen(4000, () => {
  console.log('App is running on PORT 4000');
});
