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
        $name: String!
        $name_ja: String!
        $name_ko: String!
        $name_zh_CN: String!
        $name_zh_TW: String!
        $name_zh_HK: String!
    ) {
        createGame(
            name: $name
            name_ja: $name_ja
            name_ko: $name_ko
            name_zh_CN: $name_zh_CN
            name_zh_TW: $name_zh_TW
            name_zh_HK: $name_zh_HK
        ) {
            id
            name
            name_ja
            name_ko
            name_zh_CN
            name_zh_TW
            name_zh_HK
        }
    }
`;

class CreateGame extends Component {
    state = {
        name: '',
        name_ja: '',
        name_ko: '',
        name_zh_CN: '',
        name_zh_TW: '',
        name_zh_HK: '',
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