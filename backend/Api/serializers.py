from rest_framework import serializers
from . models import DemandeEvaluation

# class approvalsSerializers(serializers.ModelSerializer):
# 	class Meta:
# 		model=approvals
# 		fields='__all__'

# serializers.py
from rest_framework import serializers
from .models import DemandeEvaluation

class DemandeEvaluationSerializer(serializers.ModelSerializer):
    class Meta:
        model = DemandeEvaluation
        fields = '__all__'
        read_only_fields = ['eligible', 'score_eligibilite', 'date_creation']