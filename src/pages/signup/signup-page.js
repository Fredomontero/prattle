import React, { Component } from 'react';
import './signup-page.css';

class SignupPage extends Component {

    constructor(props){
        super(props);
        this.firstnameEl = React.createRef();
        this.lastnameEl = React.createRef();
        this.emailEl =  React.createRef();
        this.passwordEl = React.createRef();
        this.passwordConfirmationEl = React.createRef();
    }

    submitHandler = (event) => {
        event.preventDefault();
        const firstname = this.firstnameEl.current.value;
        const lastname = this.lastnameEl.current.value;
        const email = this.emailEl.current.value;
        const password = this.passwordEl.current.value;
        const passwordConfirmation = this.passwordConfirmationEl.current.value;

        //very simple validation
        if( firstname.trim().length === 0 || lastname.trim().length === 0 || email.trim().length === 0 || password.trim().length === 0 || passwordConfirmation.trim().length === 0 ){
            return;
        }

        const requestBody = {
            query: `
                mutation{
                    createUser(userInput: {
                        firstname: "${firstname}",
                        lastname: "${lastname}",
                        email: "${email}",
                        password: "${password}"
                    }){
                        _id
                        firstname
                        email
                    }
                }
            `
        }

        fetch('http://localhost:4000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then( res => {
            if(res.status !== 200 && res.status !== 201){
                throw new Error("Failed!");
            }
            return res.json();
        })
        .then(resData => {
            console.log(resData);
            this.firstnameEl.current.value = "";
            this.lastnameEl.current.value = "";
            this.emailEl.current.value = "";
            this.passwordEl.current.value = "";
            this.passwordConfirmationEl.current.value = "";
        })
        .catch(error => {
            console.log(error);
        })
    }
    
    render(){
        return(
            <div className="signup-container">
                <h1>Sign up</h1>
                <form className="signup-form">
                    <input type="text" id="firstname" placeholder="First name" ref={this.firstnameEl}/>
                    <input type="text" id="lastname" placeholder="Last name" ref={this.lastnameEl}/>
                    <input type="email" id="email" placeholder="Email" ref={this.emailEl}/>
                    <input type="password" id="password" placeholder="Password" ref={this.passwordEl}/>
                    <input type="password" id="passwordConfirmation" placeholder="Confirm password" ref={this.passwordConfirmationEl}/>
                    <input type="button" value="Sign up" onClick={ this.submitHandler }/>
            </form>
            </div>
        )
    }
}

export default SignupPage;