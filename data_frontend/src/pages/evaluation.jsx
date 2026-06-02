// import Header from '../components/header';
// import Footer from '../components/footer';

// export default function evaluation() {
//     return (
//         <div className='bg-gray-100 '>
//             <Header />
//             <h1 className="text-2xl font-bold text-center mt-5">Remplissez ce formulaire avec les informationds du debiteur</h1>
//             <div className="flex flex-col items-center justify-center mt-5 mb-20">
//                 <form action="/api/evaluer" method="POST" className="bg-white p-8 rounded shadow-md w-full max-w-sm">
//                     <h1 className='font-bold mb-2 text-xl'>Formulaire de demande de pret</h1>
//                     <label className="block text-gray-700 text-sm font-bold mb-2">1.Nom:
//                         <input type="text" name="nom" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required placeholder /></label><br />
//                     <label className="block text-gray-700 text-sm font-bold mb-2">2.Prénom:
//                         <input type="text" name="prenom" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required placeholder /></label><br />
//                     <label className="block text-gray-700 text-sm font-bold mb-2">3.Date de naissance:
//                         <input type="date" name="dateNaissance" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required placeholder /></label><br />

//                     <label className="block text-gray-700 text-sm font-bold mb-2">4.Sexe:
//                         <select name="sexe" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
//                             <option value="Male">Homme</option>
//                             <option value="Female">Femme</option>
//                         </select>
//                     </label><br />

//                     <label className="block text-gray-700 text-sm font-bold mb-2">5.Statut marital:
//                         <select name="marie" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" >
//                             <option value="Yes">Marié(e)</option>
//                             <option value="No">Célibataire</option>
//                         </select>
//                     </label><br />

//                     <label className="block text-gray-700 text-sm font-bold mb-2">6.Personnes à charge:
//                         <select name="dependants" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
//                             <option value="0">0</option>
//                             <option value="1">1</option>
//                             <option value="2">2</option>
//                             <option value="3+">3+</option>
//                         </select>
//                     </label><br />

//                     <label className="block text-gray-700 text-sm font-bold mb-2">7.Niveau d'éducation:
//                         <select name="niveauEducation" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
//                             <option value="Graduate">Diplômé(e)</option>
//                             <option value="Not Graduate">Non diplômé(e)</option>
//                         </select>
//                     </label><br />

//                     <label className="block text-gray-700 text-sm font-bold mb-2">8.Travailleur indépendant:
//                         <select name="estIndependant" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
//                             <option value="Yes">Oui</option>
//                             <option value="No">Non</option>
//                         </select>
//                     </label><br />

//                     <label className="block text-gray-700 text-sm font-bold mb-2">9.Revenu principal (CFA):
//                         <input type="number" name="revenuPrincipal" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required placeholder /></label><br />
//                     <label className="block text-gray-700 text-sm font-bold mb-2">10.Revenu co-demandeur (CFA):
//                         <input type="number" name="revenuCoapplicant" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required placeholder /></label><br />
//                     <label className="block text-gray-700 text-sm font-bold mb-2">11.Montant du prêt demandé (CFA):
//                         <input type="number" name="montantPret" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required placeholder /></label><br />
//                     <label className="block text-gray-700 text-sm font-bold mb-2">12.Durée du prêt (en mois):
//                         <input type="number" name="dureePret" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required placeholder /></label><br />

//                     <label className="block text-gray-700 text-sm font-bold mb-2">13.Historique de crédit:
//                         <select name="historiqueCredit" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
//                             <option value="1.0">Bon</option>
//                             <option value="0.0">Mauvais</option>
//                         </select>
//                     </label><br />
//                     <button type="submit" className="mt-2 bg-sky-800 cursor-pointer hover:bg-sky-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">Évaluer l’éligibilité</button>
//                 </form>

//             </div>
//             <Footer />
//         </div>
//     )
// }

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';
import { evaluationService } from '../services/apiService';

