import { sql } from './connect';
import { User } from './users';

export type Session = {
  id: number;
  token: string;
};

export async function createSession(userId: User['id'], token: string) {
  const [session] = await sql<Session[]>`
  INSERT INTO sessions
    (token, user_id)
  VALUES
    (${token}, ${userId})
  RETURNING
    id,
    token
  `;
  await deleteExpiredSession();
  return session;
}
export async function getValidSessionByToken(token: Session['token']) {
  const [session] = await sql<Session[]>`
  SELECT
    sessions.id,
    sessions.token
  FROM
    sessions
  WHERE
  sessions.token=${token}
  AND
  sessions.expiry_timestamp>now()
  `;
  return session;
}
export async function deleteExpiredSession() {
  const sessions = await sql<Session[]>`
  DELETE FROM
    sessions
  WHERE
    expiry_timestamp < now()
  RETURNING
    id,
    token

  `;
  return sessions;
}
export async function deleteSessionByToken(token: string) {
  const [session] = await sql<Session[]>`
   DELETE FROM
    sessions
  WHERE
    sessions.token=${token}
  RETURNING
    id,
    token
  `;
  return session;
}
