from django.core.exceptions import ValidationError
from django.db import IntegrityError

from api.core.utils import generate_jwt_token

from .models import User


def create_user(username, password, email, **kwargs):
    if not all([username, password, email]):
        raise ValidationError('Must provide username, password\
                              and email for user')
    try:
        user = User.objects.create_user(username, email, password, **kwargs)
    except IntegrityError:
        raise ValidationError('User already exists')
    return user


def create_user_token(email, password):
    try:
        user = User.objects.get(email=email, password=password)
    except User.DoesNotExist:
        raise ValidationError('No user found')
    except User.MultipleObjectsReturned:
        raise ValidationError('Multiple users found with the same credentials')

    user_info = {
        'email': user.email,
        'username': user.username
    }

    token = generate_jwt_token(user_info)
    return token
