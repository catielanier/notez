import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import User from './User';
import Select from 'react-select';
import ReactSelectStyles from './styles/ReactSelectStyles';
import {ALL_GAMES_QUERY} from './CreateCharacter';
import {ALL_GAME_FILTERS_QUERY} from './UpdateGameFilter';

class Games extends Component {
    state = {
        game: '',
        yourCharacter: '',
        oppCharacter: '',
        filter: '',
        characters: [],
        filters: []
    }

    render() {
        return(
            <Query query={ALL_GAMES_QUERY}>
                {({data: {games}}) => (
                    <Query query={ALL_GAME_FILTERS_QUERY}>
                        {({data: {gameFilters}}) => (
                            <>
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
                                    })}/>
                                </label>
                                <label htmlFor="oppCharacter">
                                    Opponent's Character:
                                    <Select name="oppCharacter" styles={ReactSelectStyles} options={this.state.characters.map(character => {
                                        return {
                                            label: character.name,
                                            value: character.id
                                        }
                                    })}/>
                                </label>
                                <label htmlFor="filter">
                                    Filter By:
                                    <Select name="filter" styles={ReactSelectStyles} options={this.state.filters.map(filter => {
                                        return {
                                            label: filter.name,
                                            value: filter.id
                                        }
                                    })} />
                                </label>
                            </>
                        )}
                    </Query>
                )}
            </Query>
        )
    }
}

export default Games;