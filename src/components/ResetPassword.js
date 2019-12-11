import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {
  TextField,
  Button,
  Typography,
  Container,
  CircularProgress
} from "@material-ui/core";
import localeSelect from "../services/localeSelect";
import {
  resetPassword,
  password,
  verifyPassword,
  noMatch
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

class ResetPassword extends React.Component {
  state = {
    key: null,
    password: "",
    verifyPassword: "",
    loading: false,
    success: false,
    error: null
  };

  componentWillMount() {
    const key = window.location.pathname.replace("/forgot/", "");
    this.setState({
      key
    });
  }

  changeState = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  resetPassword = async e => {
    e.preventDefault();
    this.setState({ loading: true });
    const { password, verifyPassword, key } = this.state;
    if (password === verifyPassword) {
      await axios
        .post("/api/users/reset", { key, password })
        .then(_ => {
          this.setState({ loading: false, success: true });
        })
        .catch(error => {
          this.setState({ loading: false, error: error.message });
        });
    } else {
      this.setState({
        loading: false,
        error: localeSelect(this.props.language, noMatch)
      });
    }
  };

  render() {
    const { classes } = this.props;
    if (this.state.success) {
      return <Redirect to="/login" />;
    }
    return (
      <section className="signup">
        <Container maxWidth="sm">
          <Typography className={classes.header} variant="h5">
            {localeSelect(this.props.language, resetPassword)}
          </Typography>
          <form disabled={this.state.loading} onSubmit={this.resetPassword}>
            {this.state.error && (
              <p className="error">
                <span>Error:</span> {this.state.error}
              </p>
            )}
            <TextField
              label={localeSelect(this.props.language, password)}
              required
              name="password"
              onChange={this.changeState}
              fullWidth
              value={this.state.password}
              type="password"
            />
            <TextField
              label={localeSelect(this.props.language, verifyPassword)}
              required
              name="verifyPassword"
              onChange={this.changeState}
              fullWidth
              value={this.state.verifyPassword}
              type="password"
            />
            <Container className={classes.buttonRow}>
              <div className={classes.wrapper}>
                <Button color="primary" variant="contained" type="submit">
                  {localeSelect(this.props.language, resetPassword)}
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
        </Container>
      </section>
    );
  }
}

ResetPassword.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ResetPassword);
