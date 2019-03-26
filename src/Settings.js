import React from 'react';
import { Button, Form, Checkbox, Message } from 'semantic-ui-react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';


export default class Settings extends React.Component {
    state = {
        email: '',
        username: '',
        password: '',
        updateMessage: [],
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

    handleSubmit = (event) => {
        event.preventDefault()
        const jwt = localStorage.getItem('jwt')

        axios({
            method: 'POST',
            url: 'http://127.0.0.1:5000/api/v1/users/update',
            data: {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
            },
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        })
            .then(response => {
                console.log(response);
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

    handleDelete = (event) => {
        event.preventDefault()
        const jwt = localStorage.getItem('jwt')

        axios({
            method: 'POST',
            url: 'http://127.0.0.1:5000/api/v1/users/delete',
            data: {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
            },
            headers: {
                'Authorization': `Bearer ${jwt}`
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
        const { email, username, password } = this.state
        const { isOpen, toggle } = this.props
        return (
            <div>
                <Modal isOpen={isOpen} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Setting (Update user details)</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>
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