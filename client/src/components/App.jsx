import React from 'react';
import { Route, Switch } from 'react-router-dom';
import '../App.css';

import Sidebar from './Sidebar';
import Flags from './dashboardComponents/Flags';
import Logs from  './logComponents/Logs';
import SingleFlag from './flagViewComponents/SingleFlag';
import NotFound from './errorHandling/404';

function App() {
  return (
    <>
      <div className="hidden md:flex md:flex-shrink-0 min-h-screen">
        <Sidebar />
        <div className="main w-full mx-auto sm:px-6 lg:px-8">
          <Switch>
            <Route path="/" exact component={Flags} />
            <Route path="/flags" exact component={Flags} />
            <Route path="/flags/:id" exact component={SingleFlag} />
            <Route path="/logs" exact component={Logs} />
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
      </div>
    </>
  );
}

export default App;
