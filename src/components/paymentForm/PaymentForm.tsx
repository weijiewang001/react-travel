import React from "react";
// import { PaymentInputsWrapper, usePaymentInputs } from "react-payment-inputs";
import { Input, Card } from "antd";
// import Cards from "react-credit-cards"

import styles from "./PaymentForm.module.css";
// import images from "react-payment-inputs/images";

export const PaymentForm = () => {
  // const {
  //   wrapperProps,
  //   getCardImageProps,
  //   getCardNumberProps,
  //   getExpiryDateProps,
  //   getCVCProps,
  // } = Input();

  return (
    <Card
      title="Credit Card/Debit Card"
      bordered={false}
      className={styles["payment-credit-card"]}
    >
      <Input />
    </Card>
  );
};