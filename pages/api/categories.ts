// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import {
  createNewCategory,
  getCategoriesByType,
} from '../../database/categories';

export type CategoriesResponse =
  | {
      categories: {
        id: number;
        name: string;
        createdBy: string;
        type: string;
        logo: string;
      }[];
    }
  | { errors: { message: string }[] }
  | {
      id: number;
      name: string;
      createdBy: string;
      type: string;
      logo: string;
    };

export default async function handler(
  request: NextApiRequest,

  response: NextApiResponse<CategoriesResponse>,
) {
  if (request.method === 'GET') {
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

    if (categories) {
      response.status(200).json({ categories: categories });
    }
  }
  // destructing request.body
  const { name, created_by, type, logo } = request.body;
  if (request.method === 'POST') {
    // 1. Make sure the data exist

    if (
      typeof request.body.name !== 'string' ||
      typeof request.body.created_by !== 'string' ||
      typeof request.body.type !== 'string' ||
      typeof request.body.logo !== 'string' ||
      !request.body.name ||
      !request.body.created_by ||
      !request.body.type ||
      !request.body.logo
    ) {
      return response.status(400).json({
        errors: [{ message: 'Category logo or name not provided' }],
      });
    }
    const newCategory = await createNewCategory(name, created_by, type, logo);
    console.log(newCategory);
    if (newCategory) {
      const { name, createdBy, type, logo, id } = newCategory;
      response.status(200).json({
        id,
        name,
        createdBy,
        type,
        logo,
      });
    }
  }
}
