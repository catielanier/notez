import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Button,
  TextField,
  Typography,
  makeStyles,
  CircularProgress,
} from "@material-ui/core";
import { Link as RouterLink, Redirect } from "react-router-dom";
import Select from "react-select";
import { LanguageContext } from "../contexts/LanguageContext";
import localeSelect from "../services/localeSelect";
import dbLocale from "../services/dbLocale";
import countries from "../data/countries";
import {
  signup,
  goBack,
  password as passwordLocale,
  registerSuccess,
  verifyPassword as verifyPasswordLocale,
  username as usernameLocale,
  realName as realNameLocale,
  country as countryLocale,
} from "../data/locales";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  header: {
    textAlign: "center",
  },
  buttonRow: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(2),
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  input: {
    marginTop: "10px",
  },
}));

export default function InviteSignup() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [realName, setRealName] = useState("");
  const [country, setCountry] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { language } = useContext(LanguageContext);
  const id = window.location.pathname.replace("/invite/", "");
  useEffect(() => {
    axios.get(`/api/invites/${id}`).then((res) => {
      setEmail(res.data.data.email);
    });
  }, [id]);
  if (success) {
    return <Redirect to="/login" />;
  }
  return (
    <section className="signup">
      <Container maxWidth="xs">
        <Typography className={classes.header} variant="h5">
          {localeSelect(language, signup)}
        </Typography>
        <form
          disabled={loading}
          onSubmit={async (e) => {
            e.preventDefault();
            setError(null);
            setLoading(true);
            if (password === verifyPassword) {
              await axios
                .post("/api/invites/signup", {
                  data: {
                    email,
                    password,
                    username,
                    realName,
                    country,
                    token: id,
                  },
                })
                .then((res) => {
                  setLoading(false);
                  setSuccess(true);
                })
                .catch((err) => {
                  setLoading(false);
                  setError(err.message);
                });
            }
          }}
        >
          {error && (
            <p className="error">
              <span>Error:</span> {error}
            </p>
          )}
          <TextField
            label={localeSelect(language, passwordLocale)}
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            fullWidth
            value={password}
            type="password"
            className={classes.input}
          />
          <TextField
            label={localeSelect(language, verifyPasswordLocale)}
            required
            onChange={(e) => {
              setVerifyPassword(e.target.value);
            }}
            fullWidth
            value={verifyPassword}
            type="password"
            className={classes.input}
          />
          <TextField
            label={localeSelect(language, usernameLocale)}
            required
            name="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            fullWidth
            value={username}
            className={classes.input}
          />
          <TextField
            label={localeSelect(language, realNameLocale)}
            name="realName"
            onChange={(e) => {
              setRealName(e.target.value);
            }}
            fullWidth
            value={realName}
            className={classes.input}
          />
          <Select
            options={countries.map((item) => {
              return {
                value: item.value,
                label: dbLocale(language, item),
              };
            })}
            value={country}
            placeholder={localeSelect(language, countryLocale)}
            onChange={(e) => {
              setCountry(e.value);
            }}
            className="country-select"
          />
          <Container className={classes.buttonRow}>
            <div className={classes.wrapper}>
              <Button color="primary" variant="contained" type="submit">
                {localeSelect(language, signup)}
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
        </form>
      </Container>
    </section>
  );
}
