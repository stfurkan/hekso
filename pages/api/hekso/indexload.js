import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

// POST /api/hekso/indexload
// Required fields in body: cursor
export default async function handle(req, res) {
  const { cursor } = req.body;

  const session = await getSession({ req });

  if (!session) {
    // Not Signed in
    res.status(401);

    return res.json('You need to sign in to view index feed!');
  }

  const heksos = await prisma.hekso.findMany({
    include: {
      main: {
        select: {
          id: true
        }
      },
      user: {
        select: {
          id: true,
          name: true,
          image: true
        }
      },
      likes: {
        select: {
          userId: true
        }
      }
    },
    skip: 1,
    take: 10,
    cursor: {
      id: cursor
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  if (heksos.length) {
    heksos.map((hekso) => {
      hekso.createdAt = hekso.createdAt.toLocaleString();
    });
  }

  return res.json(heksos);
}
