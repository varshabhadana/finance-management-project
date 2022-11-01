// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { createTransaction } from '../../database/transactions';

export type TransactionResponse =
  | {
      amount: number;
      date: Date;
      description: string;
      category_id: number;
      user_id: number;
      type_id: number;
    }
  | { errors: { message: string }[] };

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<TransactionResponse>,
) {
  const { amount, date, description, category_id, user_id, type_id } =
    request.body;
  if (request.method === 'POST') {
    // 1. Make sure the data exist
    console.log(request.body);
    if (
      typeof request.body.amount !== 'number' ||
      typeof request.body.date !== 'string' ||
      typeof request.body.description !== 'string' ||
      typeof request.body.category_id !== 'number' ||
      typeof request.body.user_id !== 'number' ||
      /* typeof request.body.type_id !== 'number' || */
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
}
