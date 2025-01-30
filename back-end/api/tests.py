from django.test import TestCase
from . import views
from .serializers import SurvivorSerializer
from rest_framework.test import APITestCase
from base.models import Survivor

class SurvivorsTestCase(APITestCase):
    def test_survivor_create(self):
        createData = {
            "name": "John Smith",
            "age": 18,
            "gender": 0,
            "latitude": "1.0000",
            "longitude": "180.0000"
        }

        response = self.client.post("/survivors/create", createData)
        self.assertEqual(response.status_code, 200)

        newSurvivor = Survivor.objects.get(id=response.data["id"])
        newSurvivorSerializer = SurvivorSerializer(newSurvivor)
        
        self.assertEqual(newSurvivorSerializer.data["name"], createData["name"])
        self.assertEqual(newSurvivorSerializer.data["age"], createData["age"])
        self.assertEqual(newSurvivorSerializer.data["gender"], createData["gender"])
        self.assertEqual(newSurvivorSerializer.data["latitude"], createData["latitude"])
        self.assertEqual(newSurvivorSerializer.data["longitude"], createData["longitude"])