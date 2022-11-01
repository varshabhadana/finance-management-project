// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getCategoriesByType } from '../../database/categories';

export type CategoriesResponse =
  | {
      id: number;
      name: string;
      created_by: number;
      type: string;
      logo: string;
    }[]
  | { errors: { message: string }[] };

export default async function handler(
  request: NextApiRequest,

  response: NextApiResponse<any>,
) {
  if (request.method === 'GET') {
    console.log(request.query);
    //Make sure data exists
    if (
      typeof request.query.type !== 'string' ||
      typeof request.query.created_by !== 'string' ||
      !request.query.type ||
      !request.query.created_by
    ) {
      return response.status(400).json({
        errors: [{ message: 'Category type or user id not provided' }],
      });
    }
    // Get categories by type
    const categories = await getCategoriesByType(
      request.query.type,
      request.query.created_by,
    );
    console.log(categories);
    if (categories) {
      console.log(categories);
      response.status(200).json({ categories: categories });
    }
  }
}
