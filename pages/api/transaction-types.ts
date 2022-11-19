// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getTransactionTypeByName } from '../../database/transaction-types';

export type TransactionTypesResponse =
  | {
      id: number;
      name: string;
    }
  | { errors: { message: string }[] };

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<TransactionTypesResponse>,
) {
  if (request.method === 'GET') {
    if (typeof request.query.name !== 'string' || !request.query.name) {
      return response.status(400).json({
        errors: [{ message: 'Transaction type name not provided' }],
      });
    }
    const transactionTypes = await getTransactionTypeByName(request.query.name);
    if (transactionTypes) {
      response
        .status(200)
        .json({ id: transactionTypes.id, name: transactionTypes.name });
    }
  }
}
