from rest_framework import serializers

from .models import Designation


class DesignationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Designation
        fields = "__all__"
        read_only_fields = ("id", "created_at", "updated_at")

    def validate_name(self, value):

        value = value.strip()

        if len(value) < 2:
            raise serializers.ValidationError(
                "Designation name must be at least 2 characters."
            )

        return value

    def validate_code(self, value):

        value = value.strip().upper()

        if len(value) < 2:
            raise serializers.ValidationError(
                "Designation code must be at least 2 characters."
            )

        return value

    def validate(self, attrs):

        name = attrs.get("name").strip()
        code = attrs.get("code").strip().upper()

        qs = Designation.objects.filter(name__iexact=name)

        if self.instance:
            qs = qs.exclude(id=self.instance.id)

        if qs.exists():
            raise serializers.ValidationError({
                "name": "Designation already exists."
            })

        qs = Designation.objects.filter(code__iexact=code)

        if self.instance:
            qs = qs.exclude(id=self.instance.id)

        if qs.exists():
            raise serializers.ValidationError({
                "code": "Designation code already exists."
            })

        return attrs