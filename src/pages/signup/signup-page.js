import React, { Component } from 'react';
import { connect } from "react-redux";
import { createUserRequest } from "../../redux/actions/user.actions";
import './signup-page.css';

class SignupPage extends Component {

    constructor(props){
        super(props);

        this.fullnameRef = React.createRef();
        this.emailnameRef = React.createRef();
        this.passwordRef = React.createRef();
        this.passwordConfirmationRef = React.createRef();

    }

    submitHandler = (event) => {
        event.preventDefault();
        const { createUserRequest } = this.props;
        const fullname = this.fullnameRef.current.value;
        const email = this.emailnameRef.current.value;
        const password = this.passwordRef.current.value;
        const passwordConfirmation = this.passwordConfirmationRef.current.value;

        //very simple validation
        if( fullname.trim().length === 0 || email.trim().length === 0 || password.trim().length === 0 || passwordConfirmation.trim().length === 0 ){
            return;
        }

        createUserRequest(fullname, email, password);
    }
    
    render(){
        return(
            <div className="signup-container">
                <h1>Sign up</h1>
                <form className="signup-form">
                    <input type="text" id="fullname" placeholder="Fullname" ref={this.fullnameRef}/>
                    <input type="email" id="email" placeholder="Email" ref={this.emailnameRef}/>
                    <input type="password" id="password" placeholder="Password" ref={this.passwordRef}/>
                    <input type="password" id="passwordConfirmation" placeholder="Confirm password" ref={this.passwordConfirmationRef}/>
                    <input type="button" value="Sign up" onClick={ this.submitHandler }/>
            </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    createUserRequest: (fullname, email, password) => dispatch(createUserRequest({fullname, email, password}))
})

export default connect(null, mapDispatchToProps)(SignupPage);