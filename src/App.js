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

  componentDidMount(){
    // console.log("Que pedo we apenas me voy a renderear [App Component]");
    // console.log("LoggedIn: ", this.props.loggedIn);
    const { getUser } = this.props;
    getUser();
    

  }

  render(){
    return (
      <BrowserRouter>
        <Switch>
          {/* HOME PAGE ROUTE */}
          <Route
            exact
            path="/"
            render={ () => 
              (this.props.loggedIn !== null) ? (
                <Redirect from="/" to="dashboard"/>
              ):(
                <Redirect from="/" to="/login"/>
              )
            } 
          />
          {/* SIGNUP PAGE ROUTE */}
          <Route path="/signup" component={ SignupPage }/>
          {/* LOGIN PAGE ROUTE */}
          <Route 
            path="/login"  
            render={ () => 
              (this.props.loggedIn !== null) ? (
                <Redirect from="/" to="dashboard"/>
              ):(
                <LoginPage/>
              )
            } 
          />
          {/* DASHBOARD PAGE ROUTE */}
          <Route 
            path="/dashboard" 
            render={ () => 
              (this.props.loggedIn !== null) ? (
                <DashboardPage/>
              ):(
                <Redirect to="/"/>
              )
            }
          />
        </Switch>
      </BrowserRouter>
    );  
  }
}

function mapStateToProps(state){
  const { loggedIn } = state;
  // if(loggedIn)
  //   console.log("Logged in: ", loggedIn.userId);
  return { loggedIn: (loggedIn) ? loggedIn.userId : null }
}

const mapDispatchToProps = dispatch => ({
  getUser: () => dispatch(getUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
