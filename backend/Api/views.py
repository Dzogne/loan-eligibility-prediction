from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login as auth_login
from django.contrib.auth.models import User
from django.core import serializers
from rest_framework.permissions import AllowAny
from django.db import IntegrityError
from django.utils import timezone


import json
import numpy as np
import pandas as pd
from datetime import datetime
from django.core.exceptions import ObjectDoesNotExist


# class ApprovalsView(viewsets.ModelViewSet):
# 	queryset = approvals.objects.all()
# 	serializer_class = approvalsSerializers
		
# @api_view(["GET"])
# def approvereject(request):
#     try:
#         # Load models and transformers
#         model = joblib.load("model_final.pkl")
#         scaler = pickle.load(open("loan_scaler.pkl", "rb"))
#         model_columns = pickle.load(open("model_columns.pkl", "rb"))

#         # Get data from request
#         data = JSONParser().parse(request)
        
#         # Extract features from request
#         gender = request.data['gender']
#         married = request.data['married']
#         dependents = request.data['dependents']
#         education = request.data['education']
#         self_employed = request.data['self_employed']
#         applicant_income = request.data['applicant_income']
#         coapplicant_income = request.data['coapplicant_income']
#         loan_amount = request.data['loan_amount']
#         loan_term = request.data['loan_term']
#         credit_history = request.data['credit_history']

#         # Transformation
#         input_data = pd.DataFrame({
#             "Gender": [gender],
#             "Married": [married],
#             "Dependents": [dependents],
#             "Education": [education],
#             "Self_Employed": [self_employed],
#             "ApplicantIncome": [applicant_income],
#             "CoapplicantIncome": [coapplicant_income],
#             "LoanAmount": [loan_amount],
#             "Loan_Amount_Term": [loan_term],
#             "Credit_History": [credit_history],
#         })

#         # Encodage
#         input_data = pd.get_dummies(input_data, dtype=int)

#         # Add missing columns with 0
#         for col in model_columns:
#             if col not in input_data.columns:
#                 input_data[col] = 0

#         # Reorder columns
#         input_data = input_data[model_columns]

#         # Normalization
#         input_data = scaler.transform(input_data)

#         # Prediction
#         result = model.predict(input_data)[0]
#         proba = model.predict_proba(input_data)[0][1]

#         if result == 1:
#             return JsonResponse({
#                 'status': 'Eligible',
#                 'probability': proba * 100
#             }, safe=False)
#         else:
#             return JsonResponse({
#                 'status': 'Not Eligible',
#                 'probability': (1 - proba) * 100
#             }, safe=False)

#     except Exception as e:
#         return JsonResponse({
#             'error': str(e)
#         }, status=400)

# views.py
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from .models import DemandeEvaluation
from .serializers import DemandeEvaluationSerializer
import json
import joblib
import pandas as pd
import numpy as np
from django.conf import settings
import os
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.db.models import Count, Avg, Q
from django.utils import timezone
from datetime import datetime, timedelta

# Fonction pour charger le modèle ML (à adapter selon votre modèle)
def charger_modele_ml():
    try:
        # Remplacez par le chemin vers votre modèle sauvegardé
        model_path = os.path.join(settings.BASE_DIR, 'Api', 'model_final.pkl')
        model = joblib.load(model_path)
        return model
    except Exception as e:
        print(f"Erreur lors du chargement du modèle: {e}")
        return None

