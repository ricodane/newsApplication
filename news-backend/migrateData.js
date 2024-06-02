const mongoose = require('mongoose');

// Replace with your actual MongoDB connection string
const dbURI = "mongodb+srv://catacutan111ite:r@neCatacuts089@cluster0.mtq49pc.mongodb.net/?retryWrites=true&w=majority&news_db=Cluster0";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

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
  } catch (error) {
    console.error('Data migration failed:', error);
  } finally {
    mongoose.connection.close();
  }
}

migrateData();
