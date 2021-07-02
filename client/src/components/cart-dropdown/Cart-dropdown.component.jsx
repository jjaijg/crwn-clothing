import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./Cart-dropdown.style.scss";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import { toggleCartHidden } from "../../redux/cart/cart.actions";
import CartItem from "../cart-item/Cart-item.component";
import CustomButton from "../custom-button/Custom-button.component";

//through connect we will still hv access to dispatch, so no need to write additional dispatch function
const CartDropdown = ({ cartItems, history, dispatch }) => (
  <div className="cart-dropdown">
    <div className="cart-items">
      {cartItems.length ? (
        cartItems.map(cartItem => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))
      ) : (
        <span className="empty-message">Your cart is empty!</span>
      )}
    </div>
    <CustomButton
      onClick={() => {
        history.push("/checkout");
        dispatch(toggleCartHidden());
      }}
    >
      GO TO CHECKOUT
    </CustomButton>
  </div>
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems
});

// withRouter > is a higher order fun, allows component to have access to loaction, history props of route
export default withRouter(connect(mapStateToProps)(CartDropdown));
