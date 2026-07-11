from rest_framework import serializers

from .models import Department


class DepartmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Department
        fields = "__all__"
        read_only_fields = ("id", "created_at", "updated_at")

    # Name Validation
    def validate_name(self, value):

        value = value.strip()

        if len(value) < 3:
            raise serializers.ValidationError(
                "Department name must be at least 3 characters."
            )

        return value

    # Code Validation
    def validate_code(self, value):

        value = value.strip().upper()

        if len(value) < 2:
            raise serializers.ValidationError(
                "Department code must be at least 2 characters."
            )

        return value

    # Object Level Validation
    def validate(self, attrs):

        name = attrs.get("name", "").strip()
        code = attrs.get("code", "").strip().upper()

        department = Department.objects.filter(name__iexact=name)

        if self.instance:
            department = department.exclude(id=self.instance.id)

        if department.exists():
            raise serializers.ValidationError({
                "name": "Department already exists."
            })

        department = Department.objects.filter(code__iexact=code)

        if self.instance:
            department = department.exclude(id=self.instance.id)

        if department.exists():
            raise serializers.ValidationError({
                "code": "Department code already exists."
            })

        return attrs