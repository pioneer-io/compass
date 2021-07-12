import React from 'react';

const LogsHeader = () => {
  return(
    <div className="dashboard mt-10 pb-8 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
      <div>
        <h3 className="block text-5xl leading-14 font-medium text-green-700">
          Event Logs
        </h3>
        <p className="pt-4 leading-6 block">View the logs of all flag creations, updates, and deletions.</p>
      </div>
    </div>
  );
};

export default LogsHeader;