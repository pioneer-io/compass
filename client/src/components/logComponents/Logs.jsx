import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../actions/LogActions';
import LogEvent from './LogEvent';
import LogsHeader from './LogsHeader';

const Logs = () => {
  const logEvents = useSelector(state => state.eventLogs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.fetchLogs());
  }, [dispatch]);

  return (
    <>
      <LogsHeader />
      <section className="log-container">
        <ul className="log-tiles p-8 divide-y divide-gray-200">
          {logEvents.map(event => <LogEvent {...event} key={event.id} />)}
        </ul>
      </section>
    </>
  );
}

export default Logs;