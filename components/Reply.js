import { useState } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function Reply({ id, setIsReplyOpen }) {
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  const [hekso, setHekso] = useState('');
  const [error, setError] = useState([false, '']);

  let userId = null;
  if (session) {
    userId = session.id;
  }

  const submitReply = async (e) => {
    e.preventDefault();
    if (!session) {
      return;
    }

    try {
      const body = {
        mainId: id,
        content: hekso.replace(/\s/g, ''),
        userId: userId
      };

      await fetch('/api/hekso/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      setIsReplyOpen(false);
      setHekso('');

      await Router.push(`/hekso/${id}`);
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

  return (
    <div>
      <section className='max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800 dark:text-gray-200'>
        {error[0] && (
          <div className='text-center text-white'>
            <span className='border-white border p-2 rounded-xl bg-gray-600'>
              {error[1]}
            </span>
          </div>
        )}

        {session ? (
          <form onSubmit={submitReply}>
            <div className='grid grid-cols-1 gap-6 mt-4'>
              <div>
                <textarea
                  id='hekso'
                  type='text'
                  onChange={(e) => checkHekso(e.target.value)}
                  placeholder='Reply Hekso (max 256 characters)'
                  value={hekso}
                  className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring'
                  required
                />
              </div>
            </div>

            <Link href='/hex-ascii'>
              <a>
                <div className='text-sm text-gray-700 dark:text-white'>
                  Need help? Click here to check out our Hex converter!
                </div>
              </a>
            </Link>

            <div className='flex justify-end mt-6'>
              <button className='px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600'>
                Reply Hekso
              </button>
            </div>
          </form>
        ) : (
          <div>
            You need to{' '}
            <Link href='/auth/signin'>
              <a className='font-bold'>login</a>
            </Link>{' '}
            to reply!
          </div>
        )}
      </section>
    </div>
  );
}
