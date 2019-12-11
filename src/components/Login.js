import React from "react";
import axios from "axios";
import { Redirect, Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  TextField,
  Button,
  Typography,
  Container,
  CircularProgress
} from "@material-ui/core";
import {
  login,
  goBack,
  email,
  password,
  forgotYourPassword
} from "../data/locales";
import localeSelect from "../services/localeSelect";
import { setToken } from "../services/tokenService";

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

class Login extends React.Component {
  state = {
    email: "",
    password: "",
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

  login = async e => {
    e.preventDefault();
    this.setState({
      loading: true,
      error: null
    });
    const { email, password } = this.state;
    try {
      const res = await axios.post("/api/users/login", {
        data: {
          email,
          password
        }
      });
      if (res) {
        const { token, id } = res.data.data;
        await setToken(token);
        await localStorage.setItem("notezId", id);
        await this.setState({
          success: true,
          loading: false
        });
        await this.props.setUser(id);
      }
    } catch (e) {
      this.setState({
        error: e.message,
        loading: false
      });
    }
  };

  render() {
    if (this.state.success) {
      return <Redirect to="/" />;
    }
    const { classes } = this.props;
    return (
      <section>
        <Container maxWidth="xs">
          <Typography className={classes.header} variant="h5">
            {localeSelect(this.props.language, login)}
          </Typography>
          <form
            disabled={this.state.loading}
            onSubmit={this.login}
            className={classes.container}
          >
            <Container maxWidth="xs">
              {this.state.error && (
                <p className="error">
                  <span>Error:</span> {this.state.error}
                </p>
              )}
              <Container maxWidth="xs">
                <TextField
                  label={localeSelect(this.props.language, email)}
                  id="standard-name"
                  value={this.state.email}
                  name="email"
                  onChange={this.changeState}
                  fullWidth
                />
              </Container>
              <Container maxWidth="xs">
                <TextField
                  label={localeSelect(this.props.language, password)}
                  value={this.state.password}
                  id="standard-password-input"
                  type="password"
                  name="password"
                  onChange={this.changeState}
                  fullWidth
                />
              </Container>
              <Container className={classes.buttonRow}>
                <div className={classes.wrapper}>
                  <Button
                    variant="contained"
                    type="submit"
                    color="primary"
                    onClick={this.login}
                    disabled={this.state.loading}
                  >
                    {localeSelect(this.props.language, login)}
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
              <Container className={classes.buttonRow}>
                <Button
                  component={React.forwardRef((props, ref) => (
                    <RouterLink innerRef={ref} to="/forgot" {...props} />
                  ))}
                >
                  {localeSelect(this.props.language, forgotYourPassword)}
                </Button>
              </Container>
            </Container>
          </form>
        </Container>
      </section>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Login);
