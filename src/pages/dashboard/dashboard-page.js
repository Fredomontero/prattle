import React, { Component } from 'react';
import { connect } from "react-redux";
import { logout } from "../../redux/actions/user.actions";
import './dashboard-page.css';

class DashboardPage extends Component{
    constructor(props){
        super(props);
        console.log("Dashboard Component");
    }

    submitHandler = () => {
        const { logout } = this.props;
        
        logout();
    }

    render(){
        return(
            <div>
                <h1>Dashboard</h1>
                <h3>Que pedo prros, listo para este chat mamalón o qué? &#128021;</h3>
                <input type="button" value="Logout" onClick={ this.submitHandler }/>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout())
})

const mapStateToProps =(state) => {
    const { loggedIn } = state;
    return { loggedIn: loggedIn }
  }

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);

