import React, {Component} from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import Error from './ErrorMessage';

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
            <Form method="post">
                <fieldset>
                    <h2>Existing user? RTSD!</h2>
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
    }
}

export default Signin;