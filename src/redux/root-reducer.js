// base reducer object represents
// all the states of our applications

import { combineReducers } from 'redux';
import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
export default combineReducers ({
    user: userReducer,
    cart: cartReducer
})
