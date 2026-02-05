import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || '/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const authAPI = {
    register: (userData) => api.post('/auth/register', userData),
    login: (credentials) => api.post('/auth/login', credentials),
};

export const emotionAPI = {
    logEmotion: (logData) => api.post('/emotions/log', logData),
    getMyLogs: () => api.get('/emotions/my-logs'),
    getChildLogs: (childId) => api.get(`/emotions/child-logs/${childId}`),
};

export default api;
