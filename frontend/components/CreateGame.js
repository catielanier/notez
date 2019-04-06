import React, { Component } from 'react';
import { Query, Mutation, ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import Downshift, {resetIdCounter} from 'downshift';
import debounce from 'lodash.debounce';
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

class CreateGame extends Component {
    state = {
        gameName: '',
        games: [],
        characterList: []
    }

    onChange = debounce(async (e, client) => {
        console.log(`searching`);
        this.setState({
            loading: true
        })
        const res = await client.query({
            query: SEARCH_GAMES_QUERY,
            variables: { searchTerm: e.target.value}
        });
        const { games } = res.data;
        this.setState({
            games,
            loading: false
        });
    }, 350);

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