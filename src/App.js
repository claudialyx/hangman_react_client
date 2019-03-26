import React from 'react';
import './App.css';
import Hangman from './Hangman';
import Testing from './Testing';
import Router from './Router';

const jwt = localStorage.getItem('jwt')

class App extends React.Component {
  state = {
    signedIn: false
  }

  userSignedIn = () => {
    this.setState({
      signedIn: true
    })
  }

  logout = () => {
    localStorage.removeItem('me');
    localStorage.removeItem('jwt');
    //forceupdate is to update that jwt is no longer in localStorage
    //somehow even with setState(will result in rerender) it wont detect that jwt is gone
    this.forceUpdate()
    // debugger
    this.setState({
      signedIn: false,
    })
    // setTimeout(this.hideLogoutMessage, 3000);
  }

  render() {
    const { signedIn } = this.state
    return (
      // if not signed in, display sign in page, else display hangman board
      <div>
        <div>
          {jwt ? <h1>LOGGED IN</h1> : <h1>NOT LOGGED IN</h1>}
          {/* if jwt exist, keep user signed in */}
          {signedIn ?
            <Hangman signedIn={signedIn} userSignedIn={this.userSignedIn} logout={this.logout} />
            :
            <Testing signedIn={signedIn} userSignedIn={this.userSignedIn} />
          }
        </div>
        <Router />
      </div>
    )
  }
}
export default App;