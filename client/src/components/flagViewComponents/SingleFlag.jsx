import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SingleFlagHeader from './SingleFlagHeader';
import EditFlagForm from './EditFlagForm';
import SingleFlagLogs from './SingleFlagLogs';
import { getFlag, deleteFlag } from '../../actions/FlagActions';
import { fetchLogs, logFlagDeletion } from '../../actions/LogActions';
import parseDate from '../../lib/helpers';


const SingleFlag = (props) => {
  const flagId = Number(props.match.params.id)

  const dispatch = useDispatch();
	const [ editingFlag, setEditingFlag ] = useState(false);

  const flag = useSelector(state => state.flags).find(flag => flag.id === flagId);
  const logs = useSelector(state => state.eventLogs).filter(event => event.flag_id === flagId);

  const handleDeleteFlag = () => {
    dispatch(deleteFlag(flag, () => {
      dispatch(logFlagDeletion(flag, () => props.history.push("/flags")));
    }));
  };

	const handleEditFlag = () => {
		setEditingFlag(true);
	}

  useEffect(() => {
    dispatch(getFlag(flagId))
    dispatch(fetchLogs());
  }, [flagId, editingFlag, dispatch]);

  if (!flag) { return null }

  return (
    <>
      <SingleFlagHeader {...flag}/>
      <EditFlagForm editingFlag={editingFlag} setEditingFlag={setEditingFlag} flagCurrentTitle={flag.title} flag={flag}/>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-xl leading-6 font-medium text-gray-900">
          {flag.title}
        </h3>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Description
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {flag.description}
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Current status
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {flag.toggledOn ? "On" : "Off"}
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Flag ID:
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {flag.id}
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Created at
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {parseDate(flag.created_at)}
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Last updated at
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {parseDate(flag.updated_at)}
            </dd>
          </div>
          <SingleFlagLogs logs={logs}/>
        </dl>
      </div>
    </div>
    <div className="clear-both py-10 mb-10">
      <button onClick={handleDeleteFlag}type="button" className="ml-5 float-right inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Delete flag
      </button>
      <button onClick={handleEditFlag} type="button" className="float-right inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Edit flag
      </button>
    </div>
    </>
  );
};

export default SingleFlag;