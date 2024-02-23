import React from 'react';
const { useState } = React;

var Summary = ({ totalSummary, onPurchaseClick }) => {

  const handlePurchaseClick = () => {
    var number = 0;
    onPurchaseClick(number);
  }

  console.log('totalsummary: ', totalSummary);
  // console.log('totalsummary.name: ', totalSummary[0].name);

  return (
    <div>
      <h3>Order Summary:</h3>
      <div className="summary-div">
        <ul>
          <li><b>Name:</b> {totalSummary.name}</li>
          <li><b>Email:</b> {totalSummary.email}</li>
          <li><b>Password:</b> {totalSummary.password}</li>
          <li><b>Address Line 1:</b> {totalSummary.addressline1}</li>
          <li><b>Address Line 2:</b> {totalSummary.addressline2}</li>
          <li><b>City:</b> {totalSummary.city}</li>
          <li><b>State:</b> {totalSummary.state}</li>
          <li><b>Zipcode:</b> {totalSummary.zipcode}</li>
          <li><b>Credit Card Number:</b> {totalSummary.creditcardnumber}</li>
          <li><b>Expiry Date:</b> {totalSummary.expirydate}</li>
          <li><b>CVV:</b> {totalSummary.cvv}</li>
          <li><b>Billing Zipcode:</b> {totalSummary.billingzip}</li>
        </ul>
      </div>
      <button className="btn-purchase" onClick={handlePurchaseClick}>
        <span>Purchase</span>
      </button>
    </div>
  )
}

export default Summary;