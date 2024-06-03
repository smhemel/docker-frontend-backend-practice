from app import app, db, redis_client
from app.models import User
from flask import jsonify, request, send_file
import requests
import pdfkit
import os
from flask_cors import cross_origin


@app.route("/")
@cross_origin()
def hello_world():
    return "Hello, World!"


@app.route("/users", methods=["GET", "POST"])
@cross_origin()
def manage_users():
    if request.method == "POST":
        name = request.json.get("name")
        user = User(name=name)
        db.session.add(user)
        db.session.commit()
        return jsonify({"message": "User created!"}), 201
    else:
        users = User.query.all()
        return jsonify([{"id": user.id, "name": user.name} for user in users])


@app.route("/cache")
@cross_origin()
def cache_example():
    if redis_client.get("cached"):
        return jsonify({"cached": redis_client.get("cached").decode("utf-8")})
    else:
        return jsonify({"message": "No Cache Found!"})


@app.route("/set-cache")
@cross_origin()
def set_cache():
    redis_client.set("cached", "This is a cached value", ex=30)
    return jsonify({"message": "Value cached!"})


@app.route("/generate-pdf")
@cross_origin()
def generate_pdf():
    try:
        pdfkit.from_string("Hello! Second Assignment from Ostad!", "/tmp/test.pdf")
        return send_file("/tmp/test.pdf", as_attachment=True)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
