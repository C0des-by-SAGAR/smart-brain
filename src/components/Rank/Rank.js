import React from 'react';

const Rank = ({ name = "User", entries = 0 }) => {
    return (
      <div>
        <div className='white f3'>
          {`${name}, your current entry count is....`}
        </div>
        <div className='white f1'>
          {parseInt(entries, 10) || 0} {/* Ensure entries is a number */}
        </div>
      </div>
    );
  };
  
export default Rank;
