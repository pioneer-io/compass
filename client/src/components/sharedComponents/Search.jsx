import React from 'react'

function Search({searchWord, setSearchWord}) {
  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchWord(e.target.value);
  };

  return (
    <input
      onChange={handleSearchChange}
      type="text"
      placeholder="Search by flag title..."
      autoComplete="given-name"
      className="float-right my-4 max-w-lg block w-full shadow-sm focus:ring-pioneerBlue-400 focus:border-pioneerBlue-400 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
      value={searchWord}
    />
  )
}

export default Search