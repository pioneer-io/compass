import React from 'react';
import { parseDate } from '../../lib/helpers';
import { heroicon } from '../sharedComponents/Heroicons';

const LogEvent = ({ flag_id, title, description, created_at }) => {
	return (
		<li className="py-6 sm:px-0 clear-both bg-white-100 px-10 mb-2 border border-gray-200 shadow">
			<div className="pt-10 h-20 block mr-10 ml-10 float-left">{heroicon(description.toLowerCase())}</div>
			<div className="inline-block ml-5">
				<a href={`/flags/${flag_id}`}>
					<h2 className="text-2xl font-header">{title}</h2>
				</a>
				<h3 className="text-gray-800 font-header">Flag ID: {flag_id}</h3>
				<p className="text-gray-800">Log event: {description}</p>
				<p className="text-gray-800">Timestamp: {parseDate(created_at)}</p>
			</div>
		</li>
	);
};

export default LogEvent;
