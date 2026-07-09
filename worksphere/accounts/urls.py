from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (HealthCheckAPIView, RegisterAPIView,
MeAPIView,
LoginAPIView)

urlpatterns = [
    path("health/", HealthCheckAPIView.as_view(), name="health"),
    path("register/", RegisterAPIView.as_view(), name="register"),
    path("login/", LoginAPIView.as_view(), name="login"),
    path("me/", MeAPIView.as_view(), name="me"),

    path("refresh/",TokenRefreshView.as_view(),name="token_refresh",),


]