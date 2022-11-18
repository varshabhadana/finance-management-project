exports.up = async (sql) => {
  await sql`
  CREATE TABLE transaction_types(
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name varchar(11) NOT NULL);
  `;
};

exports.down = async (sql) => {
  await sql`
  DROP TABLE
    transaction_types
  `;
};
