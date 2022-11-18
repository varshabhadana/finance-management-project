exports.up = async (sql) => {
  await sql`
INSERT INTO transaction_types(name)
 VALUES
 ('income'),
 ('expense');
 `;
};

exports.down = async (sql) => {
  await sql`
  DROP TABLE transaction_types`;
};
