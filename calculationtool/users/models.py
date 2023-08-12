from django.db import models
from django.contrib.auth.base_user import BaseUserManager
#from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, User

# Create your models here.
class AppUserManager(BaseUserManager):
    def create_user(self, email, password=None):
        if not email:
            raise ValueError('Email is required!')
        if not password:
            raise ValueError('Password is required!')
        email = self.normalize_email(email)
        user = self.model(email=email)
        user.set_password(password)
        user.save()
        return user
    def create_superuser(self, email, password=None):
        if not email:
            raise ValueError('Email is required!')
        if not password:
            raise ValueError('Password is required!')
        user = self.create_user(email, password)
        user.is_superuser = True
        user.save()
        return user
    
# class CustomAdminUser(User):
#     user_id = models.AutoField(primary_key=True)
#     email = models.EmailField(max_length=50)


class InputPage(models.Model):
    page_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=30)
    description = models.TextField(max_length=100)
    image = models.ImageField(null=True) #urlfield?
    


class Input(models.Model):
    input_id = models.AutoField(primary_key=True)
    input_page_id = models.ForeignKey(InputPage, on_delete=models.CASCADE)
    name = models.CharField(max_length=20)
    placeholder = models.CharField(max_length=40)
    coefficient = models.IntegerField()
    constant = models.IntegerField()
    
