import { useState } from 'react';
import Link from 'next/link';
import Reply from './Reply';
import Like from './Like';

export default function Hekso({ hekso, isReply = false }) {
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [isTranslateOpen, setIsTranslateOpen] = useState(false);

  const { id, content, user, createdAt, main, likes } = hekso;

  const prettierHex = /.{1,2}/g;

  const hex2a = (hexString) => {
    let hex = hexString.toString();
    let str = '';
    for (let i = 0; i < hex.length; i += 2)
      str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
  };

  return (
    <div className='flex flex-col'>
      <div className='min-w-screen bg-gray-200 flex items-center justify-center px-5 py-2'>
        <div
          className={`${
            isReply ? 'w-4/5' : 'w-full'
          } mx-auto rounded-lg bg-white shadow p-5 text-gray-800 hover:scale-105`}
        >
          <div className='w-full flex justify-between mb-4'>
            <Link href={`/user/${user.id}`}>
              <div className='flex hover:cursor-pointer'>
                <div className='overflow-hidden rounded-full w-12 h-12'>
                  <img src={user.image} alt='' />
                </div>
                <div className='flex-grow pl-3'>
                  <h6 className='font-bold text-md'>{user.name}</h6>
                  <p className='text-xs text-gray-600'>@{user.id}</p>
                </div>
              </div>
            </Link>
            {(isReply || main?.id) && (
              <div className='hidden sm:block'>
                <span className='text-xs text-gray-500 text-right'>
                  Replied Hekso
                </span>
              </div>
            )}
          </div>

          <div className='w-full mb-4 text-center py-2 border-4 border-gray-200 rounded-xl'>
            <Link href={`/hekso/${id}`}>
              <a className='text-sm p-3 hover:cursor-pointer'>
                {content.match(prettierHex).join(' ')}
              </a>
            </Link>
          </div>

          {isTranslateOpen && (
            <div className='w-full mb-4 text-center py-2 border-4 border-blue-200 rounded-xl'>
              <span className='break-words text-sm p-3'>{hex2a(content)}</span>
            </div>
          )}

          <div className='flex flex-row justify-between w-full'>
            <div className='flex flex-row text-xs text-gray-500 text-left items-center'>
              <div
                className='cursor-pointer'
                onClick={() => setIsReplyOpen(!isReplyOpen)}
              >
                Reply
              </div>
              <div className='ml-2'>
                <Like id={id} likes={likes} />
              </div>
              <div
                className='cursor-pointer'
                onClick={() => setIsTranslateOpen(!isTranslateOpen)}
              >
                {isTranslateOpen ? 'Close Translate' : 'Translate'}
              </div>
            </div>
            <div className='text-xs text-gray-500 text-right'>{createdAt}</div>
          </div>
        </div>
      </div>
      {isReplyOpen && <Reply id={id} setIsReplyOpen={setIsReplyOpen} />}
    </div>
  );
}
