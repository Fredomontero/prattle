import React, { Component } from 'react';
import './signup-page.css';

class SignupPage extends Component {

    constructor(props){
        super(props);
        
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            passwordConfirmation: ''
        }
    }

    submitHandler = (event) => {
        event.preventDefault();
        const firstname = this.state.firstname;
        const lastname = this.state.lastname;
        const email = this.state.email;
        const password = this.state.password;
        const passwordConfirmation = this.state.passwordConfirmation;

        //very simple validation
        if( firstname.trim().length === 0 || lastname.trim().length === 0 || email.trim().length === 0 || password.trim().length === 0 || passwordConfirmation.trim().length === 0 ){
            return;
        }

        const requestBodyAuth = {
            query: `
                mutation{
                    createUser(userInput: {
                        email: "${email}",
                        password: "${password}"
                    }){
                        _id
                        email
                    }
                }
            `
        }

        fetch('http://localhost:4000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBodyAuth),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then( res => {
            if(res.status !== 200 && res.status !== 201){
                throw new Error("Failed updating the auth database");
            }
            return res.json();
        })
        .then(resData => {
            this.setState({
                firstname: '',
                lastname: '',
                email: '',
                password: '',
                passwordConfirmation: ''
            });
            // console.log(resData);
            const tempId = resData.data.createUser._id;
            const requestBody = {
                query: `
                    mutation{
                        createUser(userInput: {
                            _id: "${tempId}"
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
            return fetch('http://localhost:4001/graphql', {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        })
        .then(resBackend => {
            if(resBackend.status !== 200 && resBackend.status !== 201){
                throw new Error("Failed updating the backend database");
            }
            return resBackend.json();
        })
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.log(error);
        })
    }

    handleChange = event => {
        const { value, name } = event.target;
        this.setState({[name]: value});
    }
    
    render(){
        return(
            <div className="signup-container">
                <h1>Sign up</h1>
                <form className="signup-form">
                    <input name='firstname' type="text" id="firstname" placeholder="First name" value={this.state.firstname} onChange={ this.handleChange }/>
                    <input name='lastname' type="text" id="lastname" placeholder="Last name" value={this.state.lastname} onChange={ this.handleChange }/>
                    <input name='email' type="email" id="email" placeholder="Email" value={this.state.email} onChange={ this.handleChange }/>
                    <input name='password' type="password" id="password" placeholder="Password" value={this.state.password} onChange={ this.handleChange }/>
                    <input name='passwordConfirmation' type="password" id="passwordConfirmation" placeholder="Confirm password" value={this.state.passwordConfirmation} onChange={ this.handleChange }/>
                    <input type="button" value="Sign up" onClick={ this.submitHandler }/>
            </form>
            </div>
        )
    }
}

export default SignupPage;