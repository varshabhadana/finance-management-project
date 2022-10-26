import bcrypt from 'bcrypt';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getUserwithPasswordHashAndEmail } from '../../database/users';

export type LoginResponseBody =
  | { error: { message: string }[] }
  | { user: { email: string; id: number } };

export default async function handler(
  request: NextApiRequest,
  resposnse: NextApiResponse<LoginResponseBody>,
) {
  if (request.method === 'POST') {
    // 1. Make sure the data exist
    if (
      typeof request.body.email !== 'string' ||
      typeof request.body.password !== 'string' ||
      !request.body.email ||
      !request.body.password
    ) {
      return resposnse
        .status(400)
        .json({ error: [{ message: 'Email or password not provided' }] });
    }
    //2. Get the user by email
    const user = await getUserwithPasswordHashAndEmail(request.body.email);

    if (!user) {
      return resposnse
        .status(401)
        .json({ error: [{ message: 'Email not registered' }] });
    }

    // 3. Check if the password and password hash match
    const isValidPassword = await bcrypt.compare(
      request.body.password,
      user.passwordHash,
    );

    if (!isValidPassword) {
      return resposnse
        .status(401)
        .json({ error: [{ message: 'Password does not match' }] });
    }

    resposnse.status(200).json({ user: { email: 'test@gmail.com', id: 1 } });
  }
}
