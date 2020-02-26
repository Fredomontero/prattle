import React, { Component } from 'react';
import { connect } from "react-redux";
import { createUserRequest } from "../../redux/actions/user.actions";
import './signup-page.css';
import { FormattedMessage } from 'react-intl';

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
                <h1>
                    <FormattedMessage id="signup.header" defaultMessage="Sign up" />
                </h1>
                <form className="signup-form">
                    <FormattedMessage id="signup.fullname" defaultMessage="Fullname">
                        { placeholder => <input type="text" id="fullname" placeholder={placeholder} ref={this.fullnameRef}/> }
                    </FormattedMessage>
                    <FormattedMessage id="signup.email" defaultMessage="Email">
                        { placeholder => <input type="email" id="email" placeholder={placeholder} ref={this.emailnameRef}/> }
                    </FormattedMessage>
                    <FormattedMessage id="signup.password" defaultMessage="Password">
                        { placeholder => <input type="password" id="password" placeholder={placeholder} ref={this.passwordRef}/> }
                    </FormattedMessage>
                    <FormattedMessage id="signup.confirm.password" defaultMessage="Confirm password">
                        { placeholder => <input type="password" id="passwordConfirmation" placeholder={placeholder} ref={this.passwordConfirmationRef}/> }
                    </FormattedMessage>
                    <FormattedMessage id="signup.button" defaultMessage="Sign up">
                        { value => <input type="button" value={value} onClick={ this.submitHandler }/> }
                    </FormattedMessage>
            </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    createUserRequest: (fullname, email, password) => dispatch(createUserRequest({fullname, email, password}))
})

export default connect(null, mapDispatchToProps)(SignupPage);