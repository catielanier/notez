import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Downshift, {resetIdCounter} from 'downshift';
import User, { CURRENT_USER_QUERY } from './User';
import Form from './styles/Form';
import Error from './ErrorMessage';

class CreateGame extends Component {
    state = {
        gameName: '',
        characterList: []
    }

    changeGame = (e) => {
        
    }

    createCharacterList = (e) => {

    }

    render() {
        return(
            <User>
                {({data: {me}}) => (
                    <Form method="post">
                        <fieldset>
                            <h2>Add New Games and Characters</h2>
                        </fieldset>
                    </Form>
                )}
            </User>
        )
    }
}

export default CreateGame;