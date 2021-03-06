import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createFlag } from '../../actions/FlagActions';
import FlagForm from '../sharedComponents/FlagForm';
import {
	invalidRolloutPercentage,
	alertInvalidRolloutPercentage,
	nameIsUnique,
	alertEmptyTitle,
	alertRedundantTitle
} from '../../lib/formHelpers';

const NewFlagForm = ({ creatingNew, setCreatingNew, existingFlags }) => {
	const [ flagTitle, setFlagTitle ] = useState('');
	const [ flagDescription, setFlagDescription ] = useState('');
	const [ flagRollout, setFlagRollout ] = useState(0);
	const dispatch = useDispatch();

	const handleCancel = () => {
		setCreatingNew(false);
		resetFields();
	};

	const resetFields = () => {
		setFlagDescription('');
		setFlagTitle('');
		setFlagRollout(0);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (flagTitle === '') {
			alertEmptyTitle();
			return;
		} else if (!nameIsUnique(flagTitle, existingFlags)) {
			alertRedundantTitle(flagTitle);
			return;
		}

		if (invalidRolloutPercentage(flagRollout)) {
			alertInvalidRolloutPercentage();
			return;
		}

		const newFlag = { flag: { title: flagTitle, description: flagDescription, rollout: flagRollout } };
		dispatch(
			createFlag(newFlag, () => {
				setCreatingNew(false);
				resetFields();
			})
		);
	};

	return (
		<FlagForm
			formContext="new"
			formVisibility={creatingNew}
			flagTitle={flagTitle}
			setFlagTitle={setFlagTitle}
			flagDescription={flagDescription}
			setFlagDescription={setFlagDescription}
			flagRollout={flagRollout}
			setFlagRollout={setFlagRollout}
			handleCancel={handleCancel}
			handleSubmit={handleSubmit}
		/>
	);
};

export default NewFlagForm;
