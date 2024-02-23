import React from 'react';
const { useState } = React;

var Location = ({ onLocationClick }) => {

  const [add1, setAdd1] = useState('');
  const [add2, setAdd2] = useState('');
  const [city, setCity] = useState('');
  const [sta, setSta] = useState('');
  const [zip, setZip] = useState('');

  const handleAdd1Change = (event) => {
    var address1 = event.target.value;
    setAdd1(address1);
  }

  const handleAdd2Change = (event) => {
    var address2 = event.target.value;
    setAdd2(address2);
  }

  const handleCityChange = (event) => {
    var cityInput = event.target.value;
    setCity(cityInput);
  }

  const handleStateChange = (event) => {
    var stateInput = event.target.value;
    setSta(stateInput);
  }

  const handleZipChange = (event) => {
    var zipcode = event.target.value;
    setZip(zipcode);
  }

  const handleLocationClick = () => {
    onLocationClick(add1, add2, city, sta, zip);
  }

  return (
    <ul>
      <div>
        <li className="add1"><b>Address Line 1:</b>
          <input type="text" onChange={handleAdd1Change} />
        </li>
        <li className="add2"><b>Address Line 2:</b>
          <input type="text" onChange={handleAdd2Change} />
        </li>
        <li className="city"><b>City:</b>
          <input type="text" onChange={handleCityChange} />
        </li>
        <li className="state"><b>State:</b>
          <input type="text" onChange={handleStateChange} />
        </li>
        <li className="zip"><b>Zipcode:</b>
          <input type="text" onChange={handleZipChange} />
        </li>
      </div>
      <div>
        <button className="btn-location" onClick={handleLocationClick}>
          <span><b>Next</b></span>
        </button>
      </div>
    </ul>
  )
}

export default Location;