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


@app.route("/menu", methods=["GET"])
def getMenu():
    cursor = connection.cursor(dictionary=True)
    cursor.execute('SELECT * FROM MenuItem')  # Query the menu table
    menu_items = cursor.fetchall()
    cursor.close()
    
    return jsonify(menu_items)

@app.route("/createCustomer", methods=["POST"])
def createCustomer():
    # Get JSON data from the request body
    data = request.get_json()

    # Extract the fields from the JSON data
    first_name = data.get("first_name")
    last_name = data.get("last_name")
    phone_number = data.get("phone_number")
    email = data.get("email")

    cursor = connection.cursor(dictionary=True)

    try:
        # Insert the new user into the users table
        cursor.execute('INSERT INTO Customer(first_name,last_name,phone_number,email) VALUES (%s, %s, %s, %s)', (first_name,last_name,phone_number,email))
        connection.commit()
    except Exception as err:
        connection.rollback()  # Rollback any changes if an error occurs
        return jsonify({"error": f"Database error: {err}"}), 500
    finally:
        cursor.close()

    # Return a success message with the newly created user data
    return jsonify({
        "message": "User created successfully"
    }), 201

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)