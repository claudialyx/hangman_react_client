import React from 'react';
import { Button, Form, Grid } from 'semantic-ui-react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import Router from './Router';
import background from './just-waves.png';

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

    render() {
        const { handleSignUp, clickSignUp } = this.props
        return (
            <div>
                {!clickSignUp ?
                    <div style={{ backgroundImage: `url(${background})`, height: "100vh" }}>
                        {/* <BrowserRouter> */}
                        <label style={{ fontSize: "2em" }} > Don't have an account? Sign up now! </label> <br />
                        <Link to="/signup">
                            <Button role="link" onClick={handleSignUp}>Sign Up</Button>
                        </Link>
                        {/* <Route path="/signup" component={SignUpForm} />
                            <Router />
                        </BrowserRouter> */}
                    </div>
                    :
                    <div>
                        {/* <BrowserRouter> */}
                        <label style={{ fontSize: "2em" }}>Sign Up</label>
                        <Form >
                            <Form.Field>
                                <label>Username</label>
                                <input placeholder='Username' />
                            </Form.Field>
                            <Form.Field>
                                <label>Email</label>
                                <input placeholder='Email' />
                            </Form.Field>
                            <Form.Field>
                                <label>Password</label>
                                <input placeholder='Password' />
                            </Form.Field>
                            <Button type='submit'>Submit</Button>
                        </Form>
                        {/* </BrowserRouter> */}
                    </div>
                }
            </div >
        )
    }
}
