import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteFlag } from '../../actions/FlagActions';

const DeleteConfirmationModal = ({ deletingFlag, setDeletingFlag, flagId, history }) => {
	const dispatch = useDispatch();

	const handleCancel = () => {
		setDeletingFlag(false);
	};

	const handleSubmit = () => {
		dispatch(deleteFlag(flagId, () => history.push('/flags')));
	};

	return (
		<div id="modal-container" className={`${deletingFlag ? '' : 'hidden'}`}>
			<div id="modal">
				<form className="space-y-8 divide-y divide-gray-200 m-8">
					<div className="space-y-8 divide-y divide-gray-200 sm:space-y-5 p-6">
						<div>
							<div>
								<h3 className="text-lg leading-6 font-medium text-gray-900">Delete Flag?</h3>
								<p className="mt-1 max-w-2xl text-sm text-gray-500">
									Do you really want to delete this flag? This can't be undone, so please make sure there will be no
									impacts to your SDKs!
								</p>
							</div>
						</div>
						<div className="clear-both py-10 mb-10">
							<button
								onClick={handleSubmit}
								type="button"
								className="ml-5 float-right inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
							>
								Delete Flag!
							</button>
							<button
								type="button"
								onClick={handleCancel}
								className="float-right inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							>
								Nevermind, cancel.
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default DeleteConfirmationModal;
