import React from "react";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {
  TextField,
  Button,
  Typography,
  Container,
  CircularProgress
} from "@material-ui/core";
import { getToken } from "../services/tokenService";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  button: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(2)
  },
  header: {
    textAlign: "center"
  },
  buttonRow: {
    alignItems: "center"
  }
});

class AddGame extends React.Component {
  state = {
    name: "",
    name_ja: "",
    name_ko: "",
    "name_zh-cn": "",
    "name_zh-tw": "",
    "name_zh-hk": ""
  };
  changeState = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
  addGame = async e => {
    e.preventDefault();
    this.setState({
      loading: true
    });
    const {
      name,
      name_ja,
      name_ko,
      "name_zh-cn": name_cn,
      "name_zh-tw": name_tw,
      "name_zh-hk": name_hk
    } = this.state;
    const { user } = this.props;
    const token = await getToken();
    const game = {
      name,
      name_ja,
      name_ko,
      "name_zh-cn": name_cn,
      "name_zh-tw": name_tw,
      "name_zh-hk": name_hk
    };
    for (let x in game) {
      if (game[x].length === 0) {
        delete game[x];
      }
    }
    try {
      const res = await axios.post("/api/games/new", {
        user,
        token,
        game
      });
      if (res) {
        this.setState({
          success: true,
          loading: false
        });
      }
    } catch (e) {
      this.setState({
        error: e,
        loading: false
      });
    }
  };
  render() {
    const { classes } = this.props;
    return (
      <section className="add-game">
        <Typography className={classes.header} variant="h5">
          Add Games
        </Typography>
        <form onSubmit={this.addGame} disabled={this.state.loading}>
          <Container maxWidth="sm">
            {this.state.success && <p>Game created successfully.</p>}
            {this.state.error && (
              <p className="error">
                <span>Error:</span> {this.state.error}
              </p>
            )}
            <TextField
              label="English Game Title"
              id="standard-name-required"
              value={this.state.name}
              name="name"
              onChange={this.changeState}
              fullWidth="true"
              placeholder="Game Title"
              required
            />
            <TextField
              label="Japanese Game Title"
              value={this.state.name}
              name="name_ja"
              onChange={this.changeState}
              fullWidth="true"
              placeholder="ゲームタイトル"
            />
            <TextField
              label="Korean Game Title"
              value={this.state.name_ko}
              name="name_ko"
              onChange={this.changeState}
              fullWidth="true"
              placeholder="게임 제목"
            />
            <TextField
              label="Mandarin (Simplified) Game Title"
              value={this.state["name_zh-cn"]}
              name="name_zh-cn"
              onChange={this.changeState}
              fullWidth="true"
              placeholder="电子游戏标题"
            />
            <TextField
              label="Mandarin (Traditional) Game Title"
              value={this.state["name_zh-tw"]}
              name="name_zh-tw"
              onChange={this.changeState}
              fullWidth="true"
              placeholder="電子遊戲標題"
            />
            <TextField
              label="Cantonese Game Title"
              value={this.state["name_zh-hk"]}
              name="name_zh-hk"
              onChange={this.changeState}
              fullWidth="true"
              placeholder="電子遊戲標題"
            />
            <Button
              color="primary"
              variant="contained"
              className={classes.button}
              type="submit"
            >
              Add Game
            </Button>
            <Button color="inherit" variant="text" className={classes.button}>
              Clear Form
            </Button>
          </Container>
        </form>
      </section>
    );
  }
}

AddGame.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AddGame);
