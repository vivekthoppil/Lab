from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from api.core.controllers import BaseController

from .renderers import UserJSONRenderer
from .serializers import LoginSerializer, RegistrationSerializer
from .services import create_user, create_user_token


class RegistrationController(BaseController):
    permission_classes = (AllowAny,)
    renderer_classes = (UserJSONRenderer,)
    serializer_class = RegistrationSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data.get('user'))
        serializer.is_valid(raise_exception=True)

        data = serializer.validated_data

        user = create_user(data['username'], data['password'], data['email'])
        token = create_user_token(user.email, user.password)
        resp = {
            'username': user.username,
            'email': user.email,
            'token': token
        }
        return Response(data=resp, status=status.HTTP_202_ACCEPTED)


class LoginController(BaseController):
    permission_classes = (AllowAny,)
    renderer_classes = (UserJSONRenderer,)
    serializer_class = LoginSerializer

    def post(self, request):
        user = request.data.get('user', {})

        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
