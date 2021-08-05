import React from 'react';
import Modal from '../sharedComponents/Modal';
import { logFlagDeletion } from '../../actions/LogActions';
import { useDispatch } from 'react-redux';
import { deleteFlag } from '../../actions/FlagActions';

const DeleteConfirmationModal = ({ deletingFlag, setDeletingFlag, flag, history }) => {
	const dispatch = useDispatch();

	const handleSubmit = () => {
		dispatch(
			deleteFlag(flag, () => {
				dispatch(logFlagDeletion(flag, () => history.push('/flags')));
			})
		);
	};

	return (
		<Modal
			modifyingModalStatus={deletingFlag}
			setModifyingModalStatus={setDeletingFlag}
			handleSubmit={handleSubmit}
			modalType={'delete'}
		/>
	);
};

export default DeleteConfirmationModal;