export default function Evaluation() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        date_naissance: '',
        sexe: 'Male',
        marie: 'Yes',
        dependants: '0',
        niveau_education: 'Graduate',
        est_independant: 'No',
        revenu_principal: '',
        revenu_coapplicant: '',
        montant_pret: '',
        duree_pret: '',
        historique_credit: '1.0'
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    // Gestion des changements dans le formulaire
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Effacer l'erreur du champ modifié
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    // Validation des données
    const validateForm = () => {
        const newErrors = {};

        if (!formData.nom.trim()) newErrors.nom = 'Le nom est requis';
        if (!formData.prenom.trim()) newErrors.prenom = 'Le prénom est requis';
        if (!formData.date_naissance) newErrors.date_naissance = 'La date de naissance est requise';
        if (!formData.revenu_principal || formData.revenu_principal <= 0) {
            newErrors.revenu_principal = 'Le revenu principal doit être supérieur à 0';
        }
        if (!formData.revenu_coapplicant || formData.revenu_coapplicant < 0) {
            newErrors.revenu_coapplicant = 'Le revenu du co-demandeur ne peut pas être négatif';
        }
        if (!formData.montant_pret || formData.montant_pret <= 0) {
            newErrors.montant_pret = 'Le montant du prêt doit être supérieur à 0';
        }
        if (!formData.duree_pret || formData.duree_pret <= 0 || formData.duree_pret > 480) {
            newErrors.duree_pret = 'La durée du prêt doit être entre 1 et 480 mois';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            const result = await evaluationService.evaluerEligibilite(formData);
            
            if (result.success) {
                // Rediriger vers la page des résultats avec les données
                navigate('/resultats', { state: { resultat: result.data } });
            } else {
                alert(result.error || 'Une erreur est survenue lors de l\'évaluation');
            }
        } catch (error) {
            console.error('Erreur lors de l\'évaluation:', error);
            
            // Gérer les erreurs de validation du backend
            if (error.details) {
                setErrors(error.details);
            } else {
                alert(error.message || 'Erreur de connexion au serveur. Veuillez réessayer.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='bg-gray-100 min-h-screen'>
            <Header />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
                    Évaluation d'éligibilité au prêt bancaire
                </h1>
                
                <div className="flex justify-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
                        <h2 className='font-bold mb-6 text-2xl text-center text-sky-800'>
                            Formulaire de demande de prêt
                        </h2>
                        
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Informations personnelles */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        1. Nom *
                                    </label>
                                    <input
                                        type="text"
                                        name="nom"
                                        value={formData.nom}
                                        onChange={handleChange}
                                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.nom ? 'border-red-500' : ''}`}
                                        required
                                        placeholder="Entrez votre nom"
                                    />
                                    {errors.nom && <p className="text-red-500 text-xs mt-1">{errors.nom}</p>}
                                </div>

                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        2. Prénom *
                                    </label>
                                    <input
                                        type="text"
                                        name="prenom"
                                        value={formData.prenom}
                                        onChange={handleChange}
                                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.prenom ? 'border-red-500' : ''}`}
                                        required
                                        placeholder="Entrez votre prénom"
                                    />
                                    {errors.prenom && <p className="text-red-500 text-xs mt-1">{errors.prenom}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    3. Date de naissance *
                                </label>
                                <input
                                    type="date"
                                    name="date_naissance"
                                    value={formData.date_naissance}
                                    onChange={handleChange}
                                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.date_naissance ? 'border-red-500' : ''}`}
                                    required
                                />
                                {errors.date_naissance && <p className="text-red-500 text-xs mt-1">{errors.date_naissance}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        4. Sexe
                                    </label>
                                    <select
                                        name="sexe"
                                        value={formData.sexe}
                                        onChange={handleChange}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    >
                                        <option value="Male">Homme</option>
                                        <option value="Female">Femme</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        5. Statut marital
                                    </label>
                                    <select
                                        name="marie"
                                        value={formData.marie}
                                        onChange={handleChange}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    >
                                        <option value="Yes">Marié(e)</option>
                                        <option value="No">Célibataire</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        6. Personnes à charge
                                    </label>
                                    <select
                                        name="dependants"
                                        value={formData.dependants}
                                        onChange={handleChange}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    >
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3+">3+</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        7. Niveau d'éducation
                                    </label>
                                    <select
                                        name="niveau_education"
                                        value={formData.niveau_education}
                                        onChange={handleChange}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    >
                                        <option value="Graduate">Diplômé(e)</option>
                                        <option value="Not Graduate">Non diplômé(e)</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    8. Travailleur indépendant
                                </label>
                                <select
                                    name="est_independant"
                                    value={formData.est_independant}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                >
                                    <option value="Yes">Oui</option>
                                    <option value="No">Non</option>
                                </select>
                            </div>

                            {/* Informations financières */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        9. Revenu principal (CFA) *
                                    </label>
                                    <input
                                        type="number"
                                        name="revenu_principal"
                                        value={formData.revenu_principal}
                                        onChange={handleChange}
                                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.revenu_principal ? 'border-red-500' : ''}`}
                                        required
                                        min="0"
                                        placeholder="Ex: 500000"
                                    />
                                    {errors.revenu_principal && <p className="text-red-500 text-xs mt-1">{errors.revenu_principal}</p>}
                                </div>

                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        10. Revenu co-demandeur (CFA)
                                    </label>
                                    <input
                                        type="number"
                                        name="revenu_coapplicant"
                                        value={formData.revenu_coapplicant}
                                        onChange={handleChange}
                                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.revenu_coapplicant ? 'border-red-500' : ''}`}
                                        min="0"
                                        placeholder="Ex: 200000 (optionnel)"
                                    />
                                    {errors.revenu_coapplicant && <p className="text-red-500 text-xs mt-1">{errors.revenu_coapplicant}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        11. Montant du prêt demandé (CFA) *
                                    </label>
                                    <input
                                        type="number"
                                        name="montant_pret"
                                        value={formData.montant_pret}
                                        onChange={handleChange}
                                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.montant_pret ? 'border-red-500' : ''}`}
                                        required
                                        min="0"
                                        placeholder="Ex: 5000000"
                                    />
                                    {errors.montant_pret && <p className="text-red-500 text-xs mt-1">{errors.montant_pret}</p>}
                                </div>

                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        12. Durée du prêt (en mois) *
                                    </label>
                                    <input
                                        type="number"
                                        name="duree_pret"
                                        value={formData.duree_pret}
                                        onChange={handleChange}
                                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.duree_pret ? 'border-red-500' : ''}`}
                                        required
                                        min="1"
                                        max="480"
                                        placeholder="Ex: 240"
                                    />
                                    {errors.duree_pret && <p className="text-red-500 text-xs mt-1">{errors.duree_pret}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    13. Historique de crédit
                                </label>
                                <select
                                    name="historique_credit"
                                    value={formData.historique_credit}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                >
                                    <option value="1.0">Bon</option>
                                    <option value="0.0">Mauvais</option>
                                </select>
                            </div>

                            <div className="flex justify-center pt-6">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`bg-sky-800 hover:bg-sky-700 text-white font-bold py-3 px-8 rounded focus:outline-none focus:shadow-outline transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {loading ? (
                                        <span className="flex items-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Évaluation en cours...
                                        </span>
                                    ) : (
                                        'Évaluer l\'éligibilité'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}