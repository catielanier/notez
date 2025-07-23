import React, { useState, useContext } from "react";
import { Link as RouterLink, Navigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Container,
  CircularProgress,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import Select from "react-select";
import { useTranslation } from "react-i18next";

import useAuth from "../hooks/useAuth";
import { CountryContext } from "../contexts/CountryContext";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  header: {
    textAlign: "center",
    marginBottom: theme.spacing(2),
  },
  input: {
    marginTop: theme.spacing(1),
  },
  countrySelect: {
    marginTop: theme.spacing(1),
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
}));

export default function Signup() {
  const classes = useStyles();
  const { t } = useTranslation();
  const { countries } = useContext(CountryContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showVerifyPassword, setShowVerifyPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [realName, setRealName] = useState("");
  const [country, setCountry] = useState("");

  const { user, signup, signupLoading, signupError, signupSuccess } = useAuth();

  // if already signed up/logged in, go home
  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    signup({
      email: email.toLowerCase(),
      password,
      verifyPassword,
      username,
      realName,
      country,
    });
  };

  return (
    <Container maxWidth="xs">
      <Typography className={classes.header} variant="h5">
        {t("header.signup")}
      </Typography>

      {signupSuccess && (
        <Typography color="primary" gutterBottom>
          {t("account.success.signup")}
        </Typography>
      )}
      {signupError && (
        <Typography color="error" gutterBottom>
          {t("common.error")}: {signupError.message}
        </Typography>
      )}

      <form onSubmit={handleSubmit} className={classes.container}>
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
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    aria-label={
                      showPassword
                        ? t("account.hidePassword")
                        : t("account.showPassword")
                    }
                    onClick={() => setShowPassword((s) => !s)}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
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
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    aria-label={
                      showVerifyPassword
                        ? t("account.hidePassword")
                        : t("account.showPassword")
                    }
                    onClick={() => setShowVerifyPassword((s) => !s)}
                  >
                    {showVerifyPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
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

        <div className={classes.buttonRow}>
          <div className={classes.wrapper}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={signupLoading}
            >
              {t("header.signup")}
            </Button>
            {signupLoading && (
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
        </div>
      </form>
    </Container>
  );
}
