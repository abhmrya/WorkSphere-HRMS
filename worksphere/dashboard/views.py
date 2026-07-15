from rest_framework.views import APIView
from rest_framework.response import Response
from  django.db.models import Count

from employees.models import Employee
from departments.models import Department
from designation.models import Designation

from core.permissions import IsAdminOrHR

class DashboardAPIView(APIView):

    permission_classes=[IsAdminOrHR]

    def get(self, request):

        dashboard = {

            "total_employees":
                Employee.objects.count(),

            "active_employees":
                Employee.objects.filter(
                    status=Employee.Status.ACTIVE
                ).count(),

            "inactive_employees":
                Employee.objects.filter(
                    status=Employee.Status.INACTIVE
                ).count(),

            "total_departments":
                Department.objects.count(),

            "total_designations":
                Designation.objects.count(),
        }

        # Department wise employee count
        department_summary = Department.objects.annotate(
            total=Count("employees")
        ).values(
            "id",
            "name",
            "total",
        )

        # Gender wise employee count
        gender_summary = Employee.objects.values(
            "gender"
        ).annotate(
            total=Count("id")
        )

        # Last 5 joined employees
        recent_employees = Employee.objects.select_related(
            "user",
            "department",
            "designation",
        ).order_by(
            "-joining_date"
        )[:5]

        recent_data = []

        for employee in recent_employees:

            recent_data.append({

                "employee_id": employee.employee_id,

                "name": f"{employee.user.first_name} {employee.user.last_name}",

                "department": employee.department.name if employee.department else None,

                "designation": employee.designation.name if employee.designation else None,

                "joining_date": employee.joining_date,

            })

        return Response({

            "dashboard": dashboard,

            "department_summary": department_summary,

            "gender_summary": gender_summary,

            "recent_employees": recent_data,

        })