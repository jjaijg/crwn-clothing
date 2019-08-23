import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import Header from './components/header/Header.component';
import Homepage from './pages/homepage/Homepage.component';
import ShopPage from './pages/shop/Shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

class App extends Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    // this onAuthStateChanged is a open subscription, we need to close it once it is done
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot( snapShot => {
          console.log(snapShot.data())
          this.setState({
            currentUser: {id: snapShot.id,
            ...snapShot.data()
          }
          })
        })
      } else this.setState({ currentUser: userAuth })
      
    })
  }

  componentWillUnmount() {
    // this will unsubscribe from open subscription of firebase auth
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
      <Header currentUser={this.state.currentUser} />
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route exact path='/shop' component={ShopPage} />
        <Route exact path='/signin' component={SignInAndSignUpPage} />
      </Switch>
      </div>
    );
  }
  
}

export default App;
