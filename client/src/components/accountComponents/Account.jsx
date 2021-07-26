import React, {useEffect} from 'react';
import PageHead from '../sharedComponents/PageHead';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSdkKey, createNewSdkKey } from '../../actions/sdkKeyActions';

const Account = () => {
  const dispatch = useDispatch();
  const sdkKey = useSelector(state => state.sdkKey);
  
  useEffect(() => {
    dispatch(fetchSdkKey());
  })
  
  const generateSDKKey = () => {
    dispatch(createNewSdkKey());
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
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline mx-2" stroke="currentColor" fill="none" viewBox="0 0 24 24" onClick={copyText}>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </button>
          {/*<button onClick={copyText} className="ml-3 text-sm text-green-900">Copy to Clipboard</button>*/}
        </p>);
    } else {
      return <p>You don't have an SDK key yet. You can click below to generate one.</p>
    }
  }
  
  
  const pageDesc = 'In your application, provide the SDK key to create an SDK client connection to Scout. This will allow you to receive updated rulesets related to your feature flags.';
  
  return (
    <>
      <PageHead title={'Your Account'} description={pageDesc} />
      <div className="p-8 max-w-7xl sm:px-6 lg:px-8">
        <h3 className="mb-2 text-xl text-green-700 font-header">Your SDK key</h3>
        <p className="bg-gray-200 rounded h-10 w-max p-2.5">{renderText()}</p>
        <div className="clear-both py-10 mb-10">
          <button
          onClick={generateSDKKey}
          type="button"
          className="float-left inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-pioneerBlue-400 hover:bg-pioneerBlue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pioneerBlue-500"
          >
            Generate new SDK key
          </button>
        </div>
      </div>
      
        
        {/*<p className="pt-1 text-right text-sm text-gray-700 w-1/3 clear-both float-right inline-flex px-2">Generating a new key will invalidate any currently existing SDK key. You will need to use the new SDK key in your application code.</p>*/}
    </>
  );
};

export default Account;