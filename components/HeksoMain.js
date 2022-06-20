import Hekso from './Hekso';

export default function HeksoMain({ hekso }) {
  return (
    <div className=''>
      {hekso.main && (
        <div>
          <Hekso hekso={hekso.main} />
          <div className='text-center'>|</div>
        </div>
      )}
      <div>
        <Hekso hekso={hekso} isReply={hekso.main ? true : false} />
      </div>
      <div className={`${hekso.main ? 'scale-95' : ''}`}>
        {hekso.replies.length > 0 &&
          hekso.replies.map((heks) => (
            <div key={heks.id} className=''>
              <div className='text-center'>|</div>
              <Hekso hekso={heks} isReply={true} />
            </div>
          ))}
      </div>
    </div>
  );
}
