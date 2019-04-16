import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import User, { CURRENT_USER_QUERY } from './User';
import Form from './styles/Form';
import Error from './ErrorMessage';
import Select from 'react-select';
import { ALL_GAMES_QUERY } from './CreateCharacter';
import ReactSelectStyles from './styles/ReactSelectStyles';

const CREATE_GAME_FILTER_MUTATION = gql`
    mutation CREATE_GAME_FILTER_MUTATION(
        $name: String!
        $name_ja: String
        $name_ko: String
        $name_zh_CN: String
        $name_zh_TW: String
        $name_zh_HK: String
        $game: String
        $isGlobal: Boolean!
    ) {
        createGameFilter(
            name: $name
            name_ja: $name_ja
            name_ko: $name_ko
            name_zh_CN: $name_zh_CN
            name_zh_TW: $name_zh_TW
            name_zh_HK: $name_zh_HK
            game: $game
            isGlobal: $isGlobal
        ) {
            id
            name
            name_ja
            name_ko
            name_zh_CN
            name_zh_TW
            name_zh_HK
            games {
                id
                name
            }
        }
    }
`;

class CreateGameFilter extends Component {
    state = {
        name: '',
        name_ja: '',
        name_ko: '',
        name_zh_CN: '',
        name_zh_TW: '',
        name_zh_HK: '',
        game: '',
        isGlobal: false,
        storedGameValue: ''
    }

    changeBoolean = (e) => {
        const isGlobal = e.target.checked;
        this.setState({
            isGlobal
        })
        if (isGlobal === true) {
            this.setState({
                game: ''
            });
        }
        if (isGlobal === false) {
            this.setState({
                game: this.state.storedGameValue
            });
        }
    }

    changeState = (e, a) => {
        const value = e.value || e.target.value;
        const { name } = a || e.target;
        this.setState({
            [name]: value
        });

        if (name === 'game') {
            this.setState({
                storedGameValue: value
            });
        }
    }

    render() {
        return(
            <User>
                {({data: {me}}) => (
                    <Query query={ALL_GAMES_QUERY}>
                    {({data: {games}}) => (
                        <Mutation mutation={CREATE_GAME_FILTER_MUTATION} variables={this.state}>
                        {(createGameFilter, {loading, error, called}) => (
                            <>
                                <h2>Add New Game Filters</h2>
                                <Form method="post" onSubmit={async (e) => {
                                    e.preventDefault();
                                    const res = await createGameFilter();
                                    const storedGame = this.state.storedGameValue;
                                    delete this.state.storedGameValue;
                                    console.log(res);
                                    this.setState({
                                        name: '',
                                        name_ja: '',
                                        name_ko: '',
                                        name_zh_CN: '',
                                        name_zh_TW: '',
                                        name_zh_HK: ''
                                    });
                                    this.state.storedGameValue = storedGame;
                                }}>
                                    <fieldset disabled={loading} aria-busy={loading}>
                                        <Error error={error} />
                                        {!error && !loading && called && <p>Filter successfully created.</p>}
                                        <label htmlFor="name">
                                            Filter Name:
                                            <input type="text" name="name" value={this.state.name} onChange={this.changeState} placeholder="Filter name" />
                                        </label>
                                        <label htmlFor="name_ja">
                                            日本語の名前:
                                            <input type="text" name="name_ja" value={this.state.name_ja} onChange={this.changeState} placeholder="フィルター名" />
                                        </label>
                                        <label htmlFor="name_ko">
                                            한국어 이름:
                                            <input type="text" name="name_ko" value={this.state.name_ko} onChange={this.changeState} placeholder="필터 이름" />
                                        </label>
                                        <label htmlFor="name_zh_CN">
                                            简体中文名字：
                                            <input type="text" name="name_zh_CN" value={this.state.name_zh_CN} onChange={this.changeState} placeholder="过滤器名称" />
                                        </label>
                                        <label htmlFor="name_zh_TW">
                                            繁體中文名字：
                                            <input type="text" name="name_zh_TW" value={this.state.name_zh_TW} onChange={this.changeState} placeholder="過濾器名稱" />
                                        </label>
                                        <label htmlFor="name_zh_HK">
                                            廣東話名字：
                                            <input type="text" name="name_zh_HK" value={this.state.name_zh_HK} onChange={this.changeState} placeholder="過濾器名稱" />
                                        </label>
                                        <label htmlFor="isGlobal">
                                            The filter should be accessible across all games.
                                            <input type="checkbox" name="isGlobal" checked={this.state.isGlobal} onChange={this.changeBoolean} />
                                        </label>
                                        <label htmlFor="game">
                                            Principal Game:
                                            <Select name="game" isDisabled={this.state.isGlobal === true} onChange={this.changeState} styles={ReactSelectStyles} options={games.map((game) => {
                                                return {
                                                    label: game.name,
                                                    value: game.name
                                                }
                                            })} />
                                        </label>
                                        <button type="submit">Add Filter</button>
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

export default CreateGameFilter;