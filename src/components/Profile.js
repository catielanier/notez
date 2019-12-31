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
import Select from "react-select";
import { getToken } from "../services/tokenService";
import localeSelect from "../services/localeSelect";
import dbLocale from "../services/dbLocale";
import countries from "../data/countries";
import {
  profile,
  email,
  username,
  realName,
  profileUpdated,
  oldPassword,
  newPassword,
  verifyNewPassword,
  editProfile,
  country
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
  },
  input: {
    marginTop: "10px"
  }
});

class Profile extends React.Component {
  state = {
    oldPassword: "",
    newPassword: "",
    verifyNewPassword: "",
    username: "",
    country: "",
    countryLong: "",
    email: "",
    realName: "",
    loading: false,
    success: false,
    error: null
  };

  async componentWillMount() {
    const { user } = this.props;
    await axios.get(`/api/users/${user}`).then(res => {
      const { username, country, email, realName } = res.data.data;
      const index = countries.findIndex(guo => guo.value === country);
      const countryLong = dbLocale(this.props.language, countries[index]);
      this.setState({
        username,
        country,
        email,
        realName,
        countryLong
      });
    });
  }

  changeCountry = e => {
    const country = e.value;
    const countryLong = e.label;
    this.setState({
      country,
      countryLong
    });
  };

  updateProfile = async e => {
    e.preventDefault();
    const {
      oldPassword,
      newPassword,
      verifyNewPassword,
      username,
      country,
      email,
      realName
    } = this.state;
    const { user } = this.props;
    const token = getToken();
    this.setState({
      loading: true,
      error: null
    });
    if (oldPassword !== "") {
      if (newPassword !== "" && newPassword === verifyNewPassword) {
        await axios
          .put(`/api/users/${user}`, {
            data: {
              username,
              email,
              country,
              realName,
              oldPassword,
              newPassword,
              token
            }
          })
          .then(() => {
            this.setState({
              loading: false,
              success: true
            });
          })
          .catch(err => {
            this.setState({
              loading: false,
              error: err
            });
          });
      } else {
        this.setState({
          loading: false,
          error: `Your new password is either invalid or doesn't match your password verification. (Note: If you don't want to change your password, leave the "Old Password" field blank.)`
        });
      }
    } else {
      await axios
        .put(`/api/users/${user}`, {
          data: {
            username,
            email,
            country,
            realName,
            token
          }
        })
        .then(() => {
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
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <section>
        <Container maxWidth="xs">
          <Typography className={classes.header} variant="h5">
            {localeSelect(this.props.language, profile)}
          </Typography>
          <form disabled={this.state.loading} onSubmit={this.updateProfile}>
            {this.state.success && (
              <p>{localeSelect(this.props.language, profileUpdated)}</p>
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
              label={localeSelect(this.props.language, oldPassword)}
              required
              name="oldPassword"
              onChange={this.changeState}
              fullWidth
              value={this.state.oldPassword}
              type="password"
              className={classes.input}
            />
            <TextField
              label={localeSelect(this.props.language, newPassword)}
              required
              name="newPassword"
              onChange={this.changeState}
              fullWidth
              value={this.state.newPassword}
              type="password"
              className={classes.input}
            />
            <TextField
              label={localeSelect(this.props.language, verifyNewPassword)}
              required
              name="verifyNewPassword"
              onChange={this.changeState}
              fullWidth
              value={this.state.verifyNewPassword}
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
              options={countries.map(guo => {
                return {
                  value: guo.value,
                  label: dbLocale(this.props.language, guo)
                };
              })}
              value={{
                value: this.state.country,
                label: this.state.countryLong
              }}
              onChange={this.changeCountry}
              placeholder={localeSelect(this.props.language, country)}
              className="country-select"
            />
            <Container className={classes.buttonRow}>
              <div className={classes.wrapper}>
                <Button color="primary" variant="contained" type="submit">
                  {localeSelect(this.props.language, editProfile)}
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

Profile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Profile);
