import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import CreatableSelect from 'react-select/lib/Creatable';
import User, { CURRENT_USER_QUERY } from './User';
import Form from './styles/Form';
import Error from './ErrorMessage';
import { Columns } from '../pages/login';


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

const GAME_CHARACTERS_QUERY = gql`
    query GAME_CHARACTERS_QUERY($searchTerm: String!) {
        characters(
            where: {
                games_some: {
                    name: $searchTerm
                }
            }
        ) {
            id
            name
        }
    }
`

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

    }

    render() {
        return(
            <User>
                {({data: {me}}) => (
                    <Mutation mutation={CREATE_GAME_MUTATION} variables={{ gameName: this.state.gameName }} refetchQueries={[{
                        query: GAME_CHARACTERS_QUERY,
                        variables: {
                            searchTerm: this.state.gameName
                        }
                    }]}>
                        {(createGame, {loading, error}) => (
                            <Query query={ALL_GAMES_QUERY}>
                                {({data: {games}}) => (
                                    <Query query={GAME_CHARACTERS_QUERY} variables={{searchTerm: this.state.gameName}}>
                                        {({data: {characters}}) => (
                                            <>
                                                <h2>Add New Games and Characters</h2>
                                                <Form method="post">
                                                    <fieldset>
                                                        <label htmlFor="gameName">Game:
                                                        {console.log(games)}
                                                        {console.log(characters)}
                                                            <CreatableSelect options={games.map((game) => {
                                                                return {
                                                                    label: game.name,
                                                                    value: game.name
                                                                }
                                                            })} onChange={async (e) => {
                                                                const gameName = e.value;
                                                                await this.setState({
                                                                    gameName
                                                                });
                                                                const res = await createGame();
                                                            }} />
                                                        </label>
                                                    </fieldset>
                                                </Form>
                                            </>
                                        )}
                                    </Query>
                                )}
                            </Query>
                        )}
                    </Mutation>
                )}
            </User>
        )
    }
}

export default CreateGame;