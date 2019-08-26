import React from "react";
import { connect } from "react-redux";

import "./Cart-dropdown.style.scss";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import CartItem from "../cart-item/Cart-item.component";
import CustomButton from "../custom-button/Custom-button.component";

const CartDropdown = ({ cartItems }) => (
  <div className="cart-dropdown">
    <div className="cart-items">
      {cartItems.map(cartItem => (
        <CartItem key={cartItem.id} item={cartItem} />
      ))}
    </div>
    <CustomButton>GO TO CHECKOUT</CustomButton>
  </div>
);

const mapStateToProps = state => ({
  cartItems: selectCartItems(state)
});

export default connect(mapStateToProps)(CartDropdown);
