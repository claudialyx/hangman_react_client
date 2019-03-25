import React from 'react';
import { Button, Form, Grid } from 'semantic-ui-react';
import './App.css';
import { Route, Link, BrowserRouter } from 'react-router-dom';
import background from './just-waves.png';
import LoginForm from './LoginForm';
import Router from './Router';
import SignUpForm from './SignUpForm';
import Hangman from './Hangman';
import Testing from './Testing';

class App extends React.Component {
  state = {
    signedIn: false
  }

  UserSignedIn = () => {
    this.setState({
      signedIn: true
    })
  }

  render() {
    const { signedIn } = this.state
    return (
      // if not signed in, display sign in page, else display hangman board
      <div>
        {!signedIn ?
          <Testing signedIn={signedIn} UserSignedIn={this.UserSignedIn} />
          :
          <Hangman />
        }
      </div>
    )
  }
}
export default App;