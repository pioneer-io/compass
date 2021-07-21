import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../actions/LogActions';
import LogList from './LogList';
import LogFilter from './LogFilter';
import PageHead from '../sharedComponents/PageHead';
import { handleErrorRedirect, filterLogEvents } from '../../lib/helpers';

const Logs = () => {
  // reverse so most recent events are displayed first
  const logEvents = useSelector(state => state.eventLogs).reverse();
  const error = useSelector(state => state.errors);
  const [filter, setFilter] = useState('all');

  const dispatch = useDispatch();

  const onFilterClick = (e) => {
    const optId = e.target.id.split('-');
    const filterBy = optId[optId.length-1]
    setFilter(filterBy);
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
        <LogFilter handleFilterClick={onFilterClick} selected={filter} />
        <LogList filteredLogs={filterLogEvents(logEvents, filter)} />
      </section>
    </>
  );
}

export default Logs;