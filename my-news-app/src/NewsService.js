import axios from 'axios';

const API_URL = 'http://localhost:3001/news';

export const fetchNews = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching news', error);
    throw error;
  }
};

export const createNews = async (newsItem) => {
  try {
    const response = await axios.post(API_URL, newsItem);
    return response.data;
  } catch (error) {
    console.error('Error creating news', error);
    throw error;
  }
};

export const updateNews = async (id, newsItem) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, newsItem);
    return response.data;
  } catch (error) {
    console.error('Error updating news', error);
    throw error;
  }
};

export const deleteNews = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting news', error);
    throw error;
  }
};
