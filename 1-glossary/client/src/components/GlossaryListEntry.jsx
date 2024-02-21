import React from 'react';
const { useState } = React;

var GlossaryListEntry = ({ glossary }) => {
  return (
    <ul>
      <li className="glossary-word">{glossary.word}</li>
      <div className="glossary-definition">{glossary.defintion}</div>
    </ul>
  )
}

export default GlossaryListEntry;