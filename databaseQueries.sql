--Create categories table

CREATE TABLE categories (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name varchar(40) NOT NULL,
  created_by varchar (100 ) NOT NULL,
  type varchar(40) NOT NULL
);

--Inset values into categories table
INSERT INTO categories(name, created_by, type)
VALUES
('Salary' , '1', 'Income'),
('Rent', '2', 'Income'),
('Loan' , 'common', 'Income'),
('Investment', 'common', 'Income'),
('Business' ,  'common', 'Income'),
('Groceries', 'common', 'Expense'),
('Fuel', 'common', 'Expense'),
('Food/Drink', 'common', 'Expense'),
('Travel', 'common', 'Expense'),
('Clothes', 'common', 'Expense'),
('Shopping', 'common', 'Expense'),
('Entertainment', 'common', 'Expense'),
('Electricity', 'common', 'Expense'),
('Gas', 'common', 'Expense'),
('Internet', 'common', 'Expense'),
('Water', 'common', 'Expense'),
('Rent', 'common', 'Expense'),
('Gym', 'common', 'Expense'),
('Subscriptions', 'common', 'Expense'),
('Vacation', 'common', 'Expense'),
('Beauty', 'common', 'Expense'),
('Health Care', 'common', 'Expense'),
('Education', 'common', 'Expense'),
('Loan', 'common', 'Expense'),
('Pets', 'common', 'Expense'),
('Insurance', 'common', 'Expense'),
('Salary', 'common', 'Expense'),
('Gifts', 'common', 'Expense'),
('Donation', 'common', 'Expense'),
('Tax', 'common', 'Expense');

--GET all the categories
SELECT * FROM categories;

-- create Users table
CREATE TABLE users (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  email varchar(40) NOT NULL UNIQUE,
  password_hash varchar(70) NOT NULL UNIQUE,
  first_name varchar (100 ) NOT NULL,
  last_name varchar(100) NOT NULL,
  avatar varchar(100) ,
  notification boolean
);
--Insert values into users table (not including avatar anad notification at register)
INSERT INTO users(email, password_hash, first_name, last_name)
VALUES
('testuser@gmail.com','test123', 'test','user');

--create sessions table
CREATE TABLE sessions (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  token varchar(110) NOT NULL UNIQUE,
  expiry_timestamp timestamp NOT NULL DEFAULT NOW()+ INTERVAL '24 hours',
  user_id integer REFERENCES users(id) ON DELETE CASCADE
);
----Insert values into sessions table
INSERT INTO sessions(token, user_id)
VALUES
()

--Update value of notification and avatar into Users table
UPDATE
    users
  SET
    avatar='younggirl', notification=true
  WHERE
    users.id=${id}
     RETURNING id,avatar,notification
    `;`;

--create Transactions table
CREATE TABLE transactions(
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id integer  NOT NULL,
  type_id integer NOT NULL,
  date date NOT NULL,
  amount NUMERIC(10,2) NOT NULL,
  description varchar(110),
  category_id integer NOT NULL

);
--create Transaction types table
CREATE TABLE transaction_types(
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name varchar(11) NOT NULL);

 ---Insert values into Transaction types table
 INSERT INTO transaction_types(name)
 VALUES('income');
 INSERT INTO transaction_types(name)
 VALUES('expense');


--Update Transactions table
INSERT INTO transactions(user_id,type_id,date,amount,description,category_id)
VALUES ()
