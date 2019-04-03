import React, {Component} from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import Error from './ErrorMessage';

class RequestReset extends Component {
    state = {
        email: ''
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
                    <h2>Forgot your password?</h2>
                    <label htmlFor="email">
                        Email:
                        <input type="email" name="email" placeholder="Email address" value={this.state.email} onChange={this.changeState} />
                    </label>
                    <button type="submit">Request Reset</button>
                </fieldset>
            </Form>
        )
    }
}

export default RequestReset;