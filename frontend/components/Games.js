import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import User from './User';
import Select from 'react-select';
import ReactSelectStyles from './styles/ReactSelectStyles';
import {ALL_GAMES_QUERY} from './CreateCharacter';

class Games extends Component {
    state = {
        game: '',
        yourCharacter: '',
        oppCharacter: '',
        filter: '',
        characters: []
    }

    render() {
        return(
            <Query query={ALL_GAMES_QUERY}>
                {({data: {games}}) => (
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
                            }} />
                        </label>
                        <label htmlFor="yourCharacter">
                            Your Character:
                            <Select name="yourCharacter" styles={ReactSelectStyles} />
                        </label>
                        <label htmlFor="oppCharacter">
                            Opponent's Character:
                            <Select name="oppCharacter" styles={ReactSelectStyles} />
                        </label>
                        <label htmlFor="filter">
                            Filter By:
                            <Select name="filter" styles={ReactSelectStyles} />
                        </label>
                    </>
                )}
            </Query>
        )
    }
}

export default Games;