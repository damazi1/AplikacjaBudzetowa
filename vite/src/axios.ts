import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor błędów – przekierowanie przy 401
api.interceptors.response.use(
    (res) => res,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Czyścimy ewentualny lokalny stan i przekierowujemy
            window.dispatchEvent(new Event('app:unauthorized'));
        }
        return Promise.reject(error);
    }
);