# Fonction pour préparer les données pour le modèle ML
def preparer_donnees_pour_ml(demande):
    try:
        # Load column transformer
        scaler_path = os.path.join(settings.BASE_DIR, 'Api', 'loan_scaler.pkl')
        columns_path = os.path.join(settings.BASE_DIR, 'Api', 'model_columns.pkl')
        
        # Load preprocessing objects
        scaler = joblib.load(scaler_path)
        model_columns = joblib.load(columns_path)
        
        # Create initial DataFrame
        data = {
            'Gender': [demande.sexe],
            'Married': [demande.marie],
            'Dependents': [demande.dependants],
            'Education': [demande.niveau_education],
            'Self_Employed': [demande.est_independant],
            'ApplicantIncome': [float(demande.revenu_principal)],
            'CoapplicantIncome': [float(demande.revenu_coapplicant)],
            'LoanAmount': [float(demande.montant_pret) / 1000],  # Convert to thousands
            'Loan_Amount_Term': [int(demande.duree_pret)],
            'Credit_History': [float(demande.historique_credit)]
        }
        
        df = pd.DataFrame(data)
        
        # One-hot encode categorical variables
        df_encoded = pd.get_dummies(df, columns=['Gender', 'Married', 'Dependents', 'Education', 'Self_Employed'])
        
        # Add missing columns with 0
        for col in model_columns:
            if col not in df_encoded.columns:
                df_encoded[col] = 0
        
        # Reorder columns to match model expectations
        df_encoded = df_encoded[model_columns]
        
        # Scale numerical features
        df_scaled = scaler.transform(df_encoded)
        
        return df_scaled
        
    except Exception as e:
        print(f"Erreur lors du prétraitement: {e}")
        raise

