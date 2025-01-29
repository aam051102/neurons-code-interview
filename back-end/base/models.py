from django.db import models

class Survivor(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=255)
    age = models.IntegerField()
    gender = models.IntegerField()
    latitude = models.CharField(max_length=20)
    longitude = models.CharField(max_length=20)

class InventoryItem(models.Model):
    id = models.IntegerField(primary_key=True)
    owner = models.ForeignKey(Survivor, on_delete=models.CASCADE)
    itemType = models.IntegerField()
    count = models.IntegerField()

class InfectionReport(models.Model):
    reporter = models.ForeignKey(Survivor, on_delete=models.CASCADE, related_name="reporter")
    reported = models.ForeignKey(Survivor, on_delete=models.CASCADE, related_name="reported")