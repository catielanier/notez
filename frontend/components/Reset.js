import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import Error from './ErrorMessage';
import PropTypes from 'prop-types';

const RESET_MUTATION = gql`
    mutation RESET_MUTATION(
        $resetToken: String!
        $password: String!
        $verifyPassword: String!
    ) {
        resetPassword(
            resetToken: $resetToken
            password: $password
            verifyPassword: $verifyPassword
        ) {
            id
            email
            username
        }
    }
`;

class Reset extends Component {
    static propTypes = {
        resetToken: PropTypes.string.isRequired
    }
    state = {
        password: '',
        verifyPassword: '',
    }

    saveToState = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }
    
    render() {
        return(
            <Mutation mutation={RESET_MUTATION} variables={{
                resetToken: this.props.resetToken,
                password: this.state.password,
                verifyPassword: this.state.verifyPassword
            }}>
                {(resetPassword, { error, loading, called }) => {
                    return (
                        <Form method="post" onSubmit={async (e) => {
                            e.preventDefault();
                            const res =  await resetPassword();
                            console.log(res);
                            this.setState({
                                password: '',
                                verifyPassword: '',
                            })
                        }}>
                            <fieldset disabled={loading} aria-busy={loading}>
                                <h2>Reset your password</h2>
                                <Error error={error} />
                                <label htmlFor="password">
                                    Password
                                    <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.saveToState} />
                                </label>
                                <label htmlFor="verifyPassword">
                                    Confirm Password
                                    <input type="password" name="verifyPassword" placeholder="Confirm Password" value={this.state.verifyPassword} onChange={this.saveToState} />
                                </label>
                                <button type="submit">Reset</button>
                            </fieldset>
                        </Form>
                    )
                }}
            </Mutation>
        )
    }
}

export default Reset;