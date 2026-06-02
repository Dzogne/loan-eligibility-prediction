import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import { BarChart, Clock, ShieldCheck, UserCheck, TrendingUp, Lock } from 'lucide-react';
import Subheader from '../assets/subheader.svg'; // Assurez-vous que le chemin est correct
import Subheader2 from '../assets/rectheader.svg'; // Assurez-vous que le chemin est correct
import inchclass from '../assets/clients/inchclass.png';
import societe from '../assets/clients/societe-generale-logo-PNG.png';
import boisson from '../assets/clients/images boisson.png';
import total from '../assets/clients/TOTAL_SA_logo.png';
import dangote from '../assets/clients/Dangote_Group_logo.png';
import carrefour from '../assets/clients/carrefour.png';
import localhost from '../assets/clients/logo-localhost-academy.png';
import ubisoft from '../assets/clients/ubisoft.png';
import scdp from '../assets/clients/scdp.png';
import mercedes from '../assets/clients/mercedes.png';
import gozem from '../assets/clients/gozem-logo.png';
import nasa from '../assets/clients/nasa.png';
import supeco from '../assets/clients/supeco.png';
import yango from '../assets/clients/yango.png';    
import { useNavigate } from 'react-router-dom';

export default function home() {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="relative items-center justify-center ">
                {/* Image de fond avec overlay */}
                <div className='absolute inset-0'>
                    <img src={Subheader} alt="" className='w-full ' />
                    <img src={Subheader2} alt="" className='w-full absolute top-49.5 left-1/2 -translate-x-1/2 -translate-y-1/2 ' />
                </div>

                {/* Contenu principal */}
                <div className='absolute text-center mx-auto px-20 text-white mt-25'>
                    <h1 className="text-3xl font-bold mb-5">
                        <span className='block'>SmartLoarn :</span>
                        <span className='block'>Une plateforme pensée pour les institutions africaines,</span>
                        <span className='block'>boostée par le Machine Learning</span>
                    </h1>
                    <p >
                        Rationalisez le processus de crédit, gérez les risques opérationnels et de crédits et développez un portefeuille de prêts
                        rentable. Transformez les prêts pour le monde du digital, en répondant aux demandes des clients, des employés et des
                        régulateurs. SmartLoan est un système éprouvé de Gestion du Risque de Crédit qui couvre tous les aspects de la
                        demande au décaissement en mettant l'accent sur la relation client.
                    </p>
                </div>
            </div>
            {/* Features Grid */}
            <div className='px-10 mb-9 mt-100'>
                <h1 className='mt-5 text-center font-bold text-2xl '>Les Avantages du Gestionnaire de prêts SmartLoan </h1>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 mt-10">
                    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow">
                        <div className="flex items-center gap-4 mb-4">
                            <BarChart className="h-6 w-6 text-blue-600" />
                            <h3 className="text-xl font-semibold text-blue-600">Statistiques et rapports détaillés</h3>
                        </div>
                        <p className="text-gray-600">
                            Analysez vos décisions passées,
                            visualisez les tendances,
                            exportez les données.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow">
                        <div className="flex items-center gap-4 mb-4">
                            <Clock className="h-6 w-6 text-green-600" />
                            <h3 className="text-xl font-semibold text-green-600">Évaluation instantanée</h3>
                        </div>
                        <p className="text-gray-600">
                            Recevez en quelques secondes un score d'éligibilité fiable basé sur des milliers de profils analysés.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow">
                        <div className="flex items-center gap-4 mb-4">
                            <ShieldCheck className="h-6 w-6 text-purple-600" />
                            <h3 className="text-xl font-semibold text-purple-600">Intelligence artificielle fiable</h3>
                        </div>
                        <p className="text-gray-600">
                            Un modèle de Machine Learning entraîné sur des données locales pour des résultats pertinents et précis
                        </p>
                    </div>
                </div>
                <div className='grid md:grid-cols-2 lg:grid-cols-2 gap-2 mt-3 px-35'>
                    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow">
                        <div className="flex items-center gap-4 mb-4">
                            <UserCheck className="h-6 w-6 text-yellow-600" />
                            <h3 className="text-xl font-semibold text-yellow-600">Intégration simple dans vos processus</h3>
                        </div>
                        <p className="text-gray-600">
                            Aucune compétence technique nécessaire. L'outil s'adapte à votre flux de traitement actuel.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow">
                        <div className="flex items-center gap-4 mb-4">
                            <Lock className="h-6 w-6 text-red-600" />
                            <h3 className="text-xl font-semibold text-red-600">Sécurité et confidentialité des données</h3>
                        </div>
                        <p className="text-gray-600">
                            Toutes les informations sont cryptées et protégées selon les normes les plus strictes.
                        </p>
                    </div>
                </div>
            </div>

            {/* Call to action */}
            <div className="w-full bg-gradient-to-r from-gray-400 to-sky-900 py-16 text-center">
                <div className="container mx-auto px-4">
                    <h1 className="text-2xl font-bold text-white mb-6">Évaluez en quelques secondes l’éligibilité d’un client, avec précision, fiabilité et transparence.</h1>
                    
                        <button className="bg-sky-900 hover text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 cursor-pointer"
                        onClick={() => navigate('/evaluation')}>
                            Obtenez une demo
                        </button>
                </div>
            </div>
            <div className='mt-5'>
                <h1 className='text-3xl text-center font-bold'>
                    Certains de nos clients
                </h1>
                <div className='grid grid-cols-4 gap-5 justify-items-center py-5'>
                    <img src={inchclass} alt="inchclass" className="h-8 object-contain cursor-pointer hover:scale-105" />
                    <img src={societe} alt="societe generale" className="h-8 object-contain cursor-pointer hover:scale-105" />
                    <img src={boisson} alt="boisson du cameroun" className="h-8 object-contain cursor-pointer hover:scale-105" />
                    <img src={total} alt="TOTAL" className="h-8 object-contain cursor-pointer hover:scale-105" />
                    <img src={dangote} alt="Dangote" className="h-8 object-contain cursor-pointer hover:scale-105" />
                    <img src={carrefour} alt="Carrefour" className="h-8 object-contain cursor-pointer hover:scale-105" />
                    <img src={localhost} alt="localhost academy" className="h-8 object-contain cursor-pointer hover:scale-105" />
                    <img src={ubisoft} alt="Ubisoft" className="h-8 object-contain cursor-pointer hover:scale-105" />
                    <img src={scdp} alt="SCDP" className="h-8 object-contain cursor-pointer hover:scale-105" />
                    <img src={gozem} alt="Gozem" className="h-8 object-contain cursor-pointer hover:scale-105" />
                    <img src={nasa} alt="NASA" className="h-8 object-contain cursor-pointer hover:scale-105" />
                    <img src={supeco} alt="SUPECO" className="h-8 object-contain cursor-pointer hover:scale-105" />
                    <img src={yango} alt="Yango" className="h-8 object-contain cursor-pointer hover:scale-105" />
                    <img src={mercedes} alt="mercedes" className="h-8 object-contain cursor-pointer hover:scale-105" />
                </div>
            </div>
            <Footer />
        </div>

    );

}