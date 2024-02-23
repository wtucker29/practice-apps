import React from "react";
import { render } from "react-dom";
import AccountCreation from './components/AccountCreation.jsx';
import Location from './components/Location.jsx';
import Payment from './components/Payment.jsx';
import Summary from './components/Summary.jsx';
import axios from 'axios';
const { useState, useEffect } = React;

const App = () => {

  const [step, setStep] = useState(0);
  const [accountInfo, setAccountInfo] = useState(null);
  const [locationInfo, setLocationInfo] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [summaryInfo, setSummaryInfo] = useState([]);


  useEffect(() => {
    // something
    setStep(0);
  }, []);


  const handleCheckoutClick = () => {
    //something here
    setStep(1);
  }

  const handleAccountClick = (name, email, password) => {
    // post request
    const accountInfo = { name: name, email: email, password: password };
    axios.post('http://localhost:3000/checkout', accountInfo)
      .then((response) => {
        console.log('Response from account information post: ', response.data);
        setStep(2);
      })
      .catch((error) => {
        console.error('Error posting account information:', error);
      })
  }

  const handleLocationClick = (add1, add2, city, state, zip) => {
    // put request
    const locationInfo = { addressline1: add1, addressline2: add2, city: city, state: state, zipcode: zip };
    axios.put('http://localhost:3000/checkout', locationInfo)
      .then((response) => {
        console.log('Response from location update: ', response.data);
        setStep(3);
      })
      .catch((error) => {
        console.error('Error updating location information:', error);
      })
  }

  const handlePaymentClick = (cc, expiry, cvv, billingzip) => {
    // put request
    const paymentInfo = { creditcardnumber: cc, expirydate: expiry, cvv: cvv, billingzipcode: billingzip };
    axios.put('http://localhost:3000/checkout', paymentInfo)
      .then((response) => {
        console.log('Response from payment update: ', response.data);
        setStep(4);
      })
      .catch((error) => {
        console.error('Error updating payment information:', error);
      })
      .then(() => {
        axios.get('http://localhost:3000/checkout')
        .then((response) => {
          console.log(response.data);
          setSummaryInfo(response.data);
        })
        .catch((error) => {
          console.error('Error retrieving all customer information:', error);
        });
      });
  }

  const handlePurchaseClick = (number) => {
    setStep(number);
  }

  return (
    <div>
    <h1>It's Time to Checkout!</h1>
    {/* <p>
      <code>Page Cookie: {JSON.stringify(document.cookie, undefined, "\t")}</code>
    </p> */}
    {step === 0 && (
      <button className="btn-checkout" onClick={() => setStep(1)}>
        <span>Checkout Here</span>
      </button>
    )}
    {step === 1 && (
      <div>
        <AccountCreation onAccountClick={handleAccountClick}/>
      </div>
    )}
    {step === 2 && (
      <div>
        <Location onLocationClick={handleLocationClick}/>
      </div>
    )}
    {step === 3 && (
      <div>
        <Payment onPaymentClick={handlePaymentClick}/>
      </div>
    )}
    {step === 4 && (
      <div>
        <Summary totalSummary={summaryInfo} onPurchaseClick={handlePurchaseClick} />
      </div>
    )}
  </div>
  )
}

render(<App />, document.getElementById("root"));
