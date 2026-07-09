from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import serializers
from rest_framework.permissions import AllowAny
from .serializers import RegisterSerializer

class HealthCheckAPIView(APIView):

    permission_classes = [AllowAny]

    def get(self, request):
        return Response(
            {
                "message": "WorkSphere API Running Successfully 🚀"
            }
        )
    
class RegisterAPIView(APIView):

    permission_classes = [AllowAny]

    def post(self, request):
        print("===== REGISTER API HIT =====")

        serializer = RegisterSerializer(data=request.data)
        print("serializer : ",serializer)
        print('serializer.is_valid : ',serializer.is_valid())
        if serializer.is_valid(raise_exception=True):

            user = serializer.save()
            print("user : ",user)

            return Response(
                {
                    "message": "User registered successfully.",
                    "data": serializer.data
                },
                status=status.HTTP_201_CREATED
            )
