import React from 'react';
import LogFilterOption from './LogFilterOption';

const LogFilter = ({handleFilterClick, selected}) => {
  const filterOptions = ['all', 'created', 'toggled on/off', 'updated', 'deleted'];

  return(
    <fieldset className="px-10 pb-8">
      <span className="pr-2 text-gray-800">Filter logs: </span>
      {filterOptions.map((option, idx) => {
        return <LogFilterOption selected={selected} option={option} key={idx} handleFilterClick={handleFilterClick} />
      })}
    </fieldset>
  );
};

export default LogFilter;