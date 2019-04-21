import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import User from './User';
import Select from 'react-select';
import ReactSelectStyles from './styles/ReactSelectStyles';
import {ALL_GAMES_QUERY} from './CreateCharacter';
import {ALL_GAME_FILTERS_QUERY} from './UpdateGameFilter';
import Form from './styles/Form'

const Columns = styled.div`
    display: grid;
    grid-template-columns: 1.5fr 2fr;
    grid-gap: 20px;
`;

const CREATE_GAME_NOTE_MUTATION = gql`
    mutation CREATE_GAME_NOTE_MUTATION(
        $game: ID!
        $yourCharacter: ID!
        $oppCharacter: ID!
        $filter: ID!
        $note: String!
    ) {
        createGameNote(
            game: $game
            yourCharacter: $yourCharacter
            oppCharacter: $oppCharacter
            filter: $filter
            note: $note
        ) {
            id
            game
            yourCharacter
            oppCharacter
            filter
            note
        }
    }
`

class Games extends Component {
    state = {
        game: '',
        yourCharacter: '',
        oppCharacter: '',
        filter: '',
        characters: [],
        filters: [],
        addFilter: '',
        note: ''
    }

    changeState = (e, a) => {
        const {value} = e;
        const {name} = a;
        this.setState({
            [name]: value
        });
    }

    render() {
        return(
            <Query query={ALL_GAMES_QUERY}>
                {({data: {games}}) => (
                    <Query query={ALL_GAME_FILTERS_QUERY}>
                        {({data: {gameFilters}}) => (
                            <Columns>
                                <div>
                                    <h2>Game Notes</h2>
                                    <label htmlFor="game">
                                        Select your game:
                                        <Select name="game" styles={ReactSelectStyles} options={games.map((game) => {
                                            return {
                                                label: game.name,
                                                value: game.id
                                            }
                                        })} onChange={(e) => {
                                            const {value} = e;
                                            games.map(async game => {
                                                if (game.id === value) {
                                                    await this.setState({
                                                        game: value,
                                                        characters: game.characters
                                                    });
                                                }
                                            });
                                            
                                            const filters = [];
                                            gameFilters.map(async filter => {
                                                if (filter.isGlobal === true) {
                                                    filters.push(filter)
                                                }
                                                
                                                filter.games.map(game => {
                                                    if (game.id === value) {
                                                        filters.push(filter);
                                                    }
                                                });
                                            });
                                            this.setState({
                                                filters
                                            });
                                        }} />
                                    </label>
                                    <label htmlFor="yourCharacter">
                                        Your Character:
                                        <Select name="yourCharacter" styles={ReactSelectStyles} options={this.state.characters.map(character => {
                                            return {
                                                label: character.name,
                                                value: character.id
                                            }
                                        })} onChange={this.changeState} />
                                    </label>
                                    <label htmlFor="oppCharacter">
                                        Opponent's Character:
                                        <Select name="oppCharacter" styles={ReactSelectStyles} options={this.state.characters.map(character => {
                                            return {
                                                label: character.name,
                                                value: character.id
                                            }
                                        })} onChange={this.changeState} />
                                    </label>
                                    <label htmlFor="filter">
                                        Filter By:
                                        <Select name="filter" styles={ReactSelectStyles} options={this.state.filters.map(filter => {
                                            return {
                                                label: filter.name,
                                                value: filter.id
                                            }
                                        })} onChange={this.changeState} />
                                    </label>
                                </div>
                                <div>
                                    {this.state.game !== '' && this.state.yourCharacter !== '' && this.state.oppCharacter !== '' && (
                                        <Form>
                                            <fieldset>
                                                <h3>Add New Note:</h3>
                                                <label htmlFor="addFilter">
                                                    Note Filter:
                                                    <Select name="addFilter" styles={ReactSelectStyles} options={this.state.filters.map(filter => {
                                                        return {
                                                            label: filter.name,
                                                            value: filter.id
                                                        }
                                                    })} onChange={this.changeState} placeholder="New note filter" />
                                                </label>
                                                <label htmlFor="note">
                                                    Note Text:
                                                    <textarea name="note" value={this.state.note} onChange={this.changeState} placeholder="Write your note text here." />
                                                </label>
                                                <button type="submit">Add Note</button>
                                            </fieldset>
                                        </Form>
                                    )}
                                </div>
                            </Columns>
                        )}
                    </Query>
                )}
            </Query>
        )
    }
}

export default Games;