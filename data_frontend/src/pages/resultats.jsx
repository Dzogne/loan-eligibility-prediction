// import Header from '../components/header';
// import Footer from '../components/footer';

// export default function resultats() {
//     return (
//         <div >
//             <Header />
//             <div className='min-h-screen'>
//                 <h1 className='text-center font-bold text-xl'>Analyse du client</h1>
//                 <div className='grid md:grid-cols-2 lg:grid-cols-2 gap-50 mt-10 px-10'>
//                     <div className="bg-white p-6 rounded-lg shadow-sm">
//                         <div className="flex items-center gap-3 mb-4">
//                             <h3 className="text-xl font-semibold">Resultat principal</h3>
//                         </div>
//                         <p className="text-gray-600">
//                             Au sujet des rendez-vous, termes, textes libres, photos et fichiers.
//                         </p>
//                     </div>
//                     <div className="bg-white p-6 rounded-lg shadow-sm">
//                         <div className="flex items-center gap-3 mb-4">
//                             <h3 className="text-xl font-semibold ">Score d'eligibilite</h3>
//                         </div>
//                         <p className="text-gray-600">
//                             Au sujet des rendez-vous, termes, textes libres, photos et fichiers.
//                         </p>
//                     </div>
//                 </div>
//                 <div className='ml-10 mt-9'>
//                     <h1 className='font-bold text-xl'> Resume des donnees du client</h1>
//                     <div className='py-5'>
//                         <table className='w-full'>
//                             <thead>
//                                 <tr className='border-b'>
//                                     <th className='text-left py-3'>Champ</th>
//                                     <th className='text-left py-3'>Valeur</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 <tr className='border-b'>
//                                     <td className='py-3'>Age</td>
//                                     <td>34</td>
//                                 </tr>
//                                 <tr className='border-b'>
//                                     <td className='py-3'>Revenu mensuel</td>
//                                     <td>180 000FCFA</td>
//                                 </tr>
//                                 <tr className='border-b'>
//                                     <td className='py-3'>Statut matrimonial</td>
//                                     <td>Marie</td>
//                                 </tr>
//                                 <tr className='border-b'>
//                                     <td className='py-3'>Type d'emploi</td>
//                                     <td>CDI</td>
//                                 </tr>
//                                 <tr className='border-b'>
//                                     <td className='py-3'>Duree du pret</td>
//                                     <td>24 Mois</td>
//                                 </tr>
//                                 <tr className='border-b'>
//                                     <td className='py-3'>Montant demande</td>
//                                     <td>1 500 000 FCFA</td>
//                                 </tr>
//                             </tbody>
//                         </table>
//                         {/* Bouton CTA */}
//                         <a href="/dashboard">
//                             <button className="mt-5 bg-sky-900 hover text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 cursor-pointer"
//                             >
//                                 Telecharger le rapport PDF
//                             </button>
//                         </a>
//                         <p className='text-center text-2xl mt-5 font-serif'>Decision genere par notre moteur IA n'oubliez pas de toujours Valider <br />
//                             manuellement les cas limites.
//                         </p>
//                     </div>
//                 </div>
//             </div>
//             <Footer />
//         </div>
//     )
// }

// pages/Resultats.jsx
import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';

export default function Resultats() {
    const location = useLocation();
    const navigate = useNavigate();
    const resultat = location.state?.resultat;

    // Rediriger si aucun résultat n'est disponible
    if (!resultat) {
        navigate('/evaluation');
        return null;
    }

    const {
        nom_complet,
        eligible,
        score_eligibilite,
        montant_pret,
        duree_pret,
        date_evaluation,
        message,
        recommandations
    } = resultat;

    return (
        <div className="bg-gray-100 min-h-screen">
            <Header />
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    {/* En-tête des résultats */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            Résultats de l'évaluation
                        </h1>
                        <p className="text-gray-600">Évaluation effectuée le {date_evaluation}</p>
                    </div>

                    {/* Carte principale des résultats */}
                    <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                {nom_complet}
                            </h2>
                            
                            {/* Statut d'éligibilité */}
                            <div className={`inline-flex items-center px-6 py-3 rounded-full text-lg font-semibold ${
                                eligible 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-red-100 text-red-800'
                            }`}>
                                {eligible ? (
                                    <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                )}
                                {message}
                            </div>
                        </div>

                        {/* Score d'éligibilité */}
                        <div className="text-center mb-8">
                            <div className="inline-block">
                                <div className="relative w-32 h-32 mx-auto">
                                    <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                                        {/* Cercle de fond */}
                                        <circle
                                            cx="50"
                                            cy="50"
                                            r="45"
                                            stroke="currentColor"
                                            strokeWidth="8"
                                            fill="transparent"
                                            className="text-gray-200"
                                        />
                                        {/* Cercle de progression */}
                                        <circle
                                            cx="50"
                                            cy="50"
                                            r="45"
                                            stroke="currentColor"
                                            strokeWidth="8"
                                            fill="transparent"
                                            strokeDasharray={`${2 * Math.PI * 45}`}
                                            strokeDashoffset={`${2 * Math.PI * 45 * (1 - score_eligibilite / 100)}`}
                                            className={eligible ? "text-green-500" : "text-red-500"}
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-2xl font-bold text-gray-800">
                                            {score_eligibilite}%
                                        </span>
                                    </div>
                                </div>
                                <p className="text-gray-600 mt-2">Score d'éligibilité</p>
                            </div>
                        </div>

                        {/* Détails de la demande */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="font-semibold text-gray-800 mb-2">Montant demandé</h3>
                                <p className="text-2xl font-bold text-sky-800">
                                    {montant_pret.toLocaleString('fr-FR')} CFA
                                </p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="font-semibold text-gray-800 mb-2">Durée du prêt</h3>
                                <p className="text-2xl font-bold text-sky-800">
                                    {duree_pret} mois ({Math.round(duree_pret / 12)} ans)
                                </p>
                            </div>
                        </div>

                        {/* Recommandations */}
                        {recommandations && recommandations.length > 0 && (
                            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                                <h3 className="font-semibold text-blue-800 mb-3 flex items-center">
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                    </svg>
                                    Recommandations
                                </h3>
                                <ul className="space-y-2">
                                    {recommandations.map((recommandation, index) => (
                                        <li key={index} className="text-blue-700 flex items-start">
                                            <svg className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                            </svg>
                                            {recommandation}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/evaluation"
                            className="bg-sky-800 hover:bg-sky-700 text-white font-bold py-3 px-6 rounded transition duration-300 text-center"
                        >
                            Nouvelle évaluation
                        </Link>
                        
                        <button
                            onClick={() => window.print()}
                            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded transition duration-300"
                        >
                            Imprimer les résultats
                        </button>
                        
                        <Link
                            to="/dashboard"
                            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded transition duration-300 text-center"
                        >
                            Tableau de bord
                        </Link>
                    </div>

                    {/* Avertissement légal */}
                    <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded">
                        <p className="text-sm text-yellow-800">
                            <strong>Avertissement :</strong> Cette évaluation est indicative et basée sur les informations fournies. 
                            Elle ne constitue pas un engagement de la part des institutions financières. 
                            Les conditions réelles peuvent varier selon les politiques de chaque banque.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}