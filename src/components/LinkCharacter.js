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
    const { characters: selected } = this.state.games[index];
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
          <Typography variant="h5">
            {this.props.language === "ja"
              ? "キャラクターをゲームに接続"
              : this.props.language === "ko"
              ? "캐릭터를 게임에 연결"
              : this.props.language === "zh-CN"
              ? "角色连接到游戏"
              : this.props.language === "zh-TW" ||
                this.props.language === "zh-HK"
              ? "角色連接到遊戲"
              : "Link Characters to Game"}
          </Typography>
          <Select
            options={
              this.props.language === "ja"
                ? this.state.games.map(game => {
                    return { label: game.name_ja, value: game._id };
                  })
                : this.props.language === "ko"
                ? this.state.games.map(game => {
                    return { label: game.name_ko, value: game._id };
                  })
                : this.props.language === "zh-CN"
                ? this.state.games.map(game => {
                    return {
                      label: game["name_zh-cn"],
                      value: game._id
                    };
                  })
                : this.props.language === "zh-TW"
                ? this.state.games.map(game => {
                    return {
                      label: game["name_zh-tw"],
                      value: game._id
                    };
                  })
                : this.props.language === "zh-HK"
                ? this.state.games.map(game => {
                    return {
                      label: game["name_zh-hk"],
                      value: game._id
                    };
                  })
                : this.state.games.map(game => {
                    return { label: game.name, value: game._id };
                  })
            }
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
                        label={
                          this.props.language === "ja"
                            ? character.name_ja
                            : this.props.language === "ko"
                            ? character.name_ko
                            : this.props.language === "zh-CN"
                            ? character["name_zh-cn"]
                            : this.props.language === "zh-TW"
                            ? character["name_zh-tw"]
                            : this.props.language === "zh-HK"
                            ? character["name_zh-tw"]
                            : character.name
                        }
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
                {this.props.language === "ja"
                  ? "キャラクターを接続"
                  : this.props.language === "ko"
                  ? "캐릭터를 연결"
                  : this.props.language === "zh-CN"
                  ? "连接角色"
                  : this.props.language === "zh-TW" ||
                    this.props.language === "zh-HK"
                  ? "連接角色"
                  : "Link Characters"}
              </Button>
            </>
          )}
        </Container>
      </section>
    );
  }
}

export default LinkCharacter;
