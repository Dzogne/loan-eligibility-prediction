// services/apiService.js
import axios from 'axios';

// Configuration de base d'axios
// const API_BASE_URL = process.meta.env.VITE_API_URL || 'http://localhost:8000';
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Intercepteur pour ajouter le token CSRF et le token d'authentification
apiClient.interceptors.request.use((config) => {
    // Ajouter le token CSRF
    const csrfToken = getCookie('csrftoken');
    if (csrfToken) {
        config.headers['X-CSRFToken'] = csrfToken;
    }

    // Ajouter le token d'authentification
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    }

    return config;
});

// Fonction pour obtenir le token CSRF
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

// Service d'évaluation de prêt
export const evaluationService = {
    // Soumettre une demande d'évaluation
    evaluerEligibilite: async (formData) => {
        try {
            const response = await apiClient.post('/api/evaluer/', formData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Récupérer l'historique des évaluations (si connecté)
    getHistorique: async () => {
        try {
            const response = await apiClient.get('/api/historique/');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Récupérer les détails d'une évaluation spécifique
    getEvaluation: async (id) => {
        try {
            const response = await apiClient.get(`/api/evaluation/${id}/`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Récupérer les statistiques (pour le tableau de bord)
    getStatistiques: async () => {
        try {
            const response = await apiClient.get('/api/statistiques/');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Récupérer les paramètres de l'utilisateur
    getSettings: async () => {
        try {
            const response = await apiClient.get('/api/parametres/');
            return response.data;
        } catch (error) {
            throw new Error('Erreur lors du chargement des paramètres');
        }
    }
};

// Service d'authentification
export const authService = {
    // Connexion
    login: async (credentials) => {
        try {
            const response = await apiClient.post('/api/auth/login/', credentials);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Inscription
    register: async (userData) => {
        try {
            const response = await apiClient.post('/api/auth/register/', userData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Déconnexion
    logout: async () => {
        try {
            const response = await apiClient.post('/api/auth/logout/');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Vérifier si l'utilisateur est connecté
    checkAuth: async () => {
        try {
            const response = await apiClient.get('/api/auth/user/');
            return response.data;
        } catch (error) {
            return null;
        }
    }
};

export default apiClient;