@api_view(['POST'])
@permission_classes([AllowAny])
def evaluer_eligibilite(request):
    try:
        print("\nReceived request data:", request.data)
        
        # Récupération des données du formulaire
        data = request.data
        
        # Validation et création de la demande
        serializer = DemandeEvaluationSerializer(data=data)
        
        if serializer.is_valid():
            print("\nSerializer data:", serializer.validated_data)
            
            # Sauvegarder la demande
            demande = serializer.save()
            print("\nCreated demande:", demande)
			# Sauvegarder la demande avec l'utilisateur si connecté
            if request.user.is_authenticated:
                demande.utilisateur = request.user
                demande.save()
            
            
            # Charger le modèle ML
            model = charger_modele_ml()
            
            if model is None:
                return Response({
                    'error': 'Modèle ML non disponible',
                    'message': 'Le service d\'évaluation est temporairement indisponible'
                }, status=status.HTTP_503_SERVICE_UNAVAILABLE)
            
            # Préparer les données pour la prédiction
            features = preparer_donnees_pour_ml(demande)
            print("\nPreprocessed features:", features)
            
            # Faire la prédiction
            prediction = model.predict(features)[0]
            probability = model.predict_proba(features)[0]
            
            # Mettre à jour la demande avec les résultats
            demande.eligible = bool(prediction)
            demande.score_eligibilite = float(probability[1])  # Probabilité d'être éligible
            demande.save()
            
            # Préparer la réponse
            resultat = {
                'id': demande.id,
                'nom_complet': f"{demande.prenom} {demande.nom}",
                'eligible': demande.eligible,
                'score_eligibilite': round(demande.score_eligibilite * 100, 2),
                'montant_pret': float(demande.montant_pret),
                'duree_pret': demande.duree_pret,
                'date_evaluation': demande.date_creation.strftime('%d/%m/%Y %H:%M'),
                'message': 'Éligible au prêt' if demande.eligible else 'Non éligible au prêt',
                'recommandations': generer_recommandations(demande)
            }
            
            return Response({
                'success': True,
                'data': resultat
            }, status=status.HTTP_200_OK)
            
        else:
            print("\nSerializer errors:", serializer.errors)
            return Response({
                'error': 'Données invalides',
                'details': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)
            
    except Exception as e:
        print("\n\nError occurred:")
        print(f"Error type: {type(e)}")
        print(f"Error message: {str(e)}")
        print(f"\nFull traceback:\n{traceback.format_exc()}")
        return Response({
            'error': 'Erreur interne',
            'message': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

def generer_recommandations(demande):
    """Génère des recommandations basées sur les données de la demande"""
    recommandations = []
    
    if not demande.eligible:
        # Recommandations pour améliorer l'éligibilité
        if float(demande.historique_credit) == 0.0:
            recommandations.append("Améliorez votre historique de crédit en remboursant vos dettes à temps")
        
        if float(demande.revenu_principal) < 30000:  # Seuil exemple
            recommandations.append("Augmentez vos revenus ou ajoutez un co-demandeur avec des revenus stables")
        
        ratio_pret_revenu = float(demande.montant_pret) / float(demande.revenu_principal)
        if ratio_pret_revenu > 10:  # Si le prêt représente plus de 10x le revenu annuel
            recommandations.append("Réduisez le montant du prêt demandé ou augmentez la durée de remboursement")
    else:
        recommandations.append("Félicitations ! Vous êtes éligible au prêt demandé")
        recommandations.append("N'hésitez pas à comparer les offres de différentes banques")
    
    return recommandations

# fonction pour l'authentification
@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    try:
        data = request.data
        identifier = data.get('identifier')  # Can be email or username
        password = data.get('password')

        if not identifier or not password:
            return Response({
                'success': False,
                'error': 'Identifiant et mot de passe requis'
            }, status=status.HTTP_400_BAD_REQUEST)

        # Try to authenticate with the identifier
        user = authenticate(request, username=identifier, password=password)
        
        if not user:
            # Try to find user by email
            try:
                user_obj = User.objects.get(email=identifier)
                user = authenticate(request, username=user_obj.username, password=password)
            except User.DoesNotExist:
                pass

        if user and user.is_active:
            auth_login(request, user)
            
            # Get or create token for the user
            token, created = Token.objects.get_or_create(user=user)
            
            return Response({
                'success': True,
                'message': 'Connexion réussie',
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                },
                'token': token.key
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                'success': False,
                'error': 'Identifiants incorrects'
            }, status=status.HTTP_401_UNAUTHORIZED)

    except Exception as e:
        return Response({
            'success': False,
            'error': 'Erreur interne du serveur'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
    try:
        print(f"Données reçues: {request.data}")  # Debug
        
        data = request.data
        
        # Required fields
        prenom = data.get('prenom', '').strip()
        nom = data.get('nom', '').strip()
        email = data.get('email', '').strip()
        password = data.get('password', '')
        telephone = data.get('telephone', '').strip()
        
        # Optional fields
        entreprise = data.get('entreprise', '').strip()
        position = data.get('position', '').strip()
        numero_agreement = data.get('numero_agreement', '').strip()
        ville = data.get('ville', '').strip()
        
        # Validation des données
        required_fields = ['prenom', 'nom', 'email', 'password']
        missing_fields = []
        
        for field in required_fields:
            if not data.get(field, '').strip():
                missing_fields.append(field)
        
        if missing_fields:
            return Response({
                'success': False,
                'error': f'Les champs suivants sont obligatoires: {", ".join(missing_fields)}'
            }, status=status.HTTP_400_BAD_REQUEST)

        # Validation de l'email
        if '@' not in email:
            return Response({
                'success': False,
                'error': 'Format d\'email invalide'
            }, status=status.HTTP_400_BAD_REQUEST)

        # Vérifier si l'utilisateur existe déjà
        if User.objects.filter(email=email).exists():
            return Response({
                'success': False,
                'error': 'Cette adresse email est déjà utilisée'
            }, status=status.HTTP_400_BAD_REQUEST)

        # Créer un nom d'utilisateur unique
        base_username = f"{prenom.lower()}.{nom.lower()}"
        username = base_username
        counter = 1
        
        while User.objects.filter(username=username).exists():
            username = f"{base_username}.{counter}"
            counter += 1

        print(f"Création de l'utilisateur avec username: {username}")  # Debug

        # Créer l'utilisateur
        try:
            user = User.objects.create_user(
                username=username,
                email=email,
                password=password,
                first_name=prenom,
                last_name=nom
            )
            print(f"Utilisateur créé avec succès: {user.id}")  # Debug

            # Créer le token pour l'utilisateur
            token, created = Token.objects.get_or_create(user=user)

            return Response({
                'success': True,
                'message': 'Compte créé avec succès',
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                },
                'token': token.key,
                'additional_info': {
                    'entreprise': entreprise,
                    'position': position,
                    'numero_agreement': numero_agreement,
                    'ville': ville,
                    'telephone': telephone
                }
            }, status=status.HTTP_201_CREATED)

        except IntegrityError as e:
            print(f"Erreur IntegrityError: {str(e)}")
            return Response({
                'success': False,
                'error': 'Erreur lors de la création du compte - données en conflit'
            }, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        print(f"Erreur dans register_view: {str(e)}")
        print(f"Traceback complet:\n{traceback.format_exc()}")
        return Response({
            'success': False,
            'error': f'Erreur lors de la création du compte: {str(e)}'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def logout_view(request):
    try:
        auth_logout(request)
        return Response({
            'success': True,
            'message': 'Déconnexion réussie'
        }, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({
            'success': False,
            'error': 'Erreur lors de la déconnexion'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@login_required
def user_info(request):
    try:
        user = request.user
        return Response({
            'success': True,
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
            }
        }, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({
            'success': False,
            'error': 'Utilisateur non authentifié'
        }, status=status.HTTP_401_UNAUTHORIZED)

# Fonction pour les statistiques du tableau de bord
@api_view(['GET'])
@login_required
def get_statistiques(request):
    try:
        today = timezone.now().date()
        start_of_month = today.replace(day=1)
        
        # Évaluations aujourd'hui
        evaluations_aujourdhui = DemandeEvaluation.objects.filter(
            date_creation__date=today,
            utilisateur=request.user
        ).count()

        # Demandes ce mois-ci
        demandes_mois_ci = DemandeEvaluation.objects.filter(
            date_creation__date__gte=start_of_month,
            utilisateur=request.user
        ).count()

        # Taux d'éligibilité moyen
        avg_score = DemandeEvaluation.objects.filter(
            utilisateur=request.user,
            score_eligibilite__isnull=False
        ).aggregate(avg_score=Avg('score_eligibilite'))
        
        taux_eligibilite_moyen = round(avg_score['avg_score'] * 100, 1) if avg_score['avg_score'] else 0

        # Temps moyen de traitement (simulation - à adapter selon votre logique)
        temps_moyen = "2.3s"  # Vous pouvez calculer cela basé sur vos métriques

        return Response({
            'evaluationsAujourdhui': evaluations_aujourdhui,
            'tempsMoyenTraitement': temps_moyen,
            'demandesMoisCi': demandes_mois_ci,
            'tauxEligibiliteMoyen': taux_eligibilite_moyen
        }, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({
            'error': 'Erreur lors du chargement des statistiques'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@login_required
def get_historique(request):
    try:
        # Récupérer les évaluations de l'utilisateur connecté
        evaluations = DemandeEvaluation.objects.filter(
            utilisateur=request.user
        ).order_by('-date_creation')

        # Sérialiser les données
        data = []
        for evaluation in evaluations:
            data.append({
                'id': evaluation.id,
                'nom': evaluation.nom,
                'prenom': evaluation.prenom,
                'montant_pret': float(evaluation.montant_pret),
                'duree_pret': evaluation.duree_pret,
                'score_eligibilite': evaluation.score_eligibilite,
                'eligible': evaluation.eligible,
                'date_creation': evaluation.date_creation.isoformat(),
            })

        return Response(data, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({
            'error': 'Erreur lors du chargement de l\'historique'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@login_required
def get_evaluation_detail(request, evaluation_id):
    try:
        evaluation = DemandeEvaluation.objects.get(
            id=evaluation_id,
            utilisateur=request.user
        )
        
        serializer = DemandeEvaluationSerializer(evaluation)
        return Response({
            'success': True,
            'data': serializer.data
        }, status=status.HTTP_200_OK)

    except DemandeEvaluation.DoesNotExist:
        return Response({
            'error': 'Évaluation non trouvée'
        }, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({
            'error': 'Erreur lors du chargement des détails'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

