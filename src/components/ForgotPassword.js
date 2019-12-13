import React from "react";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  TextField,
  Button,
  Typography,
  Container,
  CircularProgress
} from "@material-ui/core";
import localeSelect from "../services/localeSelect";
import {
  email,
  goBack,
  forgotPassword,
  checkEmailPassword,
  requestReset
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

class ForgotPassword extends React.Component {
  state = {
    email: "",
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

  requestReset = async e => {
    e.preventDefault();
    const { email } = this.state;
    this.setState({
      loading: true,
      error: null
    });
    await axios
      .post("/api/users/forgot", { email })
      .then(_ => {
        this.setState({
          loading: false,
          success: true
        });
      })
      .catch(err => {
        this.setState({
          loading: false,
          error: err.message
        });
      });
  };

  render() {
    const { classes } = this.props;
    return (
      <section>
        <Container maxWidth="sm">
          <Typography className={classes.header} variant="h5">
            {localeSelect(this.props.language, forgotPassword)}
          </Typography>
          <form
            disabled={this.state.loading}
            onSubmit={this.requestReset}
            className={classes.container}
          >
            <Container maxWidth="sm">
              {this.state.success && (
                <p>{localeSelect(this.props.language, checkEmailPassword)}</p>
              )}
              {this.state.error && (
                <p className="error">
                  <span>Error:</span> {this.state.error}
                </p>
              )}
              <Container maxWidth="sm">
                <TextField
                  label={localeSelect(this.props.language, email)}
                  id="standard-name"
                  value={this.state.email}
                  name="email"
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
                    {localeSelect(this.props.language, requestReset)}
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
                      <RouterLink innerRef={ref} to="/login" {...props} />
                    ))}
                  >
                    {localeSelect(this.props.language, goBack)}
                  </Button>
                </div>
              </Container>
            </Container>
          </form>
        </Container>
      </section>
    );
  }
}

ForgotPassword.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ForgotPassword);
