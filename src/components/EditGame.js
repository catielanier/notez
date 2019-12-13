import React from "react";
import axios from "axios";
import Select from "react-select";
import {
  TextField,
  Button,
  Typography,
  Container,
  CircularProgress
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { getToken } from "../services/tokenService";
import localeSelect from "../services/localeSelect";
import {
  editGame,
  englishGame,
  japaneseGame,
  koreanGame,
  simplifiedGame,
  traditionalGame,
  cantoneseGame
} from "../data/locales";
import dbLocale from "../services/dbLocale";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  header: {
    textAlign: "center"
  },
  buttonRow: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(2)
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative"
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
});

class EditGame extends React.Component {
  state = {
    games: [],
    game: "",
    name: "",
    name_ja: "",
    name_ko: "",
    "name_zh-cn": "",
    "name_zh-tw": "",
    "name_zh-hk": "",
    loading: false,
    success: false,
    error: null
  };

  async componentDidMount() {
    await axios.get("/api/games").then(res => {
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
      this.setState({
        games
      });
    });
  }

  setGame = e => {
    const game = e.value;
    const { games } = this.state;
    const index = games.findIndex(x => x._id === game);
    const { name, name_ja, name_ko } = games[index];
    const name_cn = games[index]["name_zh-cn"];
    const name_tw = games[index]["name_zh-tw"];
    const name_hk = games[index]["name_zh-hk"];
    this.setState({
      game,
      name,
      name_ja,
      name_ko,
      "name_zh-cn": name_cn,
      "name_zh-tw": name_tw,
      "name_zh-hk": name_hk
    });
  };

  changeState = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  updateGame = async e => {
    e.preventDefault();
    this.setState({
      loading: true,
      error: null
    });
    const {
      name,
      name_ja,
      name_ko,
      "name_zh-cn": name_cn,
      "name_zh-tw": name_tw,
      "name_zh-hk": name_hk,
      game
    } = this.state;
    const { user } = this.props;
    const token = await getToken();
    try {
      const res = await axios.put(`/api/games/`, {
        data: {
          token,
          user,
          name,
          name_ja,
          name_ko,
          name_cn,
          name_tw,
          name_hk,
          game
        }
      });
      if (res) {
        this.setState({
          success: true,
          loading: false
        });
      }
    } catch (e) {
      this.setState({
        error: e.message,
        loading: false
      });
    }
  };

  render() {
    const { classes } = this.props;
    if (!this.props.user) {
      return <Redirect to="/" />;
    }
    return (
      <section>
        <Typography variant="h5" className={classes.header}>
          {localeSelect(this.props.language, editGame)}
        </Typography>
        <Container maxWidth="sm">
          <Select
            options={this.state.games.map(game => {
              return {
                label: dbLocale(this.props.language, game),
                value: game._id
              };
            })}
            onChange={this.setGame}
          />
          {this.state.game !== "" && (
            <form onSubmit={this.updateGame}>
              <TextField
                label={localeSelect(this.props.language, englishGame)}
                id="standard-name-required"
                value={this.state.name}
                name="name"
                onChange={this.changeState}
                fullWidth="true"
                placeholder="Game Title"
                required
              />
              <TextField
                label={localeSelect(this.props.language, japaneseGame)}
                value={this.state.name_ja}
                name="name_ja"
                onChange={this.changeState}
                fullWidth="true"
                placeholder="ゲームタイトル"
              />
              <TextField
                label={localeSelect(this.props.language, koreanGame)}
                value={this.state.name_ko}
                name="name_ko"
                onChange={this.changeState}
                fullWidth="true"
                placeholder="게임 제목"
              />
              <TextField
                label={localeSelect(this.props.language, simplifiedGame)}
                value={this.state["name_zh-cn"]}
                name="name_zh-cn"
                onChange={this.changeState}
                fullWidth="true"
                placeholder="电子游戏标题"
              />
              <TextField
                label={localeSelect(this.props.language, traditionalGame)}
                value={this.state["name_zh-tw"]}
                name="name_zh-tw"
                onChange={this.changeState}
                fullWidth="true"
                placeholder="電子遊戲標題"
              />
              <TextField
                label={localeSelect(this.props.language, cantoneseGame)}
                value={this.state["name_zh-hk"]}
                name="name_zh-hk"
                onChange={this.changeState}
                fullWidth="true"
                placeholder="電子遊戲標題"
              />
              <Container className={classes.buttonRow}>
                <div className={classes.wrapper}>
                  <Button
                    variant="contained"
                    type="submit"
                    color="primary"
                    disabled={this.state.loading}
                  >
                    {localeSelect(this.props.language, editGame)}
                  </Button>
                  {this.state.loading && (
                    <CircularProgress
                      size={20}
                      color="secondary"
                      className={classes.buttonProgress}
                    />
                  )}
                </div>
              </Container>
            </form>
          )}
        </Container>
      </section>
    );
  }
}

EditGame.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EditGame);
