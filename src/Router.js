import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Hangman from './Hangman';
import LoginForm from './containers/LoginForm';
import SignUpForm from './containers/SignUpForm';

export default class Router extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/hangman" component={Hangman} />
                    <Route path="/signup" component={SignUpForm} />
                    <Route path="/login" component={LoginForm} />
                </Switch>
            </BrowserRouter>
        )
    }
}
