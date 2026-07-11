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
        print(request.user)
        print(request.user.is_authenticated)
        print(request.user.role)


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