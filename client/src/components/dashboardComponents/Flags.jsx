import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFlags } from '../../actions/FlagActions';
import Flag from './Flag';
import FlagsHeader from './FlagsHeader';
import NewFlagForm from './NewFlagForm';

const Flags = () => {
  const flagList = useSelector(state => state.flags);
  console.log("FLAG LIST: ", flagList);
  const dispatch = useDispatch();
  const [creatingNew, setCreatingNew] = useState(false);


  useEffect(() => {
    dispatch(fetchFlags());
  }, [dispatch, creatingNew]);

  return (
    <>
        <FlagsHeader setCreatingNew={setCreatingNew} />
        <NewFlagForm creatingNew={creatingNew} setCreatingNew={setCreatingNew} />
        <section className="flag-container">
          <ul className="p-8 flag-tiles divide-y divide-gray-200">
            {console.log("flat list: ", flagList)}
            {flagList.map(flag => <Flag {...flag} key={flag.id} />)}
          </ul>
        </section>
    </>
  );
}

export default Flags;