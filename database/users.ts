import { sql } from './connect';

export type User = {
  id: number;
  email: string;
  passwordHash: string;
  firsName: string;
  lastName: string;
  avatar: string;
  notification: boolean;
};

// function to get user by email
export async function getUserByEmail(email: string) {
  if (!email) return undefined;

  const [user] = await sql<User[]>`
  SELECT
    id,
    email
  FROM
    users
  WHERE
    users.email=${email}

  `;

  return user;
}
// function to create new user
export async function createUser(
  email: string,
  passwordHash: string,
  firsName: string,
  lastName: string,
) {
  const [user] = await sql<Pick<User, 'id' | 'email'>[]>`
  INSERT INTO users
    (email, password_hash, first_name, last_name)
  VALUES
    (${email}, ${passwordHash},${firsName},${lastName})
  RETURNING
  id,
  email
  `;
  return user;
}

//
export async function getUserwithPasswordhashandemail(email: string) {
  if (!email) return undefined;
  const [user] = await sql<User[]>`
  SELECT
    *
  FROM
    users
  WHERE
    users.email=${email}

  `;

  return user;
}
