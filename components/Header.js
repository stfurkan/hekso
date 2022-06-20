import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';

export default function Header() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (pathname) => router.pathname === pathname;

  return (
    <nav className='bg-white shadow dark:bg-gray-800'>
      <div className='container px-6 py-4 mx-auto'>
        <div className='md:flex md:items-center md:justify-between'>
          <div className='flex items-center justify-between'>
            <div className='text-xl font-semibold text-gray-700 dark:text-white'>
              <Link href='/'>
                <a>
                  <span className='font-extrabold italic'>0x</span> Heks.social
                </a>
              </Link>
            </div>

            <div className='flex md:hidden'>
              <button
                type='button'
                className='text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400'
                aria-label='Menüyü Aç/Kapat'
                onClick={() => setIsOpen(!isOpen)}
              >
                <svg viewBox='0 0 24 24' className='w-6 h-6 fill-current'>
                  <path
                    fillRule='evenodd'
                    d='M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z'
                  ></path>
                </svg>
              </button>
            </div>
          </div>

          <div
            className={`${
              isOpen ? 'block' : 'hidden'
            }  flex-1 md:flex md:items-center md:justify-between`}
          >
            <div className='flex flex-col -mx-4 md:flex-row md:items-center md:mx-8'>
              {session && (
                <Link href='/feed'>
                  <a
                    className={`${
                      isActive('/feed') ? 'underline' : ''
                    } px-2 py-1 mx-2 mt-2 text-md font-medium text-gray-700 transition-colors duration-200 transform rounded-md md:mt-0 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700`}
                  >
                    Feed
                  </a>
                </Link>
              )}
              {session && (
                <Link href='/new'>
                  <a
                    className={`${
                      isActive('/new') ? 'underline' : ''
                    } px-2 py-1 mx-2 mt-2 text-md font-medium text-gray-700 transition-colors duration-200 transform rounded-md md:mt-0 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700`}
                  >
                    New Hekso
                  </a>
                </Link>
              )}
            </div>

            <div className='flex flex-col items-center mt-4 md:mt-0 md:flex-row dark:text-white'>
              {session && (
                <Link href={`/user/${session.id}`}>
                  <a>
                    <div className='flex flex-row items-center mb-2 md:mb-0'>
                      <div className='mr-1'>
                        <img
                          className='w-8 h-8 rounded-full'
                          src={session.user.image}
                          alt=''
                        />
                      </div>
                      <div className='mr-1'>{session.user.name}</div>
                    </div>
                  </a>
                </Link>
              )}

              {loading ? null : !session ? (
                <Link href='/api/auth/signin'>
                  <a className='block px-3 py-2 mx-1 text-sm font-medium leading-5 text-center text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 md:mx-0 md:w-auto'>
                    Sign In
                  </a>
                </Link>
              ) : (
                <button onClick={() => signOut()}>
                  <a className='block px-3 py-2 mx-1 text-sm font-medium leading-5 text-center text-white transition-colors duration-200 transform bg-gray-500 rounded-md hover:bg-blue-600 md:mx-2 md:w-auto'>
                    Sign Out
                  </a>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
