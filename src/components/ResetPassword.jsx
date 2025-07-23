import React, { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTranslation } from "react-i18next";
import useAuth from "../hooks/useAuth";

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

export default function ResetPassword() {
  const { t } = useTranslation();
  const classes = useStyles();
  const { token } = useParams(); // Route should be defined as '/forgot/:token'

  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");

  const {
    resetPassword,
    resetPasswordLoading,
    resetPasswordError,
    resetPasswordSuccess,
  } = useAuth();

  // Redirect on successful reset
  if (resetPasswordSuccess) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    resetPassword({ key: token, password, verifyPassword });
  };

  return (
    <Container maxWidth="sm">
      <Typography className={classes.header} variant="h5">
        {t("account.reset")}
      </Typography>

      {resetPasswordError && (
        <Typography color="error" gutterBottom>
          {t("common.error")}: {resetPasswordError.message}
        </Typography>
      )}

      <form onSubmit={handleSubmit} className={classes.container}>
        <TextField
          label={t("account.password")}
          required
          fullWidth
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <TextField
          label={t("account.verify")}
          required
          fullWidth
          type="password"
          value={verifyPassword}
          onChange={(e) => setVerifyPassword(e.target.value)}
          style={{ marginTop: 16 }}
        />

        <div className={classes.buttonRow}>
          <div className={classes.wrapper}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={resetPasswordLoading}
            >
              {t("account.reset")}
            </Button>
            {resetPasswordLoading && (
              <CircularProgress
                size={20}
                color="secondary"
                className={classes.buttonProgress}
              />
            )}
          </div>
        </div>
      </form>
    </Container>
  );
}
