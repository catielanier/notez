import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Container,
  Typography,
  Grid,
  Checkbox,
  FormControlLabel,
  Button
} from "@material-ui/core";
import axios from "axios";
import Select from "react-select";
import { getToken } from "../services/tokenService";

class LinkCharacter extends React.Component {
  state = {
    games: [],
    game: "",
    characters: [],
    selected: [],
    loading: false,
    success: false,
    error: null
  };

  pickGame = e => {
    const game = e.value;
    console.log(e.value);
    this.setState({
      game
    });
  };

  handleCharacters = e => {
    const character = e.target.value;
    const { selected } = this.state;
    const index = selected.indexOf(character);
    if (index === -1) {
      selected.push(character);
      this.setState({
        selected
      });
    } else {
      selected.splice(character, 1);
      this.setState({
        selected
      });
    }
  };

  linkCharacters = async e => {
    e.preventDefault();
    this.setState({
      loading: true
    });
    const token = await getToken();
    const { user } = this.props;
    const { game, selected: characters } = this.state;
    try {
      const res = await axios.put(`/api/games/${game}/character`, {
        user,
        token,
        characters,
        game
      });
      console.log(res);
      this.setState({
        loading: false,
        success: true
      });
    } catch (e) {
      this.setState({
        loading: false,
        error: e
      });
    }
  };

  componentDidMount = async () => {
    try {
      const res = await axios.get("/api/games");
      const games = res.data.data;
      const res2 = await axios.get("/api/characters");
      const characters = res2.data.data;
      characters.sort(function(x, y) {
        return x.name.localeCompare(y.name);
      });
      this.setState({
        games,
        characters
      });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <section className="link-character">
        <Container maxWidth="sm">
          <Typography variant="h5">Link Characters to Game</Typography>
          <Select
            options={this.state.games.map(game => {
              return {
                value: game._id,
                label: game.name
              };
            })}
            onChange={this.pickGame}
          />
        </Container>
        <Container maxWidth="md">
          {this.state.game !== "" && (
            <>
              <Grid container spacing={2}>
                {this.state.characters.map((character, index) => {
                  return (
                    <Grid item key={index} md={3} sm={4} xs={6}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            value={character._id}
                            onChange={this.handleCharacters}
                            color="primary"
                          />
                        }
                        label={character.name}
                      />
                    </Grid>
                  );
                })}
              </Grid>
              <Button
                variant="contained"
                color="primary"
                onClick={this.linkCharacters}
              >
                Link Characters
              </Button>
            </>
          )}
        </Container>
      </section>
    );
  }
}

export default LinkCharacter;
