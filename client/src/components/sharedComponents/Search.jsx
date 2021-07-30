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
      placeholder="Search..."
      autoComplete="given-name"
      className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
      value={searchWord}
    />
  )
}

export default Search