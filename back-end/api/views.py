from rest_framework.response import Response
from rest_framework.decorators import api_view
from base.models import Survivor, InventoryItem
from .serializers import SurvivorSerializer, InfectionReportSerializer, InventoryItemSerializer
from django.http import HttpResponse
from .constants import INVENTORY_ITEM_VALUE_MAP

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
        
        # Create inventory
        # NOTE: This is not the safest way of doing things, since the inventory could theoretically fail to be created, causing the endpoint to throw an error, while the user remains in the DB.
        # Also, I don't have enough experience to know what best practice is with Django, but I doubt this is the easiest way to create relations.
        inventory = request.data.get("inventory")

        if inventory and len(inventory) > 0:
            for i, x in enumerate(inventory):
                inventory[i]["owner"] = serializer.data["id"]

            inventorySerializer = InventoryItemSerializer(data=inventory, many=True)
            if inventorySerializer.is_valid():
                inventorySerializer.save()
            else:
                # TODO: Preferably return some proper validation errors here.
                return HttpResponse(status=500)

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

@api_view(["POST"])
def tradeWithSurvivor(request):
    # Get left survivor
    leftSurvivor = Survivor.objects.get(id=request.data.get("leftId"))
    leftSurvivorSerializer = SurvivorSerializer(leftSurvivor)
    if not leftSurvivorSerializer.data:
        return HttpResponse(status=500)

    # Get right survivor
    rightSurvivor = Survivor.objects.get(id=request.data.get("rightId"))
    rightSurvivorSerializer = SurvivorSerializer(rightSurvivor)
    if not rightSurvivorSerializer.data:
        return HttpResponse(status=500)
    
    # Get left inventory
    leftInventory = request.data.get("leftInventory")
    if not leftInventory:
        return HttpResponse(status=500)

    # Get right inventory
    rightInventory = request.data.get("rightInventory")
    if not rightInventory:
        return HttpResponse(status=500)

    # Calculating left balance and make map from itemType to count
    leftBalance = 0
    leftInventoryMap = {}

    for item in leftInventory:
        leftBalance += item["count"] * INVENTORY_ITEM_VALUE_MAP[item["itemType"]]
        leftInventoryMap[item["itemType"]] = item["count"]

    # Ditto right
    rightBalance = 0
    rightInventoryMap = {}
    
    for item in rightInventory:
        rightBalance += item["count"] * INVENTORY_ITEM_VALUE_MAP[item["itemType"]]
        rightInventoryMap[item["itemType"]] = item["count"]

    # All trades must be equal
    if leftBalance != rightBalance:
        return HttpResponse(status=500)

    # Ensure left user actually has the items for trade
    for item in leftSurvivorSerializer.data["inventory"]:
        requestedItemCount = leftInventoryMap[item["itemType"]]
        realItemCount = item["count"]

        if realItemCount < requestedItemCount:
            return HttpResponse(status=500)

    # Ditto right
    for item in rightSurvivorSerializer.data["inventory"]:
        requestedItemCount = rightInventoryMap[item["itemType"]]
        realItemCount = item["count"]

        if realItemCount < requestedItemCount:
            return HttpResponse(status=500)

    # NOTE: Not super stable, but it'll do considering the time constraints
    # Add and remove items for left user
    for item in leftSurvivorSerializer.data["inventory"]:
        realItem = InventoryItem.objects.get(id=item["id"]) # NOTE: Very inefficient, but it throws an error if I try to use the inventory I already fetched from the survivor

        inventorySerializer = InventoryItemSerializer(realItem, data={
            "count": item["count"] - leftInventoryMap[item["itemType"]] + rightInventoryMap[item["itemType"]]
        }, partial=True)

        if inventorySerializer.is_valid():
            inventorySerializer.save()
        else:
            return HttpResponse(status=500)

    # Ditto right user
    for item in rightSurvivorSerializer.data["inventory"]:
        realItem = InventoryItem.objects.get(id=item["id"]) # NOTE: Very inefficient, but it throws an error if I try to use the inventory I already fetched from the survivor

        inventorySerializer = InventoryItemSerializer(realItem, data={
            "count": item["count"] - rightInventoryMap[item["itemType"]] + leftInventoryMap[item["itemType"]]
        }, partial=True)

        if inventorySerializer.is_valid():
            inventorySerializer.save()
        else:
            return HttpResponse(status=500)

    return HttpResponse(status=200)