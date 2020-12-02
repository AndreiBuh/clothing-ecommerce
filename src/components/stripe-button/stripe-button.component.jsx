import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_E6k59TYy9VqsTdhdNnfw2qHj000opWPBYa';

  const onToken = (token) => {
    console.log(token);
    alert('payment successful');
  };

  return (
    <StripeCheckout
      label='Pay now'
      name='Clothing'
      billingAddress
      shippingAddress
      image='https://sendeyo.com/up/d/f3eb2117da'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeButton;
