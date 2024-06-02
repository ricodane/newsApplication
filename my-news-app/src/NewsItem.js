import React from 'react';
import { deleteNews } from './NewsService';
import './NewsItem.css';

const NewsItem = ({ item, onDelete, onEdit }) => {
  const handleDelete = async () => {
    try {
      await deleteNews(item._id);
      onDelete(item._id);
    } catch (error) {
      console.error('Error deleting news', error);
    }
  };

  return (
    <div className="news-item">
      <div className="news-header">
        <div className="news-source">{item.source.name}</div>
        
      </div>
      <img src={item.urlToImage} alt={item.title} className="news-image" />
      <div className="news-content">
        <p className="news-title">{item.title}</p>
        <p className="news-description">{item.description}</p>
      </div>
      <div className="news-footer">
        <span className="news-date">{new Date(item.publishedAt).toDateString()}</span>
        <div className="buttons">
            <button className="edit-button" onClick={() => onEdit(item)}>Edit</button>
            <button className="delete-button" onClick={handleDelete}>Delete News</button>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
