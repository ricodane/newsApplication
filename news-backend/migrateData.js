const mongoose = require('mongoose');
require('dotenv').config(); // Ensure this line is present to load environment variables

// Replace with your actual MongoDB connection string
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

// Example data to be migrated
const newsData = [
  { title: 'News 1', description: 'Description 1', urlToImage: 'URL 1', source: { name: 'Source 1' }, publishedAt: new Date() },
  { title: 'News 2', description: 'Description 2', urlToImage: 'URL 2', source: { name: 'Source 2' }, publishedAt: new Date() }
];

async function migrateData() {
  try {
    await News.insertMany(newsData);
    console.log('Data migration completed successfully');
    mongoose.connection.close();
  } catch (error) {
    console.error('Data migration failed:', error);
    mongoose.connection.close();
  }
}

migrateData();
