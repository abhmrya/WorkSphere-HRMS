from rest_framework.routers import DefaultRouter

from .views import DesignationViewSet


router = DefaultRouter()

router.register(
    "designations",
    DesignationViewSet,
    basename="designation",
)

urlpatterns = router.urls