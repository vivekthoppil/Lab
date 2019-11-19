from api.settings.base import * # noqa

DEBUG = False
SECRET_KEY = os.environ['SECRET_KEY']

MIDDLEWARE.insert(1, 'whitenoise.middleware.WhiteNoiseMiddleware')

STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
