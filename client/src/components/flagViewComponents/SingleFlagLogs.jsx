import React from 'react';
import SingleFlagLogEvent from './SingleFlagLogEvent';

const SingleFlagLogs = ({logs}) => {
  // logs format: [{}, {}, {}]

  return(
    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
    <dt className="text-sm font-medium text-gray-500">
      Logs
    </dt>
    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
      <div className="flow-root">
      <ul className="-mb-8">
        {logs.map(event => <SingleFlagLogEvent {...event} key={event.id} />)}
      </ul>
    </div>
    </dd>
  </div>
  );
};

export default SingleFlagLogs;