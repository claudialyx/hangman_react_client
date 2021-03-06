import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import background from '../img/just-waves.png';
import axios from 'axios';
import { Alert } from 'reactstrap';

export default class LoginForm extends React.Component {
    state = {
        username: '',
        password: '',
        loginStatus: false,
        loginMessage: [],
        hasErrors: false,
        errors: [],
    }
    usernameInput = (event) => {
        this.setState({
            username: event.target.value,
        })
    }

    passwordInput = (event) => {
        this.setState({
            password: event.target.value,
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()

        axios({
            method: 'POST',
            url: 'http://127.0.0.1:5000/api/v1/users/login',
            // url: 'https://hangman-flask-server.herokuapp.com//api/v1/users/login',
            data: {
                username: this.state.username,
                password: this.state.password,
            }
        })
            .then(response => {
                // console.log(response);
                // debugger
                localStorage.setItem('me', JSON.stringify(response.data));
                // localStorage.setItem('jwt', response.data.auth_token)
                // console.log(localStorage);
                this.props.userSignedIn();
            })
            .catch(error => {
                // console.log('ERROR', error)
                // console.log('ERROR', error.response.data.message)
                // debugger
                this.setState({
                    hasErrors: true,
                    errors: error.response.data.message,
                })
            })
    }

    displayError = () => {
        const { errors } = this.state
        console.log('jere', errors)
        return (
            < Alert color="danger"> {errors}! </Alert>
        )
    }


    render() {
        const { username, password, hasErrors } = this.state
        const { clickSignUp } = this.props
        return (
            <div>
                {!clickSignUp ?
                    <div>
                        <label style={{ fontSize: "2em" }}>Log In</label>
                        {hasErrors ?
                            this.displayError()
                            : null}
                        <Form >
                            <Form.Field>
                                <label>Username</label>
                                <input type="text" placeholder='Username' onChange={this.usernameInput} value={username} />
                            </Form.Field>
                            <Form.Field>
                                <label>Password</label>
                                <input type="password" placeholder='Password' onChange={this.passwordInput} value={password} />
                            </Form.Field>
                            <Button disabled={this.state.username && this.state.password ? false : true} type='submit' onClick={this.handleSubmit}>Submit</Button>
                        </Form>
                    </div>
                    :
                    <div style={{ backgroundImage: `url(${background})`, height: "100vh" }}>
                    </div>
                }
            </div >
        )
    }
}
