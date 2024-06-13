-- insert product data into the table
INSERT INTO product (prod_id, name, category, brand, type, size, description, image)
VALUES
(1, 'Cyberpunk 2077', 'xbox', 'CD Projekt Red', 'Game', 'Standard', 'Futuristic RPG set in Night City', 'https://imgur.com/3CF1UhY.png'),
(2, 'Grand Theft Auto 5', 'xbox', 'Rockstar Games', 'Game', 'Standard', 'Open-world crime simulation', 'https://imgur.com/BqNWnDB.png'),
(3, 'Minecraft', 'xbox', 'Mojang', 'Game', 'Standard', 'Sandbox building game', 'https://imgur.com/LXnUnd2.png'),
(4, 'PUBG', 'xbox', 'PUBG Corporation', 'Game', 'Standard', 'Battle Royale shooter', 'https://imgur.com/Ondg3Jn.png'),
(5, 'FIFA 21', 'xbox', 'EA Sports', 'Game', 'Standard', 'Football simulation', 'https://imgur.com/AzT9YMP.png'),
(6, 'Battlefield 5', 'xbox', 'EA DICE', 'Game', 'Standard', 'WWII shooter game', 'https://imgur.com/X3MQNVs.png'),
(7, 'Watch Dogs 2', 'xbox', 'Ubisoft', 'Game', 'Standard', 'Action-adventure game with hacking', 'https://imgur.com/v3lqCEb.png'),
(8, 'Fortnite', 'ps5', 'Epic Games', 'Game', 'Standard', 'Battle Royale and building', 'https://imgur.com/3lTxDpl.png'),
(9, 'Call of Duty: Black Ops', 'ps5', 'Activision', 'Game', 'Standard', 'First-person shooter', 'https://imgur.com/4GvUw3G.png'),
(10, 'NBA2K21 Next Generation', 'ps5', '2K Sports', 'Game', 'Standard', 'Basketball simulation game with next-gen graphics', 'https://imgur.com/Mxjvkws.png'),
(11, 'Spider-Man Miles Morales', 'ps5', 'Insomniac Games', 'Game', 'Standard', 'Action-adventure game following Miles Morales as Spider-Man', 'https://imgur.com/guV5cUF.png'),
(12, 'Resident Evil Village', 'ps5', 'Capcom', 'Game', 'Standard', 'Survival horror game set in a mysterious village', 'https://imgur.com/1CxJz8E.png'),
(13, 'Assassins Creed Valhalla', 'ps5', 'Ubisoft', 'Game', 'Standard', 'Open-world RPG set in the Viking era', 'https://imgur.com/xJD093X.png'),
(14, 'Animal Crossing', 'switch', 'Nintendo', 'Game', 'Standard', 'Community simulation game on a deserted island', 'https://imgur.com/1SVaEBk.png'),
(15, 'The Legend of Zelda', 'switch', 'Nintendo', 'Game', 'Standard', 'Adventure game exploring the kingdom of Hyrule', 'https://imgur.com/IX5eunc.png'),
(16, 'Stardew Valley', 'switch', 'ConcernedApe', 'Game', 'Standard', 'Farming simulation and rural life game', 'https://imgur.com/aL3nj5t.png'),
(17, 'Mario Golf Super Rush', 'switch', 'Nintendo', 'Game', 'Standard', 'Golf game featuring Mario and friends with rush mechanics', 'https://imgur.com/CPxlyEg.png'),
(18, 'Super Smash Bros', 'switch', 'Nintendo', 'Game', 'Standard', 'Fighting game featuring various Nintendo characters', 'https://imgur.com/ZuLatzs.png'),
(19, 'Grand Theft Auto 5', 'pc', 'Rockstar Games', 'Game', 'Standard', 'Open-world crime simulation', 'https://imgur.com/9LRil4N.png'),
(20, 'Battlefield V', 'pc', 'EA DICE', 'Game', 'Standard', 'WWII first-person shooter', 'https://imgur.com/T3v629h.png'),
(21, 'Red Dead Redemption 2', 'pc', 'Rockstar Games', 'Game', 'Standard', 'Open-world Western action-adventure', 'https://imgur.com/aLObdQK.png'),
(22, 'Flight Simulator 2020', 'pc', 'Asobo Studio', 'Game', 'Standard', 'Flight simulation with realistic graphics and controls', 'https://imgur.com/2IeocI8.png'),
(23, 'Forza Horizon 4', 'pc', 'Playground Games', 'Game', 'Standard', 'Open-world racing game set in a fictionalized Great Britain', 'https://imgur.com/gLQsp6N.png'),
(24, 'Minecraft', 'pc', 'Mojang', 'Game', 'Standard', 'Sandbox game allowing players to build and explore virtual worlds', 'https://imgur.com/qm1gaGD.png'),
(25, 'Rainbow Six Siege', 'pc', 'Ubisoft', 'Game', 'Standard', 'Tactical first-person shooter focusing on team-based strategy', 'https://imgur.com/JIgzykM.png'),
(26, 'Xbox Controller', 'accessories', 'Microsoft', 'Hardware', 'Standard', 'Wireless controller for Xbox', 'https://imgur.com/a964vBm.png'),
(27, 'Xbox Controller', 'accessories', 'Microsoft', 'Hardware', 'Special Edition', 'Special edition wireless controller', 'https://imgur.com/ntrEPb1.png'),
(28, 'Gaming Keyboard', 'accessories', 'Corsair', 'Hardware', 'Standard', 'Mechanical gaming keyboard', 'https://imgur.com/VMe3WBk.png'),
(29, 'Gaming Mouse', 'accessories', 'Logitech', 'Hardware', 'Standard', 'High precision gaming mouse', 'https://imgur.com/wvpHOCm.png'),
(30, 'Switch Joy-Con', 'accessories', 'Nintendo', 'Hardware', 'Standard', 'Controller for Nintendo Switch', 'https://imgur.com/faQ0IXH.png');

