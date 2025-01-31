from django.urls import path
from . import views

urlpatterns = [
    path("survivors/list", views.listSurvivors),
    path("survivors/find", views.findSurvivor),
    path("survivors/create", views.createSurvivor),
    path("survivors/update", views.updateSurvivor),
    path("survivors/report", views.reportSurvivor),
    path("survivors/trade", views.tradeWithSurvivor),
]