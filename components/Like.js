import Router from 'next/router';
import { useSession } from 'next-auth/react';

export default function Like({ id, likes }) {
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  let userId = null;
  if (session) {
    userId = session.id;
  }

  const searchUserLike = Boolean(likes.find((like) => like.userId === userId));

  const submitLike = async () => {
    if (!session) {
      return Router.push(`/auth/signin`);
    }

    try {
      const body = {
        heksoId: id
      };
      await fetch('/api/hekso/like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      Router.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const submitUnlike = async () => {
    if (!session) {
      return Router.push(`/auth/signin`);
    }

    try {
      const body = {
        heksoId: id
      };
      await fetch('/api/hekso/unlike', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      Router.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='flex flex-row items-center mr-1'>
      <div
        className={`text-red-400 ${
          session ? 'hover:text-red-700 hover:cursor-pointer' : ''
        }`}
      >
        {searchUserLike ? (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            viewBox='0 0 20 20'
            fill='currentColor'
            onClick={() => submitUnlike()}
          >
            <path
              fillRule='evenodd'
              d='M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z'
              clipRule='evenodd'
            />
          </svg>
        ) : (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            onClick={() => submitLike()}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
            />
          </svg>
        )}
      </div>
      <div className='font-semibold'>{likes.length}</div>
    </div>
  );
}
