from django.urls import path
from . import views

urlpatterns = [
    path("survivors/list", views.listSurvivors),
    path("survivors/create", views.createSurvivor),
]