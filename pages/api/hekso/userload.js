import prisma from '../../../lib/prisma';

// POST /api/hekso/userload
// Required fields in body: cursor
export default async function handle(req, res) {
  const { userId, cursor } = req.body;

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
    },
    where: { user: { id: userId } }
  });

  if (heksos.length) {
    heksos.map((hekso) => {
      hekso.createdAt = hekso.createdAt.toLocaleString();
    });
  }

  return res.json(heksos);
}
