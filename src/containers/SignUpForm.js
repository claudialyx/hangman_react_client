import React from 'react';
import { Form } from 'semantic-ui-react';
import { Button } from 'react-bootstrap';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import Router from '../Router';
import background from '../just-waves.png';
import axios from 'axios';

export default class SignUpForm extends React.Component {
    state = {
        email: '',
        username: '',
        password: '',
        hasErrors: false,
        errors: [],
        status: false,
        signupMessage: [],
    }

    handleSubmit = (event) => {
        event.preventDefault();
        // post the details to backend database 
        axios({
            method: "post",
            url: 'http://127.0.0.1:5000/api/v1/users/new',
            data: {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
            }
        })
            .then(response => {
                console.log(response);
                this.props.userSignedIn()
                //display successful sign up message and errors
                this.setState({
                    status: true,
                    signupMessage: response.data.message,
                    hasErrors: '',
                })
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    hasErrors: true,
                    // errors: error.result.data.message,
                })
            })
    }

    emailInput = (event) => {
        this.setState({
            email: event.target.value,
        })
    }

    passwordInput = (event) => {
        this.setState({
            password: event.target.value,
        })
    }

    usernameInput = (event) => {
        this.setState({
            username: event.target.value,
        })
    }

    validateEmail = () => {
        const expression = /\S+@\S+\.\S+/
        console.log(expression.test(this.state.email.toLowerCase()))
        return expression.test(this.state.email.toLowerCase())
    }

    render() {
        const { handleSignUp, clickSignUp, backToLogin } = this.props
        const { email, username, password } = this.state
        return (
            <div>
                {!clickSignUp ?
                    <div style={{ backgroundImage: `url(${background})`, height: "100vh" }}>
                        <label style={{ fontSize: "2em" }} > Don't have an account? Sign up now! </label> <br />
                        <Link to="/signup">
                            <Button role="link" onClick={handleSignUp}>Sign Up</Button>
                        </Link>
                    </div>
                    :
                    <div>
                        <label style={{ fontSize: "2em" }}>Sign Up</label>
                        <div style={{ margin: "1em" }}>
                            <Form >
                                <Form.Field>
                                    <label>Username</label>
                                    <input type="text" onChange={this.usernameInput} value={username} placeholder='Username' />
                                </Form.Field>
                                <Form.Field>
                                    <label>Email</label>
                                    <input type="email" onChange={this.emailInput} value={email} placeholder='Email' />
                                </Form.Field>
                                <Form.Field>
                                    <label>Password</label>
                                    <input type="password" onChange={this.passwordInput} value={password} placeholder='Password' />
                                </Form.Field>
                                <Button disabled={this.state.email && this.state.password && this.validateEmail() ? false : true} color="primary" type='submit' onClick={this.handleSubmit}> Submit</Button>
                            </Form>
                        </div>
                        <Button onClick={backToLogin} >Back to login page</Button>
                    </div>
                }
            </div >
        )
    }
}
