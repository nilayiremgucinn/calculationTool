from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model

UserModel = get_user_model()

def validate_email(data):
    email = data['email'].strip()
    if not email:
        raise ValidationError('email is needed')
    return True

def validate_password(data):
    password = data['password'].strip()
    if not password:
        raise ValidationError('password is needed')
    return True

