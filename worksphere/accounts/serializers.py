from rest_framework import serializers

from .models import User

class RegisterSerializer(serializers.ModelSerializer):

    confirm_password = serializers.CharField(write_only=True)
    print('confirm password : ',confirm_password)
    class Meta:
        model=User
        fields = (
                    "first_name",
                    "last_name",
                    "email",
                    "phone",
                    "password",
                    "confirm_password",
                )
        extra_kwargs = {
            "password": {
                "write_only":True
            }
        }
    
    def validate(self, attrs):
        print("attrs : ",attrs)
        if attrs["password"] != attrs["confirm_password"]:
            raise serializers.ValidationError(
                "Passwords do not match."
            )
        attrs.pop("confirm_password")
        return attrs
    
    # def validate_first_name(self, value):
    #     if(len(value)<4):
    #         raise serializers.ValidationError("username must be greater than 4 character")
    #     return value
    
    def create(self, validated_data):
        '''maine jo custom User me Create_user 
        banaya hai usi se save kar rahe usi me 
        user.set_password(password) hai jo hash kar dega
        '''
        print("validated_data : ",validated_data)
        return User.objects.create_user(
                phone=validated_data["phone"],
                email=validated_data["email"],
                password=validated_data["password"],
                first_name=validated_data["first_name"],
                last_name=validated_data.get("last_name", ""),
            )
    
    '''agar hamara coustom nahi tota to ye likhte'''

    # def create(self, validated_data):

    #     password = validated_data.pop("password")

    #     user = User(**validated_data)

    #     user.set_password(password)

    #     user.save()

    #     return user