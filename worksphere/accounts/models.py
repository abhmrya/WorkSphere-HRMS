#  role bases
from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    PermissionsMixin,
    BaseUserManager,
)
from django.core.validators import RegexValidator


class UserManager(BaseUserManager):
    def create_user(self, phone, email, password=None, **extra_fields):
        if not phone:
            raise ValueError("Phone number is required.")

        if not email:
            raise ValueError("Email is required.")

        if password is None:
            raise ValueError("Password is required.")

        email = self.normalize_email(email)

        user = self.model(
            phone=phone,
            email=email,
            **extra_fields,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, phone, email, password=None, **extra_fields):
        extra_fields.setdefault("role", User.Role.ADMIN)
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True")

        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True")

        return self.create_user(
            phone=phone,
            email=email,
            password=password,
            **extra_fields,
        )


class User(AbstractBaseUser, PermissionsMixin):

    class Role(models.TextChoices):
        ADMIN = "ADMIN", "Admin"
        HR = "HR", "HR"
        MANAGER = "MANAGER", "Manager"
        EMPLOYEE = "EMPLOYEE", "Employee"

    phone_validator = RegexValidator(
        regex=r"^91\d{10}$",
        message="Phone number must start with 91 and contain 12 digits."
    )

    email = models.EmailField(
        unique=True,
    )

    phone = models.CharField(
        max_length=12,
        unique=True,
        validators=[phone_validator],
    )

    first_name = models.CharField(
        max_length=100,
    )

    last_name = models.CharField(
        max_length=100,
        blank=True,
    )

    role = models.CharField(
        max_length=20,
        choices=Role.choices,
        default=Role.EMPLOYEE,
    )

    is_active = models.BooleanField(
        default=True,
    )

    is_staff = models.BooleanField(
        default=False,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    objects = UserManager()

    USERNAME_FIELD = "phone"

    REQUIRED_FIELDS = [
        "email",
        "first_name",
    ]

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "User"
        verbose_name_plural = "Users"

    def __str__(self):
        return f"{self.first_name} ({self.phone})"







# without roll

# from django.db import models

# # Create your models here.
# from django.db import models
# from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
# from django.contrib.auth.models import PermissionsMixin
# from django.core.validators import RegexValidator



# class MyUserManager(BaseUserManager):
#     def create_user(self, email, phone, password=None, **extra_fields):

#         if not email:
#             raise ValueError("Email is required")
        
#         if password is None:
#             raise ValueError("Password is required")
        
#         user = self.model(
#             email=self.normalize_email(email),
#             phone=phone,
#             **extra_fields
#         )

#         user.set_password(password)
#         user.save(using=self._db)
#         return user

#     def create_superuser(self, email, phone, password=None, **extra_fields):
#         if password is None:
#             raise ValueError("Superuser must have a password")

#         extra_fields.setdefault("is_staff", True)
#         extra_fields.setdefault("is_superuser", True)
#         extra_fields.setdefault("is_active", True)

#         if extra_fields.get("is_staff") is not True:
#             raise ValueError("Superuser must have is_staff=True")

#         if extra_fields.get("is_superuser") is not True:
#             raise ValueError("Superuser must have is_superuser=True")

#         return self.create_user(
#             email=email,
#             phone=phone,
#             password=password,
#             **extra_fields
#         )

# class User(AbstractBaseUser,PermissionsMixin):
#     email = models.EmailField(
#         verbose_name="email address",
#         max_length=255,
#         unique=True,
#     )
#     # date_of_birth = models.DateField()
#     username = models.CharField(max_length=16,unique=True)
#     phone = models.CharField(
#         max_length=12,
#         unique=True,
#         validators=[
#             RegexValidator(
#                 regex=r"^91\d{10}$",
#                 message="Phone number must start with 91 and contain 12 digits."
#             )
#         ]
#     )
#     is_active = models.BooleanField(default=True)
#     is_staff = models.BooleanField(default=False)

#     objects = MyUserManager()

#     USERNAME_FIELD = "phone"
#     REQUIRED_FIELDS = ["username",'email']

#     def __str__(self):
#         return f"{self.username} ({self.phone})"

