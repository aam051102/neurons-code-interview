from django.urls import path
from . import views

urlpatterns = [
    path("", views.findSurvivor),
    path("create", views.createSurvivor),
]