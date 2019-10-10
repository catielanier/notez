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

  clearForm = e => {
    e.preventDefault();
    this.setState({
      name: "",
      name_ja: "",
      name_ko: "",
      "name_zh-cn": "",
      "name_zh-tw": "",
      "name_zh-hk": ""
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
              value={this.state.name_ja}
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
            <Container className={classes.buttonRow}>
              <div className={classes.wrapper}>
                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                  onClick={this.addCharacter}
                  disabled={this.state.loading}
                >
                  Add Character
                </Button>
                {this.state.loading && (
                  <CircularProgress
                    size={20}
                    color="secondary"
                    className={classes.buttonProgress}
                  />
                )}
              </div>
              <div className={classes.wrapper}>
                <Button onClick={this.clearForm}>Clear Form</Button>
              </div>
            </Container>
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
