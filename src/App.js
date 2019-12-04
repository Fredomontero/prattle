import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { getUser } from "./redux/actions/user.actions";
import { connect } from "react-redux";

// Pages
import SignupPage from './pages/signup/signup-page';
import LoginPage from './pages/login/login-page';
import DashboardPage from './pages/dashboard/dashboard-page';

import './App.css';

class App extends Component{
  constructor(props){
    super(props);
    console.log("E we");
  }

  componentWillMount(){
    // console.log("Que pedo we apenas me voy a renderear");
    const { getUser } = this.props;
    getUser();

  }

  render(){
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/signup" component={ SignupPage }/>
          <Route path="/login"  component={ LoginPage }/>
          <Route path="/dashboard" component={ DashboardPage }/>
        </Switch>
      </BrowserRouter>
    );  
  }
}

function mapStateToProps(state){
  const { loggedIn } = state;
  return { loggedIn: loggedIn }
}

const mapDispatchToProps = dispatch => ({
  getUser: () => dispatch(getUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
