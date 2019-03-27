import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Segment } from 'semantic-ui-react';
import {
    Navbar,
    Nav,
    NavItem,
    Alert,
    Badge,
} from 'reactstrap';
import HangmanGame from './HangmanGame';
import Settings from './Settings';
import axios from 'axios';


export default class Hangman extends React.Component {
    state = {
        isOpen: false,
        showUsername: ''
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }

    // doing this just for the "R" in CRUD to get username
    componentDidMount = () => {
        // const jwt = localStorage.getItem('me')
        const jwt = JSON.parse(localStorage.me)
        axios({
            method: 'GET',
            url: 'http://127.0.0.1:5000/api/v1/users/read',
            // url: 'https://hangman-flask-server.herokuapp.com/api/v1/users/read',
            headers: {
                Authorization: `Bearer ${jwt.auth_token}`,
            }
        })
            .then(result => {
                // console.log('component:', result)
                this.setState({
                    showUsername: result.data.username
                })
            })
            .catch(error => {
                console.log("ERROR:", error)
            })
    }

    render() {
        const { isOpen, showUsername } = this.state
        const { signedIn, signedUp } = this.props
        const styles = { textDecoration: "none", color: "white", cursor: "default" }
        return (
            <div>
                <div>
                    {isOpen ? <Settings isOpen={isOpen} toggle={this.toggle} logout={this.props.logout} /> : null}
                    {signedIn ? <Alert color="success">Welcome back {showUsername}! </Alert> : null}
                    {signedUp ? <Alert color="success">Hey! {showUsername} you've successfully signed up! You can start playing now! </Alert> : null}
                    <Navbar color="dark" light expand="md" >
                        <Nav className="ml-auto" navbar>
                            <NavItem className="mr-4">
                                <Link to="/" style={styles} >username: {showUsername}</Link>
                            </NavItem>
                            <NavItem className="mr-4">
                                <button onClick={this.toggle} >Setting</button>
                            </NavItem>
                            <NavItem className="mr-4">
                                <button onClick={this.props.logout}>Logout</button>
                            </NavItem>
                        </Nav>
                    </Navbar>
                </div>
                <div>
                    <Grid columns={2} style={{ marginTop: 0 }} >
                        <Grid.Row stretched>
                            <Grid.Column style={{ width: "20vw", marginLeft: "2vw" }}>
                                <Segment style={{ height: "95vh", display: "flex", flexDirection: "column" }}>
                                    <h1>Genre: </h1>
                                    <h1><Badge color="warning"> Recent Movies</Badge></h1>
                                </Segment>
                            </Grid.Column>
                            <Grid.Column style={{ width: "70vw" }}>
                                <Segment style={{ height: "95vh" }}>
                                    <HangmanGame />
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </div>
            </div >
        )
    }
}
