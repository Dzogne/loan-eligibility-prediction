import { Line, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useState, useEffect } from 'react';
import { evaluationService } from '../services/apiService';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

export default function Rapports() {
    const [stats, setStats] = useState({
        evaluationsParMois: [],
        tauxEligibilite: [],
        typesClients: [],
        tempsTraitement: []
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        chargerDonneesRapports();
    }, []);

    const chargerDonneesRapports = async () => {
        try {
            setIsLoading(true);
            const response = await evaluationService.getStatistiques();
            setStats(response);
        } catch (error) {
            console.error('Erreur lors du chargement des rapports:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="p-6 mr-25">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6">Rapports</h1>
                <div className="flex items-center justify-center min-h-96">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Chargement des rapports...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 mr-25">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">Rapports</h1>

            {/* Évaluations par mois */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <h2 className="text-xl font-semibold mb-4">Évaluations par mois</h2>
                <Line
                    data={{
                        labels: stats.evaluationsParMois?.map(item => item.mois) || ['Aucune donnée'],
                        datasets: [{
                            label: 'Nombre d\'évaluations',
                            data: stats.evaluationsParMois?.map(item => item.nombre) || [0],
                            borderColor: 'rgb(59, 130, 246)',
                            backgroundColor: 'rgba(59, 130, 246, 0.1)',
                            tension: 0.1
                        }]
                    }}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            title: {
                                display: true,
                                text: 'Évaluations effectuées chaque mois'
                            }
                        }
                    }}
                />
            </div>

            {/* Taux d'éligibilité */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <h2 className="text-xl font-semibold mb-4">Taux d'éligibilité</h2>
                <Bar
                    data={{
                        labels: stats.tauxEligibilite?.map(item => item.période) || ['Aucune donnée'],
                        datasets: [{
                            label: 'Taux moyen (%)',
                            data: stats.tauxEligibilite?.map(item => item.taux) || [0],
                            backgroundColor: 'rgba(59, 130, 246, 0.5)',
                            borderColor: 'rgb(59, 130, 246)',
                            borderWidth: 1
                        }]
                    }}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            title: {
                                display: true,
                                text: 'Taux d\'éligibilité moyen par période'
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                max: 100,
                                ticks: {
                                    stepSize: 20
                                }
                            }
                        }
                    }}
                />
            </div>

            {/* Types de clients */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <h2 className="text-xl font-semibold mb-4">Répartition par type de client</h2>
                <div className="chart-container">
                    <canvas id="typesClientsChart"></canvas>
                </div>
            </div>

            {/* Temps de traitement */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Temps de traitement</h2>
                <div className="chart-container">
                    <canvas id="tempsTraitementChart"></canvas>
                </div>
            </div>
        </div>
    )
}