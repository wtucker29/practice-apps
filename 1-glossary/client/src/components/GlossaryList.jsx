import React from 'react';
import GlossaryListEntry from './GlossaryListEntry.jsx';
const { useState } = React;

var GlossaryList = ({ glossaries, onDeleteClick, onUpdateClick }) => {


  return (
    <div>
      <h3><b>Glossary</b></h3>
      <div>
        {glossaries.map(glossary => (
          <GlossaryListEntry key={glossary._id} glossary={glossary} onDeleteClick={onDeleteClick} onUpdateClick={onUpdateClick} />
        ))}
      </div>
    </div>
  )
}

export default GlossaryList;