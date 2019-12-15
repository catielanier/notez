import React from "react";
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
import localeSelect from "../services/localeSelect";
import {
  linkCharactersToGame,
  characterLinked,
  linkCharacters
} from "../data/locales";
import dbLocale from "../services/dbLocale";

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
    const index = this.state.games.findIndex(oneGame => oneGame._id === game);
    const { characters } = this.state.games[index];
    const selected = [];
    characters.forEach(character => {
      selected.push(character._id);
    });
    this.setState({
      game,
      selected
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
      selected.splice(index, 1);
      this.setState({
        selected
      });
    }
  };

  linkCharacters = async e => {
    e.preventDefault();
    this.setState({
      loading: true,
      error: null
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
        error: e.message
      });
    }
  };

  componentDidMount = async () => {
    try {
      const res = await axios.get("/api/games");
      const games = res.data.data;
      if (this.props.language === "ja") {
        games.sort((x, y) => {
          return x.name_ja.localeCompare(y.name_ja);
        });
      } else if (this.props.language === "ko") {
        games.sort((x, y) => {
          return x.name_ko.localeCompare(y.name_ko);
        });
      } else if (
        this.props.language === "zh-CN" ||
        this.props.language === "zh-TW" ||
        this.props.language === "zh-HK"
      ) {
        games.sort((x, y) => {
          return x["name_zh-cn"].localeCompare(y["name_zh-cn"]);
        });
      } else {
        games.sort((x, y) => {
          return x.name.localeCompare(y.name);
        });
      }
      const res2 = await axios.get("/api/characters");
      const characters = res2.data.data;
      if (this.props.language === "ja") {
        characters.sort((x, y) => {
          return x.name_ja.localeCompare(y.name_ja);
        });
      } else if (this.props.language === "ko") {
        characters.sort((x, y) => {
          return x.name_ko.localeCompare(y.name_ko);
        });
      } else if (
        this.props.language === "zh-CN" ||
        this.props.language === "zh-TW" ||
        this.props.language === "zh-HK"
      ) {
        characters.sort((x, y) => {
          return x["name_zh-cn"].localeCompare(y["name_zh-cn"]);
        });
      } else {
        characters.sort((x, y) => {
          return x.name.localeCompare(y.name);
        });
      }
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
          <Typography variant="h5">
            {localeSelect(this.props.language, linkCharactersToGame)}
          </Typography>
          {this.state.success && (
            <p>{localeSelect(this.props.language, characterLinked)}</p>
          )}
          <Select
            options={this.state.games.map(game => {
              return {
                label: dbLocale(this.props.language, game),
                value: game._id
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
                            checked={
                              this.state.selected.indexOf(character._id) !== -1
                            }
                          />
                        }
                        label={dbLocale(this.props.language, character)}
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
                {localeSelect(this.props.language, linkCharacters)}
              </Button>
            </>
          )}
        </Container>
      </section>
    );
  }
}

export default LinkCharacter;
