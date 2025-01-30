from rest_framework.response import Response
from rest_framework.decorators import api_view
from base.models import Survivor
from .serializers import SurvivorSerializer, InfectionReportSerializer
from django.http import HttpResponse

@api_view(['GET'])
def listSurvivors(request):
    items = Survivor.objects.all()
    serializer = SurvivorSerializer(items, many=True)
    return Response(serializer.data)

@api_view(["POST"])
def createSurvivor(request):
    serializer = SurvivorSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    else:
        # TODO: Preferably return some proper validation errors here.
        return HttpResponse(status=500)
    return Response(serializer.data)

@api_view(["PATCH"])
def updateSurvivor(request):
    item = Survivor.objects.get(id=request.data.get("id"))
    serializer = SurvivorSerializer(item, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
    else:
        # TODO: Preferably return some proper validation errors here.
        return HttpResponse(status=500)
    return Response(serializer.data)


@api_view(['GET'])
def findSurvivor(request):
    item = Survivor.objects.get(id=int(request.GET.get("id", 0)))
    serializer = SurvivorSerializer(item)
    return Response(serializer.data)

@api_view(["POST"])
def reportSurvivor(request):
    # TODO: Check whether or not survivor exists, and whether or not the survivor that's making the report has made a report before.
    serializer = InfectionReportSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    else:
        # TODO: Preferably return some proper validation errors here.
        return HttpResponse(status=500)
    return Response(serializer.data)