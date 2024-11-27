from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import mysql.connector
import os
import stripe

app = Flask(__name__)
cors = CORS(app) # allow CORS for all domains on all routes.

@app.route("/")
def hello():
    return jsonify({"message": "Hello world"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5005)