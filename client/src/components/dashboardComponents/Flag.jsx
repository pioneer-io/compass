import React from 'react';
import { useDispatch } from 'react-redux';
import Toggle from '../sharedComponents/Toggle';
import { updateFlag } from '../../actions/FlagActions';
import { parseDate, truncate } from '../../lib/helpers';

const Flag = ({ id, title, description, is_active, created_at, updated_at, rollout }) => {
	const dispatch = useDispatch();

	const handleClickToggle = (e) => {
		e.preventDefault();
		const updatedFlag = { id, title, description, rollout, is_active: !is_active };
		dispatch(updateFlag(updatedFlag, true));
	};

	return (
		<li className="py-6 clear-both bg-white-100 px-10 mb-2 border border-gray-200 shadow">
			<a href={`/flags/${id}`}>
				<h3 className="text-2xl  leading-10 font-medium text-green-800 font-header">{title}</h3>
			</a>
			<Toggle toggledOn={is_active} _id={id} handleClickToggle={handleClickToggle} />
			<p className="text-gray-600">
				{truncate(description)}
			</p>
			<p className="text-gray-600">
				Current rollout: {rollout}%
			</p>
		</li>
	);
};

export default Flag;
