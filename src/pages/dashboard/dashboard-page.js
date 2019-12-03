import React, { Component } from 'react';
import { connect } from "react-redux";
import { logout } from "../../redux/actions/user.actions";
import './dashboard-page.css';

class DashboardPage extends Component{
    constructor(props){
        super(props);
        this.state ={

        }
    }

    submitHandler = () => {
        const { logout } = this.props;
        logout(null);
    }

    render(){
        return(
            <div>
                <h1>Dashboard</h1>
                <input type="button" value="Logout" onClick={ this.submitHandler }/>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    logout: (value) => dispatch(logout(value))
})

const mapStateToProps =(state) => {
    const { loggedIn } = state;
    return { loggedIn: loggedIn }
  }

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);

