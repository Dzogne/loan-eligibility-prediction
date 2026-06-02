// import Header from "../components/header";
// import Footer from "../components/footer";
// import Subheader from '../assets/subheader.svg';
// import Subheader2 from '../assets/rectheader.svg';

// export default function inscription() {
//     return (
//         <div>
//             <Header />
//             <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-5 mb-35">
//                 <h2 className="text-4xl font-bold py-6">Inscription</h2>
//                 <form className="bg-white p-8 rounded shadow-md w-full items-center justify-center px-10">
//                     <div className=" grid grid-cols-2 gap-3">
//                         <div className="mb-4">
//                             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Prenom</label>
//                             <input type="name" id="name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required placeholder="Prenom" />
//                         </div>
//                         <div className="mb-4">
//                             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Nom</label>
//                             <input type="email" id="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required placeholder="Nom" />
//                         </div>
//                         <div className="mb-4">
//                             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Entreprise</label>
//                             <input type="email" id="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required placeholder="Entreprise" />
//                         </div>
//                         <div className="mb-4">
//                             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Position</label>
//                             <input type="email" id="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Position" />
//                         </div>
//                         <div className="mb-4">
//                             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Numero d'agreement</label>
//                             <input type="email" id="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Numero d'agrement" />
//                         </div>
//                         <div className="mb-4">
//                             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Ville</label>
//                             <input type="email" id="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Ville" />
//                         </div>
//                         <div className="mb-4">
//                             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email Professionnel</label>
//                             <input type="email" id="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required placeholder="Email Professionnel" />
//                         </div>
//                         <div className="mb-4">
//                             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Numero de telephone</label>
//                             <input type="email" id="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Numero de telephone" />
//                         </div>
//                         <div className="mb-6">
//                             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Mot de passe</label>
//                             <input type="password" id="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required placeholder="Mot de passe" />
//                         </div>
//                         <div className="mb-6">
//                             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Confirmation du Mot de passe</label>
//                             <input type="password" id="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required placeholder="Mot de passe" />
//                         </div>
//                         <div>
//                             <label className="flex items-center">
//                                 <input
//                                     type="checkbox"
//                                     name="acceptPolicy"
//                                     className="mr-2 h-4 w-4 text-purple-600 focus:ring-purple-500"
//                                     required
//                                 />
//                                 <span className="text-sm text-gray-600">j'ai lu et j'accepte la politique de confidentialité</span>
//                             </label>
//                         </div>
//                     </div>
//                     <button type="submit" className="ml-75 mt-5 w-70 bg-sky-800 hover:bg-sky-700 cursor-pointer text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">S'inscrire</button>
//                     <p className="text-center mt-3 text-sm text-gray-600">Vous avez deja un compte connectez-vous <a href="connexion" className="hover:text-blue-900"><u>ici</u></a></p>
//                 </form>
//             </div>
//             <Footer />
//         </div>
//     )
// }

import React, { useState } from 'react';
import Header from "../components/header";
import Footer from "../components/footer";

