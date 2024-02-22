import React from 'react';
const { useState } = React;

var GlossaryListEntry = ({ glossary, onDeleteClick, onUpdateClick }) => {
  console.log(glossary);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedDefintion, setUpdatedDefinition] = useState(glossary.definition);

  const handleUpdateClick = () => {
    setIsEditing(true);
  }

  const handleInputChange = (event) => {
    setUpdatedDefinition(event.target.value);
  }

  const handleUpdateConfirm = () => {
    const word = glossary.word;
    const def = updatedDefintion;
    onUpdateClick(word, def);
    setIsEditing(false);
  }

  const handleCancelClick = () => {
    setIsEditing(false);
    setUpdatedDefinition(glossary.definition);
  }

  const handleDeleteClick = () => {
    const word = glossary.word;
    const def = glossary.definition;
    console.log('word in deleteclick: ', word);
    console.log('def in deleteclick: ', def);
    onDeleteClick(word, def);
  }

  return (
    <ul>
      <div>
        <li className="glossary-word"><b>{glossary.word}:</b> {glossary.definition}</li>
        {!isEditing && (
          <button className="btn-update" onClick={handleUpdateClick}>Update</button>
        )}
        <button className="btn-delete" onClick={handleDeleteClick}>Delete</button>
      </div>
      {isEditing && (
        <div>
          <input type="text" value={updatedDefintion} onChange={handleInputChange} />
          <button onClick={handleUpdateConfirm}>Confirm</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </div>
      )}
    </ul>
  )
}

export default GlossaryListEntry;