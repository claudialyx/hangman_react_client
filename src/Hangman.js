import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Segment } from 'semantic-ui-react';
import {
    Navbar,
    Nav,
    NavItem,
} from 'reactstrap';
import HangmanGame from './containers/HangmanGame';
import Settings from './Settings';
import axios from 'axios';

const jwt = localStorage.getItem('jwt')

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
    // componentDidMount = () => {
    //     axios({
    //         method: 'GET',
    //         url: 'http://127.0.0.1:5000/api/v1/users/read',
    //         headers: {
    //             Authorization: `Bearer ${jwt}`,
    //         }
    //     })
    //         .then(result => {
    //             console.log('component:', result)
    //             this.setState({
    //                 showUsername: result.data[0]['username']
    //             })
    //         })
    //         .catch(error => {
    //             console.log("ERROR:", error)
    //         })
    // }

    render() {
        // debugger
        const { isOpen } = this.state
        const styles = { textDecoration: "none", color: "black" }
        // var location = { pathname: '/settings' }
        return (
            <div>
                <div>
                    {jwt ? <h1>YAY LOGGED IN</h1> : <h1>NOT LOGGED IN</h1>}

                    {isOpen ? <Settings isOpen={isOpen} toggle={this.toggle} logout={this.props.logout} /> : null}
                    <Navbar color="light" light expand="md" >
                        <Nav className="ml-auto" navbar>
                            <NavItem className="mr-4">
                                <Link to="/" style={styles} >{this.state.showUsername}</Link>
                            </NavItem>
                            <NavItem className="mr-4">

                                <button onClick={this.toggle}>Setting</button>
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
                                    <div>Genre </div>
                                </Segment>
                            </Grid.Column>
                            <Grid.Column style={{ width: "70vw" }}>
                                <Segment style={{ height: "95vh" }}>
                                    <div>2 hangman here</div>
                                    <HangmanGame />
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </div>
            </div>
        )
    }
}
