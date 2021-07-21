import React from 'react';
import LogFilterOption from './LogFilterOption';

const LogFilter = ({handleFilterClick}) => {
  const filterOptions = ['all', 'created', 'toggled on/off', 'updated', 'deleted'];
  const selected = 'all';


  return(
    <fieldset>
      <span className="pr-2 text-gray-800">Filter logs: </span>
      {filterOptions.map((option, idx) => {
        return <LogFilterOption selected={selected} option={option} key={idx} handleFilterClick={handleFilterClick} />
      })}
    </fieldset>
  );
};

export default LogFilter;