import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

// POST /api/hekso/unlike
// Required fields in body: heksoId
export default async function handle(req, res) {
  const { heksoId } = req.body;

  const session = await getSession({ req });

  if (!session) {
    // Not Signed in
    res.status(401);

    return res.json('You need to sign in to unlike a hekso!');
  }

  const result = await prisma.like.delete({
    where: {
      userId_heksoId_constraint: {
        userId: session?.id,
        heksoId: heksoId
      }
    }
  });

  return res.json(result);
}
