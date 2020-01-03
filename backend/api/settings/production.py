from api.settings.base import * # noqa

DEBUG = False
SECRET_KEY = os.environ['SECRET_KEY']

# separated by space
ALLOWED_HOSTS = os.environ.get("DJANGO_ALLOWED_HOSTS", '').split(" ")
