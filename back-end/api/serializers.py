from rest_framework import serializers
from base.models import Survivor, InfectionReport

class SurvivorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Survivor
        fields = "__all__"
        
class InfectionReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = InfectionReport
        fields = "__all__"