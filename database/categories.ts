import { sql } from './connect';

export type Categories = {
  id: number;
  name: string;
  createdBy: string;
  type: string;
};
export async function getCategories(categoryType: string) {
  const categories = sql<Categories[]>`
  SELECT name FROM categories
   WHERE
    type=${categoryType};
  `;

  return categories;
}
