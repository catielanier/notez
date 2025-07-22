import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Container,
  CircularProgress,
} from "@mui/material";
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

export default function ResetPassword() {
  const { t } = useTranslation();
  const classes = useStyles();
  const { success, error, loading, resetPassword } = useContext(UserContext);
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const token = window.location.pathname.replace("/forgot/", "");

  if (success) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    resetPassword(password, verifyPassword, token);
  };

  return (
    <section className="signup">
      <Container maxWidth="sm">
        <Typography className={classes.header} variant="h5">
          {t("account.reset")}
        </Typography>

        <form onSubmit={handleSubmit} className={classes.container}>
          {error && (
            <p className="error">
              <span>{t("common.error")}</span> {error}
            </p>
          )}

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

          <Container className={classes.buttonRow}>
            <div className={classes.wrapper}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={loading}
              >
                {t("account.reset")}
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
  );
}
