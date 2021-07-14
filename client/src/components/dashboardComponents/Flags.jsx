import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFlags } from '../../actions/FlagActions';
import Flag from './Flag';
import FlagsHeader from './FlagsHeader';
import NewFlagForm from './NewFlagForm';
import { handleErrorRedirect } from '../../lib/helpers';


const sortFlags = (flagList) => {
  flagList.sort((a, b) => {
    if (a.updated_at < b.updated_at) {
      return 1
    } else if (a.updated_at > b.updated_at) {
      return -1
    } else {
      return 0
    }
  });

  return flagList
}

const Flags = () => {
  const flagList = sortFlags(useSelector(state => state.flags));
  const error = useSelector(state => state.errors);
  const dispatch = useDispatch();
  const [creatingNew, setCreatingNew] = useState(false);

  useEffect(() => {
    dispatch(fetchFlags());
  }, [dispatch, creatingNew]);

  if (error.length > 0) { return handleErrorRedirect(error) }

  return (
    <>
        <FlagsHeader setCreatingNew={setCreatingNew} />
        <NewFlagForm creatingNew={creatingNew} setCreatingNew={setCreatingNew} existingFlags={flagList} />
        <section className="flag-container">
          <ul className="p-8 flag-tiles divide-y divide-gray-200">
            {flagList.map(flag => <Flag {...flag} key={flag.id} />)}
          </ul>
        </section>
    </>
  );
}

export default Flags;