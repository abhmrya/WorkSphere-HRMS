from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.core.validators import RegexValidator



class MyUserManager(BaseUserManager):
    def create_user(self, email, phone, password=None, **extra_fields):

        if not email:
            raise ValueError("Email is required")
        
        if password is None:
            raise ValueError("Password is required")
        
        user = self.model(
            email=self.normalize_email(email),
            phone=phone,
            **extra_fields
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, phone, password=None, **extra_fields):
        if password is None:
            raise ValueError("Superuser must have a password")

        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True")

        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True")

        return self.create_user(
            email=email,
            phone=phone,
            password=password,
            **extra_fields
        )

class User(AbstractBaseUser,PermissionsMixin):
    email = models.EmailField(
        verbose_name="email address",
        max_length=255,
        unique=True,
    )
    # date_of_birth = models.DateField()
    username = models.CharField(max_length=16,unique=True)
    phone = models.CharField(
        max_length=12,
        unique=True,
        validators=[
            RegexValidator(
                regex=r"^91\d{10}$",
                message="Phone number must start with 91 and contain 12 digits."
            )
        ]
    )
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = MyUserManager()

    USERNAME_FIELD = "phone"
    REQUIRED_FIELDS = ["username",'email']

    def __str__(self):
        return f"{self.username} ({self.phone})"


# class User(AbstractBaseUser, PermissionsMixin):

#     class Role(models.TextChoices):
#         ADMIN = "ADMIN", "Admin"
#         STAFF = "STAFF", "Staff"
#         STUDENT = "STUDENT", "Student"
#         TEACHER = "TEACHER", "Teacher"

#     email = models.EmailField(unique=True)
#     username = models.CharField(max_length=16, unique=True)
#     phone = models.CharField(max_length=12, unique=True)

#     role = models.CharField(
#         max_length=20,
#         choices=Role.choices,
#         default=Role.STUDENT
#     )

#     is_active = models.BooleanField(default=True)
#     is_staff = models.BooleanField(default=False)