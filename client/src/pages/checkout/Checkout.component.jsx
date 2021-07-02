import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./Checkout.style.scss";

import CheckoutItem from "../../components/checkout-item/Checkout-item.component";
import StripeCheckoutButton from "../../components/stripe-button/Stripe-button.component";
import {
  selectCartItems,
  selectCartTotal
} from "../../redux/cart/cart.selectors";

const CheckoutPage = ({ cartItems, total }) => (
  <div className="checkout-page">
    <div className="checkout-header">
      <div className="header-block">
        <span>Product</span>
      </div>
      <div className="header-block">
        <span>Description</span>
      </div>
      <div className="header-block">
        <span>Quantity</span>
      </div>
      <div className="header-block">
        <span>Price</span>
      </div>
      <div className="header-block">
        <span>Remove</span>
      </div>
    </div>

    {cartItems.length
      ? cartItems.map(cartItem => (
          <CheckoutItem key={cartItem.id} cartItem={cartItem} />
        ))
      : null}
    <div className="total">
      <span>TOTAL: ${total}</span>
    </div>
    <div className="test-data">
      Test Data for using payment: Card No: 4242-4242-4242-4242; Exp date:
      01/20; CVV: 123
    </div>
    <StripeCheckoutButton price={total} />
  </div>
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal
});

export default connect(mapStateToProps)(CheckoutPage);
