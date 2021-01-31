import React from 'react';
import spinner from './ecd6bc09da634e4e2efa16b571618a22.gif';

export default () => {
  return (
    <div>
      <img
        src={spinner}
        style={{ width: '200px', margin: 'auto', display: 'block',
         opacity: '.5',
          position: 'fixed', top:'50%', bottom:'50%', left:'25%', right:'25%',
           height: '200px', zIndex:'9999' }}
        alt="Loading..."
      />
    </div>
  );
};