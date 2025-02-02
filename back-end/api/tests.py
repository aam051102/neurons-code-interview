from django.test import TestCase
from . import views
from .serializers import SurvivorSerializer
from rest_framework.test import APITestCase
from base.models import Survivor

class SurvivorsTestCase(APITestCase):
    def test_survivor_create(self):
        """Tests creating a survivor without an inventory."""
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

    def test_survivor_find(self):
        """Tests getting a specific survivor by ID."""
        createData = {
            "name": "John Smith",
            "age": 18,
            "gender": 0,
            "latitude": "1.0000",
            "longitude": "180.0000"
        }
        createResponse = self.client.post("/survivors/create", createData)

        response = self.client.get("/survivors/find", { "id": createResponse.data["id"] })
        self.assertEqual(response.status_code, 200)

        newSurvivorSerializer = SurvivorSerializer(response.data)

        self.assertEqual(newSurvivorSerializer.data["name"], createData["name"])
        self.assertEqual(newSurvivorSerializer.data["age"], createData["age"])
        self.assertEqual(newSurvivorSerializer.data["gender"], createData["gender"])
        self.assertEqual(newSurvivorSerializer.data["latitude"], createData["latitude"])
        self.assertEqual(newSurvivorSerializer.data["longitude"], createData["longitude"])