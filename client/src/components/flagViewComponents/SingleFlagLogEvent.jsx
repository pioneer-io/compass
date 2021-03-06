import React from 'react';
import { parseDate } from '../../lib/helpers';
import { heroicon } from '../sharedComponents/Heroicons';

const SingleFlagLogEvent = ({ description, created_at }) => {
	return (
		<li>
			<div className="relative pb-8">
				<span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
				<div className="relative flex space-x-3">
					<div>{heroicon(description.toLowerCase())}</div>
					<div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
						<div>
							<p className="text-sm text-gray-500">{description}</p>
						</div>
						<div className="text-right text-sm whitespace-nowrap text-gray-500">
							<time dateTime="2020-09-20">{parseDate(created_at)}</time>
						</div>
					</div>
				</div>
			</div>
		</li>
	);
};

export default SingleFlagLogEvent;
