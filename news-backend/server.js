const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // Ensure this line is present to load environment variables

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
const dbURI = process.env.MONGODB_URI;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define a news schema and model
const newsSchema = new mongoose.Schema({
  title: String,
  description: String,
  urlToImage: String,
  source: { name: String },
  publishedAt: Date
});

const News = mongoose.model('News', newsSchema);

// CRUD routes
app.get('/news', async (req, res) => {
  const news = await News.find();
  res.send(news);
});

app.post('/news', async (req, res) => {
  const newsItem = new News(req.body);
  await newsItem.save();
  res.send(newsItem);
});

app.put('/news/:id', async (req, res) => {
  const newsItem = await News.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(newsItem);
});

app.delete('/news/:id', async (req, res) => {
  await News.findByIdAndDelete(req.params.id);
  res.send({ message: 'News item deleted' });
});

// Start the server
app.listen(3001, () => {
  console.log('Server running on port 3001');
});
