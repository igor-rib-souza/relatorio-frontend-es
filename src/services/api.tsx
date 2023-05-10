import axios from 'axios';

const api = axios.create({
  baseURL: 'https://es-projeto-novo-backend.onrender.com/',
});

export default api;