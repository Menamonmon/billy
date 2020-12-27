from django.urls import path

from .views import RegisterView, LoginView, LogoutView, LogoutAllView, AccountView


urlpatterns = [
    path("account/", AccountView.as_view(), name="account"),
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("logoutall/", LogoutAllView.as_view(), name="logoutall"),
]
