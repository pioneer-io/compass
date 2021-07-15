import React from 'react';

const FlagsHeader = ({setCreatingNew}) => {
  return(
    <div className="dashboard mt-10 pb-8 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
      <div>
        <h3 className="block text-5xl leading-14 font-medium text-green-700">
          Feature Flags
        </h3>
        <p className="pt-4 leading-6 block w-2/3">Click a flag title to view full details. The most recently updated flags can be found at the top of this list.</p>
      </div>
      <div className="mt-3 sm:mt-0 sm:ml-4">
        <button onClick={() => setCreatingNew(true) }type="button" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Create new flag
        </button>
      </div>
    </div>
  );
};

export default FlagsHeader;