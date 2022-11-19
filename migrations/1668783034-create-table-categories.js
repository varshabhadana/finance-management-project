exports.up = async (sql) => {
  await sql`
  CREATE TABLE categories (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name varchar(40) NOT NULL,
    created_by varchar (100 ) NOT NULL,
    type varchar(40) NOT NULL,
    logo varchar(50) NOT NULL
  );
  `;
};

exports.down = async (sql) => {
  await sql`
  DROP TABLE
    categories
  `;
};
