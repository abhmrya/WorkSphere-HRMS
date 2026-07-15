from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Designation
from .serializers import DesignationSerializer
from core.permissions import IsAdminOrHR

class DesignationViewSet(viewsets.ModelViewSet):

    queryset = Designation.objects.all()

    serializer_class = DesignationSerializer

    permission_classes = [IsAdminOrHR]