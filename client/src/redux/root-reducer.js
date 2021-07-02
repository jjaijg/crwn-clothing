// base reducer object represents
// all the states of our applications

import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

import userReducer from "./user/user.reducer";
import shopReducer from "./shop/shop.reducer";
import cartReducer from "./cart/cart.reducer";
import directoryReducer from "./directory/directory.reducer";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"]
};

const rootReducer = combineReducers({
  shop: shopReducer,
  directory: directoryReducer,
  user: userReducer,
  cart: cartReducer
});

export default persistReducer(persistConfig, rootReducer);
