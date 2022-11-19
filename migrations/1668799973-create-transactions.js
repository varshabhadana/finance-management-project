exports.up = async (sql) => {
  await sql`
  CREATE TABLE transactions(
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id integer REFERENCES users(id) ,
  type_id integer REFERENCES transaction_types(id) ,
  date date NOT NULL,
  amount NUMERIC(10,2) NOT NULL,
  description varchar(110),
  category_id integer NOT NULL

);`;
};

exports.down = async (sql) => {
  await sql`
DROP TABLE
transactions;`;
};
