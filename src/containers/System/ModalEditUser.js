

import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from "../../utils/emitter"
import _ from 'lodash';
class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        }


    }


    componentDidMount() {
        console.log('didmout day la gt can tim this.state', this.state)
        let user = this.props.currentUser;
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: 'hashCode',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address
            })
        }

    }

    toggle = () => {
        this.props.toggleFromParent()
    }

    handleOnChangeInput = (event, id) => {

        //bad code
        // this.state[id] = event.target.value;
        // this.setState({
        //     ...this.state
        // }, () => {
        //     console.log('check state', this.state)

        // })
        //good code
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        }, () => {
            // console.log('check state', this.state)
        })
        // console.log('event 1', event.target.value, id)

    }
    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('thieu tham so ' + arrInput[i])
                break;
            }
        }
        return isValid;
    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === true) {
            console.log('check props', this.props)
            this.props.editUser(this.state);

        }

    }


    render() {
        console.log('gt cua state can tim la', this.state)
        return (
            <Modal isOpen={this.props.isOpen}// tắt mở ModalEditUser
                toggle={() => { this.toggle() }}
                className={'modal-user-container'}
                size="lg"
            >
                <ModalHeader toggle={() => { this.toggle() }}>Edit new user</ModalHeader>
                <ModalBody>
                    <div className="modal-user-body">

                        <div className="input-container">
                            <label>Email</label>
                            <input type="text"
                                onChange={(event) => { this.handleOnChangeInput(event, "email") }}
                                value={this.state.email}
                                disabled />
                        </div>
                        <div className="input-container">
                            <label>Password</label>
                            <input type="password" onChange={(event) => { this.handleOnChangeInput(event, "password") }}
                                value={this.state.password}
                                disabled />
                        </div>
                        <div className="input-container">
                            <label>First name</label>
                            <input type="text" onChange={(event) => { this.handleOnChangeInput(event, "firstName") }}
                                value={this.state.firstName} />
                        </div>
                        <div className="input-container">
                            <label>Last name</label>
                            <input type="text" onChange={(event) => { this.handleOnChangeInput(event, "lastName") }}
                                value={this.state.lastName} />
                        </div>
                        <div className="input-container max-width-input">
                            <label>Address</label>
                            <input type="text" onChange={(event) => { this.handleOnChangeInput(event, "address") }}
                                value={this.state.address} />
                        </div>

                    </div>




                </ModalBody>
                <ModalFooter>
                    <Button color="primary"
                        className="px-3"
                        onClick={() => { this.handleSaveUser() }}>Save change</Button>{' '}
                    <Button color="secodaray" className="px-3" onClick={() => { this.toggle() }}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
