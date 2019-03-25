import React from 'react';
import { Button, Form, Grid } from 'semantic-ui-react';
import background from './just-waves.png';

export default class LoginForm extends React.Component {
    state = {
        username: '',
        password: '',
        loginStatus: false,
        loginMessage: [],
        hasErrors: false,
        errors: '',
    }

    render() {
        const { clickSignUp } = this.props
        return (
            <div>
                {!clickSignUp ?
                    <div>
                        <label style={{ fontSize: "2em" }}>Log In</label>
                        <Form >
                            <Form.Field>
                                <label>Username</label>
                                <input placeholder='Username' />
                            </Form.Field>
                            <Form.Field>
                                <label>Password</label>
                                <input placeholder='Password' />
                            </Form.Field>
                            <Button type='submit'>Submit</Button>
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
