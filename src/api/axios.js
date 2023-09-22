import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.svhackersclub.com/api/',
  // For local development
  // baseURL: 'http://127.0.0.1:8000/api/',
});
