# from django.urls import path, include
# from . import views
# from rest_framework import routers

# router = routers.DefaultRouter()
# router.register('MyAPI', views.ApprovalsView)
# urlpatterns = [
#     path('api/', include(router.urls)),
#     path('status/', views.approvereject),
 
# ]
 
from django.urls import path
from . import views

urlpatterns = [
    path('api/evaluer/', views.evaluer_eligibilite, name='evaluer_eligibilite'),
    
     # Authentification
    path('api/auth/login/', views.login_view, name='login'),
    path('api/auth/register/', views.register_view, name='register'),
    path('api/auth/logout/', views.logout_view, name='logout'),
    path('api/auth/user/', views.user_info, name='user_info'),
    
    # Tableau de bord
    path('api/statistiques/', views.get_statistiques, name='statistiques'),
    path('api/historique/', views.get_historique, name='historique'),
    path('api/evaluation/<int:evaluation_id>/', views.get_evaluation_detail, name='evaluation_detail'),
    
    # Évaluation (existant)
    path('api/evaluer/', views.evaluer_eligibilite, name='evaluer_eligibilite'),

]