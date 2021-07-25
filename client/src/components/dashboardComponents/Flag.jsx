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
		<li className="py-6 sm:px-0 clear-both">
			<a href={`/flags/${id}`}>
				<h3 className="text-2xl bg-pioneerGreen-500 leading-10 font-medium text-pioneerRed-800 font-header">{title}</h3>
			</a>
			<Toggle toggledOn={is_active} _id={id} handleClickToggle={handleClickToggle} />
			<p>
				<b>Description:</b> {truncate(description)}
			</p>
			<p>
				<b>Current rollout:</b> {rollout}%
			</p>
			{/*  <p><b>Created:</b> {parseDate(created_at)}</p> */}
			{/* <p><b>Last updated:</b> {parseDate(updated_at)}</p> */}
		</li>
	);
};

export default Flag;
