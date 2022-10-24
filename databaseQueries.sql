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
