import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../actions/LogActions';
import LogEvent from './LogEvent';
import LogFilter from './LogFilter';
import PageHead from '../sharedComponents/PageHead';
import { handleErrorRedirect, filterLogEvents } from '../../lib/helpers';

const Logs = () => {
  // reverse so most recent events are displayed first
  const logEvents = useSelector(state => state.eventLogs).reverse();
  const error = useSelector(state => state.errors);
  const dispatch = useDispatch();

  let filteredLogEvents = logEvents; // no filter initially

  const onFilterClick = (e) => {
    const optId = e.target.id.split('-');
    const filterBy = optId[optId.length-1]
    filteredLogEvents = filterLogEvents(logEvents, filterBy);
    console.log("filtered log events: ", filteredLogEvents);
  }

  useEffect(() => {
    dispatch(actions.fetchLogs());
  }, [dispatch]);

  if (error.length > 0) { return handleErrorRedirect(error); }
  const pageDesc = 'View the logs of all flag creations, updates, and deletions.';

  return (
    <>
      <PageHead title={'Event Logs'} description={pageDesc} />
      <section className="log-container">
        <LogFilter handleFilterClick={onFilterClick} />
        <ul className="log-tiles px-8 pb-8 divide-y divide-gray-200">
          {filteredLogEvents.map(event => <LogEvent {...event} key={event.id} />)}
        </ul>
      </section>
    </>
  );
}

export default Logs;