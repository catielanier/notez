import React, {Component} from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import Error from './ErrorMessage';

class Signup extends Component {
    state = {
        email: '',
        password: '',
        verifyPassword: '',
        userName: ''
    }
    
    changeState = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    render() {
        return(
            <Form method="post">
                <fieldset>
                    <h2>New User? Sign up here!</h2>
                    <label htmlFor="email">
                        Email:
                        <input type="email" name="email" placeholder="Email address" value={this.state.email} onChange={this.changeState} />
                    </label>
                    <label htmlFor="userName">
                        Username:
                        <input type="text" name="userName" placeholder="Username" value={this.state.userName} onChange={this.changeState} />
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
    }
}

export default Signup;