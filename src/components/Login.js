import React, { useContext, useState } from "react";
import { Redirect, Link as RouterLink } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Container,
  CircularProgress,
  makeStyles
} from "@material-ui/core";
import {
  login,
  goBack,
  email as emailLocale,
  password as passwordLocale,
  forgotYourPassword
} from "../data/locales";
import localeSelect from "../services/localeSelect";
import { LanguageContext } from "../contexts/LanguageContext";
import { UserContext } from "../contexts/UserContext";

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

export default function Login() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { doLogin, loading, error, success } = useContext(UserContext);
  const { language } = useContext(LanguageContext);
  if (success) {
    return <Redirect to="/" />;
  }
  return (
    <section>
      <Container maxWidth="xs">
        <Typography className={classes.header} variant="h5">
          {localeSelect(language, login)}
        </Typography>
        <form
          disabled={loading}
          onSubmit={e => {
            e.preventDefault();
            doLogin(email, password);
          }}
          className={classes.container}
        >
          <Container maxWidth="xs">
            {error && (
              <p className="error">
                <span>Error:</span> {error}
              </p>
            )}
            <Container maxWidth="xs">
              <TextField
                label={localeSelect(language, emailLocale)}
                id="standard-name"
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                }}
                fullWidth
              />
            </Container>
            <Container maxWidth="xs">
              <TextField
                label={localeSelect(language, passwordLocale)}
                value={password}
                id="standard-password-input"
                type="password"
                onChange={e => {
                  setPassword(e.target.value);
                }}
                fullWidth
              />
            </Container>
            <Container className={classes.buttonRow}>
              <div className={classes.wrapper}>
                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                  disabled={loading}
                >
                  {localeSelect(language, login)}
                </Button>
                {loading && (
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
                  {localeSelect(language, goBack)}
                </Button>
              </div>
            </Container>
            <Container className={classes.buttonRow}>
              <Button
                component={React.forwardRef((props, ref) => (
                  <RouterLink innerRef={ref} to="/forgot" {...props} />
                ))}
              >
                {localeSelect(language, forgotYourPassword)}
              </Button>
            </Container>
          </Container>
        </form>
      </Container>
    </section>
  );
}
