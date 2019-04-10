import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import User, { CURRENT_USER_QUERY } from './User';
import Form from './styles/Form';
import Error from './ErrorMessage';
import Select from 'react-select';
import {ALL_GAMES_QUERY} from './CreateCharacter';

const UPDATE_CHARACTER_MUTATION = gql`
    mutation UPDATE_GAME_MUTATION(
        $name: String
        $name_ja: String
        $name_ko: String
        $name_zh_CN: String
        $name_zh_TW: String
        $name_zh_HK: String
        $game: String!
    ) {
        updateGame(
            name: $name
            name_ja: $name_ja
            name_ko: $name_ko
            name_zh_CN: $name_zh_CN
            name_zh_TW: $name_zh_TW
            name_zh_HK: $name_zh_HK
            game: $game
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

class CreateCharacter extends Component {
    state = {
        name: '',
        name_ja: '',
        name_ko: '',
        name_zh_CN: '',
        name_zh_TW: '',
        name_zh_HK: '',
        game: ''
    }

    changeState = (e, a) => {
        const value = e.value || e.target.value;
        const { name } = a || e.target;
        this.setState({
            [name]: value
        });
    }

    render() {
        return(
            <User>
                {({data: {me}}) => (
                    <Query query={ALL_GAMES_QUERY}>
                    {({data: {games}}) => (
                        <Mutation mutation={CREATE_CHARACTER_MUTATION} variables={this.state}>
                        {(createCharacter, {loading, error, called}) => (
                            <>
                                <h2>Add New Characters</h2>
                                <Form method="post" onSubmit={async (e) => {
                                    e.preventDefault();
                                    const res = await createCharacter();
                                    console.log(res);
                                    this.setState({
                                        name: '',
                                        name_ja: '',
                                        name_ko: '',
                                        name_zh_CN: '',
                                        name_zh_TW: '',
                                        name_zh_HK: ''
                                    })
                                }}>
                                    <fieldset disabled={loading} aria-busy={loading}>
                                        <Error error={error} />
                                        {!error && !loading && called && <p>Character successfully created.</p>}
                                        <label htmlFor="game">
                                            Principal Game:
                                            <Select name="game" onChange={this.changeState} options={games.map((game) => {
                                                return {
                                                    label: game.name,
                                                    value: game.name
                                                }
                                            })} />
                                        </label>
                                        <label htmlFor="name">
                                            Character Name:
                                            <input type="text" name="name" value={this.state.name} onChange={this.changeState} placeholder="Character name" />
                                        </label>
                                        <label htmlFor="name_ja">
                                            日本語の名前:
                                            <input type="text" name="name_ja" value={this.state.name_ja} onChange={this.changeState} placeholder="キャラクター名" />
                                        </label>
                                        <label htmlFor="name_ko">
                                            한국어 이름:
                                            <input type="text" name="name_ko" value={this.state.name_ko} onChange={this.changeState} placeholder="캐릭터 이름" />
                                        </label>
                                        <label htmlFor="name_zh_CN">
                                            简体中文名字：
                                            <input type="text" name="name_zh_CN" value={this.state.name_zh_CN} onChange={this.changeState} placeholder="角色名字" />
                                        </label>
                                        <label htmlFor="name_zh_TW">
                                            繁體中文名字：
                                            <input type="text" name="name_zh_TW" value={this.state.name_zh_TW} onChange={this.changeState} placeholder="角色名字" />
                                        </label>
                                        <label htmlFor="name_zh_HK">
                                            廣東話名字：
                                            <input type="text" name="name_zh_HK" value={this.state.name_zh_HK} onChange={this.changeState} placeholder="角色名字" />
                                        </label>
                                        <button type="submit">Add Character</button>
                                    </fieldset>
                                </Form>
                            </>
                        )}
                        </Mutation>
                    )}
                    </Query>
                )}
            </User>
        )
    }
}

export default CreateCharacter;
export { ALL_GAMES_QUERY };