from django.db import models
from django.contrib.auth.models import AbstractUser
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.conf import settings

from knox.models import AuthToken


class Account(AbstractUser):
    username = models.CharField(max_length=50, unique=True)
    email = models.EmailField(verbose_name="email address", max_length=255, unique=True)

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email"]

    def __str__(self):
        return self.username


# @receiver(post_save, sender=settings.AUTH_USER_MODEL)
# def create_user_token(sender, instance=None, created=False, **kwargs):
#     if created:
#         return AuthToken.objects.create(user=instance)