import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';

import logo from './logo.svg';
import './App.css';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import Header from './components/header/Header.component';
import Homepage from './pages/homepage/Homepage.component';
import ShopPage from './pages/shop/Shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

class App extends Component {

  unsubscribeFromAuth = null;

  componentDidMount() {
    // this onAuthStateChanged is a open subscription, we need to close it once it is done
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot( snapShot => {
          setCurrentUser( {id: snapShot.id,
            ...snapShot.data()
          
          });
        })
      } else setCurrentUser(userAuth)
      
    })
  }

  componentWillUnmount() {
    // this will unsubscribe from open subscription of firebase auth
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
      <Header />
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route exact path='/shop' component={ShopPage} />
        <Route exact path='/signin' render={() => 
          this.props.currentUser ? (<Redirect to='/' />)
          : (<SignInAndSignUpPage />)
        } />
      </Switch>
      </div>
    );
  }
  
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

//1st arg-> null bcoz it dont need currentUSer,
//2nd arg-> dispatch, used to dispatch obj
export default connect(mapStateToProps, mapDispatchToProps)(App);
