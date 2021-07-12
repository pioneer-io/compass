import React from 'react';

const Toggle = ({toggledOn, handleClickToggle}) => {
  const classList = toggledOn ? "bg-indigo-600" : "bg-gray-200";
  const translation = toggledOn ? "translate-x-7" : "translate-x-0";

  return(
    <div className="flex float-right">
      <span className="flex-grow flex flex-col">
        <span className="text-sm font-medium text-gray-900" id="availability-label">Currently toggled {toggledOn ? "on" : "off"}</span>
        <span className="text-sm text-gray-500" id="availability-description">Changing the toggle status will take immediate effect</span>
      </span>
      <button onClick={handleClickToggle} type="button" className={classList + " relative inline-flex flex-shrink-0 h-8 w-16 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ml-2"} role="switch" aria-checked="false" aria-labelledby="availability-label" aria-describedby="availability-description">
        <span aria-hidden="true" className={translation + " pointer-events-none inline-block h-7 w-7 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"}></span>
      </button>
    </div>
  );
};

export default Toggle;