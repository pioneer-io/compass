import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import EditFlagForm from './EditFlagForm';
import DeleteFlagModal from './DeleteFlagModal';
import SingleFlagLogs from './SingleFlagLogs';
import Toggle from '../sharedComponents/Toggle';
import PageHead from '../sharedComponents/PageHead';
import { updateFlag, getFlag } from '../../actions/FlagActions';
import { fetchLogs } from '../../actions/LogActions';
import { parseDate, handleErrorRedirect } from '../../lib/helpers';


const SingleFlag = (props) => {
  const flagId = Number(props.match.params.id)

  const dispatch = useDispatch();
	const [ editingFlag, setEditingFlag ] = useState(false);
	const [ deletingFlag, setDeletingFlag ] = useState(false);
	// used for updating logs when feature is toggled
	const [ flagToggled, setFlagToggled ] = useState(false);

  const error = useSelector(state => state.errors);
  const flag = useSelector(state => state.flags).find(flag => flag.id === flagId);
  const logs = useSelector(state => state.eventLogs).filter(event => event.flag_id === flagId).reverse();

  const handleDeleteFlag = () => {
		setDeletingFlag(true)
  };

	const handleEditFlag = () => {
		setEditingFlag(true);
	}

	const handleClickToggle = (e) => {
		e.preventDefault();
		const updatedFlag = {
      id: flag.id,
      title: flag.title,
      description: flag.description,
      is_active: !flag.is_active,
      rollout: flag.rollout
    };

		dispatch(updateFlag(updatedFlag, true, () => setFlagToggled(!flagToggled)));
	}

  useEffect(() => {
    dispatch(getFlag(flagId))
    dispatch(fetchLogs());
  }, [flagId, editingFlag, flagToggled, dispatch]);

  if (error.length > 0) { return handleErrorRedirect(error); }
  if (!flag) { return null }

  return (
    <>
      <PageHead title={'Flag details'} description={''}/>
      <EditFlagForm editingFlag={editingFlag} setEditingFlag={setEditingFlag} flagCurrentTitle={flag.title} flag={flag}/>
      <DeleteFlagModal deletingFlag={deletingFlag} setDeletingFlag={setDeletingFlag} flag={flag} history={props.history}/>
      <div className="bg-white-100 overflow-hidden sm:rounded-lg px-10 mx-5 my-7 shadow border border-gray-200">
      <div className="px-4 py-5 sm:px-6 mx-5">
        <h3 className="text-xl leading-6 font-medium text-gray-900 font-header">
          {flag.title}
        </h3>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0 mx-5">
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
              {flag.is_active ? "On" : "Off"}
							<Toggle toggledOn={flag.is_active} _id={flag.id} handleClickToggle={handleClickToggle} />
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Rollout
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {flag.rollout}%
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
    <div className="clear-both py-5 mb-10 ml-5 mr-5">
        <button onClick={handleDeleteFlag}type="button" className="shadow ml-5 float-right inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md bg-pioneerRed-700 hover:bg-pioneerRed-900 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
          Delete flag
        </button>
        <button onClick={handleEditFlag} type="button" className="shadow float-right inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white-100 bg-pioneerBlue-400 hover:bg-pioneerBlue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Edit flag
        </button>
        <button onClick={() => {props.history.push('/')}} type="button" className="shadow float-left inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-pioneerBlue-400 hover:bg-pioneerBlue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Back to Dashboard
        </button>
    </div>
    </>
  );
};

export default SingleFlag;