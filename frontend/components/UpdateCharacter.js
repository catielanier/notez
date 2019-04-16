import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import User, { CURRENT_USER_QUERY } from './User';
import Form from './styles/Form';
import Error from './ErrorMessage';
import Select from 'react-select';
import {ALL_GAMES_QUERY} from './CreateCharacter';
import styled from 'styled-components';

const UPDATE_CHARACTER_MUTATION = gql`
    mutation UPDATE_CHARACTER_MUTATION(
        $name: String!
        $name_ja: String!
        $name_ko: String!
        $name_zh_CN: String!
        $name_zh_TW: String!
        $name_zh_HK: String!
        $id: ID!
        $games: [ID]!
    ) {
        updateCharacter(
            name: $name
            name_ja: $name_ja
            name_ko: $name_ko
            name_zh_CN: $name_zh_CN
            name_zh_TW: $name_zh_TW
            name_zh_HK: $name_zh_HK
            games: $games
            id: $id
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

const ALL_CHARACTERS_QUERY = gql`
    query ALL_CHARACTERS_QUERY {
        characters(
            orderBy: name_ASC
        ) {
            id
            name
            name_ja
            name_ko
            name_zh_CN
            name_zh_HK
            name_zh_TW
            games {
                id
                name
            }
        }
    }
`;

const Item = styled.span`
    padding: 2px 5px;
    background: ${props => props.theme.foreground};
    margin: 0 10px;
    a {
        color: ${props => props.theme.background};
    }
`;

class UpdateCharacter extends Component {
    state = {
        name: '',
        name_ja: '',
        name_ko: '',
        name_zh_CN: '',
        name_zh_TW: '',
        name_zh_HK: '',
        games: [],
        id: ''
    }

    changeState = (e, a) => {
        const value = e.value || e.target.value;
        const { name } = a || e.target;
        this.setState({
            [name]: value
        });
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

    deleteGame = (id) => {
        const {games} = this.state
        const index = games.findIndex(game => game.id === id);
        games.splice(index, 1);
        this.setState({
            games
        })
    }

    render() {
        return(
            <User>
                {({data: {me}}) => (
                    <Query query={ALL_CHARACTERS_QUERY}>
                        {({data: {characters}}) => (
                            <Query query={ALL_GAMES_QUERY}>
                                {({data: {games}}) => (
                                    <Mutation mutation={UPDATE_CHARACTER_MUTATION} variables={this.state}>
                                        {(updateCharacter, {loading, error, called}) => (
                                            <>
                                                <h2>Update Characters</h2>
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

                                                    const res = await updateCharacter();
                                                    console.log(res);
                                                    this.setState({
                                                        name: '',
                                                        name_ja: '',
                                                        name_ko: '',
                                                        name_zh_CN: '',
                                                        name_zh_TW: '',
                                                        name_zh_HK: '',
                                                        id: '',
                                                        games: []
                                                    })
                                                }}>
                                                    <fieldset disabled={loading} aria-busy={loading}>
                                                        <Error error={error} />
                                                        {!error && !loading && called && <p>Character successfully updated.</p>}
                                                        <label htmlFor="id">
                                                            Select Character:
                                                            <Select options={
                                                                characters.map(character => {
                                                                    return {
                                                                        label: character.name,
                                                                        value: character.id
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
                                                                    games: [],
                                                                    id: ''
                                                                });
                                                                characters.map(character => {
                                                                    if (character.id === value) {
                                                                        this.setState({
                                                                            ...character,
                                                                            games: character.games
                                                                        });
                                                                    }
                                                                });
                                                            }} />
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
                                                        <p>Current Game{this.state.games.length === 1 ? null : 's'}: {this.state.games.map(game => {
                                                            return (
                                                                <Item key={game.id}><a onClick={() => this.deleteGame(game.id)}>{game.name} &times;</a></Item>
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
                                                        <button type="submit">Update Character</button>
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

export default UpdateCharacter;
export {ALL_CHARACTERS_QUERY, Item};