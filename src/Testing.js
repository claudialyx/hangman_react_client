import React from 'react';
import { Button, Form, Grid } from 'semantic-ui-react';
import { Route, Link, BrowserRouter } from 'react-router-dom';
import background from './just-waves.png';
import LoginForm from './containers/LoginForm';
import Router from './Router';
import SignUpForm from './containers/SignUpForm';

export default class Testing extends React.Component {
    state = {
        clickSignUp: false,
        signedUp: false
    }

    userSignedUp = () => {
        this.setState({
            signedUp: true
        })
    }

    handleSignUp = () => {
        this.setState({
            clickSignUp: true
        })
    }

    backToLogin = () => {
        this.setState({
            clickSignUp: false
        })
    }

    render() {
        const { handleSignUp, backToLogin } = this
        const { clickSignUp } = this.state
        return (
            // if not signed in, display login form  with option for sign up
            // if user click on sign up, then display sign up form 
            <div>
                <Grid columns={2} style={{ marginTop: 0 }}>
                    <Grid.Column style={{ width: "48vw", height: "100vh", marginLeft: "2vw" }}>
                        <LoginForm handleSignUp={handleSignUp} userSignedIn={this.props.userSignedIn} clickSignUp={clickSignUp} />
                    </Grid.Column>

                    <Grid.Column style={{
                        width: "48vw", height: "100vh", marginRight: "2vw"
                    }}>
                        <SignUpForm backToLogin={backToLogin} userSignedIn={this.props.userSignedIn} userSignedUp={this.userSignedUp} handleSignUp={handleSignUp} clickSignUp={clickSignUp} />
                    </Grid.Column>
                    {/* <Router /> */}
                </Grid >
            </div>
        )
    }
}
