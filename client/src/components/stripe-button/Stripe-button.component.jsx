import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    'pk_test_51J8opnSEMSZuEtxaUy1JXsVLvei6NtINUhp88BZCMLaANVQ4z9llKctDaHnoXnnhvV5WXGXffe6XHP0lndNkWCqm00v13TE963';

  const onToken = (token) => {
    console.log(token);
    axios({
      url: 'payment',
      method: 'POST',
      data: {
        token,
        amount: priceForStripe,
      },
    }).then(
      (res) => {
        alert('payment successful');
      },
      (err) => {
        console.log('payment error: ', JSON.parse(err));
        alert(
          'There was an issue with your payment. Please use the provided credit card.'
        );
      }
    );
  };

  return (
    <StripeCheckout
      label='Pay Now'
      name='CRWN Clothing Ltd.'
      billindAddress
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

export default StripeCheckoutButton;
