from rest_framework import serializers
from base.models import Survivor, InfectionReport, InventoryItem

class InfectionReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = InfectionReport
        fields = "__all__"

class InventoryItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = InventoryItem
        fields = "__all__"

class SurvivorSerializer(serializers.ModelSerializer):
    sentReports = InfectionReportSerializer(many=True, read_only=True)
    receivedReports = InfectionReportSerializer(many=True, read_only=True)
    inventory = InventoryItemSerializer(many=True, read_only=True)

    class Meta:
        model = Survivor
        fields = ["id", "name", "age", "gender", "longitude", "latitude", "inventory", "sentReports", "receivedReports"]
