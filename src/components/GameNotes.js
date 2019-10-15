import React from "react";
import axios from "axios";
import { Container, Typography, Grid, Button } from "@material-ui/core";
import Select from "react-select";
import QuickAddGameNote from "./QuickAddGameNote";
import PopulateNotes from "./PopulateNotes";
import { getToken } from "../services/tokenService";

class GameNotes extends React.Component {
  state = {
    games: [],
    myCharacter: "",
    opponentCharacter: "",
    filter: "",
    characters: [],
    filters: [],
    allGameNotes: [],
    fullGameNotes: [],
    gameNotes: [],
    game: ""
  };

  async componentDidMount() {
    const { user } = this.props;
    const resUser = await axios.get(`/api/users/${user}`);
    const allGameNotes = resUser.data.data.gameNotes;
    const resGames = await axios.get("/api/games");
    const games = resGames.data.data;
    games.sort((x, y) => {
      return x.name.localeCompare(y.name);
    });
    this.setState({
      games,
      allGameNotes
    });
  }

  setGame = e => {
    const { value: game } = e;
    const index = this.state.games.findIndex(x => x._id === game);
    const { characters, filters } = this.state.games[index];
    this.setState({
      game,
      characters,
      filters
    });
  };

  setMyCharacter = e => {
    const myCharacter = e.value;
    const { opponentCharacter } = this.state;
    if (myCharacter !== "" && opponentCharacter !== "") {
      const fullGameNotes = [];
      this.state.allGameNotes.forEach(note => {
        if (note.myCharacter === myCharacter && note.universal) {
          fullGameNotes.push(note);
        }
      });
      this.state.allGameNotes.forEach(note => {
        if (
          note.myCharacter === myCharacter &&
          note.opponentCharacter === opponentCharacter
        ) {
          fullGameNotes.push(note);
        }
      });
      this.setState({
        fullGameNotes,
        gameNotes: fullGameNotes,
        myCharacter
      });
    } else {
      this.setState({
        myCharacter
      });
    }
  };

  setOpponentCharacter = e => {
    const opponentCharacter = e.value;
    const { myCharacter } = this.state;
    if (myCharacter !== "" && opponentCharacter !== "") {
      const fullGameNotes = [];
      this.state.allGameNotes.forEach(note => {
        if (note.myCharacter === myCharacter && note.universal) {
          fullGameNotes.push(note);
        }
      });
      this.state.allGameNotes.forEach(note => {
        if (
          note.myCharacter === myCharacter &&
          note.opponentCharacter === opponentCharacter
        ) {
          fullGameNotes.push(note);
        }
      });
      this.setState({
        fullGameNotes,
        gameNotes: fullGameNotes,
        opponentCharacter
      });
    } else {
      this.setState({
        opponentCharacter,
        fullGameNotes: []
      });
    }
  };

  setFilter = e => {
    const filter = e.value;
    const { myCharacter, opponentCharacter, fullGameNotes } = this.state;
    if (myCharacter !== "" && opponentCharacter !== "") {
      const gameNotes = [];
      fullGameNotes.forEach(note => {
        if (
          note.myCharacter === myCharacter &&
          note.universal &&
          note.filter._id === filter
        ) {
          gameNotes.push(note);
        }
      });
      fullGameNotes.forEach(note => {
        if (
          note.myCharacter === myCharacter &&
          note.opponentCharacter === opponentCharacter &&
          note.filter._id === filter
        ) {
          gameNotes.push(note);
        }
      });
      console.log(gameNotes);
      this.setState({
        filter,
        gameNotes
      });
    }
  };

  clearFilter = e => {
    e.preventDefault();
    const { fullGameNotes } = this.state;
    this.setState({
      gameNotes: fullGameNotes,
      filter: ""
    });
  };

  deleteNote = async id => {
    this.setState({
      loading: true
    });
    const { user } = this.props;
    const token = await getToken();
    const { allGameNotes, fullGameNotes, gameNotes } = this.state;
    try {
      const res = await axios({
        method: "DELETE",
        url: "/api/notes/game",
        data: {
          user,
          token,
          noteId: id
        }
      });
      if (res) {
        const index1 = allGameNotes.findIndex(note => note._id === id);
        const index2 = fullGameNotes.findIndex(note => note._id === id);
        const index3 = gameNotes.findIndex(note => note._id === id);
        allGameNotes.splice(index1, 1);
        fullGameNotes.splice(index2, 1);
        gameNotes.splice(index3, 1);
        this.setState({
          allGameNotes,
          fullGameNotes,
          gameNotes,
          loading: false
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  addToNotes = note => {
    const { gameNotes, allGameNotes, fullGameNotes } = this.state;
    if (note.universal === true) {
      gameNotes.unshift(note);
      allGameNotes.unshift(note);
      fullGameNotes.unshift(note);
    } else {
      gameNotes.push(note);
      allGameNotes.push(note);
      fullGameNotes.push(note);
    }
    this.setState({
      gameNotes,
      allGameNotes,
      fullGameNotes
    });
  };

  render() {
    return (
      <section className="game-notes">
        <Container>
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <Typography variant="h5">Game Notes</Typography>
              <Typography variant="h6">Choose a game:</Typography>
              <Select
                options={this.state.games.map(game => {
                  return { label: game.name, value: game._id };
                })}
                onChange={this.setGame}
              />
              <Typography variant="h6">Choose your character:</Typography>
              <Select
                options={this.state.characters.map(character => {
                  return { label: character.name, value: character._id };
                })}
                onChange={this.setMyCharacter}
              />
              <Typography variant="h6">
                Choose your opponent's character:
              </Typography>
              <Select
                options={this.state.characters.map(character => {
                  return { label: character.name, value: character._id };
                })}
                onChange={this.setOpponentCharacter}
              />
              <Typography variant="h6">
                Choose your filter (optional):
              </Typography>
              <Select
                options={this.state.filters.map(filter => {
                  return { label: filter.name, value: filter._id };
                })}
                disabled={
                  this.state.myCharacter === "" &&
                  this.state.opponentCharacter === ""
                }
                onChange={this.setFilter}
              />
              {this.state.filter !== "" && (
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={this.clearFilter}
                >
                  Clear Filter
                </Button>
              )}
            </Grid>
            <Grid item md={6} xs={12}>
              {this.state.game !== "" &&
                this.state.myCharacter !== "" &&
                this.state.opponentCharacter !== "" && (
                  <Container>
                    <Typography variant="h5">Notes:</Typography>
                    <Grid container>
                      {this.state.gameNotes.length > 0 ? (
                        this.state.gameNotes.map(note => {
                          return (
                            <PopulateNotes
                              key={note._id}
                              id={note._id}
                              note={note.note}
                              filter={note.filter.name}
                              deleteNote={this.deleteNote}
                            />
                          );
                        })
                      ) : (
                        <PopulateNotes
                          filter="Notice"
                          note="You do not have any notes for this matchup. Add some below!"
                        />
                      )}
                    </Grid>
                    <QuickAddGameNote
                      user={this.props.user}
                      game={this.state.game}
                      myCharacter={this.state.myCharacter}
                      opponentCharacter={this.state.opponentCharacter}
                      filters={this.state.filters}
                    />
                  </Container>
                )}
            </Grid>
          </Grid>
        </Container>
      </section>
    );
  }
}

export default GameNotes;
