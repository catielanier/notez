import React, {Component} from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import Error from './ErrorMessage';

const SIGNUP_MUTATION = gql`
    mutation SIGNUP_MUTATION(
        $email: String!
        $password: String!
        $verifyPassword: String!
        $username: String!
    ) {
        signup(
            email: $email
            password: $password
            verifyPassword: $verifyPassword
            username: $username
        ) {
            id
            email
            username
        }
    }
`;

class Signup extends Component {
    state = {
        email: '',
        password: '',
        verifyPassword: '',
        username: ''
    }
    
    changeState = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    render() {
        return(
            <Mutation mutation={SIGNUP_MUTATION} variables={this.state}>
                {(signup, {error, loading}) => {
                    return(
                        <Form method="post" onSubmit={async (e) => {
                            e.preventDefault();
                            const res = await signup();
                            console.log(res);
                            this.setState({
                                username: '',
                                email: '',
                                password: '',
                                verifyPassword: ''
                            });
                        }}>
                            <fieldset disabled={loading} aria-busy={loading}>
                                <h2>New User? Sign up here!</h2>
                                <Error error={error} />
                                <label htmlFor="email">
                                    Email:
                                    <input type="email" name="email" placeholder="Email address" value={this.state.email} onChange={this.changeState} />
                                </label>
                                <label htmlFor="username">
                                    Username:
                                    <input type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.changeState} />
                                </label>
                                <label htmlFor="password">
                                    Password:
                                    <input type="password" name="password" placeholder="Passowrd" value={this.state.password} onChange={this.changeState} />
                                </label>
                                <label htmlFor="verifyPassword">
                                    Verify password:
                                    <input type="password" name="verifyPassword" placeholder="Passowrd" value={this.state.verifyPassword} onChange={this.changeState} />
                                </label>
                                <button type="submit">Sign Up</button>
                            </fieldset>
                        </Form>
                    )
                }}
            </Mutation>
        )
    }
}

export default Signup;