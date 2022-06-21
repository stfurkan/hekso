import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import prisma from '../lib/prisma';
import Hekso from '../components/Hekso';

export default function Home({ heksos }) {
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
      const resp = await fetch('/api/hekso/indexload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const loadedHeksos = await resp.json();

      console.log(loadedHeksos);

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

        <div className='container mx-auto flex flex-col items-center py-12 sm:py-24 bg-gray-100 rounded-xl mt-8 shadow-xl'>
          <div className='w-11/12 sm:w-2/3 lg:flex justify-center items-center flex-col  mb-5 sm:mb-10'>
            <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center text-gray-800 font-black leading-7 md:leading-10'>
              Start sharing your thoughts in{' '}
              <span className='text-blue-700'>Hex code</span> now!
            </h1>
            <p className='mt-5 sm:mt-10 lg:w-10/12 text-gray-600 font-normal text-center text-sm sm:text-lg'>
              53 74 61 72 74 20 73 68 61 72 69 6E 67 20 79 6F 75 72 20 74 68 6F
              75 67 68 74 73 20 69 6E 20 48 65 78 20 63 6F 64 65 20 6E 6F 77 21
            </p>
          </div>
          <div className='flex justify-center items-center'>
            <Link href='/auth/signin'>
              <a className='focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 bg-blue-700 transition duration-150 ease-in-out hover:bg-blue-600 lg:text-xl lg:font-bold  rounded text-white px-4 sm:px-10 border border-blue-700 py-2 sm:py-4 text-sm'>
                Get Started
              </a>
            </Link>
            <Link href='/auth/signin'>
              <a className='ml-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 bg-transparent transition duration-150 ease-in-out hover:border-blue-600 lg:text-xl lg:font-bold  hover:text-blue-600 rounded border border-blue-700 text-blue-700 px-4 sm:px-10 py-2 sm:py-4 text-sm'>
                47 65 74 20 53 74 61 72 74 65 64
              </a>
            </Link>
          </div>
        </div>
      </>
    );
  }

  if (loading) {
    return (
      <div className='max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800'>
        <p className='text-xl text-gray-700 dark:text-white'>Loading...</p>
      </div>
    );
  }

  if (heksos.length === 0) {
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

        <Link href='/new'>
          <a>
            <div className='text-center py-4'>
              <span className='text-white text-2xl bg-gray-800 p-3 font-semibold rounded-xl'>
                Post New Hekso
              </span>
            </div>
          </a>
        </Link>

        <div className='text-center py-4'>
          <span className='text-white text-2xl bg-gray-800 p-3 font-semibold rounded-xl'>
            There is no hekso!
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

      <Link href='/new'>
        <a>
          <div className='text-center py-4'>
            <span className='text-white text-2xl bg-gray-800 p-3 font-semibold rounded-xl'>
              Post New Hekso
            </span>
          </div>
        </a>
      </Link>

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

export const getServerSideProps = async () => {
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
    }
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
