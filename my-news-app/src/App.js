import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewsItem from './NewsItem';
import AddNewsModal from './AddNewsModal';
import EditNewsModal from './EditNewsModal';
import './App.css';

const App = () => {
  const [news, setNews] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentNewsItem, setCurrentNewsItem] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://newsapplication-smcb.onrender.com/news');
        setNews(response.data);
      } catch (error) {
        console.error('Error fetching news', error);
      }
    };
    fetchNews();
  }, []);  

  const handleDelete = (id) => {
    setNews(news.filter((item) => item._id !== id));
  };

  const handleAdd = () => {
    setIsAddModalOpen(true);
  };

  const handleEdit = (item) => {
    setCurrentNewsItem(item);
    setIsEditModalOpen(true);
  };

  const handleAddNews = (newsItem) => {
    setNews([...news, newsItem]);
  };

  const handleUpdateNews = (updatedNewsItem) => {
    setNews(news.map((item) => (item._id === updatedNewsItem._id ? updatedNewsItem : item)));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Popular News</h1>
        <button className='add-news-button' onClick={handleAdd}>Add News</button>
      </header>
      <div className="news-list">
        {news.map((item) => (
          <NewsItem key={item._id} item={item} onDelete={handleDelete} onEdit={handleEdit} />
        ))}
      </div>
      <AddNewsModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddNews}
      />
      {currentNewsItem && (
        <EditNewsModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onUpdate={handleUpdateNews}
          newsItem={currentNewsItem}
        />
      )}
    </div>
  );
};

export default App;
