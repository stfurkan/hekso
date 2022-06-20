import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import { getProviders, signIn, useSession } from 'next-auth/react';

export default function SignIn({ providers }) {
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  if (session) {
    Router.push('/');

    return null;
  }

  if (loading) {
    return null;
  }

  return (
    <>
      <Head>
        <meta
          property='og:title'
          content='Sign In - Heks.Social | Share your thoughts in Hex code'
          key='ogtitle'
        />
        <meta
          property='og:description'
          content='Sign In - Heks.Social | Share your thoughts in Hex code'
          key='ogdesc'
        />
        <title>Sign In - Heks.Social | Share your thoughts in Hex code</title>
      </Head>

      <div className='relative py-10'>
        <div className='relative container m-auto px-6 text-gray-500 md:px-12 xl:px-40'>
          <div className='m-auto md:w-8/12 lg:w-6/12 xl:w-6/12'>
            <div className='rounded-xl bg-white shadow-xl'>
              <div className='p-6 sm:p-16'>
                <div className='space-y-4'>
                  <span className='font-extrabold italic text-blue-600 text-4xl'>
                    0x
                  </span>
                  <h2 className='mb-8 text-2xl text-cyan-900 font-bold'>
                    Sign in to{' '}
                    <span className='text-blue-600'>Heks.social</span>
                  </h2>
                </div>
                <div className='mt-16 grid space-y-4'>
                  <button
                    className='group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100'
                    onClick={() => signIn('google')}
                  >
                    <div className='relative flex items-center space-x-4 justify-center'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='currentColor'
                        className='absolute left-0 w-5 text-gray-700'
                        viewBox='0 0 32 32'
                      >
                        <path d='M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z'></path>
                      </svg>
                      <span className='block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base'>
                        Continue with Google
                      </span>
                    </div>
                  </button>
                  <button
                    className='group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100'
                    onClick={() => signIn('twitter')}
                  >
                    <div className='relative flex items-center space-x-4 justify-center'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='currentColor'
                        className='absolute left-0 w-5 text-gray-700'
                        viewBox='0 0 32 32'
                      >
                        <path d='M31.937 6.093c-1.177 0.516-2.437 0.871-3.765 1.032 1.355-0.813 2.391-2.099 2.885-3.631-1.271 0.74-2.677 1.276-4.172 1.579-1.192-1.276-2.896-2.079-4.787-2.079-3.625 0-6.563 2.937-6.563 6.557 0 0.521 0.063 1.021 0.172 1.495-5.453-0.255-10.287-2.875-13.52-6.833-0.568 0.964-0.891 2.084-0.891 3.303 0 2.281 1.161 4.281 2.916 5.457-1.073-0.031-2.083-0.328-2.968-0.817v0.079c0 3.181 2.26 5.833 5.26 6.437-0.547 0.145-1.131 0.229-1.724 0.229-0.421 0-0.823-0.041-1.224-0.115 0.844 2.604 3.26 4.5 6.14 4.557-2.239 1.755-5.077 2.801-8.135 2.801-0.521 0-1.041-0.025-1.563-0.088 2.917 1.86 6.36 2.948 10.079 2.948 12.067 0 18.661-9.995 18.661-18.651 0-0.276 0-0.557-0.021-0.839 1.287-0.917 2.401-2.079 3.281-3.396z'></path>
                      </svg>

                      <span className='block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base'>
                        Continue with Twitter
                      </span>
                    </div>
                  </button>
                  <button
                    className='group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100'
                    onClick={() => signIn('github')}
                  >
                    <div className='relative flex items-center space-x-4 justify-center'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='currentColor'
                        className='absolute left-0 w-5 text-gray-700'
                        viewBox='0 0 16 16'
                      >
                        <path d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z' />
                      </svg>
                      <span className='block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base'>
                        Continue with GitHub
                      </span>
                    </div>
                  </button>
                </div>

                <div className='mt-16 space-y-4 text-gray-600 text-center sm:-mb-8'>
                  <p className='text-xs'>
                    By proceeding, you agree and confirm that you have read to
                    our{' '}
                    <Link href='/terms-and-privacy'>
                      <a className='underline'>Terms of Use & Privacy Policy</a>
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers }
  };
}