export default function Inscription() {
    const [formData, setFormData] = useState({
        prenom: '',
        nom: '',
        entreprise: '',
        position: '',
        numeroAgreement: '',
        ville: '',
        email: '',
        telephone: '',
        motDePasse: '',
        confirmationMotDePasse: '',
        acceptPolicy: false
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // Champs obligatoires
        if (!formData.prenom.trim()) newErrors.prenom = 'Le prénom est obligatoire';
        if (!formData.nom.trim()) newErrors.nom = 'Le nom est obligatoire';
        if (!formData.email.trim()) newErrors.email = 'L\'email est obligatoire';
        if (!formData.motDePasse) newErrors.motDePasse = 'Le mot de passe est obligatoire';
        if (!formData.confirmationMotDePasse) newErrors.confirmationMotDePasse = 'Confirmez votre mot de passe';
        if (!formData.acceptPolicy) newErrors.acceptPolicy = 'Vous devez accepter la politique de confidentialité';

        // Validation email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (formData.email && !emailRegex.test(formData.email)) {
            newErrors.email = 'Format d\'email invalide';
        }

        // Validation mot de passe
        if (formData.motDePasse && formData.motDePasse.length < 6) {
            newErrors.motDePasse = 'Le mot de passe doit contenir au moins 6 caractères';
        }

        // Confirmation mot de passe
        if (formData.motDePasse !== formData.confirmationMotDePasse) {
            newErrors.confirmationMotDePasse = 'Les mots de passe ne correspondent pas';
        }

        return newErrors;
    };

    const handleSubmit = async () => {
        
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true);
        setErrors({});
        setMessage('');

        try {
            // Ici tu peux ajouter l'appel API vers ton backend Django
            const response = await fetch('http://localhost:8000/api/auth/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prenom: formData.prenom,
                    nom: formData.nom,
                    entreprise: formData.entreprise,
                    position: formData.position,
                    numero_agreement: formData.numeroAgreement,
                    ville: formData.ville,
                    email: formData.email,
                    telephone: formData.telephone,
                    password: formData.motDePasse
                })
            });

            const data = await response.json().catch(() => ({}));

            if (response.ok) {
                setMessage('Inscription réussie ! Vous pouvez maintenant vous connecter.');
                // Reset form
                setFormData({
                    prenom: '',
                    nom: '',
                    entreprise: '',
                    position: '',
                    numeroAgreement: '',
                    ville: '',
                    email: '',
                    telephone: '',
                    motDePasse: '',
                    confirmationMotDePasse: '',
                    acceptPolicy: false
                });
                
                // Redirection après 2 secondes
                setTimeout(() => {
                    window.location.href = '/connexion';
                }, 2000);
            } else {
                setErrors(data.errors || { general: data.message || 'Erreur lors de l\'inscription' });
            }
        } catch (error) {
            console.error('Erreur:', error);
            setErrors({ general: 'Erreur de connexion au serveur' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <Header />
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-5 mb-35">
                <h2 className="text-4xl font-bold py-6">Inscription</h2>
                
                {message && (
                    <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                        {message}
                    </div>
                )}

                {errors.general && (
                    <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                        {errors.general}
                    </div>
                )}

                <div className="bg-white p-8 rounded shadow-md w-full max-w-4xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Prénom */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="prenom">
                                Prénom *
                            </label>
                            <input
                                type="text"
                                id="prenom"
                                name="prenom"
                                value={formData.prenom}
                                onChange={handleChange}
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.prenom ? 'border-red-500' : ''}`}
                                placeholder="Prénom"
                            />
                            {errors.prenom && <p className="text-red-500 text-xs mt-1">{errors.prenom}</p>}
                        </div>

                        {/* Nom */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nom">
                                Nom *
                            </label>
                            <input
                                type="text"
                                id="nom"
                                name="nom"
                                value={formData.nom}
                                onChange={handleChange}
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.nom ? 'border-red-500' : ''}`}
                                placeholder="Nom"
                            />
                            {errors.nom && <p className="text-red-500 text-xs mt-1">{errors.nom}</p>}
                        </div>

                        {/* Entreprise */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="entreprise">
                                Entreprise
                            </label>
                            <input
                                type="text"
                                id="entreprise"
                                name="entreprise"
                                value={formData.entreprise}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Entreprise"
                            />
                        </div>

                        {/* Position */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="position">
                                Position
                            </label>
                            <input
                                type="text"
                                id="position"
                                name="position"
                                value={formData.position}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Position"
                            />
                        </div>

                        {/* Numéro d'agrément */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="numeroAgreement">
                                Numéro d'agrément
                            </label>
                            <input
                                type="text"
                                id="numeroAgreement"
                                name="numeroAgreement"
                                value={formData.numeroAgreement}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Numéro d'agrément"
                            />
                        </div>

                        {/* Ville */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ville">
                                Ville
                            </label>
                            <input
                                type="text"
                                id="ville"
                                name="ville"
                                value={formData.ville}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Ville"
                            />
                        </div>

                        {/* Email */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email Professionnel *
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''}`}
                                placeholder="Email Professionnel"
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>

                        {/* Téléphone */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telephone">
                                Numéro de téléphone
                            </label>
                            <input
                                type="tel"
                                id="telephone"
                                name="telephone"
                                value={formData.telephone}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Numéro de téléphone"
                            />
                        </div>

                        {/* Mot de passe */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="motDePasse">
                                Mot de passe *
                            </label>
                            <input
                                type="password"
                                id="motDePasse"
                                name="motDePasse"
                                value={formData.motDePasse}
                                onChange={handleChange}
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.motDePasse ? 'border-red-500' : ''}`}
                                placeholder="Mot de passe"
                            />
                            {errors.motDePasse && <p className="text-red-500 text-xs mt-1">{errors.motDePasse}</p>}
                        </div>

                        {/* Confirmation mot de passe */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmationMotDePasse">
                                Confirmation du Mot de passe *
                            </label>
                            <input
                                type="password"
                                id="confirmationMotDePasse"
                                name="confirmationMotDePasse"
                                value={formData.confirmationMotDePasse}
                                onChange={handleChange}
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.confirmationMotDePasse ? 'border-red-500' : ''}`}
                                placeholder="Confirmer le mot de passe"
                            />
                            {errors.confirmationMotDePasse && <p className="text-red-500 text-xs mt-1">{errors.confirmationMotDePasse}</p>}
                        </div>
                    </div>

                    {/* Politique de confidentialité */}
                    <div className="mb-4">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="acceptPolicy"
                                checked={formData.acceptPolicy}
                                onChange={handleChange}
                                className={`mr-2 h-4 w-4 text-purple-600 focus:ring-purple-500 ${errors.acceptPolicy ? 'border-red-500' : ''}`}
                            />
                            <span className="text-sm text-gray-600">
                                J'ai lu et j'accepte la politique de confidentialité *
                            </span>
                        </label>
                        {errors.acceptPolicy && <p className="text-red-500 text-xs mt-1">{errors.acceptPolicy}</p>}
                    </div>

                    {/* Bouton d'inscription */}
                    <div className="text-center">
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className={`w-full md:w-auto bg-sky-800 hover:bg-sky-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                            {loading ? 'Inscription en cours...' : 'S\'inscrire'}
                        </button>
                    </div>

                    {/* Lien connexion */}
                    <p className="text-center mt-4 text-sm text-gray-600">
                        Vous avez déjà un compte ? 
                        <a href="/connexion" className="text-sky-600 hover:text-sky-800 ml-1">
                            <u>Connectez-vous ici</u>
                        </a>
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    );
}