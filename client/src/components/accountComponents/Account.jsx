import React from 'react';
import PageHead from '../sharedComponents/PageHead';

const Account = () => {
  const pageDesc = 'In your application, provide the SDK key to create an SDK client connection to Scout. This will allow you to receive updated rulesets related to your feature flags.';
  return(
    <>
      <PageHead title={'Your Account'} description={pageDesc} />
    </>
  );
};

export default Account;