import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

// Pages
import SignupPage from './pages/signup/signup-page';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/signup" component={ SignupPage }/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
