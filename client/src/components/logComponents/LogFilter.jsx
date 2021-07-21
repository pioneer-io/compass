import React from 'react';
import LogFilterOption from './LogFilterOption';

const LogFilter = () => {
  const filterOptions = ['all', 'created', 'toggled on/off', 'updated', 'deleted'];
  const selected = 'all';


  return(
    <fieldset>
      <span className="pr-2">Filter logs: </span>
      <legend className="sr-only text-gray-700">
        Filter logs by event
      </legend>
      {filterOptions.map((option, idx) => <LogFilterOption selected={selected} option={option} key={idx} />)}
    </fieldset>
  );
};

export default LogFilter;