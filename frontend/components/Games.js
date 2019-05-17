import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Select from 'react-select';
import ReactSelectStyles from './styles/ReactSelectStyles';
import {ALL_GAMES_QUERY} from './CreateCharacter';
import {ALL_GAME_FILTERS_QUERY} from './UpdateGameFilter';
import Form from './styles/Form';
import Error from './ErrorMessage';

const Columns = styled.div`
    display: grid;
    grid-template-columns: 1.5fr 2fr;
    grid-gap: 20px;
`;

const NoteList = styled.div`
    display: grid;
    grid-template-columns: 12% 80% 8%;

    .filter {
        color: ${props => props.theme.action};
    }
`;

const USER_NOTES_QUERY = gql`
    query USER_NOTES_QUERY {
        me{
            id
            gameNotes {
                id
                game {
                    id
                    name
                }
                you {
                    id
                    name
                }
                opponent {
                    id
                    name
                }
                filter {
                    id
                    name
                }
                note
                createdAt
            }
        }
    }
`;

const CREATE_GAME_NOTE_MUTATION = gql`
    mutation CREATE_GAME_NOTE_MUTATION(
        $game: ID!
        $you: ID!
        $opponent: ID!
        $filter: ID!
        $note: String!
    ) {
        createGameNote(
            game: $game
            you: $you
            opponent: $opponent
            filter: $filter
            note: $note
        ) {
            id
            game {
                id
            }
            you {
                id
            }
            opponent {
                id
            }
            filter {
                id
            }
            note
            user {
                id
            }
        }
    }
`;

class Games extends Component {
    state = {
        game: '',
        you: '',
        opponent: '',
        filter: '',
        characters: [],
        filters: [],
        addFilter: '',
        note: ''
    }

    changeState = (e, a) => {
        const {value} = e.target || e;
        const {name} = a || e.target;
        console.log(name, value);
        this.setState({
            [name]: value
        });
    }

    render() {
        return(
            <Query query={USER_NOTES_QUERY}>
                {({data: {me: {gameNotes}}}) => (
                    <Query query={ALL_GAMES_QUERY}>
                        {({data: {games}}) => (
                            <Query query={ALL_GAME_FILTERS_QUERY}>
                                {({data: {gameFilters}}) => (
                                    <Mutation mutation={CREATE_GAME_NOTE_MUTATION} variables={{
                                        game: this.state.game,
                                        you: this.state.you,
                                        opponent: this.state.opponent,
                                        filter: this.state.addFilter,
                                        note: this.state.note
                                    }}>
                                        {(createGameNote, {loading, error, called}) => (
                                            <Columns>
                                            {console.log(gameNotes)}
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
                                                    <label htmlFor="you">
                                                        Your Character:
                                                        <Select name="you" styles={ReactSelectStyles} options={this.state.characters.map(character => {
                                                            return {
                                                                label: character.name,
                                                                value: character.id
                                                            }
                                                        })} onChange={this.changeState} />
                                                    </label>
                                                    <label htmlFor="opponent">
                                                        Opponent's Character:
                                                        <Select name="opponent" styles={ReactSelectStyles} options={this.state.characters.map(character => {
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
                                                    <NoteList>
                                                        {gameNotes.map(note => {
                                                            {note.game.id === this.state.game && note.you.id === this.state.you && note.opponent.id === this.state.opponent ? 
                                                                <>
                                                                    {console.log(note.note)}
                                                                    <div className="filter" key={note.id}>{note.filter.name}</div>
                                                                    <div>{note.note}</div>
                                                                    <div>Edit Delete</div>
                                                                </>
                                                                :
                                                                null
                                                            }
                                                        })}
                                                    </NoteList>
                                                    {this.state.game !== '' && this.state.you !== '' && this.state.opponent !== '' && (
                                                        <>
                                                            <Form method="post" onSubmit={async (e) => {
                                                                e.preventDefault();
                                                                const res = await createGameNote();
                                                                console.log(res);
                                                                this.setState({
                                                                    note: ''
                                                                });
                                                            }}>
                                                                <fieldset disabled={loading} aria-busy={loading}>
                                                                    <Error error={error} />
                                                                    {!error && !loading && called && <p>Successfully added to notes.</p>}
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
                                                        </>
                                                    )}
                                                </div>
                                            </Columns>
                                            )}
                                    </Mutation>
                                )}
                            </Query>
                        )}
                    </Query>
                )}
            </Query>
        )
    }
}

export default Games;
export {USER_NOTES_QUERY, Columns, NoteList};
