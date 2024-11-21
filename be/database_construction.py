import mysql.connector
import getpass

print("************ DATABASE CONSTRUCTION UTILITY ************")
print("Connecting to default localhost:3306")

username = input("MySQL Username: ").strip()
password = getpass.getpass("MySQL password: ").strip()

credentials = {
    "host": "localhost",
    "user": username,
    "password": password
}

with mysql.connector.connect(**credentials) as connection:
    connection.autocommit = True
    cursor = connection.cursor()
    cursor.execute("DROP DATABASE IF EXISTS RESTAURANT_DB")
    cursor.execute("CREATE DATABASE RESTAURANT_DB")
    print("Database RESTAURANT_DB created successfully.")

    credentials["database"] = "RESTAURANT_DB"


    # Connect to MySQL server
with mysql.connector.connect(**credentials) as connection:
    cursor = connection.cursor()
    cursor.execute("SELECT DATABASE();")
    current_database = cursor.fetchone()[0]  # Fetch the result
    print(f"Currently using database: {current_database}")

    with open("./setup.sql", "r") as f:
        sql_script = f.read()
    
    for statement in sql_script.split(";"):
            statement = statement.strip()  # Remove leading/trailing whitespace
            if statement:  # Skip empty statements
                cursor.execute(statement)
    
print("Successfully built database.")
    