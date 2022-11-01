import { sql } from './connect';

export type Categories = {
  id: number;
  name: string;
  createdBy: string;
  type: string;
};
export async function getCategoriesByType(type: string, userId: string) {
  const categories = sql<Categories[]>`
  SELECT
    *
  FROM
    categories
   WHERE
    type=${type} AND created_by='0' OR created_by=${userId}

  `;

  return categories;
}
