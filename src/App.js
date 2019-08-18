import React from 'react';
import { Switch, Route } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';

import Homepage from './pages/homepage/Homepage.component';
import ShopPage from './pages/shop/Shop.component';

function App() {
  return (
    <div>
    <Switch>
      <Route exact path='/' component={Homepage} />
      <Route exact path='/shop' component={ShopPage} />
    </Switch>
    </div>
  );
}

export default App;
