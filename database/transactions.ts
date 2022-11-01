import { sql } from './connect';

// to add income transaction to transactions table
export async function createTransaction(
  user_id: number,
  date: string,
  amount: number,
  description: string,
  category_id: number,
  type_id: number,
) {
  const [transaction] = await sql`
INSERT INTO transactions
  (user_id,type_id,date,amount,description,category_id)
VALUES
  (${user_id},${type_id}, ${date},${amount}, ${description}, ${category_id})
  RETURNING
  *
  `;
  return transaction;
}
