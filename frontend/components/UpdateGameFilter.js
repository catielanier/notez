import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import User, { CURRENT_USER_QUERY } from './User';
import Form from './styles/Form';
import Error from './ErrorMessage';
import Select from 'react-select';
import {ALL_GAMES_QUERY} from './CreateCharacter';

const UPDATE_GAME_FILTER_MUTATION = gql`
    mutation UPDATE_GAME_FILTER_MUTATION(
        $name: String!
        $name_ja: String!
        $name_ko: String!
        $name_zh_CN: String!
        $name_zh_TW: String!
        $name_zh_HK: String!
        $id: ID!
        $games: [ID]!
        $isGlobal: Boolean!
    ) {
        updateGameFilter(
            name: $name
            name_ja: $name_ja
            name_ko: $name_ko
            name_zh_CN: $name_zh_CN
            name_zh_TW: $name_zh_TW
            name_zh_HK: $name_zh_HK
            games: $games
            id: $id
            isGlobal: $isGlobal
        ) {
            id
            name
            name_ja
            name_ko
            name_zh_CN
            name_zh_TW
            name_zh_HK
            isGlobal
            games {
                id
                name
            }
        }
    }
`;

const ALL_GAME_FILTERS_QUERY = gql`
    query ALL_GAME_FILTERS_QUERY {
        gameFilters(
            orderBy: name_ASC
        ) {
            id
            name
            name_ja
            name_ko
            name_zh_CN
            name_zh_HK
            name_zh_TW
            isGlobal
            games {
                id
                name
            }
        }
    }
`

class UpdateGameFilters extends Component {
    state = {
        name: '',
        name_ja: '',
        name_ko: '',
        name_zh_CN: '',
        name_zh_TW: '',
        name_zh_HK: '',
        games: [],
        id: '',
        isGlobal: false
    }

    changeState = (e, a) => {
        const value = e.value || e.target.value;
        const { name } = a || e.target;
        this.setState({
            [name]: value
        });
    }

    changeBoolean = (e) => {
        const isGlobal = e.target.checked;
        this.setState({
            isGlobal
        })
        if (isGlobal === true) {
            this.setState({
                games: []
            });
        }
    }

    addGame = (e, a) => {
        const {games} = this.state;
        const newGame = {
            id: e.value,
            name: e.label
        }

        games.push(newGame);
        this.setState({
            games
        });
    }

    render() {
        return(
            <User>
                {({data: {me}}) => (
                    <Query query={ALL_GAME_FILTERS_QUERY}>
                        {({data: {gameFilters}}) => (
                            <Query query={ALL_GAMES_QUERY}>
                                {({data: {games}}) => (
                                    <Mutation mutation={UPDATE_GAME_FILTER_MUTATION} variables={this.state}>
                                        {(updateGameFilter, {loading, error, called}) => (
                                            <>
                                                <h2>Update Game Filters</h2>
                                                <Form method="post" onSubmit={async (e) => {                                              
                                                    e.preventDefault();
                                                    const gameIds = [];
                                                    this.state.games.map(game => {
                                                        delete game.name
                                                        delete game.__typename
                                                        gameIds.push(game.id);
                                                    });

                                                    await this.setState({
                                                        games: gameIds
                                                    });

                                                    const res = await updateGameFilter();
                                                    console.log(res);
                                                    this.setState({
                                                        name: '',
                                                        name_ja: '',
                                                        name_ko: '',
                                                        name_zh_CN: '',
                                                        name_zh_TW: '',
                                                        name_zh_HK: '',
                                                        id: '',
                                                        games: [],
                                                        isGlobal: false
                                                    })
                                                }}>
                                                    <fieldset disabled={loading} aria-busy={loading}>
                                                        <Error error={error} />
                                                        {!error && !loading && called && <p>Character successfully updated.</p>}
                                                        <label htmlFor="id">
                                                            Select Filter:
                                                            <Select options={
                                                                gameFilters.map(filter => {
                                                                    return {
                                                                        label: filter.name,
                                                                        value: filter.id
                                                                    }
                                                                })
                                                            } name="id" onChange={async (e) => {
                                                                const {value} = e;
                                                                await this.setState({
                                                                    name: '',
                                                                    name_ja: '',
                                                                    name_ko: '',
                                                                    name_zh_CN: '',
                                                                    name_zh_TW: '',
                                                                    name_zh_HK: '',
                                                                    id: '',
                                                                    games: [],
                                                                    isGlobal: false
                                                                });
                                                                gameFilters.map(filter => {
                                                                    if (filter.id === value) {
                                                                        this.setState({
                                                                            ...filter,
                                                                            games: filter.games
                                                                        });
                                                                    }
                                                                });
                                                            }} />
                                                        </label>
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
                                                        <p>Current Game{this.state.games.length === 1 ? null : 's'}: {this.state.games.map(game => {
                                                            return (
                                                                <span>{game.name} &nbsp;</span>
                                                            )
                                                        })}</p>
                                                        <label htmlFor="game">
                                                            Add Game:
                                                            <Select name="game" onChange={this.addGame} options={games.map((game) => {
                                                                return {
                                                                    label: game.name,
                                                                    value: game.id
                                                                }
                                                            })} />
                                                        </label>
                                                        <button type="submit">Update Filter</button>
                                                    </fieldset>
                                                </Form>
                                            </>
                                        )}
                                    </Mutation>
                                )}
                            </Query>
                        )}
                    </Query>
                )}
            </User>
        )
    }
}

export default UpdateGameFilters;
export {ALL_GAME_FILTERS_QUERY};