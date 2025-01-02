import React from "react";
import "../style/about.scss";
const About = () => {
  return (
    <div className="terms-container">
      <h1>Terms and Conditions</h1>
      <p>Welcome to our movie ticket booking website.</p>
      <ul>
        <li>You must be at least 18 years old to use our services.</li>
        <li>All ticket purchases are final and non-refundable.</li>
        <li>We reserve the right to cancel any booking at our discretion.</li>
        <li>
          Personal information provided during booking will be kept
          confidential.
        </li>
        <li>
          We are not responsible for any issues arising from third-party
          services.
        </li>
      </ul>
      <p>Thank you for choosing our service. Enjoy your movie!</p>
    </div>
  );
};

export default About;
