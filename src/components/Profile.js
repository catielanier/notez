import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Container,
  CircularProgress,
  makeStyles
} from "@material-ui/core";
import Select from "react-select";
import localeSelect from "../services/localeSelect";
import dbLocale from "../services/dbLocale";
import countries from "../data/countries";
import {
  profile,
  email as emailLocale,
  username as usernameLocale,
  realName as realNameLocale,
  profileUpdated,
  oldPassword as oldPasswordLocale,
  newPassword as newPasswordLocale,
  verifyNewPassword as verifyNewPasswordLocale,
  editProfile,
  country as countryLocale
} from "../data/locales";
import { UserContext } from '../contexts/UserContext';
import { LanguageContext } from '../contexts/LanguageContext';

const useStyles = makeStyles(theme => ({
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
}));

export default function Profile() {
  const classes = useStyles();
  const { user, loading, error, success, updateProfile } = useContext(UserContext);
  const { language } = useContext(LanguageContext);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [verifyNewPassword, setVerifyNewPassword] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState({});
  const [username, setUsername] = useState('');
  const [realName, setRealName] = useState('');
  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(`/api/users/${user}`);
      setUsername(res.data.data.username);
      setEmail(res.data.data.email);
      setRealName(res.data.data.realName);
      const index = countries.findIndex(x => x.value === res.data.data.country);
      setCountry({
        label: dbLocale(language, countries[index]),
        value: countries[index].value
      });
    }
    fetchData();
  }, [user])
  return (
    <section>
      <Container maxWidth="xs">
        <Typography className={classes.header} variant="h5">
          {localeSelect(language, profile)}
        </Typography>
        <form disabled={loading} onSubmit={e => {
            e.preventDefault();
            updateProfile(
              email,
              oldPassword,
              newPassword,
              verifyNewPassword,
              username,
              realName,
              country.value)
          }}>
          {success && (
            <p>{localeSelect(language, profileUpdated)}</p>
          )}
          {error && (
            <p className="error">
              <span>Error:</span> {error}
            </p>
          )}
          <TextField
            label={localeSelect(language, emailLocale)}
            required
            onChange={e => {
              setEmail(e.target.value);
            }}
            fullWidth
            value={email}
            className={classes.input}
          />
          <TextField
            label={localeSelect(language, oldPasswordLocale)}
            required
            onChange={e => {
              setOldPassword(e.target.value);
            }}
            fullWidth
            value={oldPassword}
            type="password"
            className={classes.input}
          />
          <TextField
            label={localeSelect(language, newPasswordLocale)}
            required
            onChange={e => {
              setNewPassword(e.target.value);
            }}
            fullWidth
            value={newPassword}
            type="password"
            className={classes.input}
          />
          <TextField
            label={localeSelect(language, verifyNewPasswordLocale)}
            required
            onChange={e => {
              setVerifyNewPassword(e.target.value);
            }}
            fullWidth
            value={verifyNewPassword}
            type="password"
            className={classes.input}
          />
          <TextField
            label={localeSelect(language, usernameLocale)}
            required
            onChange={e => {
              setUsername(e.target.value);
            }}
            fullWidth
            value={username}
            className={classes.input}
          />
          <TextField
            label={localeSelect(language, realNameLocale)}
            onChange={e => {
              setRealName(e.target.value);
            }}
            fullWidth
            value={realName}
            className={classes.input}
          />
          <Select
            options={countries.map(x => {
              return {
                value: x.value,
                label: dbLocale(language, x)
              };
            })}
            value={country}
            onChange={e => {
              setCountry({
                label: e.label,
                value: e.value
              })
            }}
            placeholder={localeSelect(language, countryLocale)}
            className="country-select"
          />
          <Container className={classes.buttonRow}>
            <div className={classes.wrapper}>
              <Button color="primary" variant="contained" type="submit" disabled={loading}>
                {localeSelect(language, editProfile)}
              </Button>
              {loading && (
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
  )
}
