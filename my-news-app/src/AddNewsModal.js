import React, { useState } from 'react';
import { createNews } from './NewsService';
import './Modal.css';

const AddNewsModal = ({ isOpen, onClose, onAdd }) => {
  const [newsItem, setNewsItem] = useState({
    title: '',
    description: '',
    urlToImage: '',
    source: { name: '' },
    publishedAt: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'source') {
      setNewsItem((prevState) => ({
        ...prevState,
        source: { name: value },
      }));
    } else {
      setNewsItem((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createNews(newsItem);
      onAdd(newsItem);
      onClose();
    } catch (error) {
      console.error('Error creating news', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add News</h2>
        <form onSubmit={handleSubmit}>
          <label>Title</label>
          <input type="text" name="title" value={newsItem.title} onChange={handleChange} required />
          <label>Description</label>
          <input type="text" name="description" value={newsItem.description} onChange={handleChange} required />
          <label>Image URL</label>
          <input type="text" name="urlToImage" value={newsItem.urlToImage} onChange={handleChange} required />
          <label>Source</label>
          <input type="text" name="source" value={newsItem.source.name} onChange={handleChange} required />
          <label>Published At</label>
          <input type="date" name="publishedAt" value={newsItem.publishedAt} onChange={handleChange} required />
          <button type="submit">Add</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default AddNewsModal;
