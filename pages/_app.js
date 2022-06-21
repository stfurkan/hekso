import { SessionProvider } from 'next-auth/react';
import Router from 'next/router';
import nProgress from 'nprogress';

import SEO from '../components/SEO';
import Header from '../components/Header';
import Footer from '../components/Footer';

import '../styles/globals.css';
import '../styles/nprogress.css';

Router.events.on('routeChangeStart', nProgress.start);
Router.events.on('routeChangeError', nProgress.done);
Router.events.on('routeChangeComplete', nProgress.done);

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <SEO />
      <div className='flex flex-col min-h-screen justify-between'>
        <Header />
        <div className='container mx-auto my-1 flex-1'>
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>
    </SessionProvider>
  );
}

export default MyApp;
