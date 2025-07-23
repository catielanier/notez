import React, { useState } from "react";
import { Navigate, Link as RouterLink } from "react-router-dom";
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
import { useTranslation } from "react-i18next";

import useAuth from "../hooks/useAuth";

const useStyles = makeStyles((theme) => ({
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

  const { user, userLoading, userError, login, loginLoading, loginError } =
    useAuth();

  // Redirect if already logged in
  if (user) return <Navigate to="/" replace />;

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email: email.toLowerCase(), password });
  };

  return (
    <Container maxWidth="xs">
      <Typography className={classes.header} variant="h5">
        {t("header.login")}
      </Typography>

      {(loginError || userError) && (
        <Typography color="error" gutterBottom>
          {t("common.error")}: {(loginError || userError).message}
        </Typography>
      )}

      <form onSubmit={handleSubmit}>
        <TextField
          label={t("account.email")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />

        <TextField
          label={t("account.password")}
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
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

        <div className={classes.buttonRow}>
          <div className={classes.wrapper}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={loginLoading || userLoading}
            >
              {t("header.login")}
            </Button>
            {(loginLoading || userLoading) && (
              <CircularProgress size={20} className={classes.buttonProgress} />
            )}
          </div>

          <div className={classes.wrapper}>
            <Button component={RouterLink} to="/">
              {t("common.goBack")}
            </Button>
          </div>
        </div>

        <Button component={RouterLink} to="/forgot">
          {t("account.forgot")}
        </Button>
      </form>
    </Container>
  );
}
