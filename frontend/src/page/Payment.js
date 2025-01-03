import React from "react";
import "../style/Payment.scss";

const Payment = () => {
  return (
    <div className="payment-container">
      <form className="payment-form">
        <h2>Payment Details</h2>
        <div className="form-group">
          <label htmlFor="cardNumber">Card Number</label>
          <input type="text" id="cardNumber" name="cardNumber" required />
        </div>
        <div className="form-group">
          <label htmlFor="expiryDate">Expiry Date</label>
          <input type="text" id="expiryDate" name="expiryDate" required />
        </div>
        <div className="form-group">
          <label htmlFor="cvv">CVV</label>
          <input type="text" id="cvv" name="cvv" required />
        </div>
        <div className="form-group">
          <label htmlFor="cardHolderName">Card Holder Name</label>
          <input
            type="text"
            id="cardHolderName"
            name="cardHolderName"
            required
          />
        </div>
        <div className="form-group">
          <button type="submit">Pay Now</button>
        </div>
      </form>
    </div>
  );
};

export default Payment;
