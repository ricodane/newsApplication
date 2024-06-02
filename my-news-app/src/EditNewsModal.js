import React, { useState } from 'react';
import { updateNews } from './NewsService';
import './Modal.css';

const EditNewsModal = ({ isOpen, onClose, onUpdate, newsItem }) => {
  const [updatedNewsItem, setUpdatedNewsItem] = useState(newsItem);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'source') {
      setUpdatedNewsItem((prevState) => ({
        ...prevState,
        source: { name: value },
      }));
    } else {
      setUpdatedNewsItem((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateNews(newsItem._id, updatedNewsItem);
      onUpdate(updatedNewsItem);
      onClose();
    } catch (error) {
      console.error('Error updating news', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit News</h2>
        <form onSubmit={handleSubmit}>
          <label>Title</label>
          <input type="text" name="title" value={updatedNewsItem.title} onChange={handleChange} required />
          <label>Description</label>
          <input type="text" name="description" value={updatedNewsItem.description} onChange={handleChange} required />
          <label>Image URL</label>
          <input type="text" name="urlToImage" value={updatedNewsItem.urlToImage} onChange={handleChange} required />
          <label>Source</label>
          <input type="text" name="source" value={updatedNewsItem.source.name} onChange={handleChange} required />
          <label>Published At</label>
          <input type="date" name="publishedAt" value={updatedNewsItem.publishedAt} onChange={handleChange} required />
          <button type="submit">Update</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default EditNewsModal;
