from flask import Flask
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy
from flask_redis import FlaskRedis

app = Flask(__name__)
cors = CORS(app)
app.config.from_object("app.config.Config")

db = SQLAlchemy(app)
redis_client = FlaskRedis(app)

from app import routes, models


@app.before_request
def init_db():
    with app.app_context():
        db.create_all()
        db.session.commit()
