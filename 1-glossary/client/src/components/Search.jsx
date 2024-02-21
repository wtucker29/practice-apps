import React from 'react';
const { useState } = React;

var Search = ({ onSearchClick }) => {
  const [query, setQuery] = useState('');

  const handleSearchChange = (event) => {
    // something
    var searchWord = event.target.value;
    setQuery(searchWord);
  }

  const handleSearchClick = () => {
    // something
    onSearchClick(query);
  }

  return (
    <div>
      <form>
        <input className="search-input" type="text" onChange={handleSearchChange} />
        <button className="btn-search" onClick={handleSearchClick}>
          <span className="search-span">Search</span>
        </button>
      </form>
    </div>
  )
}

export default Search;