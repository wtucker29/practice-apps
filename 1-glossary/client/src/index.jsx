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
    const addedGlossInput = {word: word, definition: def};
    console.log(addedGlossInput);

    axios.post('http://localhost:3000/glossary', addedGlossInput)
      .then((response) => {
        console.log('Response from post request: ', response.data);
      })
      .catch((error) => {
        console.error('Error adding word and definition to glossary:', error);
      })
      .then(() => {
        axios.get('http://localhost:3000/glossary')
          .then((response) => {
            console.log('Response from get request: ', response.data);
            setGlossaryList(response.data);
            setFilteredList(response.data);
          })
          .catch((error) => {
            console.error('Error loading glossary:', error);
          });
      });
  };

  const handleSearchClick = (query) => {
    // something here
    const searchedWord = { word: query };
    const filteredWord = glossaryList.filter(entry => entry.word.includes(query));
    setFilteredList(filteredWord);

    // axios.get(`http://localhost:3000/glossary/${query}`)
    //   .then((response) => {
    //     console.log(response);
    //     console.log('Response from search GET request: ', response.data);
    //     setFilteredList(response.data);
    //   })
    //   .catch((error) => {
    //     console.error('Error retrieving searched word:', error);
    //   });
  }

  const handleResetClick = () => {
    //something here
    setFilteredList(glossaryList);
  }

  const handleDeleteClick = (word, def) => {
    const itemToDelete = { word: word, definition: def };
    axios.delete('http://localhost:3000/glossary', { data: itemToDelete })
      .then((response) => {
        console.log('Response from delete request: ', response.data);
      })
      .catch((error) => {
        console.error('Error deleting word and definition:', error);
      })
      .then(() => {
        axios.get('http://localhost:3000/glossary')
          .then((response) => {
            console.log('Response from get request: ', response.data);
            setGlossaryList(response.data);
            setFilteredList(response.data);
          })
          .catch((error) => {
            console.error('Error loading glossary:', error);
          });
      });
  }

  const handleUpdateClick = (word, def) => {
    // something
    const itemToUpdate = { word: word, definition: def };
    axios.put(`http://localhost:3000/glossary/${word}`, itemToUpdate)
      .then((response) => {
        console.log('Response from put request: ', response.data);
      })
      .catch((error) => {
        console.error('Error updating definition:', error);
      })
      .then(() => {
        axios.get('http://localhost:3000/glossary')
          .then((response) => {
            console.log('Response from get request: ', response.data);
            setGlossaryList(response.data);
            setFilteredList(response.data);
          })
          .catch((error) => {
            console.error('Error loading glossary:', error);
          });
      });
  }

  return (
    <div>
      <h1>William's Glossary</h1>
      <div className="inputbar">
        <InputForm onInputClick={handleInputClick} />
      </div>
      <div className="searchbar">
        <Search onSearchClick={handleSearchClick} onResetClick={handleResetClick} />
      </div>
      <div className="list">
        <GlossaryList glossaries={filteredList} onDeleteClick={handleDeleteClick} onUpdateClick={handleUpdateClick} />
      </div>
    </div>
  );
};

render(<App />, document.getElementById("root"));
