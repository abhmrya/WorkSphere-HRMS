from rest_framework import serializers

from .models import Employee

class EmployeeSerializer(serializers.ModelSerializer):
    employee_name = serializers.CharField(source  = "user.first_name",read_only=True)
    department_name = serializers.CharField(source="department.name",read_only = True)

    class Meta:
        model = Employee
        fields="__all__"
        read_only_fields = ("id","created_at","updated_at")

    def validate_employee_id(self,value):
        value = value.strip().upper()
        qs = Employee.objects.filter(employee_id=value)

        if self.instance:
            qs = qs.exclude(id = self.instance.id)

        if qs.exists():
            raise serializers.ValidationError("Employee ID already exists.")

        return value
    
    def validate_salary(self,value):
        if value<=0:
            raise serializers.ValidationError("salary must e greater than 0.")
        
        return value

    # def validate(self, attrs):

    #     joining_date = attrs.get("joining_date")

    #     relieving_date = attrs.get("relieving_date")

    #     if (
    #         joining_date
    #         and relieving_date
    #         and relieving_date < joining_date
    #     ):
    #         raise serializers.ValidationError({
    #             "relieving_date":
    #             "Relieving date cannot be before joining date."
    #         })

    #     return attrs