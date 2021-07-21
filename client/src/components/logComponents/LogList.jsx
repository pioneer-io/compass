import React from 'react';
import LogEvent from './LogEvent';

const LogList = ({filteredLogs}) => {
  return(
    <ul className="log-tiles px-8 pb-8 divide-y divide-gray-200">
      {filteredLogs.map(event => <LogEvent {...event} key={event.id} />)}
    </ul>
  );
};

export default LogList;