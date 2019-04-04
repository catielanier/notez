import React, {Component} from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import Error from './ErrorMessage';

const SIGNIN_MUTATION = gql`
    mutation SIGNIN_MUTATION(
        $email: String!
        $password: String!
    ) {
        signin(
            email: $email
            password: $password
        ) {
            id
            username
            email
        }
    }
`

class Signin extends Component {
    state = {
        email: '',
        password: ''
    }
    
    changeState = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    render() {
        return(
            <Mutation mutation={SIGNIN_MUTATION} variables={this.state}>
                {(signin, {error, loading}) => {
                    return (
                        <Form method="post" onSubmit={async (e) => {
                            e.preventDefault();
                            const res = await signin();
                            console.log(res);
                            this.setState({
                                email: '',
                                password: ''
                            })
                        }}>
                            <fieldset disabled={loading} aria-busy={loading}>
                                <h2>Existing user? RTSD!</h2>
                                <Error error={error} />
                                <label htmlFor="email">
                                    Email:
                                    <input type="email" name="email" placeholder="Email address" value={this.state.email} onChange={this.changeState} />
                                </label>
                                <label htmlFor="password">
                                    Password:
                                    <input type="password" name="password" placeholder="Passowrd" value={this.state.password} onChange={this.changeState} />
                                </label>
                                <button type="submit">Sign In</button>
                            </fieldset>
                        </Form>
                    )
                }}
            </Mutation>
        )
    }
}

export default Signin;