import React, { Component } from 'react';
import './login-page.css';

class LoginPage extends Component {

    constructor(props){
        super(props);
        
        this.state = {
            email: '',
            password: ''
        }
    }

    submitHandler = (event) => {
        event.preventDefault();
        const email = this.state.email;
        const password = this.state.password;

        //very simple validation
        if( email.trim().length === 0 || password.trim().length === 0 ){
            return;
        }

        let requestBody = {
            query: `
                query {
                    login(email: "${email}", password: "${password}"){
                        userId
                        token
                        tokenExpiration
                    }
                }
            `
        };

        fetch('http://localhost:4000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then( res => {
            if(res.status !== 200 && res.status !== 201){
                throw new Error("Failed logging in");
            }
            return res.json();
        })
        .then(resData => {
            this.setState({
                email: '',
                password: ''
            });
            console.log(resData);
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
                <h1>Login</h1>
                <form className="signup-form">
                    <input name="email" type="email" id="email" placeholder="Email" value={this.state.email} onChange={ this.handleChange }/>
                    <input name="password" type="password" id="password" placeholder="Password" value={this.state.password} onChange={ this.handleChange }/>
                    <input type="button" value="Login" onClick={ this.submitHandler }/>
            </form>
            </div>
        )
    }
}

export default LoginPage;