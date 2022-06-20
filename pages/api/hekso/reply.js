import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

// POST /api/hekso/reply
// Required fields in body: hekso, userId, mainId
export default async function handle(req, res) {
  const { content, userId, mainId } = req.body;

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
      content: content,
      user: { connect: { id: userId } },
      main: { connect: { id: mainId } }
    }
  });
  return res.json(result);
}
