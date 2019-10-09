import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {
  TextField,
  Button,
  Typography,
  Container,
  CircularProgress
} from "@material-ui/core";
import axios from "axios";
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

class AddCharacter extends React.Component {
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
  addCharacter = async e => {
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
    const character = {
      name,
      name_ja,
      name_ko,
      "name_zh-cn": name_cn,
      "name_zh-tw": name_tw,
      "name_zh-hk": name_hk
    };
    for (let x in character) {
      if (character[x].length === 0) {
        delete character[x];
      }
    }
    try {
      const res = await axios.post("/api/characters/new", {
        user,
        token,
        character
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
      <section className="add-character">
        <Typography className={classes.header} variant="h5">
          Add Character
        </Typography>
        <form onSubmit={this.addCharacter} disabled={this.state.loading}>
          <Container maxWidth="sm">
            {this.state.success && <p>Characters created successfully.</p>}
            {this.state.error && (
              <p className="error">
                <span>Error:</span> {this.state.error}
              </p>
            )}
            <TextField
              label="English Character Name"
              id="standard-name-required"
              value={this.state.name}
              name="name"
              onChange={this.changeState}
              fullWidth="true"
              placeholder="Character Name"
              required
            />
            <TextField
              label="Japanese Character Name"
              value={this.state.name}
              name="name_ja"
              onChange={this.changeState}
              fullWidth="true"
              placeholder="キャラクター名"
            />
            <TextField
              label="Korean Character Name"
              value={this.state.name_ko}
              name="name_ko"
              onChange={this.changeState}
              fullWidth="true"
              placeholder="캐릭터 이름"
            />
            <TextField
              label="Mandarin (Simplified) Character Name"
              value={this.state["name_zh-cn"]}
              name="name_zh-cn"
              onChange={this.changeState}
              fullWidth="true"
              placeholder="角色名字"
            />
            <TextField
              label="Mandarin (Traditional) Character Name"
              value={this.state["name_zh-tw"]}
              name="name_zh-tw"
              onChange={this.changeState}
              fullWidth="true"
              placeholder="角色名字"
            />
            <TextField
              label="Cantonese Character Name"
              value={this.state["name_zh-hk"]}
              name="name_zh-hk"
              onChange={this.changeState}
              fullWidth="true"
              placeholder="角色名字"
            />
            <Button
              color="primary"
              variant="contained"
              className={classes.button}
              type="submit"
            >
              Add Character
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

AddCharacter.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AddCharacter);
