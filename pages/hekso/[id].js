import Head from 'next/head';
import prisma from '../../lib/prisma';
import HeksoMain from '../../components/HeksoMain';

export default function HeksoPage({ hekso }) {
  if (!hekso) {
    return <div>Hekso not found!</div>;
  }

  return (
    <>
      <Head>
        <meta
          property='og:title'
          content='Heks.Social | Share your thoughts in Hex code'
          key='ogtitle'
        />
        <meta
          property='og:description'
          content='Heks.Social | Share your thoughts in Hex code'
          key='ogdesc'
        />
        <title>Heks.Social | Share your thoughts in Hex code</title>
      </Head>

      <HeksoMain hekso={hekso} />
    </>
  );
}

export const getServerSideProps = async ({ params }) => {
  const hekso = await prisma.hekso.findUnique({
    where: {
      id: params?.id || -1
    },
    include: {
      main: {
        select: {
          id: true,
          content: true,
          createdAt: true,
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
        }
      },
      replies: {
        select: {
          id: true,
          content: true,
          createdAt: true,
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
    }
  });

  if (hekso) {
    hekso.createdAt = hekso?.createdAt.toLocaleString();
  }

  if (hekso.main) {
    hekso.main.createdAt = hekso?.main?.createdAt.toLocaleString();
  }

  if (hekso.replies.length) {
    hekso.replies.map((reply) => {
      reply.createdAt = reply.createdAt.toLocaleString();
    });
  }

  return {
    props: { hekso }
  };
};
