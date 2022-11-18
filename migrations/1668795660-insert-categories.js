exports.up = async (sql) => {
  await sql`
  INSERT INTO categories
    (name, created_by, type,logo)
  VALUES
  ('Bonus' , '0', 'income','money-envelope'),
  ('Salary' , '0', 'income','money-envelope'),
  ('Rent' , '0', 'income','keys'),
  ('Loan' , '0', 'income','money-pouch'),
  ('Investment' , '0', 'income','stock'),
  ('Business' , '0', 'income','shop'),
  ('Groceries' , '0', 'expense','grocery'),
  ('Food/Drink', '0', 'expense','food'),
  ('Travel', '0', 'expense','trip'),
  ('Shopping', '0', 'expense','shopping'),
  ('Entertainment', '0', 'expense','entertainment'),
  ('Utilities', '0', 'expense', 'utilities'),
  ('Rent', '0', 'expense','keys'),
  ('Gym', '0', 'expense','gym'),
  ('Health Care', '0', 'expense','healthcare'),
  ('Loan' , '0', 'expense','money-pouch'),
  ('Education', '0', 'expense','education'),
  ('Gifts', '0', 'expense','box'),
  ('Insurance', '0', 'expense', 'insurance'),
  ('Pets', '0', 'expense','pets'),
  ('Beauty', '0', 'expense','salon');
  `;
};

exports.down = async (sql) => {
  await sql`
  DROP TABLE
    categories
  `;
};
