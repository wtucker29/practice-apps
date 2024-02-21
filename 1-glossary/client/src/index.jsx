import React from 'react';
import { render } from 'react-dom';
import InputForm from './components/InputForm.jsx';
import Search from './components/Search.jsx';
import GlossaryList from './components/GlossaryList.jsx';
import GlossaryListEntry from './components/GlossaryListEntry.jsx';
import axios from 'axios';
const { useState, useEffect } = React;

const App = () => {
  const [glossaryList, setGlossaryList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    // code something here
    axios.get('http://localhost:3000/glossary')
      .then((response) => {
        console.log('response.data: ', response.data);
        setGlossaryList(response.data);
        setFilteredList(response.data);
      })
      .catch((errror) => {
        console.error('Error loading glossary:', error);
      });
  }, []);

  const handleInputClick = (word, def) => {
    const addedGlossInput = {word: word, defintion: def};

    // axios.post('http://localhost:3000/glossary', addedGlossInput)
  };

  const handleSearchClick = (query) => {
    // something here
    // axios.get('http://localhost:3000/glossary)
  }

  return (
    <div>
      <h1>William's Glossary</h1>
      <div className="inputbar">
        <InputForm onInputClick={handleInputClick} />
      </div>
      <div className="searchbar">
        <Search onSearchClick={handleSearchClick} />
      </div>
      <div className="list">
        <GlossaryList glossaries={glossaryList} filtered={filteredList} />
      </div>
    </div>
  );
};

render(<App />, document.getElementById("root"));
