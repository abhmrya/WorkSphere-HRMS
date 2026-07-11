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
        "department"
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
        "designation",
        "user__first_name",
        "user__last_name",
    ]

    filterset_fields = [
        "department",
        "status",
    ]

    ordering_fields = [
        "salary",
        "joining_date",
        "created_at",
    ]