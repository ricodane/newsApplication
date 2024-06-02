const axios = require('axios');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/news', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a news schema and model
const newsSchema = new mongoose.Schema({
  title: String,
  description: String,
  urlToImage: String,
  source: { name: String },
  publishedAt: Date,
});

const News = mongoose.model('News', newsSchema);

// Fetch news from NewsAPI and save to MongoDB
const fetchAndSaveNews = async () => {
  try {
    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        country: 'us',
        apiKey: 'edf84126274447bf95dec2ac91ec9898',
      },
    });

    const articles = response.data.articles;

    for (const article of articles) {
      const newsItem = new News({
        title: article.title,
        description: article.description,
        urlToImage: article.urlToImage,
        source: { name: article.source.name },
        publishedAt: article.publishedAt,
      });

      await newsItem.save();
    }

    console.log('News articles saved to MongoDB');
  } catch (error) {
    console.error('Error fetching or saving news:', error);
  } finally {
    mongoose.connection.close();
  }
};

fetchAndSaveNews();
