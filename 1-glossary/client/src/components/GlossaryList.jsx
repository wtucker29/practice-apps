import React from 'react';
import GlossaryListEntry from './GlossaryListEntry.jsx';
const { useState } = React;

var GlossaryList = ({ glossaries, filtered }) => {


  return (
    <div>
      <h3><b>Glossary</b></h3>
      <div>
        {glossaries.map(glossary => (
          <GlossaryListEntry key={glossary._id} glossary={glossary} />
        ))}
      </div>
    </div>
  )
}

export default GlossaryList;