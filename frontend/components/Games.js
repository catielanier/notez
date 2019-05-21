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
    grid-template-columns: 2fr 7fr 3fr;
    grid-gap: 10px;
    padding-bottom: 25px;

    .filter {
        color: ${props => props.theme.action};
    }

    div img {
        width: 25px;

        &:first-of-type {
            padding-right: 10px;
        }
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

const GAME_NOTES_QUERY = gql`
    query GAME_NOTES_QUERY(
        $game: ID!
        $you: ID!
        $opponent: ID!
        $filter: ID!
    ) {
        gameNotes( 
            orderBy: createdAt_DESC
            where: {
                game: $game
                you: $you
                opponent: $opponent
                filter: $filter
            }
        )
    }
`

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
                name
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
        game: null,
        you: null,
        opponent: null,
        filter: null,
        characters: [],
        filters: [],
        addFilter: '',
        note: '',
        notes: []
    }

    changeState = async (e, a) => {
        const {value} = e.target || e;
        const {name} = a || e.target;
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
                                    }} refetchQueries={
                                        [{
                                            query: USER_NOTES_QUERY
                                        }]
                                    }>
                                        {(createGameNote, {loading, error, called}) => (
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
                                                    <label htmlFor="you">
                                                        Your Character:
                                                        <Select name="you" styles={ReactSelectStyles} options={this.state.characters.map(character => {
                                                            return {
                                                                label: character.name,
                                                                value: character.id
                                                            }
                                                        })} onChange={async (e, a) => {
                                                            const you = e.value;
                                                            const {opponent, game} = this.state;
                                                            const notes = [];
                                                            this.changeState(e, a);
                                                            if (opponent !== undefined && opponent !== null) {
                                                                gameNotes.map(note => {
                                                                    if (note.you.id === you && note.opponent.id === opponent && note.game.id === game) {
                                                                        notes.push(note);
                                                                    }
                                                                });
                                                                this.setState({
                                                                    notes
                                                                })
                                                            }
                                                        }} />
                                                    </label>
                                                    <label htmlFor="opponent">
                                                        Opponent's Character:
                                                        <Select name="opponent" styles={ReactSelectStyles} options={this.state.characters.map(character => {
                                                            return {
                                                                label: character.name,
                                                                value: character.id
                                                            }
                                                        })} onChange={async (e, a) => {
                                                            const {you, game} = this.state;
                                                            const opponent = e.value;
                                                            const notes = [];
                                                            this.changeState(e, a);
                                                            if (you !== undefined && opponent !== null) {
                                                                gameNotes.map(note => {
                                                                    if (note.you.id === you && note.opponent.id === opponent && note.game.id === game) {
                                                                        notes.push(note);
                                                                    }
                                                                });
                                                                this.setState({
                                                                    notes
                                                                });
                                                            }
                                                        }} />
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
                                                        {this.state.notes.map(note => (
                                                                <>
                                                                    {console.log(note.note)}
                                                                    <div className="filter" key={note.id}>{note.filter.name}</div>
                                                                    <div>{note.note}</div>
                                                                    <div><img src="/static/edit.png" alt="Edit"/> Delete</div>
                                                                </>
                                                        ))}
                                                    </NoteList>
                                                    {this.state.game !== '' && this.state.you !== '' && this.state.opponent !== '' && (
                                                        <>
                                                            <Form method="post" onSubmit={async (e) => {
                                                                e.preventDefault();
                                                                const res = await createGameNote();
                                                                this.setState({
                                                                    note: ''
                                                                });
                                                                const formattedNote = res.data.createGameNote;
                                                                this.state.notes.push(formattedNote);
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
