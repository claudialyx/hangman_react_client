import React from 'react';
import './App.css';
import Hangman from './Hangman';
import LandingPage from './LandingPage';
import Router from './Router';
import {Alert} from 'reactstrap';

// const jwt = localStorage.getItem('jwt')

class App extends React.Component {
  state = {
    signedIn: false,
    clickSignUp: false,
    signedUp: false,
    delete:false,
  }

  userSignedIn = () => {
    this.setState({
      signedIn: true,
    })
    setTimeout(this.hideLoginMessage, 5000)
  }

  hideLoginMessage = () => {
    this.setState({
      signedIn: false
    })
  }

  userSignedUp = () => {
    this.setState({
      signedUp: true
    })
    setTimeout(this.hideSignupMessage, 5000)
  }

  hideSignupMessage = () => {
    this.setState({
      signedUp: false,
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

  logout = () => {
    localStorage.removeItem('me');
    // localStorage.removeItem('jwt');
    //forceupdate is to update that jwt is no longer in localStorage
    //somehow even with setState(will result in rerender) it wont detect that jwt is gone
    this.forceUpdate()
    // setTimeout(this.hideLogoutMessage, 3000);
  }

  render() {
    const { signedIn, clickSignUp, signedUp} = this.state
    const {userSignedUp, handleSignUp, backToLogin} = this
    return (
      // if not signed in, display sign in page, else display hangman board
      <div>
        <div>
          {/* if jwt exist, keep user signed in */}
          { this.state.delete ? <Alert color="danger">You've successfully deleted your account.</Alert> : null }
          {localStorage.me ?
            <Hangman 
              signedUp={signedUp} 
              signedIn={signedIn}
              userSignedIn={this.userSignedIn} 
              logout={this.logout} />
            :
            <LandingPage 
              userSignedUp={userSignedUp} 
              signedUp={signedUp} 
              handleSignUp={handleSignUp}
              backToLogin ={backToLogin}
              clickSignUp={clickSignUp}
              signedIn={signedIn} 
              userSignedIn={this.userSignedIn} />
          }
        </div>
        <Router />
      </div>
    )
  }
}
export default App;