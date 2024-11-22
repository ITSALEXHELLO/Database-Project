from flask import Flask, request, jsonify
import mysql.connector
import os

app = Flask(__name__)

# Get MySQL credentials from environment variables
MYSQL_USER = os.getenv('MYSQL_USER')
MYSQL_PASSWORD = os.getenv('MYSQL_PASSWORD')
MYSQL_HOST = os.getenv('MYSQL_HOST')
MYSQL_DB = os.getenv('MYSQL_DB')

# Configure the MySQL connection
connection = mysql.connector.connect(
        host=os.getenv('MYSQL_HOST'),         # Use environment variable
        user=os.getenv('MYSQL_USER'),         # Use environment variable
        password=os.getenv('MYSQL_PASSWORD'), # Use environment variable
        database=os.getenv('MYSQL_DB')        # Use environment variable
    )


@app.route("/menu/")
def getMenu():
    cursor = connection.cursor(dictionary=True)
    cursor.execute('SELECT * FROM MenuItem')  # Query the menu table
    menu_items = cursor.fetchall()
    cursor.close()
    
    return jsonify(menu_items)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)