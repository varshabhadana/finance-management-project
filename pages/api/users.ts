import type { NextApiRequest, NextApiResponse } from 'next';
import { getUserByNotificationTrue } from '../../database/users';

export type UsersResponseBody =
  | {
      users: any[];
    }
  | { errors: { message: string }[] };

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<UsersResponseBody>,
) {
  if (request.method === 'GET') {
    /*  if (
      typeof request.query.notification !== 'string' ||
      !request.query.notification
    ) {
      return response.status(400).json({
        errors: [{ message: 'Not found' }],
      }); */
  }
  const userSubscribedForNotification = await getUserByNotificationTrue();
  if (userSubscribedForNotification) {
    response.status(200).json({ users: userSubscribedForNotification });
  }
}
