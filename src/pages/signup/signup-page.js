import React, { Component } from 'react';
import { connect } from "react-redux";
import { createUserRequest } from "../../redux/actions/user.actions";
import './signup-page.css';

class SignupPage extends Component {

    constructor(props){
        super(props);

        this.firstnameRef = React.createRef();
        this.lastnameRef = React.createRef();
        this.emailnameRef = React.createRef();
        this.passwordRef = React.createRef();
        this.passwordConfirmationRef = React.createRef();

    }

    submitHandler = (event) => {
        event.preventDefault();
        const { createUserRequest } = this.props;
        const firstname = this.firstnameRef.current.value;
        const lastname = this.lastnameRef.current.value;
        const email = this.emailnameRef.current.value;
        const password = this.passwordRef.current.value;
        const passwordConfirmation = this.passwordConfirmationRef.current.value;

        //very simple validation
        if( firstname.trim().length === 0 || lastname.trim().length === 0 || email.trim().length === 0 || password.trim().length === 0 || passwordConfirmation.trim().length === 0 ){
            return;
        }

        createUserRequest(firstname, lastname, email, password);
        // const requestBodyAuth = {
        //     query: `
        //         mutation{
        //             createUser(userInput: {
        //                 email: "${email}",
        //                 password: "${password}"
        //             }){
        //                 _id
        //                 email
        //             }
        //         }
        //     `
        // }

        // fetch('http://localhost:4000/graphql', {
        //     method: 'POST',
        //     body: JSON.stringify(requestBodyAuth),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // })
        // .then( res => {
        //     if(res.status !== 200 && res.status !== 201){
        //         throw new Error("Failed updating the auth database");
        //     }
        //     return res.json();
        // })
        // .then(resData => {
        //     this.firstnameRef.current.value = "";
        //     this.lastnameRef.current.value = "";
        //     this.emailnameRef.current.value = "";
        //     this.passwordRef.current.value = "";
        //     this.passwordConfirmationRef.current.value = "";
        //     console.log(resData);
        //     const tempId = resData.data.createUser._id;
        //     const requestBody = {
        //         query: `
        //             mutation{
        //                 createUser(userInput: {
        //                     _id: "${tempId}"
        //                     firstname: "${firstname}",
        //                     lastname: "${lastname}",
        //                     email: "${email}"
        //                 }){
        //                     _id
        //                     firstname
        //                     email
        //                 }
        //             }
        //         `
        //     }
        //     return fetch('http://localhost:4001/graphql', {
        //         method: 'POST',
        //         body: JSON.stringify(requestBody),
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }
        //     })
        // })
        // .then(resBackend => {
        //     if(resBackend.status !== 200 && resBackend.status !== 201){
        //         throw new Error("Failed updating the backend database");
        //     }
        //     return resBackend.json();
        // })
        // .then(result => {
        //     console.log(result);
        // })
        // .catch(error => {
        //     console.log(error);
        // })
    }
    
    render(){
        return(
            <div className="signup-container">
                <h1>Sign up</h1>
                <form className="signup-form">
                    <input type="text" id="firstname" placeholder="First name" ref={this.firstnameRef}/>
                    <input type="text" id="lastname" placeholder="Last name" ref={this.lastnameRef}/>
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
    createUserRequest: (firstname, lastname, email, password) => dispatch(createUserRequest({firstname, lastname, email, password}))
})

export default connect(null, mapDispatchToProps)(SignupPage);