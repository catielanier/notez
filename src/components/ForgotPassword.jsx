import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
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

export default function ForgotPassword() {
  const { t } = useTranslation();
  const classes = useStyles();
  const [email, setEmail] = useState("");

  const {
    requestReset,
    requestResetLoading,
    requestResetError,
    requestResetSuccess,
  } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    requestReset({ email });
  };

  return (
    <Container maxWidth="sm">
      <Typography className={classes.header} variant="h5">
        {t("account.forgot")}
      </Typography>

      {requestResetSuccess && (
        <Typography color="primary" gutterBottom>
          {t("account.checkEmail")}
        </Typography>
      )}
      {requestResetError && (
        <Typography color="error" gutterBottom>
          {t("common.error")}: {requestResetError.message}
        </Typography>
      )}

      <form onSubmit={handleSubmit} className={classes.container}>
        <TextField
          label={t("account.email")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />

        <div className={classes.buttonRow}>
          <div className={classes.wrapper}>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              disabled={requestResetLoading}
            >
              {t("account.requestReset")}
            </Button>
            {requestResetLoading && (
              <CircularProgress
                size={20}
                color="secondary"
                className={classes.buttonProgress}
              />
            )}
          </div>

          <div className={classes.wrapper}>
            <Button component={RouterLink} to="/login">
              {t("common.goBack")}
            </Button>
          </div>
        </div>
      </form>
    </Container>
  );
}
