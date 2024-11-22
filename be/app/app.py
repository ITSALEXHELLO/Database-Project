from flask import Flask, request, jsonify
import mysql.connector
import os
import stripe

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
connection.autocommit = True

# Set your secret key
stripe.api_key = os.getenv('STRIPE_API_KEY')
endpoint_secret = os.getenv('ENDPOINT_SECRET')  # Secret for verifying webhook authenticity

intentToOrderItems={}

@app.route('/webhook', methods=['POST'])
def stripe_webhook():
    payload = request.get_data(as_text=True)
    sig_header = request.headers.get('Stripe-Signature')

    try:
        # Verify the webhook signature to ensure it's from Stripe
        event = stripe.Webhook.construct_event(
            payload, sig_header, endpoint_secret
        )

        # Handle the event based on its type
        if event['type'] == 'payment_intent.succeeded':
            # delete from database
            payment_intent = event['data']['object']  # Contains the canceled payment intent
            payment_intent_id = payment_intent['id']

            order(intentToOrderItems[payment_intent_id],payment_intent_id)
            # You can now update your database or take appropriate action
            # For example, set the order status to canceled

    except ValueError as e:
        # Invalid payload
        print("Invalid payload")

    except stripe.error.SignatureVerificationError as e:
        # Invalid signature
        print("Invalid signature")
    
def order(data,payment_reference):
    cursor = connection.cursor(dictionary=True)
    access_code=data[0].get("access_code")
    table_id=getTableFromCode(access_code)
    cursor.execute('INSERT INTO FoodOrder(table_id,payment_reference) Values (%d,%s)', (table_id,payment_reference))
    order_id = cursor.lastrowid
    
    for i in data:
        menu_item_id = i.get("menu_item_id")
        quantity = i.get("quantity")
        special_instructions = i.get("special_instructions")
        email = i.get("email")

        cursor.execute('INSERT INTO OrderItem(email,order_id,menu_item_id,quantity,special_instructions) VALUES (%s, %d, %d, %d, %s)', (email,order_id,menu_item_id,quantity,special_instructions))
    intentToOrderItems.pop(payment_reference)
    cursor.close()

def getTableFromCode(code):

    cursor = connection.cursor(dictionary=True)

    cursor.execute('SELECT table_id FROM FoodTable WHERE access_code = %s', (code))
    tableId = cursor.fetchone()

    cursor.close()
    return tableId

def getPriceOfMenuItem(menu_item_id):

    cursor = connection.cursor(dictionary=True)

    cursor.execute('SELECT price FROM MenuItem WHERE menu_item_id = %s', (menu_item_id))
    price = cursor.fetchone()

    cursor.close()
    return price

@app.route("/createPaymentIntent", methods=["POST"])
def createPaymentIntent():
    cursor = connection.cursor(dictionary=True)
    try:
        amount = 0
        
        data = request.get_json()
        cursor = connection.cursor(dictionary=True)
        for i in data:
            menu_item_id = i.get("menu_item_id")
            quantity = i.get("quantity")
            amount+=quantity*getPriceOfMenuItem(menu_item_id)
            
        # Create a PaymentIntent with the amount and currency
        payment_intent = stripe.PaymentIntent.create(
            amount=amount,
            currency='usd'
        )

        intentToOrderItems[payment_intent.id]=data

        # Send back the client secret to the frontend
        return jsonify({
            'clientSecret': payment_intent.client_secret
        })

    except Exception as e:
        return jsonify(error=str(e)), 500
    finally:
        cursor.close()

@app.route("/menu", methods=["GET"])
def getMenu():
    cursor = connection.cursor(dictionary=True)
    cursor.execute('SELECT * FROM MenuItem')  # Query the menu table
    menu_items = cursor.fetchall()
    cursor.close()
    
    return jsonify(menu_items)

@app.route("/menu/sorted/", methods=["GET"])
def getMenuSorted():
    cursor = connection.cursor(dictionary=True)
    
    # Query the menu table and sort items by price in ascending order
    cursor.execute('SELECT * FROM MenuItem ORDER BY price ASC')
    sorted_menu_items = cursor.fetchall()
    cursor.close()
    
    return jsonify(sorted_menu_items)

@app.route("/login", methods=["GET"])
def login():
    # Get JSON data from the request body
    data = request.get_json()

    # Extract the fields from the JSON data
    email = data.get("email")

    cursor = connection.cursor(dictionary=True)

    try:
        count=cursor.execute('SELECT COUNT(*) FROM Customer WHERE email = %s', (email))
        if(count>0):
            return jsonify({
                "message": "Customer Exists"
            }), 201
        else:
            return jsonify({
                "message": "Customer Doesn't exist"
            }), 500
    except Exception as err:
        return jsonify({"error": f"Database error: {err}"}), 500
    finally:
        cursor.close()
    

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
        # Insert the new customer 
        cursor.execute('INSERT INTO Customer(first_name,last_name,phone_number,email) VALUES (%s, %s, %s, %s)', (first_name,last_name,phone_number,email))
    except Exception as err:
        return jsonify({"error": f"Database error: {err}"}), 500
    finally:
        cursor.close()

    return jsonify({
        "message": "Customer created successfully"
    }), 201

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)