// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { updateUser } from '../../database/users';

export type UserResponseBody =
  | {
      avatar: string;
      notification: boolean;
      id: number;
    }
  | { errors: { message: string }[] };

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<UserResponseBody>,
) {
  const { avatar, notification, id } = request.body;
  if (request.method === 'POST') {
    // 1. Make sure the data exist
    if (
      typeof avatar !== 'string' ||
      typeof notification !== 'boolean' ||
      !avatar
    ) {
      return response.status(400).json({
        errors: [{ message: 'Avatar not selected!' }],
      });
    }
    // update user profile
    const updatedProfile = await updateUser(avatar, notification, id);
    if (updatedProfile) {
      response.status(200).json({
        avatar: updatedProfile.avatar,
        notification: updatedProfile.notification,
        id: updatedProfile.id,
      });
    }
  }
}
