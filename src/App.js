import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { connect } from "react-redux";

// Pages
import SignupPage from './pages/signup/signup-page';
import LoginPage from './pages/login/login-page';
import DashboardPage from './pages/dashboard/dashboard-page';

import './App.css';

function App(props) {
  return (
    <BrowserRouter>
      <Switch>
        <Route 
          exact
          path="/"
          render={ () =>
            (props.loggedIn) ? (
              <DashboardPage/>
            ):(
              <LoginPage/>
            )
          }
        />
        <Route path="/signup" component={ SignupPage }/>
        <Route 
          path="/login" 
          render={ () =>
            (props.loggedIn) ? (
              <DashboardPage/>
            ):(
              <LoginPage/>
            )
          }
        />
        <Route path="/dashboard" component={ DashboardPage }/>
      </Switch>
    </BrowserRouter>
  );
}

function mapStateToProps(state){
  const { loggedIn } = state;
  return { loggedIn: loggedIn }
}

export default connect(mapStateToProps)(App);
