import React from 'react';

const capitalize = str => str[0].toUpperCase() + str.slice(1);

const LogFilterOption = ({selected, option}) => {
  return(
    <label className="inline-block p-4 cursor-pointer">
      <span id={`filter-setting-${option}`} className={`${selected === option ?  "text-green-700 font-bold" : "text-gray-700 font-medium"}`}>
        {capitalize(option)}
      </span>
    </label>
  );
};

export default LogFilterOption;