import React, { useContext, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Container,
  CircularProgress,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Select from "react-select";
import { useTranslation } from "react-i18next";

import { UserContext } from "../contexts/UserContext";
import { CountryContext } from "../contexts/CountryContext";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  header: {
    textAlign: "center",
    marginBottom: theme.spacing(2),
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
    marginTop: theme.spacing(1),
  },
  countrySelect: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
}));

export default function Signup() {
  const { t } = useTranslation();
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showVerifyPassword, setShowVerifyPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [realName, setRealName] = useState("");
  const [country, setCountry] = useState("");

  const { loading, success, error, signup: doSignup } = useContext(UserContext);
  const { countries } = useContext(CountryContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    doSignup(
      email.toLowerCase(),
      password,
      verifyPassword,
      username,
      realName,
      country
    );
  };

  return (
    <section className="signup">
      <Container maxWidth="xs">
        <Typography className={classes.header} variant="h5">
          {t("header.signup")}
        </Typography>

        <form onSubmit={handleSubmit} className={classes.container}>
          {success && <p>{t("account.success.signup")}</p>}
          {error && (
            <p className="error">
              <span>{t("common.error")}</span> {error}
            </p>
          )}

          <TextField
            label={t("account.email")}
            required
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={classes.input}
          />

          <TextField
            label={t("account.password")}
            required
            fullWidth
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={classes.input}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    aria-label={
                      showPassword
                        ? t("account.hidePassword")
                        : t("account.showPassword")
                    }
                    onClick={() => setShowPassword((show) => !show)}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label={t("account.verify")}
            required
            fullWidth
            type={showVerifyPassword ? "text" : "password"}
            value={verifyPassword}
            onChange={(e) => setVerifyPassword(e.target.value)}
            className={classes.input}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    aria-label={
                      showVerifyPassword
                        ? t("account.hidePassword")
                        : t("account.showPassword")
                    }
                    onClick={() => setShowVerifyPassword((show) => !show)}
                  >
                    {showVerifyPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label={t("account.username")}
            required
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={classes.input}
          />

          <TextField
            label={t("account.realname")}
            fullWidth
            value={realName}
            onChange={(e) => setRealName(e.target.value)}
            className={classes.input}
          />

          <Select
            options={countries}
            value={countries.find((c) => c.value === country) || null}
            placeholder={t("account.country")}
            onChange={(opt) => setCountry(opt?.value || "")}
            className={classes.countrySelect}
          />

          <Container className={classes.buttonRow}>
            <div className={classes.wrapper}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={loading}
              >
                {t("header.signup")}
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
              <Button component={RouterLink} to="/">
                {t("common.goBack")}
              </Button>
            </div>
          </Container>
        </form>
      </Container>
    </section>
  );
}
