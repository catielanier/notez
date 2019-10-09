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

class AddFilter extends React.Component {
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
  addFilter = async e => {
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
    const filter = {
      name,
      name_ja,
      name_ko,
      "name_zh-cn": name_cn,
      "name_zh-tw": name_tw,
      "name_zh-hk": name_hk
    };
    for (let x in filter) {
      if (filter[x].length === 0) {
        delete filter[x];
      }
    }
    try {
      const res = await axios.post("/api/filters/new", {
        user,
        token,
        filter
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
          Add Filters
        </Typography>
        <form onSubmit={this.addCharacter} disabled={this.state.loading}>
          <Container maxWidth="sm">
            {this.state.success && <p>Filter created successfully.</p>}
            {this.state.error && (
              <p className="error">
                <span>Error:</span> {this.state.error}
              </p>
            )}
            <TextField
              label="English Filter Type"
              id="standard-name-required"
              value={this.state.name}
              name="name"
              onChange={this.changeState}
              fullWidth="true"
              placeholder="Filter Type"
              required
            />
            <TextField
              label="Japanese Filter Type"
              value={this.state.name}
              name="name_ja"
              onChange={this.changeState}
              fullWidth="true"
              placeholder="フィルタータイプ"
            />
            <TextField
              label="Korean Filter Type"
              value={this.state.name_ko}
              name="name_ko"
              onChange={this.changeState}
              fullWidth="true"
              placeholder="필터 타입"
            />
            <TextField
              label="Mandarin (Simplified) Filter Type"
              value={this.state["name_zh-cn"]}
              name="name_zh-cn"
              onChange={this.changeState}
              fullWidth="true"
              placeholder="过滤器类型"
            />
            <TextField
              label="Mandarin (Traditional) Filter Type"
              value={this.state["name_zh-tw"]}
              name="name_zh-tw"
              onChange={this.changeState}
              fullWidth="true"
              placeholder="過濾器類型"
            />
            <TextField
              label="Cantonese Filter Type"
              value={this.state["name_zh-hk"]}
              name="name_zh-hk"
              onChange={this.changeState}
              fullWidth="true"
              placeholder="過濾器類型"
            />
            <Button
              color="primary"
              variant="contained"
              className={classes.button}
              type="submit"
            >
              Add Filter
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

AddFilter.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AddFilter);
