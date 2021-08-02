import React from 'react';

const isDashboard = (title) => {
	return title === 'Feature Flags';
};

const PageHead = ({ title, description, setCreatingNew }) => {
	return (
		<div className="dashboard width-full px-10 py-10 bg-white-100 shadow border-gray-200 sm:flex sm:items-center sm:justify-between">
			<div>
				<h3 className="block text-5xl leading-14 font-medium text-green-700 font-header">{title}</h3>
				<p className="pt-4 leading-6 block">{description}</p>
			</div>
			<div className="mt-3 sm:mt-0 sm:ml-4">
				<button
					onClick={() => setCreatingNew(true)}
					type="button"
					className={`${isDashboard(title)
						? 'inline-flex'
						: 'hidden'} items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-700 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pioneerBlue-500`}
				>
					Create new flag
				</button>
			</div>
		</div>
	);
};

export default PageHead;
