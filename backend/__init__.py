from flask import Flask
from flask_cors import CORS
import os
from .config import Config

app = Flask(__name__)
CORS(app)

app.config.from_object(Config)


from . import views
