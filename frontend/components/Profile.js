import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import User, { CURRENT_USER_QUERY } from './User';
import Form from './styles/Form';
import Error from './ErrorMessage';

const CHANGE_PASSWORD_MUTATION = gql`
    mutation CHANGE_PASSWORD_MUTATION(
        $oldPassword: String!
        $newPassword: String!
        $verifyNewPassword: String!
    ) {
        changePassword(
            oldPassword: $oldPassword
            newPassword: $newPassword
            verifyNewPassword: $verifyNewPassword
        ) {
            id
            username
            email
        }
    }
`;

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
                    <Mutation mutation={CHANGE_PASSWORD_MUTATION} variables={this.state}>
                        {(changePassword, {loading, error, called}) => (
                            <Form method="post" onSubmit={async (e) => {
                                e.preventDefault();
                                const res = await changePassword();
                                console.log(res);
                                this.setState({
                                    oldPassword: '',
                                    newPassword: '',
                                    verifyNewPassword: ''
                                });
                            }}>
                                <fieldset disabled={loading} aria-busy={loading}>
                                    <h2>Change password</h2>
                                    <Error error={error} />
                                    {!error && !loading && called && <p>Your password has been changed.</p>}
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
                    </Mutation>
                )}
            </User>
        )
    }
}

export default Profile;