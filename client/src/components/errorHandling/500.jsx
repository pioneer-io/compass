import React from 'react';

const ServerError = () => {
  return(
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div className="mx-auto w-2/3 h-1/3 my-40 content-center">
        <h1 className="text-9xl mt-20 text-center text-green-700">500</h1>
        <h2 className="text-center text-5xl text-gray-700">Jeepers! There's been a server error. Contact an admin to check the server logs.</h2>
        <p className="mt-10 text-center text-xl text-gray-700">Return to
          <a className="text-green-700" href="/"> dashboard</a>
        </p>
      </div>
    </div>
  );
};

export default ServerError;