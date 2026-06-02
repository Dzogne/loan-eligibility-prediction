from django.db import models
from django.utils import timezone

# Create your models here.
class Profile(models.Model):
    user = models.OneToOneField('auth.User', on_delete=models.CASCADE, related_name='profile')
    entreprise = models.CharField(max_length=100, blank=True, default='')
    position = models.CharField(max_length=100, blank=True, default='')
    numero_agreement = models.CharField(max_length=50, blank=True, default='')
    ville = models.CharField(max_length=100, blank=True, default='')
    telephone = models.CharField(max_length=20, blank=True, default='')

    def __str__(self):
        return f"Profile de {self.user.username}"

# from django.db import models

# # Create your models here.
# class approvals(models.Model):
# 	GENDER_CHOICES = (
# 		('Male', 'Male'),
# 		('Female', 'Female')
# 	)
# 	MARRIED_CHOICES = (
# 		('Yes', 'Yes'),
# 		('No', 'No')
# 	)
# 	GRADUATED_CHOICES = (
# 		('Graduate', 'Graduated'),
# 		('Not_Graduate', 'Not_Graduate')
# 	)
# 	SELFEMPLOYED_CHOICES = (
# 		('Yes', 'Yes'),
# 		('No', 'No')
# 	)
# 	firstname=models.CharField(max_length=15)
# 	lastname=models.CharField(max_length=15)
# 	dependants=models.IntegerField(default=0)
# 	applicantincome=models.IntegerField(default=0)
# 	coapplicatincome=models.IntegerField(default=0)
# 	loanamt=models.IntegerField(default=0)
# 	loanterm=models.IntegerField(default=0)
# 	credithistory=models.IntegerField(default=0)
# 	gender=models.CharField(max_length=15, choices=GENDER_CHOICES)
# 	married=models.CharField(max_length=15, choices=MARRIED_CHOICES)
# 	graduatededucation=models.CharField(max_length=15, choices=GRADUATED_CHOICES)
# 	selfemployed=models.CharField(max_length=15, choices=SELFEMPLOYED_CHOICES)

# 	def __str__(self):
# 		return '{}, {}'.format(self.lastname, self.firstname)




class DemandeEvaluation(models.Model):
    SEXE_CHOICES = [
        ('Male', 'Homme'),
        ('Female', 'Femme'),
    ]
    
    STATUT_MARITAL_CHOICES = [
        ('Yes', 'Marié(e)'),
        ('No', 'Célibataire'),
    ]
    
    DEPENDANTS_CHOICES = [
        ('0', '0'),
        ('1', '1'),
        ('2', '2'),
        ('3+', '3+'),
    ]
    
    EDUCATION_CHOICES = [
        ('Graduate', 'Diplômé(e)'),
        ('Not Graduate', 'Non diplômé(e)'),
    ]
    
    INDEPENDANT_CHOICES = [
        ('Yes', 'Oui'),
        ('No', 'Non'),
    ]
    
    HISTORIQUE_CHOICES = [
        ('1.0', 'Bon'),
        ('0.0', 'Mauvais'),
    ]
    
    # Informations personnelles
    nom = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100)
    date_naissance = models.DateField()
    sexe = models.CharField(max_length=10, choices=SEXE_CHOICES)
    marie = models.CharField(max_length=10, choices=STATUT_MARITAL_CHOICES)
    dependants = models.CharField(max_length=5, choices=DEPENDANTS_CHOICES)
    niveau_education = models.CharField(max_length=20, choices=EDUCATION_CHOICES)
    est_independant = models.CharField(max_length=10, choices=INDEPENDANT_CHOICES)
    
    # Informations financières
    revenu_principal = models.DecimalField(max_digits=12, decimal_places=2)
    revenu_coapplicant = models.DecimalField(max_digits=12, decimal_places=2)
    montant_pret = models.DecimalField(max_digits=12, decimal_places=2)
    duree_pret = models.IntegerField()  # en mois
    historique_credit = models.CharField(max_length=5, choices=HISTORIQUE_CHOICES)
    
    # Résultat de l'évaluation
    eligible = models.BooleanField(null=True, blank=True)
    score_eligibilite = models.FloatField(null=True, blank=True)
    
    # Métadonnées
    date_creation = models.DateTimeField(auto_now_add=True)
    utilisateur = models.ForeignKey('auth.User', on_delete=models.CASCADE, null=True, blank=True)
    
    class Meta:
        db_table = 'demande_evaluation'
        verbose_name = 'Demande d\'évaluation'
        verbose_name_plural = 'Demandes d\'évaluation'
    
    def __str__(self):
        return f"{self.prenom} {self.nom} - {self.date_creation.strftime('%d/%m/%Y')}"

