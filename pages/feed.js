import { useState } from 'react';
import { useSession, getSession } from 'next-auth/react';
import Head from 'next/head';
import prisma from '../lib/prisma';
import Hekso from '../components/Hekso';

export default function Feed({ heksos }) {
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  const [pageHeksos, setPageHeksos] = useState(heksos);
  const [cursor, setCursor] = useState(
    heksos.length > 0 ? heksos[heksos.length - 1].id : ''
  );
  const [shouldLoadMore, setShouldLoadMore] = useState(
    heksos.length < 10 ? false : true
  );

  const loadMore = async () => {
    if (!session) {
      return;
    }

    try {
      const body = {
        cursor: cursor
      };
      const resp = await fetch('/api/hekso/feedload', {
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

  if (!session && !loading) {
    return (
      <>
        <Head>
          <meta
            property='og:title'
            content='Feed - Heks.Social | Share your thoughts in Hex code'
            key='ogtitle'
          />
          <meta
            property='og:description'
            content='Feed - Heks.Social | Share your thoughts in Hex code'
            key='ogdesc'
          />
          <title>Feed - Heks.Social | Share your thoughts in Hex code</title>
        </Head>

        <div className='max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800'>
          <p className='text-xl dark:text-white'>Login to see your feed!</p>
        </div>
      </>
    );
  }

  if (loading) {
    return (
      <div className='max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800'>
        <p className='text-xl'>Loading...</p>
      </div>
    );
  }

  if (heksos.length === 0) {
    return (
      <>
        <Head>
          <meta
            property='og:title'
            content='Feed - Heks.Social | Share your thoughts in Hex code'
            key='ogtitle'
          />
          <meta
            property='og:description'
            content='Feed - Heks.Social | Share your thoughts in Hex code'
            key='ogdesc'
          />
          <title>Feed - Heks.Social | Share your thoughts in Hex code</title>
        </Head>

        <div className='text-center py-4'>
          <span className='text-white text-2xl bg-gray-800 p-3 font-semibold rounded-xl'>
            Start following some users!
          </span>
        </div>
      </>
    );
  }

  return (
    <div>
      <Head>
        <meta
          property='og:title'
          content='Feed - Heks.Social | Share your thoughts in Hex code'
          key='ogtitle'
        />
        <meta
          property='og:description'
          content='Feed - Heks.Social | Share your thoughts in Hex code'
          key='ogdesc'
        />
        <title>Feed - Heks.Social | Share your thoughts in Hex code</title>
      </Head>

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
  );
}

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (!session) {
    // Not Signed in
    return {
      props: { heksos: [] }
    };
  }

  const followingList = await prisma.user.findUnique({
    select: {
      following: {
        select: {
          id: true
        }
      }
    },
    where: {
      id: session?.id
    }
  });

  let following = followingList.following.map((user) => user.id);

  following = [...following, session?.id];

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
    take: 10,
    orderBy: {
      createdAt: 'desc'
    },
    where: { user: { id: { in: following } } }
  });

  if (heksos.length) {
    heksos.map((hekso) => {
      hekso.createdAt = hekso.createdAt.toLocaleString();
    });
  }

  return {
    props: { heksos }
  };
};
