import React from 'react';

const Modal = ({ modifyingModalStatus, setModifyingModalStatus, handleSubmit, modalType }) => {
	const handleCancel = () => {
		setModifyingModalStatus(false);
	};

	return (
		<div id="modal-container" className={`overflow-scroll fixed ${modifyingModalStatus ? '' : 'hidden'}`}>
			<div id="modal">
				<form className="space-y-8 divide-y divide-gray-200 m-8">
					<div className="space-y-8 divide-y divide-gray-200 sm:space-y-5 p-6">
						<div>
							<div>
								<h3 className="text-lg leading-6 font-medium text-gray-900 font-header">
									{modalType === 'delete' ? 'Delete Flag?' : 'Create New SDK Key?'}
								</h3>
								<p className="mt-1 max-w-2xl text-sm text-gray-500">
									Do you really want to {modalType === 'delete' ? 'delete this flag?' : 'create a new SDK Key?'} This
									can't be undone, so please make sure there will be no impacts to your SDKs!
								</p>
							</div>
						</div>
						<div className="clear-both py-10 mb-10">
							<button
								onClick={handleSubmit}
								type="button"
								className="ml-5 float-right inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-pioneerRed-600 hover:bg-pioneerRed-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pioneerRed-600"
							>
								{modalType === 'delete' ? 'Delete Flag!' : 'Create New Key!'}
							</button>
							<button
								type="button"
								onClick={handleCancel}
								className="float-right inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-pioneerBlue-500 hover:bg-pioneerBlue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pioneerBlue-500"
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

export default Modal;
