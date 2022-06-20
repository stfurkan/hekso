import { useState } from 'react';
import Head from 'next/head';

export default function HexToAscii() {
  const [asciiText, setAsciiText] = useState('');

  const prettierHex = /.{1,2}/g;

  const asciiToHex = (text) => {
    let arr1 = [];
    for (let n = 0, l = text.length; n < l; n++) {
      let hex = Number(text.charCodeAt(n)).toString(16);
      arr1.push(hex);
    }
    return arr1.join('');
  };

  const copyToClipboard = () => {
    const cb = navigator.clipboard;
    const hexT = document.querySelector('#hexString');
    cb.writeText(hexT.innerText).then(() => alert('Hex code copied'));
  };

  return (
    <>
      <Head>
        <meta
          property='og:title'
          content='ASCII to HEX Converter - Heks.Social | Share your thoughts in Hex code'
          key='ogtitle'
        />
        <meta
          property='og:description'
          content='ASCII to HEX Converter - Heks.Social | Share your thoughts in Hex code'
          key='ogdesc'
        />
        <title>
          ASCII to HEX Converter - Heks.Social | Share your thoughts in Hex code
        </title>
      </Head>

      <div className='grid grid-cols-1 gap-6 mt-4 bg-gray-100 py-2 px-2 sm:px-16 shadow-xl rounded-xl mt-8 mx-8'>
        <div>
          <label className='flex flex-col text-gray-800' htmlFor='hekso'>
            <span className='text-3xl text-center font-bold'>
              ASCII to HEX Converter
            </span>
          </label>
          <textarea
            id='hekso'
            type='text'
            onChange={(e) => setAsciiText(e.target.value)}
            placeholder='Type some text to convert in Hex code...'
            value={asciiText}
            className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring'
            required
          />
        </div>

        {asciiText !== '' && (
          <div className='text-center'>
            <div className='text-3xl text-gray-800 font-bold border-b border-gray-300 mb-8'>
              HEX CODE
            </div>
            <div
              id='hexString'
              className='text-gray-300 bg-gray-800 rounded-xl'
            >
              {asciiToHex(asciiText).match(prettierHex).join(' ')}
            </div>
            <button
              className='bg-blue-500 text-white mt-3 p-2 rounded-xl hover:cursor-pointer'
              onClick={() => copyToClipboard()}
            >
              Copy to clipboard
            </button>
          </div>
        )}
      </div>
    </>
  );
}
