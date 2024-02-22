import React from 'react';
const { useState } = React;

var Search = ({ onSearchClick, onResetClick }) => {
  const [query, setQuery] = useState('');

  const handleSearchChange = (event) => {
    // something
    var searchWord = event.target.value;
    setQuery(searchWord);
  }

  const handleSearchClick = (e) => {
    // something
    e.preventDefault();
    onSearchClick(query);
  }

  const handleResetClick = () => {
    onResetClick();
  }

  return (
    <div>
      <form onSubmit={(e) => handleSearchClick(e)}>
        <input className="search-input" type="text" onChange={handleSearchChange} />
        <button type="submit" className="btn-search">
          <span className="search-span">Search</span>
        </button>
      </form>
      <button className="btn-reset" onClick={handleResetClick}>
        <span className="reset-span">Reset</span>
      </button>
    </div>
  )
}

export default Search;