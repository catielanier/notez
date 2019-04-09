import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import User, { CURRENT_USER_QUERY } from './User';
import Form from './styles/Form';
import Error from './ErrorMessage';

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
        name_zh_HK: ''
    }

    changeState = (e) => {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        })
    }

    render() {
        return(
            <User>
                {({data: {me}}) => (
                    <Mutation mutation={CREATE_GAME_MUTATION} variables={this.state}>
                    {(createGame, {loading, error, called}) => (
                        <>
                            <h2>Add New Games and Characters</h2>
                            <Form method="post" onSubmit={async (e) => {
                                e.preventDefault();
                                const res = await createGame();
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
                                    {!error && !loading && called && <p>Game successfully added.</p>}
                                    <label htmlFor="name">
                                        Game Name:
                                        <input type="text" name="name" value={this.state.name} onChange={this.changeState} placeholder="Game name" />
                                    </label>
                                    <label htmlFor="name_ja">
                                        日本語タイトル:
                                        <input type="text" name="name_ja" value={this.state.name_ja} onChange={this.changeState} placeholder="ゲームのタイトル" />
                                    </label>
                                    <label htmlFor="name_ko">
                                        한국어 제목:
                                        <input type="text" name="name_ko" value={this.state.name_ko} onChange={this.changeState} placeholder="게임 제목" />
                                    </label>
                                    <label htmlFor="name_zh_CN">
                                        简体中文标题：
                                        <input type="text" name="name_zh_CN" value={this.state.name_zh_CN} onChange={this.changeState} placeholder="游戏标题" />
                                    </label>
                                    <label htmlFor="name_zh_TW">
                                        繁體中文標題：
                                        <input type="text" name="name_zh_TW" value={this.state.name_zh_TW} onChange={this.changeState} placeholder="遊戲標題" />
                                    </label>
                                    <label htmlFor="name_zh_HK">
                                        廣東話標題：
                                        <input type="text" name="name_zh_HK" value={this.state.name_zh_HK} onChange={this.changeState} placeholder="遊戲標題" />
                                    </label>
                                    <button type="submit">Add Game</button>
                                </fieldset>
                            </Form>
                        </>
                    )}
                    </Mutation>
                )}
            </User>
        )
    }
}

export default CreateGame;