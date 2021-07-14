import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateFlag } from '../../actions/FlagActions';
import FlagForm from '../sharedComponents/FlagForm';
import { invalidRolloutPercentage, alertInvalidRolloutPercentage } from '../../lib/formHelpers';

const EditFlagForm = ({ editingFlag, setEditingFlag, flag }) => {
	const [ flagTitle, setFlagTitle ] = useState(flag.title);
	const [ flagDescription, setFlagDescription ] = useState(flag.description);
	const [ flagRollout, setFlagRollout ] = useState(flag.rollout);
	const dispatch = useDispatch();

	const handleCancel = () => {
		setEditingFlag(false);
		setFlagDescription(flag.description);
		setFlagTitle(flag.title);
	};

	const resetFields = () => {
		setFlagTitle(flagTitle);
		setFlagDescription(flagDescription);
		setFlagRollout(flagRollout);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (flagTitle === '') {
			alert('You must have a flag title');
			return;
		}

		if (invalidRolloutPercentage) {
			alertInvalidRolloutPercentage(flagRollout);
			return;
		}

		const editedFlag = {
			id          : flag.id,
			title       : flagTitle,
			description : flagDescription,
			is_active   : flag.is_active,
			rollout     : flagRollout
		};

		dispatch(
			updateFlag(editedFlag, false, () => {
				setEditingFlag(false);
				resetFields();
			})
		);
	};

	return (
		<FlagForm
			formContext="edit"
			formVisibility={editingFlag}
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

export default EditFlagForm;
