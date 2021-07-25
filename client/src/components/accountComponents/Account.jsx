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
          <button onClick={copyText} className="ml-3 text-sm text-green-900">Copy to Clipboard</button>
        </p>);
    } else {
      return <p>You don't have an SDK key yet. You can click below to generate one.</p>
    }
  }
  
  
  const pageDesc = 'In your application, provide the SDK key to create an SDK client connection to Scout. This will allow you to receive updated rulesets related to your feature flags.';
  
  return (
    <>
      <PageHead title={'Your Account'} description={pageDesc} />
      <div className="p-8 max-w-7xl mx-auto sm:px-6 lg:px-8">
        <h3 className="mb-2 text-xl text-green-700 font-header">Your SDK key</h3>
        <p className="bg-gray-200 rounded h-10 w-max p-2.5">{renderText()}</p>
      </div>
      <div className="clear-both py-10 mb-10">
        <button
          onClick={generateSDKKey}
          type="button"
          className="float-right inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Generate new SDK key
        </button>
        <p className="pt-1 text-right text-sm text-gray-700 w-1/3 clear-both float-right inline-flex px-2">Generating a new key will invalidate any currently existing SDK key. You will need to use the new SDK key in your application code.</p>
      </div>
    </>
  );
};

export default Account;