import React from "react";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {
  TextField,
  Button,
  Typography,
  Container,
  CircularProgress
} from "@material-ui/core";
import Select from "react-select";
import {
  signup,
  email,
  goBack,
  password,
  registerSuccess,
  verifyPassword,
  username,
  realName,
  country,
  noMatch
} from "../data/locales";
import dbLocale from "../services/dbLocale";
import countries from "../data/countries";
import localeSelect from "../services/localeSelect";

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
  },
  input: {
    marginTop: "10px"
  }
});

class Signup extends React.Component {
  state = {
    loading: false,
    success: false,
    error: null,
    email: "",
    username: "",
    password: "",
    verifyPassword: "",
    realName: "",
    country: ""
  };

  changeState = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  changeCountry = e => {
    const country = e.value;
    this.setState({
      country
    });
  };

  signup = async e => {
    e.preventDefault();
    this.setState({
      loading: true,
      error: null
    });
    const {
      email,
      username,
      password,
      verifyPassword,
      realName,
      country
    } = this.state;
    if (password === verifyPassword) {
      try {
        const res = await axios.post("/api/users/signup", {
          data: {
            email,
            username,
            password,
            realName,
            country
          },
          params: {
            language: this.props.language
          }
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
    } else {
      this.setState({
        loading: false,
        error: localeSelect(this.props.language, noMatch)
      });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <section className="signup">
        <Container maxWidth="xs">
          <Typography className={classes.header} variant="h5">
            {localeSelect(this.props.language, signup)}
          </Typography>
          <form disabled={this.state.loading} onSubmit={this.signup}>
            {this.state.success && (
              <p>{localeSelect(this.props.language, registerSuccess)}</p>
            )}
            {this.state.error && (
              <p className="error">
                <span>Error:</span> {this.state.error}
              </p>
            )}
            <TextField
              label={localeSelect(this.props.language, email)}
              required
              name="email"
              onChange={this.changeState}
              fullWidth
              value={this.state.email}
              className={classes.input}
            />
            <TextField
              label={localeSelect(this.props.language, password)}
              required
              name="password"
              onChange={this.changeState}
              fullWidth
              value={this.state.password}
              type="password"
              className={classes.input}
            />
            <TextField
              label={localeSelect(this.props.language, verifyPassword)}
              required
              name="verifyPassword"
              onChange={this.changeState}
              fullWidth
              value={this.state.verifyPassword}
              type="password"
              className={classes.input}
            />
            <TextField
              label={localeSelect(this.props.language, username)}
              required
              name="username"
              onChange={this.changeState}
              fullWidth
              value={this.state.username}
              className={classes.input}
            />
            <TextField
              label={localeSelect(this.props.language, realName)}
              name="realName"
              onChange={this.changeState}
              fullWidth
              value={this.state.realName}
              className={classes.input}
            />
            <Select
              options={countries.map(country => {
                return {
                  value: country.value,
                  label: dbLocale(this.props.language, country)
                };
              })}
              value={this.state.country}
              placeholder={localeSelect(this.props.language, country)}
              onChange={this.changeCountry}
              className="country-select"
            />
            <Container className={classes.buttonRow}>
              <div className={classes.wrapper}>
                <Button color="primary" variant="contained" type="submit">
                  {localeSelect(this.props.language, signup)}
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
                <Button
                  component={React.forwardRef((props, ref) => (
                    <RouterLink innerRef={ref} to="/" {...props} />
                  ))}
                >
                  {localeSelect(this.props.language, goBack)}
                </Button>
              </div>
            </Container>
          </form>
        </Container>
      </section>
    );
  }
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Signup);
