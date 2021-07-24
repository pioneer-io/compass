import React from 'react';

const isCurrentPage = (href) => {
  const currentPath = window.location.pathname;
  return href === currentPath;
}

const Sidebar = () => {
  return(
    <div className="flex flex-col w-64">
      <div className="flex flex-col h-0 flex-1 bg-gray-800">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className=" items-center flex-shrink-0 px-4">
              <img className="flex items-center" src="https://raw.githubusercontent.com/pioneer-io/compass/add-logo/client/public/images/pioneer_color%20logo%20for%20dark%20bg.png" alt="pioneer logo"></img>
          </div>
          <nav className='mt-5 flex-1 px-2 space-y-1 bg-gray-800'>
            <a href="/flags" className={`${(isCurrentPage('/flags') || isCurrentPage('/')) ? 'bg-gray-900' : 'bg-gray-800'} text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md`}>

              <svg className="text-gray-300 mr-3 flex-shrink-0 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Dashboard
            </a>

            <a href="/logs" className={`${isCurrentPage('/logs') ? 'bg-gray-900' : 'bg-gray-800'} text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md`}>
              <svg className="text-gray-400 group-hover:text-gray-300 mr-3 flex-shrink-0 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
              Logs
            </a>

            <a href="/account" className={`${isCurrentPage('/account') ? 'bg-gray-900' : 'bg-gray-800'} text-white hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-400 group-hover:text-gray-300 mr-3 flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
                Account
              </a>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;