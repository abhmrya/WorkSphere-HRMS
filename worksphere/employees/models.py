from django.db import models

from accounts.models import User
from departments.models import Department
from designation.models import Designation


class Employee(models.Model):

    class Gender(models.TextChoices):
        MALE = "MALE", "Male"
        FEMALE = "FEMALE", "Female"
        OTHER = "OTHER", "Other"

    class Status(models.TextChoices):
        ACTIVE = "ACTIVE", "Active"
        INACTIVE = "INACTIVE", "Inactive"

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="employee",
    )

    employee_id = models.CharField(
        max_length=20,
        unique=True,
    )

    department = models.ForeignKey(
        Department,
        on_delete=models.SET_NULL,
        null=True,
        related_name="employees",
    )

    designation = models.ForeignKey(
        Designation,
        on_delete=models.SET_NULL,
        null=True,
        related_name="employees",
    )

    salary = models.DecimalField(
        max_digits=10,
        decimal_places=2,
    )

    joining_date = models.DateField()

    date_of_birth = models.DateField()

    gender = models.CharField(
        max_length=10,
        choices=Gender.choices,
    )

    address = models.TextField()

    city = models.CharField(
        max_length=100,
    )

    state = models.CharField(
        max_length=100,
    )

    pincode = models.CharField(
        max_length=10,
    )

    emergency_contact = models.CharField(
        max_length=12,
        blank=True,
    )

    photo = models.ImageField(
        upload_to="employees/",
        blank=True,
        null=True,
    )

    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.ACTIVE,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    class Meta:
        ordering = ["employee_id"]

    def __str__(self):
        return f"{self.employee_id} - {self.user.first_name}"


# from django.db import models

# from accounts.models import User
# from departments.models import Department


# class Employee(models.Model):

#     class Gender(models.TextChoices):
#         MALE = "MALE", "Male"
#         FEMALE = "FEMALE", "Female"
#         OTHER = "OTHER", "Other"
        
#     class Status(models.TextChoices):
#         ACTIVE = "ACTIVE","Active"
#         INACTIVE = "INACTIVE","Inactive"

#     user = models.OneToOneField(User,on_delete=models.CASCADE,related_name="employee")
#     employee_id = models.CharField(max_length=20,unique=True)
#     department = models.ForeignKey(Department,on_delete=models.SET_NULL,null=True,blank=True,related_name='employees')
#     designation = models.CharField(max_length=100,)
#     salary = models.DecimalField(max_digits=10,decimal_places=2,)
#     joining_date = models.DateField()
#     date_of_birth = models.DateField()
#     gender = models.CharField(max_length=10,choices=Gender.choices,)
#     address = models.TextField()
#     city = models.CharField(max_length=100)
#     state = models.CharField(max_length=100,)
#     pincode = models.CharField(max_length=10)
#     emergency_contact = models.CharField(max_length=12,blank=True)
#     photo = models.ImageField(upload_to="employees/",blank=True,null=True)
#     status = models.CharField(max_length=10,choices=Status.choices,default=Status.ACTIVE)
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)

#     class Meta:
#         ordering = ["employee_id"]
#         verbose_name = "Employee"
#         verbose_name_plural = "Employees"

#     def __str__(self):
#         return f"{self.employee_id} - {self.user.first_name}"