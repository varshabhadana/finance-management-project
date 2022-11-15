import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { createSession } from '../../database/sessions';
import { getUserwithPasswordHashAndEmail } from '../../database/users';
import { createSreializedRegisterSessionTokenCookie } from '../../utils/cookie';
import mail from '../../utils/mail';

export type LoginResponseBody =
  | { errors: { message: string }[] }
  | { user: { email: string; id: number } };

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<LoginResponseBody>,
) {
  if (request.method === 'POST') {
    // 1. Make sure the data exist
    if (
      typeof request.body.email !== 'string' ||
      typeof request.body.password !== 'string' ||
      !request.body.email ||
      !request.body.password
    ) {
      return response
        .status(400)
        .json({ errors: [{ message: 'Email or password not provided' }] });
    }
    //2. Get the user by email
    const user = await getUserwithPasswordHashAndEmail(request.body.email);
    mail();

    if (!user) {
      return response
        .status(401)
        .json({ errors: [{ message: 'Email is not registered' }] });
    }

    // 3. Check if the password and password hash match
    const isValidPassword = await bcrypt.compare(
      request.body.password,
      user.passwordHash,
    );

    if (!isValidPassword) {
      return response
        .status(401)
        .json({ errors: [{ message: 'Password does not match' }] });
    }
    // 4. Create session token and serialize the cookie with the token
    const token = crypto.randomBytes(80).toString('base64');
    const session = await createSession(user.id, token);

    const serializedCookie = createSreializedRegisterSessionTokenCookie(
      session.token,
    );

    //this is the response for any method on this endpoint
    response
      .status(200)
      .setHeader('Set-Cookie', serializedCookie)
      .json({ user: { email: user.email, id: user.id } });
  } else {
    response.status(401).json({ errors: [{ message: 'Method not allowed' }] });
  }
}
