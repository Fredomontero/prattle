import React, { Component } from 'react';
import { connect } from "react-redux";
import { logIn, changeRoute } from "../../redux/actions/user.actions";
import { ContextConsumer } from "../../components/IntlWrapper/IntlWrapper.component";
import { Redirect } from 'react-router-dom';

import './login-page.css';

import { FormattedMessage } from 'react-intl';

class LoginPage extends Component {

    constructor(props){
        super(props);
        this.emailRef = React.createRef();
        this.passwordRef = React.createRef();
    }

    routeChange = () => {
        const { changeRoute } = this.props;
        changeRoute("signup");
    }

    submitHandler = (event) => {
        event.preventDefault();
        const { logIn } = this.props;
        const email = this.emailRef.current.value;
        const password = this.passwordRef.current.value;

        //very simple validation
        if( email.trim().length === 0 || password.trim().length === 0 ){
            return;
        }

        logIn(email, password);
    }
    
    render(){
        let { route } = this.props;
        if (route && route.route === "signup") {
            return <Redirect to='/signup' />
        }
        return(
            <div>
                <ContextConsumer>
                    {props => {
                        return(
                            <div className="login-container">
                                <p className="language-label">Select your laguage: </p>
                                <select onChange={props.selectLanguage}>
                                    <option value="en">English</option>
                                    <option value="es">Spanish</option>
                                    <option value="por">Portuguese</option>
                                </select>
                            </div> 
                        )
                    }}
                    
                </ContextConsumer>
                <div className="signup-container">
                        <img className="prattle-logo" src={require("../../assets/images/penacho.png")} alt="penacho-icon"/>
                        <h1>
                            <FormattedMessage
                                id="login.header"
                                defaultMessage="Login" 
                            />
                        </h1>
                        <form className="signup-form">
                            <FormattedMessage id="login.email" defaultMessage="Email">
                                { placeholder => <input type="email" id="email" placeholder={placeholder} ref={this.emailRef}/> }
                            </FormattedMessage>
                            <FormattedMessage id="login.password" defaultMessage="Password">
                                { placeholder => <input type="password" id="password" placeholder={placeholder} ref={this.passwordRef}/> }
                            </FormattedMessage>
                            <FormattedMessage id="login.button" defaultMessage="Login">
                                { value => <input type="button" value={value} onClick={ this.submitHandler }/> }
                            </FormattedMessage>
                    </form>
                    <p className="need-account" onClick={this.routeChange}>
                        <FormattedMessage
                            id="login.need.account"
                            defaultMessage="Need an account?" 
                        />
                    </p>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    logIn: (email, password) => dispatch(logIn({email, password})),
    changeRoute: (route) => dispatch(changeRoute({route}))
});

const mapStateToProps = (state) => {
    const { route } = state;
    return { route: route }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);