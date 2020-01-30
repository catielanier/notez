import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Container,
  CircularProgress,
  makeStyles
} from "@material-ui/core";
import localeSelect from "../services/localeSelect";
import {
  resetPassword as resetPasswordLocale,
  password as passwordLocale,
  verifyPassword as verifyPasswordLocale,
  noMatch
} from "../data/locales";
import { LanguageContext } from '../contexts/LanguageContext';
import { UserContext } from '../contexts/UserContext';

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
  }
}));

export default function ResetPassword() {
  const classes = useStyles();
  const { language } = useContext(LanguageContext);
  const { success, error, loading, resetPassword } = useContext(UserContext);
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const token = window.location.pathname.replace("/forgot/", "");
  if (success) {
    return <Redirect to="/login" />
  }
  return (
    <section className="signup">
      <Container maxWidth="sm">
        <Typography className={classes.header} variant="h5">
          {localeSelect(language, resetPasswordLocale)}
        </Typography>
        <form disabled={loading} onSubmit={e => {
            resetPassword(password, verifyPassword, token)
          }}>
          {error && (
            <p className="error">
              <span>Error:</span> {error}
            </p>
          )}
          <TextField
            label={localeSelect(language, passwordLocale)}
            required
            onChange={e => {
              setPassword(e.target.value)
            }}
            fullWidth
            value={password}
            type="password"
          />
          <TextField
            label={localeSelect(language, verifyPassword)}
            required
            onChange={e => {
              setVerifyPassword(e.target.value)
            }}
            fullWidth
            value={verifyPassword}
            type="password"
          />
          <Container className={classes.buttonRow}>
            <div className={classes.wrapper}>
              <Button
                color="primary"
                variant="contained"
                type="submit"
                disabled={loading}
              >
                {localeSelect(language, resetPasswordLocale)}
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
