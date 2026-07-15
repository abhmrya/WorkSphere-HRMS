from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter


from .models import Employee
from .serializers import EmployeeSerializer
# from .pagination import EmployeePagination
from core.permissions import IsHR,IsAdminOrHR
from core.pagination import DefaultPagination

class EmployeeViewSet(viewsets.ModelViewSet):

    permission_classes = [IsAdminOrHR]

    queryset = Employee.objects.select_related(
        "user",
        "department",
        "designation",
    )

    serializer_class = EmployeeSerializer

    pagination_class = DefaultPagination

    filter_backends = [
        DjangoFilterBackend,
        SearchFilter,
        OrderingFilter,
    ]

    search_fields = [
        "employee_id",
        "user__first_name",
        "user__last_name",
        "department__name",
        "designation__name",
    ]

    filterset_fields = [
        "department",
        "designation",
        "status",
    ]

    ordering_fields = [
        "employee_id",
        "salary",
        "joining_date",
        "created_at",
    ]

    ordering = ["employee_id"]