import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Hangman from './containers/Hangman';
import LoginForm from './containers/LoginForm';

export default class Router extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/hangman" component={Hangman} />
                    <Route path="/login" component={LoginForm} />
                </Switch>
            </BrowserRouter>
        )
    }
}
