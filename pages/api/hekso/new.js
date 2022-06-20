import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

// POST /api/hekso/new
// Required fields in body: hekso, userId
export default async function handle(req, res) {
  const { hekso, userId } = req.body;

  const session = await getSession({ req });

  if (!session) {
    // Not Signed in
    res.status(401);

    return res.json('You need to login!');
  }

  if (session?.id !== userId) {
    // User IDs not match!
    res.status(401);

    return res.json('Unexpected error!');
  }

  const result = await prisma.hekso.create({
    data: {
      content: hekso,
      user: { connect: { id: userId } }
    }
  });
  return res.json(result);
}
