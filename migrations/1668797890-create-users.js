exports.up = async (sql) => {
  await sql`
  CREATE TABLE users (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  email varchar(40) NOT NULL UNIQUE,
  password_hash varchar(70) NOT NULL UNIQUE,
  first_name varchar (100 ) NOT NULL,
  last_name varchar(100) NOT NULL,
  avatar varchar(100) ,
  notification boolean
  );
`;
};

exports.down = async (sql) => {
  await sql`
DROP TABLE
  users`;
};
