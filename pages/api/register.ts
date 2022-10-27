import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { createSession } from '../../database/sessions';
import { createUser, getUserByEmail } from '../../database/users';
import { createSreializedRegisterSessionTokenCookie } from '../../utils/cookie';

export type RegisterResponseBody =
  | { errors: { message: string }[] }
  | { user: { email: string; id: number } };

export default async function handler(
  request: NextApiRequest,
  resposnse: NextApiResponse<RegisterResponseBody>,
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
        .json({ errors: [{ message: 'Email or password not provided' }] });
    }
    // 2. we check if the user already exist
    const user = await getUserByEmail(request.body.email);

    if (user) {
      return resposnse
        .status(401)
        .json({ errors: [{ message: 'This Email is already registered' }] });
    }
    // 3. we hash the password if the above error doesnot show to create new user
    const passwordHash = await bcrypt.hash(request.body.password, 12);

    // 4. sql query to create the record (new user)

    const newUser = await createUser(
      request.body.email,
      passwordHash,
      request.body.firstName,
      request.body.lastName,
    );
    // 5. Create session token and serialize the cookie with the token
    const token = crypto.randomBytes(80).toString('base64');
    const session = await createSession(newUser.id, token);

    const serializedCookie = createSreializedRegisterSessionTokenCookie(
      session.token,
    );
    resposnse
      .status(200)
      .setHeader('Set-Cookie', serializedCookie)
      .json({ user: { email: newUser.email, id: newUser.id } });
  } else {
    resposnse.status(401).json({ errors: [{ message: 'Method not allowed' }] });
  }
}
