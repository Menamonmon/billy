from rest_framework import serializers

from django.contrib.auth import authenticate

from users.models import Account


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ("id", "username", "email")


class RegisterSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(
        style={"input_type": "password"}, write_only=True
    )
    password = serializers.CharField(style={"input_type": "password"}, write_only=True)

    class Meta:
        model = Account
        fields = ("username", "email", "password", "confirm_password")
        extra_kwargs = {
            "password": {"write_only": True},
            "confirm_password": {"write_only": True},
        }

    def save(self, *args, **kwargs):
        email = self.validated_data["email"]
        account = Account(
            username=self.validated_data["username"],
            email=email,
        )
        password = self.validated_data["password"]
        confirm_password = self.validated_data["confirm_password"]

        if password != confirm_password:
            raise serializers.ValidationError({"password": "Passwords Must Match"})
        account.set_password(password)
        account.save()
        return account


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(
        style={"input_type": "password"}, trim_whitespace=False
    )

    class Meta:
        model = Account
        fields = ("username", "password")

    def validate(self, data):
        username = data.get("username")
        password = data.get("password")

        if username and password:
            if Account.objects.filter(username=username).exists():
                user = authenticate(
                    request=self.context.get("request"),
                    username=username,
                    password=password,
                )
                print("AUTHENTICATION ENDS")

            else:
                msg = {"detail": "No user with this username is found"}
                raise serializers.ValidationError(msg)

            if not user:
                msg = {"detail": "Invalid authentication credentials"}
                raise serializers.ValidationError(msg, code="authorization")
        else:
            msg = {"detail": "Must include username and password"}
            raise serializers.ValidationError(msg, code="authorization")

        data["user"] = user
        return data