import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

// Pages
import SignupPage from './pages/signup/signup-page';
import LoginPage from './pages/login/login-page';
import DashboardPage from './pages/dashboard/dashboard-page';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/signup" component={ SignupPage }/>
        <Route path="/login" component={ LoginPage }/>
        <Route path="/dashboard" component={ DashboardPage }/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
