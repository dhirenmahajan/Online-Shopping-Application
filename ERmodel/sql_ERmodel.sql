CREATE TABLE Product (
    Prod_id INT PRIMARY KEY,
    Name VARCHAR(255),
    Category VARCHAR(255),
    Brand VARCHAR(255),
    Type VARCHAR(255),
    Size VARCHAR(255),
    Description TEXT
);

CREATE TABLE Customer (
    Cust_id INT PRIMARY KEY,
    Name VARCHAR(255)
);

CREATE TABLE Address (
    Address_id INT PRIMARY KEY,
    Cust_id INT,
    Address_line1 VARCHAR(255),
    Address_line2 VARCHAR(255),
    City VARCHAR(255),
    State VARCHAR(255),
    Zipcode VARCHAR(255),
    Country VARCHAR(255),
    Address_type VARCHAR(255),
    FOREIGN KEY (Cust_id) REFERENCES Customer(Cust_id)
);

CREATE TABLE Cust_balance (
    Cust_id INT PRIMARY KEY,
    Balance DECIMAL(10, 2),
    FOREIGN KEY (Cust_id) REFERENCES Customer(Cust_id)
);

CREATE TABLE Cust_credcardinfo (
    Card_id INT PRIMARY KEY,
    Cust_id INT,
    Creditcardno VARCHAR(255),
    Card_exp DATE,
    Card_name VARCHAR(255),
    Billing_address_id INT,
    FOREIGN KEY (Cust_id) REFERENCES Customer(Cust_id),
    FOREIGN KEY (Billing_address_id) REFERENCES Address(Address_id)
);

CREATE TABLE Staff_info (
    Emp_id INT PRIMARY KEY,
    Staff_name VARCHAR(255),
    Staff_address VARCHAR(255),
    Salary DECIMAL(10, 2),
    Jobtitle VARCHAR(255)
);


CREATE TABLE Warehouse (
    Warehouse_id INT PRIMARY KEY,
    Address_id INT,
    FOREIGN KEY (Address_id) REFERENCES Address(Address_id)
);

CREATE TABLE Stock (
    Stock_id INT PRIMARY KEY,
    Warehouse_id INT,
    Prod_id INT,
    Quantity INT,
    FOREIGN KEY (Prod_id) REFERENCES Product(Prod_id),
    FOREIGN KEY (Warehouse_id) REFERENCES Warehouse(Warehouse_id)
);

CREATE TABLE Product_price (
    Stock_id INT PRIMARY KEY,
    Price DECIMAL(10, 2),
    FOREIGN KEY (Stock_id) REFERENCES Stock(Stock_id)
);

CREATE TABLE Supplier (
    Supp_id INT PRIMARY KEY,
    Warehouse_id INT,
    Product_ID INT,
    FOREIGN KEY (Product_ID) REFERENCES Product(Prod_id),
    FOREIGN KEY (Warehouse_id) REFERENCES Warehouse(Warehouse_id)
);

CREATE TABLE CustomerOrder (
    Order_id INT PRIMARY KEY,
    Product_id INT,
    Quantity INT,
    Cust_ID INT,
    FOREIGN KEY (Product_id) REFERENCES Product(Prod_id),
    FOREIGN KEY (Cust_ID) REFERENCES Customer(Cust_id)
);

CREATE TABLE Deliveryplan (
    Order_id INT PRIMARY KEY,
    Deliverytype VARCHAR(255),
    Delivery_price DECIMAL(10, 2),
    Delivery_date DATE,
    Ship_date DATE,
    FOREIGN KEY (Order_id) REFERENCES CustomerOrder(Order_id)
);
