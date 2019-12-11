import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {
  TextField,
  Button,
  Typography,
  Container,
  CircularProgress,
  FormControlLabel,
  Checkbox
} from "@material-ui/core";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { getToken } from "../services/tokenService";
import localeSelect from "../services/localeSelect";
import {
  addFilter,
  clearForm,
  filterCreated,
  englishFilter,
  japaneseFilter,
  koreanFilter,
  simplifiedFilter,
  traditionalFilter,
  cantoneseFilter,
  playerFilter
} from "../data/locales";

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

class AddFilter extends React.Component {
  state = {
    name: "",
    name_ja: "",
    name_ko: "",
    "name_zh-cn": "",
    "name_zh-tw": "",
    "name_zh-hk": "",
    playerFilter: false,
    loading: false,
    success: false,
    error: null
  };

  changeState = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleCheck = e => {
    const playerFilter = !this.state.playerFilter;
    this.setState({ playerFilter });
  };

  clearForm = e => {
    e.preventDefault();
    this.setState({
      name: "",
      name_ja: "",
      name_ko: "",
      "name_zh-cn": "",
      "name_zh-tw": "",
      "name_zh-hk": "",
      playerFilter: false
    });
  };

  addFilter = async e => {
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
      playerFilter
    } = this.state;
    const { user } = this.props;
    const token = await getToken();
    const filter = {
      name,
      name_ja,
      name_ko,
      "name_zh-cn": name_cn,
      "name_zh-tw": name_tw,
      "name_zh-hk": name_hk,
      playerFilter
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
      <section className="add-character">
        <Typography className={classes.header} variant="h5">
          {localeSelect(this.props.language, addFilter)}
        </Typography>
        <form onSubmit={this.addCharacter} disabled={this.state.loading}>
          <Container maxWidth="sm">
            {this.state.success && (
              <p>{localeSelect(this.props.language, filterCreated)}</p>
            )}
            {this.state.error && (
              <p className="error">
                <span>Error:</span> {this.state.error}
              </p>
            )}
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.playerFilter}
                  onChange={this.handleCheck}
                  value={this.state.playerFilter}
                  color="primary"
                />
              }
              label={localeSelect(this.props.language, playerFilter)}
            />
            <TextField
              label={localeSelect(this.props.language, englishFilter)}
              id="standard-name-required"
              value={this.state.name}
              name="name"
              onChange={this.changeState}
              fullWidth="true"
              placeholder="Filter Type"
              required
            />
            <TextField
              label={localeSelect(this.props.language, japaneseFilter)}
              value={this.state.name_ja}
              name="name_ja"
              onChange={this.changeState}
              fullWidth="true"
              placeholder="フィルタータイプ"
            />
            <TextField
              label={localeSelect(this.props.language, koreanFilter)}
              value={this.state.name_ko}
              name="name_ko"
              onChange={this.changeState}
              fullWidth="true"
              placeholder="필터 타입"
            />
            <TextField
              label={localeSelect(this.props.language, simplifiedFilter)}
              value={this.state["name_zh-cn"]}
              name="name_zh-cn"
              onChange={this.changeState}
              fullWidth="true"
              placeholder="过滤器类型"
            />
            <TextField
              label={localeSelect(this.props.language, traditionalFilter)}
              value={this.state["name_zh-tw"]}
              name="name_zh-tw"
              onChange={this.changeState}
              fullWidth="true"
              placeholder="過濾器類型"
            />
            <TextField
              label={localeSelect(this.props.language, cantoneseFilter)}
              value={this.state["name_zh-hk"]}
              name="name_zh-hk"
              onChange={this.changeState}
              fullWidth="true"
              placeholder="過濾器類型"
            />
            <Container className={classes.buttonRow}>
              <div className={classes.wrapper}>
                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                  onClick={this.addFilter}
                  disabled={this.state.loading}
                >
                  {localeSelect(this.props.language, addFilter)}
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
                <Button onClick={this.clearForm}>
                  {localeSelect(this.props.language, clearForm)}
                </Button>
              </div>
            </Container>
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
