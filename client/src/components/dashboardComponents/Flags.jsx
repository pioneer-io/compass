import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFlags } from '../../actions/FlagActions';
import Flag from './Flag';
import Search from '../sharedComponents/Search';
import PageHead from '../sharedComponents/PageHead';
import NewFlagForm from './NewFlagForm';
import { handleErrorRedirect } from '../../lib/helpers';


const sortFlags = (flagList) => {
  return flagList.sort((a, b) => {
    const titleA = a.title.toLowerCase();
    const titleB = b.title.toLowerCase();
    return (titleA < titleB) ? -1 : (titleB > titleA) ? 1 : 0;
  });
}

const Flags = () => {
  let flagList = sortFlags(useSelector(state => state.flags));
  const error = useSelector(state => state.errors);
  const dispatch = useDispatch();
  const [creatingNew, setCreatingNew] = useState(false);
  const [searchWord, setSearchWord] = useState("");

  if (searchWord !== "") {
    flagList = flagList.filter(flag => {
      const title = flag.title.toLowerCase();
      return title.indexOf(searchWord.toLowerCase()) !== -1;
    });
  }

  useEffect(() => {
    dispatch(fetchFlags());
  }, [dispatch, creatingNew]);

  if (error.length > 0) { return handleErrorRedirect(error) }
  const pageDesc = 'Click a flag title to view full details. The most recently updated flags can be found at the top of this list.';

  return (
    <>
      <PageHead title={'Feature Flags'} description={pageDesc} setCreatingNew={setCreatingNew} />
      <NewFlagForm creatingNew={creatingNew} setCreatingNew={setCreatingNew} existingFlags={flagList} />

      <section className="p-8 pt-0 flag-container">
        <Search searchWord={searchWord} setSearchWord={setSearchWord} />
        <ul className="pb-8 pt-4 flag-tiles">
          {flagList.map(flag => <Flag {...flag} key={flag.id} />)}
        </ul>
      </section>
    </>
  );
}

export default Flags;