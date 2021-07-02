import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';

import './App.css';

// import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import Header from './components/header/Header.component';
import Homepage from './pages/homepage/Homepage.component';
import ShopPage from './pages/shop/Shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/Checkout.component';

const App = ({ checkUserSession, currentUser }) => {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route path='/shop' component={ShopPage} />
        <Route exact path='/checkout' component={CheckoutPage} />

        <Route
          exact
          path='/signin'
          render={() =>
            currentUser ? <Redirect to='/' /> : <SignInAndSignUpPage />
          }
        />
      </Switch>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

//1st arg-> null bcoz it dont need currentUSer,
//2nd arg-> dispatch, used to dispatch obj
export default connect(mapStateToProps, mapDispatchToProps)(App);
