from django.urls import path
from .views import HealthCheckAPIView, RegisterAPIView,LoginAPIView

urlpatterns = [
    path("health/", HealthCheckAPIView.as_view(), name="health"),
    path("register/", RegisterAPIView.as_view(), name="register"),
    path("login/", LoginAPIView.as_view(), name="login")
]