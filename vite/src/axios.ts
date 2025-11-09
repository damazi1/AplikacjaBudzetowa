import axios from 'axios';

// Podstawowa instancja – zakładam że backend na tym samym origin (lub ustaw CORS + withCredentials)
export const api = axios.create({
    baseURL: '/api',
    withCredentials: true, // potrzebne gdy ciasteczko HttpOnly z innego origin / lub w ogóle chcesz wysłać cookie
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