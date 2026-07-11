from django.contrib import admin
from .models import Employee
# Register your models here.
# admin.site.register(Employee)

from django.contrib import admin
from .models import Employee


@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    pass