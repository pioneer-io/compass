import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createFlag } from '../../actions/FlagActions';


const NewFlagForm = ({creatingNew, setCreatingNew, existingFlags}) => {
  const [ flagTitle, setFlagTitle ] = useState('');
  const [ flagDescription, setFlagDescription ] = useState('');
  const dispatch = useDispatch();

  const handleCancel = () => {
    setCreatingNew(false);
    resetFields();
  };

  const resetFields = () => {
    setFlagDescription('');
    setFlagTitle('');
  };

  const nameIsUnique = (newFlagTitle) => {
    newFlagTitle = newFlagTitle.toLowerCase();
    return existingFlags.every(flag => flag.title.toLowerCase() !== newFlagTitle);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (flagTitle === '') {
      alert("You must have a flag title");
      return;
    } else if (!nameIsUnique(flagTitle)) {
      alert(`The flag name ${flagTitle} has already been used. Please choose another.`);
      return;
    }

    const newFlag = { flag: { title: flagTitle, description: flagDescription }};
    dispatch(createFlag(newFlag, () => {
      setCreatingNew(false)
      resetFields();
    }));
  };

  const handleFlagTitleKeyDown = (e) => {
    setFlagTitle(e.target.value);
  }

  const handleFlagDescriptionKeydown = (e) => {
    setFlagDescription(e.target.value);
  }

  return(
    <div id="modal-container" className={`overflow-scroll fixed ${creatingNew ? "" : "hidden"}`}>
      <div id="modal">
        <form onSubmit={handleSubmit} className="space-y-8 divide-y divide-gray-200 m-8">
          <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5 p-6">
            <div>
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  New Flag
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  We recommend giving your flag a descriptive title and providing a brief description. All flags are created in 'off' mode. You can toggle the flag on after it's been saved.
                </p>
              </div>
              <div className="space-y-6 sm:space-y-5">
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Flag title
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input onChange={handleFlagTitleKeyDown} type="text" autoComplete="given-name" className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" value={flagTitle}></input>
                </div>
              </div>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="about" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Description
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <textarea onChange={handleFlagDescriptionKeydown} value={flagDescription} rows="3" className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"></textarea>
                  <p className="mt-2 text-sm text-gray-500">Write a few sentences about the purpose of the flag.</p>
                </div>
              </div>
            </div>
            <div className="clear-both py-10 mb-10">
              <button onClick={handleSubmit} type="button" className="ml-5 float-right inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Save
              </button>
              <button type="button" onClick={handleCancel} className="float-right inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewFlagForm;