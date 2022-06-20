import Head from 'next/head';

export default function TermsAndPrivacy() {
  return (
    <>
      <Head>
        <meta
          property='og:title'
          content='Terms of Use & Privacy Policy - Heks.Social | Share your thoughts in Hex code'
          key='ogtitle'
        />
        <meta
          property='og:description'
          content='Terms of Use & Privacy Policy - Heks.Social | Share your thoughts in Hex code'
          key='ogdesc'
        />
        <title>
          Terms of Use & Privacy Policy - Heks.Social | Share your thoughts in
          Hex code
        </title>
      </Head>

      <div className='bg-white shadow overflow-hidden rounded-lg mx-8 mt-8'>
        <div className='px-3 py-3 border-b border-gray-500 mx-3'>
          <h1 className='text-4xl leading-10 font-bold text-gray-900 text-center'>
            Terms of Use & Privacy Policy
          </h1>
        </div>
        <div className='bg-gray-50 px-4 pt-2 pb-5 grid grid-cols-1 gap-4 px-6'>
          <span className='text-lg leading-5 font-medium text-gray-900'>
            <ul>
              <li>
                - Heks.Social uses Google Analytics to track user statistics.
                Users who do not want to be tracked by Google Analytics can{' '}
                <a
                  href='https://tools.google.com/dlpage/gaoptout'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='font-bold'
                >
                  click here
                </a>{' '}
                to perform the relevant steps.
              </li>
              <li>
                - Heks.Social does not accept any liability for any damage you
                may suffer from browsing the site.
              </li>
              <li>
                - The member who shares the posts on Heks.Social is responsible
                for their contents. Heks.Social is not responsible for the posts
                made by the members.
              </li>
              <li>
                - Heks.Social reserves the right to delete website contents and
                user data without notice.
              </li>
              <li>
                - Heks.Social uses third party providers for user sign ins.
              </li>
              <li>
                - If you are using the Heks.Social site, you have confirmed that
                you have read this page and that you accept the relevant terms.
              </li>
              <li>
                - Heks.Social reserves the right to change the content on this
                page at any time.
              </li>
            </ul>
          </span>
        </div>
      </div>
    </>
  );
}
