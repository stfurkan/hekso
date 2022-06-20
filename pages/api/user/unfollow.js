import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

// POST /api/user/unfollow
// Required fields in body: userId
export default async function handle(req, res) {
  const { userId } = req.body;

  const session = await getSession({ req });

  if (!session) {
    // Not Signed in
    res.status(401);

    return res.json('You need to sign in to unfollow a user!');
  }

  const result = await prisma.user.update({
    data: {
      following: { disconnect: { id: userId } }
    },
    where: {
      id: session?.id
    }
  });

  return res.json(result);
}
