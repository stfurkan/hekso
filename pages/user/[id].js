import { useState } from 'react';
import Head from 'next/head';
import prisma from '../../lib/prisma';
import Hekso from '../../components/Hekso';
import Follow from '../../components/Follow';

export default function User({ user }) {
  const { id, name, image, heksos, followers, following, _count } = user;

  const [pageHeksos, setPageHeksos] = useState(heksos);
  const [cursor, setCursor] = useState(
    heksos.length > 0 ? heksos[heksos.length - 1].id : ''
  );
  const [shouldLoadMore, setShouldLoadMore] = useState(
    heksos.length < 10 ? false : true
  );

  const loadMore = async () => {
    try {
      const body = {
        userId: id,
        cursor: cursor
      };
      const resp = await fetch('/api/hekso/userload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const loadedHeksos = await resp.json();

      setCursor(loadedHeksos[loadedHeksos.length - 1].id);
      setPageHeksos([...pageHeksos, ...loadedHeksos]);

      if (loadedHeksos.length < 10) {
        setShouldLoadMore(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Head>
        <meta
          property='og:title'
          content={`${name} - Heks.Social | Share your thoughts in Hex code`}
          key='ogtitle'
        />
        <meta
          property='og:description'
          content={`${name} - Heks.Social | Share your thoughts in Hex code`}
          key='ogdesc'
        />
        <title>{name} - Heks.Social | Share your thoughts in Hex code</title>
      </Head>

      <div className='flex flex-col'>
        <div className='bg-white shadow rounded-lg p-10'>
          <div className='flex flex-col gap-1 text-center items-center'>
            <img
              className='h-32 w-32 bg-white p-2 rounded-full shadow mb-4'
              src={image}
              alt={name}
            />
            <p className='font-semibold'>{name}</p>
            <div className='text-sm leading-normal text-gray-400 flex justify-center items-center'>
              @{id}
            </div>
          </div>
          <div className='flex justify-center items-center gap-2 my-3'>
            <div className='font-semibold text-center mx-4'>
              <p className='text-black'>{_count.heksos}</p>
              <span className='text-gray-400'>Heksos</span>
            </div>
            <div className='font-semibold text-center mx-4'>
              <p className='text-black'>{followers.length}</p>
              <span className='text-gray-400'>Followers</span>
            </div>
            <div className='font-semibold text-center mx-4'>
              <p className='text-black'>{following.length}</p>
              <span className='text-gray-400'>Following</span>
            </div>
          </div>
          <div>
            <Follow id={id} followers={followers} />
          </div>
        </div>
        {pageHeksos.length > 0 && (
          <div>
            <div>
              {pageHeksos.map((hekso) => (
                <Hekso key={hekso.id} hekso={hekso} />
              ))}
            </div>
            {shouldLoadMore ? (
              <div className='text-center py-4'>
                <span
                  className='text-white text-2xl bg-gray-800 p-3 font-semibold rounded-xl hover:cursor-pointer'
                  onClick={() => loadMore()}
                >
                  Load More
                </span>
              </div>
            ) : (
              <div className='text-center py-4'>
                <span className='text-white text-2xl bg-gray-800 p-3 font-semibold rounded-xl'>
                  You have seen all heksos!
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export const getServerSideProps = async ({ params }) => {
  const user = await prisma.user.findUnique({
    where: {
      id: params?.id || -1
    },
    include: {
      heksos: {
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
        },
        take: 10,
        orderBy: {
          createdAt: 'desc'
        }
      },
      following: {
        select: {
          id: true
        }
      },
      followers: {
        select: {
          id: true
        }
      },
      _count: {
        select: {
          heksos: true
        }
      }
    }
  });

  if (user) {
    user.createdAt = user?.createdAt.toLocaleString();
    user.updatedAt = user?.updatedAt.toLocaleString();
  }

  if (user.heksos.length) {
    user.heksos.map((reply) => {
      reply.createdAt = reply.createdAt.toLocaleString();
    });
  }

  return {
    props: { user }
  };
};
