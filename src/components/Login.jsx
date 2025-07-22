// src/components/Login.js
import React, { useContext, useState } from "react";
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
import { UserContext } from "../contexts/UserContext";
import { useTranslation } from "react-i18next";

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
}));

export default function Login() {
  const { t } = useTranslation();
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { doLogin, loading, error, success } = useContext(UserContext);

  // after successful login, redirect to home
  if (success) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    doLogin(email.toLowerCase(), password);
  };

  return (
    <section>
      <Container maxWidth="xs">
        <Typography className={classes.header} variant="h5">
          {t("header.login")}
        </Typography>

        <form onSubmit={handleSubmit} className={classes.container}>
          <Container maxWidth="xs">
            {error && (
              <p className="error">
                <span>{t("common.error")}</span> {error}
              </p>
            )}

            <Container maxWidth="xs">
              <TextField
                label={t("account.email")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
              />
            </Container>

            <Container maxWidth="xs">
              <TextField
                label={t("account.password")}
                value={password}
                type={showPassword ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showPassword
                            ? t("account.hidePassword")
                            : t("account.showPassword")
                        }
                        onClick={() => setShowPassword((show) => !show)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
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
                  {t("header.login")}
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

            <Container className={classes.buttonRow}>
              <Button component={RouterLink} to="/forgot">
                {t("account.forgot")}
              </Button>
            </Container>
          </Container>
        </form>
      </Container>
    </section>
  );
}
