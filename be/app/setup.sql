CREATE TABLE IF NOT EXISTS Customer (
    customer_id INT PRIMARY KEY,
    first_name varchar(20) NOT NULL,
    last_name varchar(20) NOT NULL,
    phone_number varchar(11) NOT NULL,
    email varchar(60) UNIQUE
);

CREATE TABLE IF NOT EXISTS FoodTable (
    table_id INT PRIMARY KEY,
    access_code INT NOT NULL,
    capacity INT CHECK (capacity > 0)
);

CREATE TABLE IF NOT EXISTS WaitStaff (
    staff_id INT PRIMARY KEY,
    name varchar(30),
    assigned_table INT REFERENCES FoodTable(table_id)
);


CREATE TABLE IF NOT EXISTS Reservation  (
    reservation_id INT PRIMARY KEY,
    customer_id INT REFERENCES Customer(customer_id),
    table_id INT REFERENCES FoodTable(table_id),
    start_time DATETIME NOT NULL,
    end_time DATETIME
);

CREATE TABLE IF NOT EXISTS MenuItem (
    menu_item_id INT PRIMARY KEY,
    price DECIMAL(10, 2) NOT NULL,
    name varchar(40) NOT NULL,
    description varchar(200),
    category varchar(20)
);


CREATE TABLE IF NOT EXISTS Ingredient (
    menu_item_id INT NOT NULL,
    ingredient_name VARCHAR(20) NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    PRIMARY KEY (menu_item_id, ingredient_name),
    FOREIGN KEY (menu_item_id) REFERENCES MenuItem(menu_item_id)
);

CREATE TABLE IF NOT EXISTS FoodOrder (
    order_id INT PRIMARY KEY,
    reservation_id INT REFERENCES Reservation(reservation_id),
    total_amount DECIMAL(10, 2) NOT NULL,
    payment_reference varchar(4) NOT NULL
);

CREATE TABLE IF NOT EXISTS OrderItem (
    order_id INT REFERENCES FoodOrder(order_id),
    menu_item_id INT REFERENCES MenuItem(menu_item_id),
    quantity INT NOT NULL CHECK (quantity > 0),
    special_instructions varchar(100)
);