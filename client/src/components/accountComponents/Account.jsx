import React, {useEffect, useState} from 'react';
import PageHead from '../sharedComponents/PageHead';
import Modal from '../sharedComponents/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSdkKey, createNewSdkKey } from '../../actions/sdkKeyActions';

const Account = () => {
	const [ creatingKey, setCreatingKey ] = useState(false)
  const dispatch = useDispatch();
  const sdkKey = useSelector(state => state.sdkKey);
  
  useEffect(() => {
    dispatch(fetchSdkKey());
  })
  
  const generateSDKKey = () => {
    dispatch(createNewSdkKey());
		setCreatingKey(false)
  }

  const renderText = () => {
    const copyText = (e) =>{
      e.preventDefault();
      navigator.clipboard.writeText(sdkKey)
    };
  
    if (sdkKey) {
      return (
        <p>{sdkKey}
          <button id="copy-key">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mx-2" stroke="currentColor" fill="none" viewBox="0 0 24 24" onClick={copyText}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </button>
        </p>
				);
    } else {
      return <p>You don't have an SDK key yet. You can click below to generate one.</p>
    }
  }
  
  
  const pageDesc = 'In your application, provide the SDK key to create an SDK client connection to Scout. This will allow you to receive updated rulesets related to your feature flags.';
  
  return (
		<>
      <PageHead title={'Your Account'} description={pageDesc} />
			<Modal modifyingModalStatus={creatingKey} setModifyingModalStatus={setCreatingKey} handleSubmit={generateSDKKey} modalType={'sdk'}></Modal>
      <div className="p-8 max-w-7xl sm:px-6 lg:px-8">
        <h3 className="mb-2 text-xl text-green-700 font-header">Your SDK key</h3>
        <div className="bg-pioneerBlue-100 rounded h-10 w-max p-2.5">{renderText()}</div>
        <div className="clear-both py-10 mb-10">
          <button
          onClick={()=> setCreatingKey(true)}
          type="button"
          className="float-left inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-pioneerBlue-500 hover:bg-pioneerBlue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pioneerBlue-500"
          >
            Generate new SDK key
          </button>
        </div>
      </div>
			</>
  );
};

export default Account;