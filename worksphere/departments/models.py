from django.db import models

# Create your models here.
class Department(models.Model):
    name = models.CharField(max_length=100,unique=True)
    code = models.CharField(max_length=10,unique=True)
    description = models.TextField(blank=True)

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["name"]   #Department ko name ke hisab se sort karke lana
        verbose_name = "Department"
        verbose_name_plural = "Departments"

    def __str__(self):
        return self.name