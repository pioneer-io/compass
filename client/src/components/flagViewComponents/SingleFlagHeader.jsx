import React from 'react';

const SingleFlagHeader = () => {
  return(
    <div className="dashboard mt-10 pb-8 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
      <div>
        <h3 className="block text-5xl leading-14 font-medium text-green-700">
          Flag Details
        </h3>
      </div>
    </div>
  );
};

export default SingleFlagHeader;