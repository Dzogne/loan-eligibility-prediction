// export default function dashboard() {
//     return (
//         <div className="min-h-screen mt-5 ml-5 mr-10 mb-30">
//             <main className="flex-1">
//                 <h1 className="text-2xl font-semibold text-gray-800 mb-5">Tableau de bord</h1>
//                 <div className="bg-white p-6 rounded-lg shadow-sm ">
//                     <p>Bienvenue sur votre tableau de bord <i>SmartLoarn</i>!</p>
//                 </div>
//                 <div className="grid lg:grid-cols-4 gap-2 mt-10">
//                     <div className="bg-white p-6 rounded-lg shadow-sm">
//                         <div className="flex items-center">
//                             <h3 className="text-xl font-semibold">Evaluations aujourd'hui</h3>
//                         </div>
//                         <p className="text-gray-600">
//                             Au sujet des rendez-vous, termes, textes libres, photos et fichiers.
//                         </p>
//                     </div>
//                     <div className="bg-white p-6 rounded-lg shadow-sm">
//                         <div className="flex items-center">
//                             <h3 className="text-xl font-semibold">Temps moyen de traitement</h3>
//                         </div>
//                         <p className="text-gray-600">
//                             Au sujet des rendez-vous, termes, textes libres, photos et fichiers.
//                         </p>
//                     </div>
//                     <div className="bg-white p-6 rounded-lg shadow-sm">
//                         <div className="flex items-center">
//                             <h3 className="text-xl font-semibold">Demandes ce mois ci</h3>
//                         </div>
//                         <p className="text-gray-600">
//                             Au sujet des rendez-vous, termes, textes libres, photos et fichiers.
//                         </p>
//                     </div>
//                     <div className="bg-white p-6 rounded-lg shadow-sm">
//                         <div className="flex items-center">
//                             <h3 className="text-xl font-semibold">Taux d'eligibilite Moyens</h3>
//                         </div>
//                         <p className="text-gray-600">
//                             Au sujet des rendez-vous, termes, textes libres, photos et fichiers.
//                         </p>
//                     </div>
//                 </div>
//                 <div className="mt-5">
//                     <h1 className="text-2xl font-semibold py-3">Dernieres evaluations</h1>
//                     <table>
//                         <thead>
//                             <tr>
//                                 <th className="">Nom du client</th>
//                                 <th className="px-15">Score d'eligibilite</th>
//                                 <th className="px-15">Resultat</th>
//                                 <th className="px-15">Date</th>
//                             </tr>
//                         </thead>
//                         <tr className="border-b">
//                         </tr>
//                         <tr className="border-b">

//                         </tr>
//                     </table>
//                 </div>
//             </main>
//         </div>
//     )
// }

// pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { evaluationService } from '../services/apiService';
import Header from '../components/header';
import Footer from '../components/footer';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        evaluationsAujourdhui: 0,
        tempsMoyenTraitement: '0s',
        demandesMoisCi: 0,
        tauxEligibiliteMoyen: 0
    });
    const [recentEvaluations, setRecentEvaluations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        chargerDonneesDashboard();
    }, []);

    const chargerDonneesDashboard = async () => {
        try {
            setIsLoading(true);
            
            // Charger les statistiques
            const statsData = await evaluationService.getStatistiques();
            setStats(statsData);

            // Charger l'historique récent
            const historiqueData = await evaluationService.getHistorique();
            setRecentEvaluations(historiqueData.slice(0, 10)); // 10 dernières évaluations

        } catch (error) {
            console.error('Erreur lors du chargement des données:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const formatMontant = (montant) => {
        return new Intl.NumberFormat('fr-FR').format(montant) + ' CFA';
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-100">
                <Header />
                <div className="flex items-center justify-center min-h-96">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-800 mx-auto mb-4"></div>
                        <p className="text-gray-600">Chargement du tableau de bord...</p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* <Header /> */}
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-2">
                {/* En-tête avec informations utilisateur */}
                <div className="bg-white overflow-hidden shadow rounded-lg mb-6">
                    <div className="px-4 py-5 sm:p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-semibold text-gray-900">
                                    Tableau de bord
                                </h1>
                                <p className="mt-1 text-sm text-gray-600">
                                    Bienvenue, {user?.first_name || user?.username} ! Voici un aperçu de votre activité SmartLoan.
                                </p>
                            </div>
                            {/* <div className="flex items-center space-x-4">
                                <div className="text-right">
                                    <p className="text-sm font-medium text-gray-900">{user?.first_name} {user?.last_name}</p>
                                    <p className="text-sm text-gray-500">{user?.email}</p>
                                </div>
                                <button
                                    onClick={logout}
                                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                                >
                                    Déconnexion
                                </button>
                            </div> */}
                        </div>
                    </div>
                </div>

                {/* Cartes de statistiques */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                    {/* Évaluations aujourd'hui */}
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">
                                            Évaluations aujourd'hui
                                        </dt>
                                        <dd className="text-lg font-medium text-gray-900">
                                            {stats.evaluationsAujourdhui}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Temps moyen de traitement */}
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">
                                            Temps moyen de traitement
                                        </dt>
                                        <dd className="text-lg font-medium text-gray-900">
                                            {stats.tempsMoyenTraitement}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Demandes ce mois-ci */}
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">
                                            Demandes ce mois-ci
                                        </dt>
                                        <dd className="text-lg font-medium text-gray-900">
                                            {stats.demandesMoisCi}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Taux d'éligibilité moyen */}
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">
                                            Taux d'éligibilité moyen
                                        </dt>
                                        <dd className="text-lg font-medium text-gray-900">
                                            {stats.tauxEligibiliteMoyen}%
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tableau des dernières évaluations */}
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                            Dernières évaluations
                        </h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                            Historique des 10 dernières évaluations effectuées
                        </p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Nom du client
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Montant demandé
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Score d'éligibilité
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Résultat
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {recentEvaluations.length > 0 ? (
                                    recentEvaluations.map((evaluation) => (
                                        <tr key={evaluation.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {evaluation.prenom} {evaluation.nom}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {formatMontant(evaluation.montant_pret)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-2.5 w-16 bg-gray-200 rounded-full mr-2">
                                                        <div 
                                                            className={`h-2.5 rounded-full ${
                                                                evaluation.score_eligibilite >= 70 ? 'bg-green-500' : 
                                                                evaluation.score_eligibilite >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                                                            }`}
                                                            style={{ width: `${Math.min(evaluation.score_eligibilite || 0, 100)}%` }}
                                                        ></div>
                                                    </div>
                                                    <span className="text-sm font-medium">
                                                        {Math.round(evaluation.score_eligibilite || 0)}%
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                    evaluation.eligible 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {evaluation.eligible ? 'Éligible' : 'Non éligible'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {formatDate(evaluation.date_creation)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <button 
                                                    className="text-sky-600 hover:text-sky-900 mr-3"
                                                    onClick={() => {/* Voir détails */}}
                                                >
                                                    Détails
                                                </button>
                                                {/* <button 
                                                    className="text-gray-600 hover:text-gray-900"
                                                    onClick={() => {/* Télécharger rapport */}
                                                {/* > */}
                                                    {/* Rapport
                                                </button> */} 
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                                            <div className="flex flex-col items-center py-12">
                                                <svg className="w-12 h-12 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                                <p className="text-gray-500 text-lg font-medium">Aucune évaluation</p>
                                                <p className="text-gray-400 text-sm mt-1">
                                                    Commencez par effectuer votre première évaluation
                                                </p>
                                                <button 
                                                    onClick={() => navigate('/evaluation')}
                                                    className="mt-4 bg-sky-800 hover:bg-sky-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                                                >
                                                    Nouvelle évaluation
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Actions rapides
                <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <button 
                        onClick={() => window.location.href = '/evaluation'}
                        className="bg-sky-800 hover:bg-sky-700 text-white px-6 py-3 rounded-lg font-medium text-center transition duration-300"
                    >
                        <svg className="w-5 h-5 inline-block mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        Nouvelle évaluation
                    </button>
                    
                    <button 
                        onClick={() => window.location.href = '/historique'}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium text-center transition duration-300"
                    >
                        <svg className="w-5 h-5 inline-block mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
                        </svg>
                        Voir l'historique
                    </button>
                    
                    <button 
                        onClick={() => window.location.href = '/rapports'}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium text-center transition duration-300"
                    >
                        <svg className="w-5 h-5 inline-block mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                        </svg>
                        Générer un rapport
                    </button>
                </div> */}
            </main>
            {/* <Footer /> */}
        </div>
    );
}