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
            characters
            filters
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
                    <Mutation mutation={CREATE_GAME_MUTATION} variables={{ gameName: this.state.gameName }}>
                        {(createGame, {loading, error}) => (
                            <Query query={ALL_GAMES_QUERY}>
                                {({data: {games}}) => (
                                    <>
                                        <h2>Add New Games and Characters</h2>
                                        <Form method="post">
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
                                                        console.log(this.state.gameName);
                                                        const res = await createGame();
                                                        console.log(res)
                                                    }} />
                                                </label>
                                                <Columns>
                                                    <div>
                                                        <label htmlFor="currentCharacters">
                                                            Current Characters:
                                                            <select name="currentCharacters" defaultValue="" disabled>
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
                                    </>
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
export {ALL_GAMES_QUERY};