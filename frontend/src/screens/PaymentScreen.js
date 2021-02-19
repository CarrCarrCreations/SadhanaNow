import React from "react";
import CheckoutSteps from "../components/CheckoutSteps";
import FormContainer from "../components/FormContainer";

const PaymentScreen = () => {
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Payment Screen</h1>
    </FormContainer>
  );
};

export default PaymentScreen;
