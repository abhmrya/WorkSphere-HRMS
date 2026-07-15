from rest_framework.permissions import BasePermission
from rest_framework.permissions import SAFE_METHODS



class IsAdmin(BasePermission):

    def has_permission(self, request, view):
        return (
            request.user.is_authenticated
            and request.user.role == "ADMIN"
        )


class IsHR(BasePermission):

    def has_permission(self, request, view):
        return (
            request.user.is_authenticated
            and request.user.role == "HR"
        )


class IsManager(BasePermission):

    def has_permission(self, request, view):
        return (
            request.user.is_authenticated
            and request.user.role == "MANAGER"
        )


class IsEmployee(BasePermission):

    def has_permission(self, request, view):
        return (
            request.user.is_authenticated
            and request.user.role == "EMPLOYEE"
        )
    
class IsAdminOrHR(BasePermission):

    def has_permission(self, request, view):
        print("user : ",request.user)
        print("autenticate : ",request.user.is_authenticated)
        print("role : ",request.user.role)
        print("email : ",request.user.email)
        print("phone : ",request.user.phone)
        print("first_name : ",request.user.first_name)
        print("is_active : ",request.user.is_active)
        print("is_staff : ",request.user.is_staff)
        print("created_at : ",request.user.created_at)
        print("updated_at : ",request.user.updated_at)
        
        return (
            request.user.is_authenticated
            and request.user.role in ["ADMIN", "HR"]
        )

class IsAdminHRManager(BasePermission):

    def has_permission(self, request, view):

        return (
            request.user.is_authenticated
            and request.user.role in [
                "ADMIN",
                "HR",
                "MANAGER",
            ]
        )

class IsAdminHRReadOnlyManager(BasePermission):

    def has_permission(self, request, view):

        if not request.user.is_authenticated:
            return False

        # Admin aur HR sab kuch kar sakte hain
        if request.user.role in ["ADMIN", "HR"]:
            return True

        # Manager sirf GET requests kar sakta hai
        if (
            request.user.role == "MANAGER"
            and request.method in SAFE_METHODS
        ):
            return True

        return False
    
class IsEmployeeOwner(BasePermission):

    def has_object_permission(self, request, view, obj):

        return obj.user == request.user
    
class IsAdminOrOwner(BasePermission):

    def has_object_permission(self, request, view, obj):

        if request.user.role == "ADMIN":
            return True

        return obj.user == request.user