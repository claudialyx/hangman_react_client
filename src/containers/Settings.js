import React from 'react';
import { Button, Form, Checkbox, Message } from 'semantic-ui-react';
import { Modal, ModalHeader, ModalBody, Alert } from 'reactstrap';
import axios from 'axios';


export default class Settings extends React.Component {
    state = {
        email: '',
        username: '',
        password: '',
        update: false
    }

    emailInput = (event) => {
        this.setState({
            email: event.target.value,
        })
    }

    passwordInput = (event) => {
        this.setState({
            password: event.target.value,
        })
    }

    usernameInput = (event) => {
        this.setState({
            username: event.target.value,
        })
    }

    update = () => {
        this.setState({
            update: true,
        })
        setTimeout(this.hideUpdateMessage, 5000)
    }

    hideUpdateMessage = () => {
        this.setState({
            update: false
        })
    }

    handleUpdate = (event) => {
        event.preventDefault()
        const jwt = JSON.parse(localStorage.getItem('me'))
        console.log(jwt)
        console.log(jwt.auth_token)
        axios({
            method: 'POST',
            // url: 'http://127.0.0.1:5000/api/v1/users/update',
            url: 'https://hangman-flask-server.herokuapp.com/api/v1/users/update',
            data: {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
            },
            headers: {
                'Authorization': `Bearer ${jwt.auth_token}`
            }
        })
            .then(response => {
                console.log('update response:', response);
                this.update()
            })
            .catch(error => {
                console.log('ERROR', error)
                // // debugger
                // yet to do validation for update
                // this.setState({
                //     hasErrors: true,
                //     errors: error.response.data.message,
                // })
            })
    }

    handleDelete = (event) => {
        event.preventDefault()
        const jwt = localStorage.getItem('me')

        axios({
            method: 'POST',
            // url: 'http://127.0.0.1:5000/api/v1/users/delete',
            url: 'https://hangman-flask-server.herokuapp.com/api/v1/users/delete',
            data: {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
            },
            headers: {
                'Authorization': `Bearer ${jwt.auth_token}`
            }
        })
            .then(response => {
                console.log(response);
                this.props.logout()
            })
            .catch(error => {
                console.log('ERROR', error)
                // // debugger
                // this.setState({
                //     hasErrors: true,
                //     errors: error.response.data.message,
                // })
            })
    }

    render() {
        const { email, username, password, update } = this.state
        const { isOpen, toggle } = this.props
        return (
            <div>
                <Modal isOpen={isOpen} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Setting (Update user details)</ModalHeader>
                    <ModalBody>
                        {update ? <Alert color="primary">Successfully updated </Alert> : null}
                        <Form onSubmit={this.handleUpdate}>
                            <Form.Field>
                                <label>Username</label>
                                <input type="text" placeholder='Username' onChange={this.usernameInput} value={username} />
                            </Form.Field>
                            <Form.Field>
                                <label>Email</label>
                                <input type="email" placeholder='Email' onChange={this.emailInput} value={email} />
                            </Form.Field>
                            <Form.Field>
                                <label>Password</label>
                                <input type="password" placeholder='Password' onChange={this.passwordInput} value={password} />
                                <Button type="submit">Update</Button>
                            </Form.Field>
                        </Form>
                    </ModalBody >
                    <ModalHeader>Setting (Delete account)</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleDelete}>
                            <Form.Field>
                                <div>
                                    <p style={{ color: " red" }}> Deleting your account cannot be undone. Any personal identifiable information will be deleted and any in-progress data will be lost.</p>
                                    <Button type="submit">Delete</Button>
                                </div>
                            </Form.Field>
                        </Form>
                    </ModalBody >
                </Modal >
            </div>
        )
    }
}