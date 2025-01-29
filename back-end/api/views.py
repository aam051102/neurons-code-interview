from rest_framework.response import Response
from rest_framework.decorators import api_view
from base.models import Survivor
from .serializers import SurvivorSerializer

@api_view(['GET'])
def findSurvivor(request):
    items = Survivor.objects.all()
    serializer = SurvivorSerializer(items, many=True)
    return Response(serializer.data)

@api_view(["POST"])
def createSurvivor(request):
    serializer = SurvivorSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)