import React from 'react';
import { Route, Switch } from 'react-router-dom';
import '../App.css';

import Sidebar from './Sidebar';
import Flags from './dashboardComponents/Flags';
import Logs from  './logComponents/Logs';
import SingleFlag from './flagViewComponents/SingleFlag';
import Account from './accountComponents/Account';
import NotFound from './errorHandling/404';
import ServerError from './errorHandling/500';
import UnknownError from './errorHandling/unknown';

function App() {
  return (
    <>
      <div className="flex md:flex md:flex-shrink-0 min-h-screen bg-white-500">
        <Sidebar />
        <div className="main w-full mx-auto sm:px-6 lg:px-8">
          <Switch>
            <Route path="/" exact component={Flags} />
            <Route path="/flags" exact component={Flags} />
            <Route path="/flags/:id" exact component={SingleFlag} />
            <Route path="/logs" exact component={Logs} />
            <Route path="/account" exact component={Account} />
            <Route path="/404" exact component={NotFound} />
            <Route path="/500" exact component={ServerError} />
            <Route path="/error" exact component={UnknownError} />
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
      </div>
    </>
  );
}

export default App;
