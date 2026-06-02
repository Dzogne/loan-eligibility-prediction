import React, { useState } from 'react';
import { Building2, Users, Shield, TrendingUp, CheckCircle, Info, Sparkles, Target, Lightbulb } from 'lucide-react';
import Header from "../components/header";
import Footer from "../components/footer";
import { useNavigate } from 'react-router-dom';

export default function APropos() {
    const navigate = useNavigate();
    const [activeFeature, setActiveFeature] = useState(0);

    const features = [
        {
            icon: <TrendingUp className="w-8 h-8" />,
            title: "Analyse Prédictive",
            description: "Notre algorithme d'intelligence artificielle analyse plus de 10 critères pour prédire l'éligibilité aux prêts avec une précision de 95%.",
            color: "bg-blue-500"
        },
        {
            icon: <Shield className="w-8 h-8" />,
            title: "Sécurité Maximale",
            description: "Toutes les données sont chiffrées et protégées selon les standards bancaires internationaux ISO 27001.",
            color: "bg-green-500"
        },
        {
            icon: <CheckCircle className="w-8 h-8" />,
            title: "Évaluation Instantanée",
            description: "Obtenez des résultats en moins de 30 secondes avec des recommandations personnalisées pour chaque demandeur.",
            color: "bg-purple-500"
        },
        {
            icon: <Target className="w-8 h-8" />,
            title: "Précision Ciblée",
            description: "Réduisez les risques de crédit et optimisez vos décisions d'octroi avec notre scoring avancé.",
            color: "bg-orange-500"
        }
    ];

    const stats = [
        { number: "500+", label: "Institutions partenaires", icon: <Building2 className="w-6 h-6" /> },
        { number: "1M+", label: "Évaluations traitées", icon: <Users className="w-6 h-6" /> },
        { number: "95%", label: "Précision des prédictions", icon: <TrendingUp className="w-6 h-6" /> },
        { number: "24/7", label: "Disponibilité", icon: <Shield className="w-6 h-6" /> }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-sky-900 via-sky-800 to-blue-900 text-white overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-20"></div>
                <div className="absolute inset-0">
                    <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
                    <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
                </div>
                
                <div className="relative container mx-auto px-6 py-24">
                    <div className="text-center">
                        <div className="inline-flex items-center bg-white bg-opacity-20 rounded-full px-6 py-2 mb-6">
                            <Sparkles className="w-5 h-5 mr-2" />
                            <span className="text-sm font-medium">Solution d'évaluation intelligente</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            L'avenir de l'évaluation
                            <span className="bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent"> crediticielle</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
                            Révolutionnez vos décisions de crédit avec notre plateforme d'intelligence artificielle 
                            conçue spécialement pour les institutions financières.
                        </p>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="relative -mt-16">
                <div className="container mx-auto px-6">
                    <div className="bg-white rounded-2xl shadow-2xl p-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="flex justify-center mb-3">
                                        <div className="p-3 bg-sky-100 text-sky-600 rounded-full">
                                            {stat.icon}
                                        </div>
                                    </div>
                                    <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                                    <div className="text-sm text-gray-600">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mission Section */}
            <div className="container mx-auto px-6 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">Notre Mission</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Démocratiser l'accès au crédit en fournissant aux institutions financières les outils 
                        les plus avancés pour évaluer l'éligibilité aux prêts de manière équitable et précise.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div className="flex items-start space-x-4">
                            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                                <Building2 className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Pour les Institutions Financières</h3>
                                <p className="text-gray-600">
                                    Optimisez vos processus d'octroi de crédit avec notre solution complète 
                                    d'évaluation automatisée et de gestion des risques.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="p-3 bg-green-100 text-green-600 rounded-lg">
                                <Users className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Pour les Demandeurs</h3>
                                <p className="text-gray-600">
                                    Bénéficiez d'évaluations rapides, transparentes et équitables basées sur 
                                    des critères objectifs et des algorithmes non-discriminatoires.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
                                <Lightbulb className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Innovation Continue</h3>
                                <p className="text-gray-600">
                                    Nous améliorons constamment nos algorithmes grâce à l'apprentissage automatique 
                                    et aux retours de nos partenaires institutionnels.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl p-8">
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Fonctionnalités Clés</h3>
                            {features.map((feature, index) => (
                                <div 
                                    key={index}
                                    className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                                        activeFeature === index 
                                        ? 'bg-white shadow-lg transform scale-105' 
                                        : 'bg-white bg-opacity-50 hover:bg-white hover:shadow-md'
                                    }`}
                                    onClick={() => setActiveFeature(index)}
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className={`p-2 ${feature.color} text-white rounded-lg`}>
                                            {feature.icon}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-gray-900">{feature.title}</h4>
                                            {activeFeature === index && (
                                                <p className="text-sm text-gray-600 mt-2">{feature.description}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Important Notice for Individual Users */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-400">
                <div className="container mx-auto px-6 py-12">
                    <div className="flex items-start space-x-4">
                        <div className="p-3 bg-amber-100 text-amber-600 rounded-full">
                            <Info className="w-8 h-8" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                🎯 Information Importante pour les Particuliers
                            </h3>
                            <div className="prose prose-lg text-gray-700 max-w-none">
                                <p className="text-lg mb-4">
                                    <strong>Cette plateforme est spécialement conçue pour les institutions bancaires et les organisations financières.</strong>
                                </p>
                                <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
                                    <h4 className="text-xl font-semibold text-gray-900 mb-3">🔍 Mode Démonstration pour les Particuliers</h4>
                                    <ul className="space-y-2">
                                        <li className="flex items-center space-x-3">
                                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                            <span>Testez notre algorithme d'évaluation avec vos données</span>
                                        </li>
                                        <li className="flex items-center space-x-3">
                                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                            <span>Découvrez les critères d'éligibilité aux prêts bancaires</span>
                                        </li>
                                        <li className="flex items-center space-x-3">
                                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                            <span>Obtenez des recommandations pour améliorer votre profil</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                                    <p className="text-blue-800">
                                        <strong>💡 Conseil :</strong> Les résultats obtennus en mode démonstration sont indicatifs et ne constituent pas 
                                        une offre de crédit. Pour une demande réelle, veuillez vous adresser directement à votre banque 
                                        ou institution financière qui utilise nos services.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Technology Section */}
            <div className="bg-gray-900 text-white py-20">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-6">Technologie de Pointe</h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Notre plateforme utilise les dernières avancées en intelligence artificielle 
                            et en apprentissage automatique pour garantir des évaluations précises et équitables.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-gray-800 rounded-xl p-8 text-center">
                            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <TrendingUp className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-semibold mb-4">Machine Learning</h3>
                            <p className="text-gray-400">
                                Algorithmes d'apprentissage automatique qui s'améliorent constamment 
                                avec chaque nouvelle évaluation.
                            </p>
                        </div>

                        <div className="bg-gray-800 rounded-xl p-8 text-center">
                            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Shield className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-semibold mb-4">Sécurité Avancée</h3>
                            <p className="text-gray-400">
                                Chiffrement de bout en bout et conformité aux réglementations 
                                bancaires les plus strictes.
                            </p>
                        </div>

                        <div className="bg-gray-800 rounded-xl p-8 text-center">
                            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-semibold mb-4">API Robuste</h3>
                            <p className="text-gray-400">
                                Intégration facile avec vos systèmes existants via nos APIs 
                                sécurisées et documentées.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-sky-600 to-blue-600 py-16">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-white mb-6">
                        Prêt à Révolutionner Vos Décisions de Crédit ?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        Rejoignez des centaines d'institutions financières qui font confiance à notre solution.
                    </p>
                    <div className="space-x-4">
                        <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors cursor-pointer"
                        onClick={() => navigate('/evaluation')}>
                            Essayer la Démo
                        </button>
                        <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                            Nous Contacter
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}