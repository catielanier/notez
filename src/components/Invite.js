import React, { useState, useContext } from "react";
import {
  Typography,
  Container,
  makeStyles,
  TextField,
  CircularProgress,
  Button,
} from "@material-ui/core";
import axios from "axios";
import localeSelect from "../services/localeSelect";
import { LanguageContext } from "../contexts/LanguageContext";
import {
  inviteToPremium,
  inviteSent,
  email as emailLocale,
  inviteUser,
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
}));

export default function Invite() {
  const classes = useStyles();
  const { language } = useContext(LanguageContext);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  return (
    <section className="invite-user">
      <Container maxWidth="sm">
        <Typography variant="h5" className={classes.header}>
          {localeSelect(language, inviteToPremium)}
        </Typography>
        <form
          disabled={loading}
          className={classes.container}
          onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            await axios({
              method: "POST",
              url: "/api/invites",
              body: {
                data: {
                  email,
                },
              },
            })
              .then((res) => {
                setLoading(false);
                setSuccess(true);
              })
              .catch((err) => {
                console.error(err);
                setLoading(false);
                setError(err.message);
              });
          }}
        >
          <Container maxWidth="sm">
            {success && <p>{localeSelect(language, inviteSent)}</p>}
            {error && (
              <p className="error">
                <span>Error:</span> {error}
              </p>
            )}
            <Container maxWidth="sm">
              <TextField
                label={localeSelect(language, emailLocale)}
                id="standard-name"
                value={email}
                onChange={(e) => {
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
                  {localeSelect(language, inviteUser)}
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
          </Container>
        </form>
      </Container>
    </section>
  );
}
