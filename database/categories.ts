import { sql } from './connect';

export type Categories = {
  id: number;
  name: string;
  createdBy: string;
  type: string;
  logo: string;
};
export async function getCategoriesByType(type: string, userId: string) {
  const categories = sql<Categories[]>`
  SELECT
    *
  FROM
    categories
   WHERE
   (type=${type} AND created_by='0') OR (type=${type} AND created_by=${userId})

  `;

  return categories;
}
export async function createNewCategory(
  name: string,
  created_by: string,
  type: string,
  logo: string,
) {
  const [category] = await sql<Categories[]>`
  INSERT INTO categories(name, created_by, type,logo) VALUES (${name},${created_by}, ${type},${logo})
  RETURNING
  *`;
  return category;
}
