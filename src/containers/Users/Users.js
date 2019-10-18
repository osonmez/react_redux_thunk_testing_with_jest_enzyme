import React, { Component } from 'react';
import ListGroup from 'react-bootstrap/ListGroup'

import User from '../../components/User/User';
import Modal from '../../components/UI/Modal/Modal';
import UserForm from '../../components/UserForm/UserForm';
import UserInfo from '../../components/UserInfo/UserInfo';
import { testUserArray } from '../../shared/testData';

import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Button from 'react-bootstrap/Button';

class Users extends Component {

    state = {
        users: testUserArray,
        showModal: false,
        edit: false,
        selectedUser: null
    }

    showModalHandler = (user, isEdit = false) => {
        this.setState({ showModal: true, edit: isEdit, selectedUser: user });
    }

    closeHandler = () => {
        this.setState({ showModal: false, edit: false, selectedUser: null });
    }

    deleteHandler = (id) => {
        const updatedUsers = this.state.users.filter(user => user.id !== id);
        this.setState({ users: updatedUsers });
    }

    editHandler = (user) => {
        const updatedUsers = this.state.users.map(u => {
            if (u.id === this.state.selectedUser.id) {
                return {
                    id: u.id,
                    name: user.name,
                    username: user.username,
                    email: user.email,
                    address: {
                        street: user.street,
                        suite: user.suite,
                        city: user.city,
                        zipcode: user.zipcode
                    }
                }
            }
            return u;
        });
        console.log(updatedUsers);
        this.setState({ showModal: false, users: updatedUsers });
    }

    render() {

        let userList = null;
        let modalContent = null;

        if (this.state.selectedUser) {
            modalContent = this.state.edit ? <UserForm usr={this.state.selectedUser} submit={this.editHandler} /> : <UserInfo usr={this.state.selectedUser} />;
        }


        if (this.state.users) {
            userList = (<ListGroup data-test="users">
                {this.state.users.map(user => {
                    return (
                        <ListGroup.Item key={user.id} >
                            <User usr={user} />
                            <ButtonToolbar>
                                <Button variant="info" data-test="info-button" onClick={() => this.showModalHandler(user)}>Info</Button>
                                <Button variant="warning" data-test="edit-button" onClick={() => this.showModalHandler(user, true)}>Edit</Button>
                                <Button variant="danger" data-test="delete-button" onClick={() => this.deleteHandler(user.id)}>Delete</Button>
                            </ButtonToolbar>
                        </ListGroup.Item>);
                })}
            </ListGroup>);
        }

        return (
            <div>
                {<Modal title="User" show={this.state.showModal} handleClose={this.closeHandler} >
                    {modalContent}
                </Modal>}
                {userList}
            </div>);
    }
}

export default Users;