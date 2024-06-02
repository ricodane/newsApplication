const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const dbURI = "mongodb+srv://catacutan111ite:r@neCatacuts089@cluster0.mtq49pc.mongodb.net/?retryWrites=true&w=majority&news_db=Cluster0";
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch(err => {
  console.error('Failed to connect to MongoDB Atlas', err);
});

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
