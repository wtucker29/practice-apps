import React from 'react';
const { useState } = React;

var AccountCreation = ({ onAccountClick }) => {
  const [inputName, setInputName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  const handleNameChange = (event) => {
    var name = event.target.value;
    setInputName(name);
  }

  const handleEmailChange = (event) => {
    var email = event.target.value;
    setInputEmail(email);
  }

  const handlePasswordChange = (event) => {
    var password = event.target.value;
    setInputPassword(password);
  }

  const handleAccountClick = () => {
    onAccountClick(inputName, inputEmail, inputPassword);
    console.log(inputName, inputEmail, inputPassword);
  }

  return (
    <ul>
      <div>
        <li className="name"><b>Name:</b>
          <input type="text" onChange={handleNameChange} />
        </li>
        <li className="email"><b>Email:</b>
          <input type="text" onChange={handleEmailChange} />
        </li>
        <li className="password"><b>Password:</b>
          <input type="text" onChange={handlePasswordChange} />
        </li>
      </div>
      <div>
        <button className="btn-account" onClick={handleAccountClick}>
          <span><b>Next</b></span>
        </button>
      </div>
    </ul>
  )
}

export default AccountCreation;