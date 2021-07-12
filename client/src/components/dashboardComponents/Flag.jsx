import React from 'react';
import { useDispatch } from 'react-redux';
import Toggle from'../Toggle';
import { updateFlag } from '../../actions/FlagActions';
import parseDate from '../../lib/helpers';

const truncate = (description) => {
	if (!description) { return "No description provided." };
	return description.length < 50 ? description : description.slice(0, 50);
};

const Flag = ({ id, title, description, is_active, created_at }) => {
	const dispatch = useDispatch();

	const handleClickToggle = (e) => {
		e.preventDefault();
		const updatedFlag = { id, title, description, is_active: !is_active };
		dispatch(updateFlag(updatedFlag));
	};

	return (
		<li className="py-6 sm:px-0 clear-both">
			<a href={`/flags/${id}`}>
				<h3 className="text-2xl leading-10 font-medium text-green-700">{title}</h3>
			</a>
			<Toggle toggledOn={is_active} _id={id} handleClickToggle={handleClickToggle} />
			<p>Description: {truncate(description)}</p>
			<p>Created: {parseDate(created_at)}</p>
		</li>
	);
};

export default Flag;
