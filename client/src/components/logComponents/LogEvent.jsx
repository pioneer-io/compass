import React from 'react';
import parseDate from '../../lib/helpers';

const LogEvent = ({flag_id, title, description, created_at}) => {
  return (
    <li className="py-6 sm:px-0 clear-both">
      <h2>{title}</h2>
      <h3>Flag ID: {flag_id}</h3>
      <p>Description: {description}</p>
      <p>Timestamp: {parseDate(created_at)}</p>
    </li>
  );
}

export default LogEvent;