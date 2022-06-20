import Router from 'next/router';
import { useSession } from 'next-auth/react';

export default function Follow({ id, followers }) {
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  let userId = null;
  if (session) {
    userId = session.id;
  }

  const searchUserFollow = Boolean(
    followers.find((user) => user.id === userId)
  );

  const submitFollow = async () => {
    if (!session) {
      return Router.push(`/auth/signin`);
    }

    try {
      const body = {
        userId: id
      };
      await fetch('/api/user/follow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      Router.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const submitUnfollow = async () => {
    if (!session) {
      return;
    }

    try {
      const body = {
        userId: id
      };
      await fetch('/api/user/unfollow', {
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
    userId !== id && (
      <div className='text-center'>
        {searchUserFollow ? (
          <span
            className='text-white bg-gray-800 p-3 font-semibold rounded-xl hover:cursor-pointer'
            onClick={() => submitUnfollow()}
          >
            Following
          </span>
        ) : (
          <span
            className='text-white bg-gray-800 p-3 font-semibold rounded-xl hover:cursor-pointer'
            onClick={() => submitFollow()}
          >
            Follow
          </span>
        )}
      </div>
    )
  );
}
