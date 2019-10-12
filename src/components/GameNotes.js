import React from "react";
import axios from "axios";
import { Container, Typography, Grid } from "@material-ui/core";
import Select from "react-select";

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

  render() {
    return (
      <section className="game-notes">
        <Container>
          <Typography variant="h5">Game Notes</Typography>
          <Grid container spacing={2}>
            <Grid md={6} xs={12}>
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
              />
              <Typography variant="h6">
                Choose your opponent's character:
              </Typography>
              <Select
                options={this.state.characters.map(character => {
                  return { label: character.name, value: character._id };
                })}
              />
              <Typography variant="h6">
                Choose your filter (optional):
              </Typography>
              <Select
                options={this.state.filters.map(filter => {
                  return { label: filter.name, value: filter._id };
                })}
              />
            </Grid>
            <Grid md={6} xs={12}></Grid>
          </Grid>
        </Container>
      </section>
    );
  }
}

export default GameNotes;
