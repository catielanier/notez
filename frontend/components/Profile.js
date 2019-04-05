import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import User, { CURRENT_USER_QUERY } from './User';
import Form from './styles/Form';
import Error from './ErrorMessage';

class Profile extends Component {
    state = {
        oldPassword: '',
        newPassword: '',
        verifyNewPassword: ''
    }

    changeState = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    render() {
        return(
            <User>
                {({data: {me}}) => (
                    <Form>
                        <fieldset>
                            <h2>Change password</h2>
                            <label htmlFor="oldPassword">
                                Old Password:
                                <input type="password" value={this.state.oldPassword} name="oldPassword" placeholder="Old password" onChange={this.changeState}/>
                            </label>
                            <label htmlFor="newPassword">
                                New Password:
                                <input type="password" value={this.state.newPassword} name="newPassword" placeholder="New password" onChange={this.changeState}/>
                            </label>
                            <label htmlFor="verifyNewPassword">
                                Verify New Password:
                                <input type="password" value={this.state.verifyNewPassword} name="verifyNewPassword" placeholder="Verify new password" onChange={this.changeState}/>
                            </label>
                            <button type="submit">Change Password</button>
                        </fieldset>
                    </Form>
                )}
            </User>
        )
    }
}

export default Profile;