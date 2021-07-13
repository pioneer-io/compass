import React from 'react';
import { parseDate } from '../../lib/helpers';
import { heroicon } from '../sharedComponents/Heroicons';

const LogEvent = ({ flag_id, title, description, created_at }) => {
	return (
		<li className="py-6 sm:px-0 clear-both">
			<div className="pt-10 h-20 block mr-10 float-left">{heroicon(description.toLowerCase())}</div>
			<div className="inline-block ml-10">
				<h2 className="text-2xl">{title}</h2>
				<h3 className="text-gray-800">Flag ID: {flag_id}</h3>
				<p className="text-gray-800">Log event: {description}</p>
				<p className="text-gray-800">Timestamp: {parseDate(created_at)}</p>
			</div>
		</li>
	);
};

export default LogEvent;
