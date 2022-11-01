import { sql } from './connect';

// to get transaction by type
export async function getTransactionTypeByName(name: string) {
  const [transaction] = await sql`
  SELECT
    *
  FROM
    transaction_types
  WHERE
    name=${name}

  `;

  return transaction;
}
