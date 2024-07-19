import os


class Config:
    DEBUG = os.getenv('FLASK_DEBUG', 'False') == 'True'
    TESTING = False
    SECRET_KEY = os.getenv('SECRET_KEY', 'default_key')
