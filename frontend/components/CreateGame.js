import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import CreatableSelect from 'react-select/lib/Creatable';
import User, { CURRENT_USER_QUERY } from './User';
import Form from './styles/Form';
import Error from './ErrorMessage';
import { Columns } from '../pages/login';

const CREATE_GAME_MUTATION = gql`
    mutation CREATE_GAME_MUTATION(
        $gameName: String!
    ) {
        createGame(
            gameName: $gameName
        ) {
            id
            name
        }
    }
`;

class CreateGame extends Component {
    state = {
        gameName: '',
        characterList: []
    }

    changeGame = (e) => {
        const {value} = e;
        this.setState({
            gameName: value
        });
    }

    changeSearchable = (e) => {
        this.setState({
            searchVariable: e
        });
    }

    createCharacterList = (e) => {
        const characterList = e.target.value.split(/\n/);
        this.setState({
            characterList
        });
    }

    render() {
        return(
            <User>
                {({data: {me}}) => (
                    <>
                        <h2>Add New Games and Characters</h2>
                        <Form method="post">
                            <fieldset>
                                
                                <button type="submit">Add Game</button>
                            </fieldset>
                        </Form>
                    </>
                )}
            </User>
        )
    }
}

export default CreateGame;