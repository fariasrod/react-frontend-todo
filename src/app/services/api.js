import axios from 'axios';

const HOST = 'http://localhost:3001';
const BEARER = 'Bearer ';
const TOKEN_KEY = "token";

const api = axios.create({ baseURL: HOST });

api.interceptors.request.use(async config => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = BEARER + `${token}`;
    }
    return config;
  });

export default api;