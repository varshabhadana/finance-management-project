// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import {
  createTransaction,
  deleteTransactionByTransactionsId,
  getTransactionByUserId,
  TransactionData,
  updateAmountByTransactionId,
} from '../../database/transactions';

export type TransactionResponse =
  | ({
      amount: number;
      date: Date;
      description: string;
      category_id: number;
      user_id: number;
      type_id: number;
    } & TransactionData)
  | { errors: { message: string }[] };

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<any>,
) {
  const { amount, date, description, category_id, user_id, type_id } =
    request.body;
  if (request.method === 'POST') {
    // 1. Make sure the data exist

    if (
      typeof request.body.amount !== 'number' ||
      typeof request.body.date !== 'string' ||
      typeof request.body.description !== 'string' ||
      typeof request.body.category_id !== 'number' ||
      typeof request.body.user_id !== 'number' ||
      !request.body.category_id ||
      !request.body.amount ||
      !request.body.date
    ) {
      return response.status(400).json({
        errors: [{ message: 'Category , Amount or Date not provided' }],
      });
    }
    // add new income transaction
    const newIncome = await createTransaction(
      user_id,
      date,
      amount,
      description,
      category_id,
      type_id,
    );

    if (newIncome) {
      const { amount, date, description, category_id, user_id, type_id } =
        newIncome;
      response.status(200).json({
        amount,
        date,
        description,
        category_id,
        user_id,
        type_id,
      });
    }
  }
  // to get Transaction by by user Id
  if (request.method === 'GET') {
    if (typeof request.query.user_id !== 'string' || !request.query.user_id) {
      return response.status(400).json({
        errors: [{ message: 'User id not provided' }],
      });
    }

    const userIdTransaction = await getTransactionByUserId(
      Number(request.query.user_id),
    );

    // check if user Id exist on database
    if (!userIdTransaction) {
      return response.status(400).json({
        errors: [{ message: 'No transactions found ' }],
      });
    }

    return response.status(200).json(userIdTransaction);
  }
  // to delete transaction
  if (request.method === 'DELETE') {
    const deleteTransaction = await deleteTransactionByTransactionsId(
      Number(request.query.transaction_id),
    );
    console.log('transactionid', deleteTransaction);
    // check if user Id exist on database
    if (!deleteTransaction) {
      return response.status(400).json({
        errors: [{ message: 'Not a valid Id ' }],
      });
    }

    return response.status(200).json(deleteTransaction);
  }
  // to update transaction amount
  if (request.method === 'PUT') {
    // 1. Make sure the data exist
    if (
      typeof request.body.id !== 'number' ||
      typeof request.body.amount !== 'number' ||
      !request.body.id ||
      !request.body.amount
    ) {
      return response
        .status(400)
        .json({ errors: [{ message: 'Amount not provided as a number' }] });
    }

    const updatedAmount = await updateAmountByTransactionId(
      request.body.id,
      request.body.amount,
    );
    // 2.check if user Id exist on database
    if (!updatedAmount) {
      return response.status(400).json({
        errors: [{ message: 'Not a valid Id ' }],
      });
    }

    return response.status(200).json(updatedAmount);
  }
  return response
    .status(405)
    .json({ errors: [{ message: 'method not allowed' }] });
}
