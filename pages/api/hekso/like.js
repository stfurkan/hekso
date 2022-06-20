import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

// POST /api/hekso/like
// Required fields in body: heksoId
export default async function handle(req, res) {
  const { heksoId } = req.body;

  const session = await getSession({ req });

  if (!session) {
    // Not Signed in
    res.status(401);

    return res.json('You need to sign in to like a hekso!');
  }

  const result = await prisma.like.create({
    data: {
      user: { connect: { id: session?.id } },
      hekso: { connect: { id: heksoId } }
    }
  });

  return res.json(result);
}