-- First, insert an address to reference (if not already present)
INSERT INTO Address (Address_id, Address_line1, City, State, Zipcode, Country)
VALUES
(1, '1234 Warehouse Ave', 'Warehouse City', 'WH', '12345', 'USA');

-- Now, insert a warehouse using the address
INSERT INTO Warehouse (Warehouse_id, Address_id)
VALUES
(1, 1);

-- Finally, insert stock data
INSERT INTO Stock (Stock_id, Warehouse_id, Prod_id, Quantity)
VALUES
(1, 1, 1, 50),
(2, 1, 2, 50),
(3, 1, 3, 50),
(4, 1, 4, 50),
(5, 1, 5, 50),
(6, 1, 6, 50),
(7, 1, 7, 50),
(8, 1, 8, 50),
(9, 1, 9, 50),
(10, 1, 10, 50),
(11, 1, 11, 50),
(12, 1, 12, 50),
(13, 1, 13, 50),
(14, 1, 14, 50),
(15, 1, 15, 50),
(16, 1, 16, 50),
(17, 1, 17, 50),
(18, 1, 18, 50),
(19, 1, 19, 50),
(20, 1, 20, 50),
(21, 1, 21, 50),
(22, 1, 22, 50),
(23, 1, 23, 50),
(24, 1, 24, 50),
(25, 1, 25, 50),
(26, 1, 26, 50),
(27, 1, 27, 50),
(28, 1, 28, 50),
(29, 1, 29, 50),
(30, 1, 30, 50);

-- insert product price data into the table
INSERT INTO Product_price (Stock_id, Price)
VALUES
(1, 36.49),
(2, 21.99),
(3, 49.99),
(4, 5.09),
(5, 17.49),
(6, 29.35),
(7, 18.99),
(8, 29.99),
(9, 69.99),
(10, 69.99),
(11, 29.99),
(12, 59.99),
(13, 59.99),
(14, 59.99),
(15, 59.99),
(16, 14.99),
(17, 59.99),
(18, 59.99),
(19, 29.99),
(20, 39.99),
(21, 39.99),
(22, 59.99),
(23, 59.99),
(24, 29.99),
(25, 7.99),
(26, 59.00),
(27, 69.00),
(28, 49.99),
(29, 29.99),
(30, 13.99);

-- insert customer data into the table
INSERT INTO Customer (Cust_id, Name) VALUES
(1, 'John Doe'),
(2, 'Jane Smith'),
(3, 'Alice Johnson'),
(4, 'Bob Brown');

-- insert address data into the table
INSERT INTO Address (Address_id, Cust_id, Address_line1, Address_line2, City, State, Zipcode, Country, Address_type) VALUES
(101, 1, '1234 Maple St', 'Apt 101', 'Springfield', 'IL', '62704', 'USA', 'Billing'),
(102, 2, '2345 Oak St', 'Suite 201', 'Ridgewood', 'NJ', '07450', 'USA', 'Shipping'),
(103, 1, '3456 Pine St', NULL, 'Boulder', 'CO', '80301', 'USA', 'Shipping'),
(104, 3, '4567 Elm St', NULL, 'Austin', 'TX', '73301', 'USA', 'Billing');

-- Insert balances for customers
INSERT INTO Cust_balance (Cust_id, Balance) VALUES
(1, 120.50),
(2, 560.75),
(3, 0.00),
(4, 35.20);

-- Insert credit card information (assuming the Address_id for billing is set correctly)
INSERT INTO Cust_credcardinfo (Card_id, Cust_id, Creditcardno, Card_exp, Card_name, Billing_address_id) VALUES
(501, 1, '4111111111111111', '2025-12-31', 'John Doe', 101),
(502, 2, '4222222222222', '2024-11-30', 'Jane Smith', 102),
(503, 3, '4333333333333333', '2023-10-31', 'Alice Johnson', 104);