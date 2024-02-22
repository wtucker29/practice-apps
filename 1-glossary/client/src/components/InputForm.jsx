import React from 'react';
const { useState } = React;

var InputForm = ({ onInputClick }) => {
  const [inputWord, setInputWord] = useState('');
  const [inputDef, setInputDef] = useState('');

  // functions to deal with adding word and def
  const handleWordChange = (event) => {
    // something
    var newWord = event.target.value;
    setInputWord(newWord);
  };

  const handleDefChange = (event) => {
    // something
    var newDef = event.target.value;
    setInputDef(newDef);
  };

  const handleInputClick = () => {
    // something
    onInputClick(inputWord, inputDef);
    console.log(inputWord, inputDef);
  };

  return (
    <form>
      <div className="word-div"><b>Word:</b>
        <input className="input-word" type="text" onChange={handleWordChange}/>
      </div>
      <div className="def-div"><b>Defintion:</b>
        <input className="input-def" type="text" onChange={handleDefChange} />
        <button className="btn-input" onClick={handleInputClick}>
          <span className="span-input">Submit</span>
        </button>
      </div>
    </form>
  )
}

export default InputForm;