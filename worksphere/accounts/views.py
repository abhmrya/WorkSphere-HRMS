from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import serializers
from rest_framework.permissions import AllowAny,IsAdminUser,IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken



from .serializers import (RegisterSerializer,LoginSerializer,UserSerializer,
                          LogoutSerializer,)


from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import AuthenticationFailed

# def get_tokens_for_user(user):
#     if not user.is_active:
#       raise AuthenticationFailed("User is not active")

#     refresh = RefreshToken.for_user(user)

#     return {
#         'refresh': str(refresh),
#         'access': str(refresh.access_token),
#     }


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


class LoginAPIView(APIView):

    permission_classes = [AllowAny]

    def post(self,request):
        serializers = LoginSerializer(data = request.data)
        serializers.is_valid(raise_exception=True)

        user = serializers.validated_data["user"]
        print(user)

        refresh = RefreshToken.for_user(user)

        return Response(
            {
                "message" : "Login successful.",
                'data':{
                    "user": UserSerializer(user).data,
                    "access":str(refresh.access_token),
                    "refresh":str(refresh)
                },
                
            },
            status=status.HTTP_200_OK
        )
    
class LogoutAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = LogoutSerializer(data=request.data)

        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(
            {
                "message": "Successfully logged out."
            },
            status=status.HTTP_200_OK,
        )
    
class MeAPIView(APIView):
   
    permission_classes = [IsAuthenticated]

    def get(self,request):

        serializer = UserSerializer(request.user)

        return Response(
            {
                "message": "User fetched successfully.",
                "data": serializer.data,
            },
            status=status.HTTP_200_OK,
        )