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

  signup = async e => {
    e.preventDefault();
    this.setState({
      loading: true
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
          }
        });
        console.log(res);
        this.setState({
          loading: false,
          success: true
        });
      } catch (e) {
        this.setState({
          error: e
        });
      }
    } else {
      this.setState({
        loading: false,
        error: "Your passwords do not match."
      });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <section className="signup">
        <Container maxWidth="xs">
          <Typography className={classes.header} variant="h5">
            Signup
          </Typography>
          <form disabled={this.state.loading} onSubmit={this.signup}>
            {this.state.success && (
              <p>Registration success! Please check your email.</p>
            )}
            {this.state.error && (
              <p className="error">
                <span>Error:</span> {this.state.error}
              </p>
            )}
            <TextField
              label="Email Address"
              required
              name="email"
              onChange={this.changeState}
              fullWidth
              value={this.state.email}
            />
            <TextField
              label="Password"
              required
              name="password"
              onChange={this.changeState}
              fullWidth
              value={this.state.password}
              type="password"
            />
            <TextField
              label="Verify Password"
              required
              name="verifyPassword"
              onChange={this.changeState}
              fullWidth
              value={this.state.verifyPassword}
              type="password"
            />
            <TextField
              label="Username"
              required
              name="username"
              onChange={this.changeState}
              fullWidth
              value={this.state.username}
            />
            <TextField
              label="Real Name"
              name="realName"
              onChange={this.changeState}
              fullWidth
              value={this.state.realName}
            />
            <TextField
              label="Country"
              name="country"
              onChange={this.changeState}
              fullWidth
              value={this.state.country}
            />
            <Container className={classes.buttonRow}>
              <div className={classes.wrapper}>
                <Button color="primary" variant="contained" type="submit">
                  Signup
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
                  Go Back
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
