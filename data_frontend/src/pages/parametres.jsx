import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Parametres() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            navigate('/connexion');
            return;
        }
        setLoading(false);
    }, [navigate, user]);

    if (loading) {
        return (
            <div className="p-6 mr-25">
                <div className="flex items-center justify-center min-h-96">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Chargement des informations...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 mr-25">
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6">Informations Utilisateur</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nom complet</label>
                        <p className="text-gray-600">{user?.first_name ? `${user.first_name} ${user.last_name || ''}` : 'Non spécifié'}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <p className="text-gray-600">{user?.email || 'Non spécifié'}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Entreprise</label>
                        <p className="text-gray-600">{user?.entreprise || 'Non spécifié'}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                        <p className="text-gray-600">{user?.telephone || 'Non spécifié'}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Ville</label>
                        <p className="text-gray-600">{user?.ville || 'Non spécifié'}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                        <p className="text-gray-600">{user?.position || 'Non spécifié'}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Numero d'agreement</label>
                        <p className="text-gray-600">{user?.numero_agreement || 'Non spécifié'}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Date d'inscription</label>
                        <p className="text-gray-600">{user?.date_inscription?.toLocaleDateString() || 'Non spécifié'}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Dernière connexion</label>
                        <p className="text-gray-600">{user?.last_login?.toLocaleDateString() || 'Non spécifié'}</p>
                    </div>
                </div>
            </div>

            <div className="flex justify-end mt-6">
                <button
                    onClick={logout}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                    Déconnexion
                </button>
            </div>
        </div>
    );
}