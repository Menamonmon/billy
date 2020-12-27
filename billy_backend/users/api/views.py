from knox.views import LoginView as KnoxLoginView
from knox.models import AuthToken
from knox.views import LogoutView, LogoutAllView
from knox.settings import knox_settings
from knox.auth import TokenAuthentication

from rest_framework.authentication import BasicAuthentication
from rest_framework.generics import CreateAPIView, RetrieveAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.serializers import DateTimeField
from django.contrib.auth import login

from .serializers import RegisterSerializer, LoginSerializer, AccountSerializer


class AccountView(RetrieveAPIView):
    serializer_class = AccountSerializer
    permission_classes = [
        IsAuthenticated,
    ]

    def get_object(self):
        return self.request.user


class RegisterView(CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [
        AllowAny,
    ]

    def get_expiry_datetime_format(self):
        return knox_settings.EXPIRY_DATETIME_FORMAT

    def format_expiry_datetime(self, expiry):
        datetime_format = self.get_expiry_datetime_format()
        return DateTimeField(format=datetime_format).to_representation(expiry)

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        username = serializer.validated_data.get("username")
        matching_users = self.serializer_class.Meta.model.objects.filter(
            username=username
        )
        if matching_users.exists():
            return Response(
                {"detail": "A user with the same username already exists"},
                status=status.HTTP_208_ALREADY_REPORTED,
            )

        account = serializer.save()
        response_data = {
            "detail": "user registered successfully",
            "id": account.id,
            "username": account.username,
            "email": account.email,
        }

        return Response(response_data, status=status.HTTP_201_CREATED)


class LoginView(KnoxLoginView):
    permission_classes = (AllowAny,)
    serializer_class = LoginSerializer

    def get_post_response_data(self, request, token, instance):
        UserSerializer = self.get_user_serializer_class()

        data = {
        'expiry': self.format_expiry_datetime(instance.expiry),
        'token': token
        }
        if UserSerializer is not None:
            data["user"] = UserSerializer(
            request.user,
            context=self.get_context()
            ).data
        return data

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]

        login(request, user)
        return super().post(request, format=None)