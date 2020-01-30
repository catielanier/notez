import React, { useState, useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
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
  email,
  goBack,
  forgotPassword,
  checkEmailPassword,
  requestReset
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
  }
}));

export default function ForgotPassword() {
  const classes = useStyles();
  const { loading, error, success, requestReset } = useContext(UserContext);
  const { language } = useContext(LanguageContext);
  const [email, setEmail] = useState('');
  return (
    <section>
      <Container maxWidth="sm">
        <Typography className={classes.header} variant="h5">
          {localeSelect(language, forgotPassword)}
        </Typography>
        <form
          disabled={loading}
          onSubmit={e => {
            e.preventDefault();
            requestReset(email);
          }}
          className={classes.container}
        >
          <Container maxWidth="sm">
            {success && (
              <p>{localeSelect(language, checkEmailPassword)}</p>
            )}
            {error && (
              <p className="error">
                <span>Error:</span> {error}
              </p>
            )}
            <Container maxWidth="sm">
              <TextField
                label={localeSelect(language, email)}
                id="standard-name"
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
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
                  {localeSelect(language, requestReset)}
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
                    <RouterLink innerRef={ref} to="/login" {...props} />
                  ))}
                >
                  {localeSelect(language, goBack)}
                </Button>
              </div>
            </Container>
          </Container>
        </form>
      </Container>
    </section>
  )
}
