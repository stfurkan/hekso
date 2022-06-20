import { useState } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function NewHekso() {
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  const [hekso, setHekso] = useState('');
  const [error, setError] = useState([false, '']);

  const submitData = async (e) => {
    e.preventDefault();
    if (!session) {
      return;
    }

    try {
      const body = {
        hekso: hekso.replace(/\s/g, ''),
        userId: session.id
      };

      await fetch('/api/hekso/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      await Router.push(`/`);
    } catch (error) {
      console.error(error);
    }
  };

  const checkHekso = (hekso) => {
    const hexRegExp = /^[0-9a-fA-F ]+$/;

    const prettierHex = /.{1,2}/g;

    if (hexRegExp.test(hekso) || hekso === '') {
      setError([false, '']);

      let prettierHekso = hekso.replace(/\s/g, '').match(prettierHex).join(' ');

      if (prettierHekso.length > 383) {
        setError([true, 'You have reached the max character amount!']);
      } else {
        setHekso(prettierHekso);
      }
    } else {
      setError([true, 'Please only use hex code values!']);
    }
  };

  if (!session && !loading) {
    return (
      <div className='max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800'>
        <p className='text-xl text-gray-700 dark:text-white'>
          You need to login to post a new hekso!
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className='max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800'>
        <p className='text-xl text-gray-700 dark:text-white'>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <meta
          property='og:title'
          content='New Hekso - Heks.Social | Share your thoughts in Hex code'
          key='ogtitle'
        />
        <meta
          property='og:description'
          content='New Hekso - Heks.Social | Share your thoughts in Hex code'
          key='ogdesc'
        />
        <title>New Hekso - Heks.Social | Share your thoughts in Hex code</title>
      </Head>

      <div>
        <section className='max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800'>
          <h2 className='text-2xl font-bold text-gray-700 capitalize dark:text-white'>
            Post a New Hekso
          </h2>
          <Link href='/hex-ascii'>
            <a>
              <div className='text-sm text-gray-700 dark:text-white mb-2'>
                Need help? Click here to check out our Hex converter!
              </div>
            </a>
          </Link>

          {error[0] && (
            <div className='text-center text-white'>
              <span className='border-white border p-2 rounded-xl bg-gray-600'>
                {error[1]}
              </span>
            </div>
          )}

          <form onSubmit={submitData}>
            <div className='grid grid-cols-1 gap-6 mt-4'>
              <div>
                <label
                  className='flex flex-col text-gray-700 dark:text-gray-200'
                  htmlFor='hekso'
                >
                  <span className='text-lg font-semibold'>New Hekso</span>
                  <span className='text-sm italic'>Max 256 characters</span>
                </label>
                <textarea
                  id='hekso'
                  type='text'
                  onChange={(e) => checkHekso(e.target.value)}
                  placeholder='New Hekso'
                  value={hekso}
                  className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring'
                  required
                />
              </div>
            </div>

            <div className='flex justify-end mt-6'>
              <button className='px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600'>
                Post Hekso
              </button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}
