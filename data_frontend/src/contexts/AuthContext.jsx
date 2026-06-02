import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for existing token and user data on mount
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('userData');
        
        if (token && userData) {
            setUser({ token, ...JSON.parse(userData) });
        }
        setLoading(false);
    }, []);

    const login = async (identifier, password) => {
        try {
            const response = await axios.post('http://localhost:8000/api/auth/login/', {
                identifier: identifier,
                password: password
            });

            // Check if login was successful
            if (response.data.success) {
                const { token, user } = response.data;
                localStorage.setItem('token', token);
                localStorage.setItem('userData', JSON.stringify(user));
                setUser({ token, ...user });
                return true;
            }
            return false;
        } catch (error) {
            console.error('Login error:', error);
            return false;
        }
    };

    const register = async (data) => {
        try {
            const response = await axios.post('http://localhost:8000/api/auth/register/', {
                prenom: data.prenom,
                nom: data.nom,
                email: data.email,
                password: data.password,
                telephone: data.telephone,
                entreprise: data.entreprise,
                position: data.position,
                numero_agreement: data.numero_agreement,
                ville: data.ville
            });
            
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('userData', JSON.stringify(user));
            setUser({ token, ...user });
            return true;
        } catch (error) {
            console.error('Registration error:', error);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        setUser(null);
    };

    const value = {
        user,
        loading,
        login,
        register,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}