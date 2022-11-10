import { sql } from './connect';

export type Transaction = {
  id: number;
  user_id: number;
  date: string;
  amount: number;
  description: string;
  category_id: number;
  type_id: number;
};

export type TransactionData = Omit<
  Transaction,
  'user_id' | 'category_id' | 'type_id'
> & {
  categoryName: string;
  categoryLogo: string;
  transactionTypeName: string;
};

// to add income transaction to transactions table
export async function createTransaction(
  user_id: number,
  date: string,
  amount: number,
  description: string,
  category_id: number,
  type_id: number,
) {
  const [transaction] = await sql<Transaction[]>`
INSERT INTO transactions
  (user_id,type_id,date,amount,description,category_id)
VALUES
  (${user_id},${type_id}, ${date},${amount}, ${description}, ${category_id})
  RETURNING
  *
  `;
  return transaction;
}
// to get transacions from transaction table by user Id
/* export async function getTransactionByUserId(user_id: number) {
  const transaction = await sql<Transaction[]>`
  SELECT
   *
  FROM
    transactions
  WHERE
    user_id=${user_id}

  `;
  return transaction;
} */

// join query to get categories and transaction types data from transaction table
export async function getTransactionByUserId(
  id: number,
  startDate: string,
  endDate: string,
) {
  const transaction = await sql<Transaction[]>`
SELECT
transactions.id ,
  transactions.amount,
  transactions.date,
  transactions.description,
  categories.logo AS category_logo,
  categories.name AS category_name,
  transaction_types.name AS transaction_type_name
FROM
  transactions

INNER JOIN
  categories ON transactions.category_id = categories.id
  INNER JOIN
  transaction_types ON transactions.type_id = transaction_types.id
WHERE
  user_id =${id}
AND
  date BETWEEN ${startDate} AND ${endDate}

  `;
  console.log(transaction);
  return transaction;
}

// Delete transaction by transaction id
export async function deleteTransactionByTransactionsId(id: number) {
  const [transaction] = await sql<Transaction[]>`
DELETE
FROM
  transactions
WHERE
  transactions.id =${id}
RETURNING
*

  `;
  return transaction;
}

// Update transaction amount by transaction id
export async function updateAmountByTransactionId(id: number, amount: number) {
  const [transaction] = await sql<Transaction[]>`
UPDATE
  transactions
SET
  amount=${amount}
WHERE
  transactions.id =${id}
RETURNING
  *
    `;

  return transaction;
}
