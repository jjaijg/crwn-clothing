// base reducer object represents
// all the states of our applications

import { combineReducers } from 'redux';
import userReducer from './user/user.reducer';

export default combineReducers ({
    user: userReducer
})
