import React from 'react';
const { useState } = React;

var Payment = ({ onPaymentClick }) => {

  const [ccn, setCcn] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [billingZip, setBillingZip] = useState('');

  const handleCcChange = (event) => {
    var ccnum = event.target.value;
    setCcn(ccnum);
  }

  const handleExpiryChange = (event) => {
    var expiry = event.target.value;
    setExpiryDate(expiry);
  }

  const handleCvvChange = (event) => {
    var cvvInput = event.target.value;
    setCvv(cvvInput);
  }

  const handleBillingZipChange = (event) => {
    var billing = event.target.value;
    setBillingZip(billing);
  }

  const handlePaymentClick = () => {
    onPaymentClick(ccn, expiryDate, cvv, billingZip);
  }

  return (
    <ul>
      <div>
        <li className="ccnum"><b>Credit Card Number:</b>
          <input type="text" onChange={handleCcChange} />
        </li>
        <li className="expirydate"><b>Expiry Date (MM/YYYY):</b>
          <input type="text" onChange={handleExpiryChange} />
        </li>
        <li className="cvv"><b>CVV:</b>
          <input type="text" onChange={handleCvvChange} />
        </li>
        <li className="billingzip"><b>Billing Zipcode:</b>
          <input type="text" onChange={handleBillingZipChange} />
        </li>
      </div>
      <div>
        <button className="btn-payment" onClick={handlePaymentClick}>
          <span><b>Next</b></span>
        </button>
      </div>
    </ul>
  )
}

export default Payment;