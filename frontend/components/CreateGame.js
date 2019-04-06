import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import CreatableSelect from 'react-select/lib/Creatable';
import User, { CURRENT_USER_QUERY } from './User';
import Form from './styles/Form';
import Error from './ErrorMessage';


const ALL_GAMES_QUERY = gql`
    query ALL_GAMES_QUERY {
        games( 
            orderBy: name_ASC
        ) {
            id
            name
            characters {
                id
                name
            }
        }
    }
`;

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
        games: [],
        searchVariable: '',
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

    }

    render() {
        return(
            <User>
                {({data: {me}}) => (
                    <Form method="post">
                        <fieldset>
                            <h2>Add New Games and Characters</h2>
                                <Query query={ALL_GAMES_QUERY}>
                                    {({data: {games}}) => (
                                        <label htmlFor="gameName">Game:
                                            <CreatableSelect options={games.map((game) => {
                                                return {
                                                    label: game.name,
                                                    value: game.name
                                                }
                                            })} />
                                        </label>
                                    )}
                                </Query>
                        </fieldset>
                    </Form>
                )}
            </User>
        )
    }
}

export default CreateGame;