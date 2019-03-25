import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Hangman from './Hangman';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';


export default class Router extends React.Component {
    render() {
        // const { count } = this.props;
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/hangman/" component={Hangman} />} />
                    {/* <Route path="/signup" component={props => <SignUpForm />} /> */}
                    <Route path="/signup" component={SignUpForm} />
                    <Route path="/login" component={LoginForm} />
                </Switch>
            </BrowserRouter>
        )
    }
}
