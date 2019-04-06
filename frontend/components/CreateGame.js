import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import AsyncCreatableSelect from 'react-select/lib/AsyncCreatable';
import User, { CURRENT_USER_QUERY } from './User';
import Form from './styles/Form';
import Error from './ErrorMessage';


const SEARCH_GAMES_QUERY = gql`
    query SEARCH_GAMES_QUERY(
        $searchTerm: String!
    ) {
        games(
            where: {
                name_contains: $searchTerm
            }
        ) {
            id
            name
        }
    }
`;

const promiseOptions = $searchTerm => {
    new Promise(resolve => {
        setTimeout(() => {
            resolve(SEARCH_GAMES_QUERY($searchTerm))
        }, 350);
    });
}

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
                            <Query asyncMode query={SEARCH_GAMES_QUERY} variables={{ $searchTerm: this.state.searchVariable }}>
                                {(data) => (
                                    <label htmlFor="gameName">
                                        {console.log(data)}
                                        Game:
                                        <AsyncCreatableSelect name="gameName" onInputChange={this.changeSearchable} onChange={this.changeGame} />
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