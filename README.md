# Online Shopping Application
   
Welcome to the README file for the Online Shopping Application project. This project aims to develop a comprehensive online shopping platform using a PostgreSQL database backend.  
   
## Project Overview  
   
In this project, each group builds its own online shopping application. The backend is powered by a PostgreSQL database that stores information about products, their availability, orders, customer details, and staff information for the store.  
   
## Project Outputs  
   
The project has three main deliverables:  
   
### Part 1  
   
#### 1. ER Model  
- Developed an Entity-Relationship (ER) model for the application.  
- Submit the ER model in jpeg, png, or pdf format.  
   
#### 2. Relational Schema  
- Translate the ER model into a relational schema implemented as an SQL script.  
- The script should use PostgreSQL dialect and execute without errors.  
- Define tables, constraints, and create indices where appropriate.  
- Submit the script as a simple `.sql` file.  
   
### Part 2  
   
#### 3. Application  
- Develop an online shopping application using the relational schema defined in the first two deliverables.  
- The application can be either a web or desktop application.  
   
#### Customers  
- Search for products and look up information about products.  
- Set up an account and change preferences and account details.  
- Order products and make payments.  
- Record customer details such as name, addresses (for delivery and payment), and credit card information.  
- Maintain the current balance of the customer’s account.  
   
#### Staff Members  
- Modify and create products, update product availability, query customer information, and process orders.  
- Record staff details such as name, address, salary, and job title.  
   
### Online Store Information  
   
- **Product:** Store details such as type, brand, size, and description.  
- **Warehouse:** Record the address of each warehouse.  
- **Stock:** Record the quantity of each product in each warehouse.  
- **Product Price:** Maintain the prices for products.  
- **Orders:** Record order details, including status and payment method.  
- **Delivery Plan:** Maintain delivery type, price, date, and ship date.  
   
#### Suppliers  
- Store supplier information including address and name.  
- Record supplier-specific prices for items.  
   
#### Warehouse Capacity  
- Maintain warehouse sizes and ensure new stock additions do not exceed capacity.  
   
## Application Requirements  
   
### Customer Actions  
- Search and browse products, add to cart, and place orders.  
- Add, delete, and modify credit cards and addresses.  
   
### Staff Actions  
- Add, delete, and modify products and set product prices.  
- Manage stock in warehouses.  
   
   
#### Check Availability  
- Verify product availability when an order is submitted.  
   
#### Product Images  
- Provide images for products.  
   
#### Check Storage Limits  
- Ensure warehouse capacity is not exceeded when adding new stock.  
   
## Getting Started  
   
### Requirements  
- Ensure you have Node.js and Next.js installed.  
   
### Running the Program  
1. Clone the repository.  
2. Navigate to the project directory.  
3. Install dependencies:  
   ```sh  
   npm install  
   ```  
4. Run the development server:  
   ```sh  
   npm run dev  
   ```  
5. Open [http://localhost:3000](http
