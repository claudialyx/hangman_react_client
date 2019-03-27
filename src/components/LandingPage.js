import React from 'react';
import { Grid } from 'semantic-ui-react';
import LoginForm from '../containers/LoginForm';
import SignUpForm from '../containers/SignUpForm';

export default class LandingPage extends React.Component {

    render() {
        const { clickSignUp, userSignedUp, userSignedIn, backToLogin, handleSignUp } = this.props
        return (
            // if not signed in, display login form  with option for sign up
            // if user click on sign up, then display sign up form 
            <div>
                <Grid columns={2} style={{ marginTop: 0 }}>
                    <Grid.Column style={{ width: "48vw", height: "100vh", marginLeft: "2vw" }}>
                        <LoginForm
                            handleSignUp={handleSignUp}
                            userSignedIn={userSignedIn}
                            clickSignUp={clickSignUp} />
                    </Grid.Column>

                    <Grid.Column style={{
                        width: "48vw", height: "100vh", marginRight: "2vw"
                    }}>
                        <SignUpForm
                            backToLogin={backToLogin}
                            userSignedIn={userSignedIn}
                            userSignedUp={userSignedUp}
                            handleSignUp={handleSignUp}
                            clickSignUp={clickSignUp} />
                    </Grid.Column>
                </Grid >
            </div>
        )
    }
}
