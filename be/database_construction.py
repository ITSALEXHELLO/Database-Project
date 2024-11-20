import mysql.connector
import getpass

print("************ DATABASE CONSTRUCTION UTILITY ************")

getpass.getpass

credentials = {
    "host": "localhost",
    "user": "root",
    "password": "warmachinerox"
}

connection = mysql.connector.connect(
    host="localhost",
    user="root",      # Replace with your MySQL username
    password="warmachinerox"   # Replace with your MySQL password
)

with mysql.connector.connect(**credentials) as connection:
    print("Wahooooooo!!!!!")

