import Head from 'next/head';

export default function SEO() {
  return (
    <Head>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta charSet='utf-8' />
      <meta
        name='description'
        content='Heks.Social | Share your thoughts in Hex code'
      />

      <meta name='twitter:card' content='summary_large_image' key='twcard' />

      <meta property='og:url' content='https://heks.social' key='ogurl' />
      <meta
        property='og:image'
        content='https://heks.social/heks.png'
        key='ogimage'
      />
      <meta property='og:site_name' content='Heks.Social' key='ogsitename' />
      <meta property='og:title' content='Heks.Social' key='ogtitle' />
      <meta
        property='og:description'
        content='Heks.Social | Share your thoughts in Hex code'
        key='ogdesc'
      />
      <title>Heks.Social | Share your thoughts in Hex code</title>

      <link rel='icon' href='/favicon.ico' />
    </Head>
  );
}
