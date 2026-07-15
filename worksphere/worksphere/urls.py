from django.contrib import admin
from django.urls import path,include

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/v1/auth/", include("accounts.urls")),
    path("api/v1/", include("departments.urls")),
    path("api/v1/", include("designation.urls")),
    path("api/v1/", include("employees.urls")),
    path("api/v1/",include("dashboard.urls")),
]
