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
            orderBy: name_ASC
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

const CREATE_CHARACTER_MUTATION = gql`
    mutation CREATE_CHARACTER_MUTATION(
        $characterList: [String!]!
        $gameName: String!
    ) {
        createCharacter(
            characterList: $characterList
            gameName: $gameName
        ) {
            id
            name
            games {
                name
            }
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
                    <Mutation mutation={CREATE_GAME_MUTATION} variables={{ gameName: this.state.gameName }} refetchQueries={[{
                        query: GAME_CHARACTERS_QUERY,
                        variables: {
                            searchTerm: this.state.gameName
                        }
                    }]}>
                        {(createGame) => (
                            <Query query={ALL_GAMES_QUERY}>
                                {({data: {games}}) => (
                                    <Query query={GAME_CHARACTERS_QUERY} variables={{searchTerm: this.state.gameName}}>
                                        {({data: {characters}}) => (
                                            <>
                                                <h2>Add New Games and Characters</h2>
                                                <Mutation mutation={CREATE_CHARACTER_MUTATION} variables={this.state} refetchQueries={[{
                                                    query: GAME_CHARACTERS_QUERY,
                                                    variables: {
                                                        searchTerm: this.state.gameName
                                                    }
                                                }]}>
                                                    {(createCharacter, {loading, error}) => (
                                                        <Form method="post" onSubmit={async (e) => {
                                                            e.preventDefault();
                                                            const res = await createCharacter();
                                                            console.log(res);
                                                            this.setState({
                                                                characterList: []
                                                            });
                                                        }}>
                                                            <fieldset disabled={loading} aria-busy={loading}>
                                                                <label htmlFor="gameName">Game:
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
                                                                <Columns>
                                                                    <div>
                                                                        <label htmlFor="currentCharacters">
                                                                            Current Characters:
                                                                            <select name="currentCharacters" size={characters.length} defaultValue="" disabled>
                                                                                {characters.map(character => (
                                                                                    <option value={character.name} key={character.id}>{character.name}</option>
                                                                                    ))}
                                                                            </select>
                                                                        </label>
                                                                    </div>
                                                                    <div>
                                                                        <label htmlFor="characterList">
                                                                            New Characters:
                                                                            <textarea name="characterList" onChange={this.createCharacterList} rows={this.state.characterList.length || 1}></textarea>
                                                                        </label>
                                                                    </div>
                                                                </Columns>
                                                                <button type="submit">Add characters</button>
                                                            </fieldset>
                                                        </Form>
                                                    )}
                                                </Mutation>
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
export {ALL_GAMES_QUERY, GAME_CHARACTERS_QUERY};