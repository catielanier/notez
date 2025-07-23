import React, { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Select from "react-select";
import { useTranslation } from "react-i18next";

import useAuth from "../hooks/useAuth";
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
    marginTop: theme.spacing(1.5),
  },
}));

export default function Profile() {
  const { t } = useTranslation();
  const classes = useStyles();
  const { countries } = useContext(CountryContext);

  const {
    user,
    userLoading,
    userError,
    updateProfile,
    updateProfileLoading,
    updateProfileError,
    updateProfileSuccess,
  } = useAuth();

  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [verifyNewPassword, setVerifyNewPassword] = useState("");
  const [username, setUsername] = useState("");
  const [realName, setRealName] = useState("");
  const [country, setCountry] = useState(null);

  // populate form when user data arrives
  useEffect(() => {
    if (!user) return;
    setEmail(user.email);
    setUsername(user.username);
    setRealName(user.realName || "");
    const found = countries.find((c) => c.value === user.country);
    setCountry(found || null);
  }, [user, countries]);

  // auth & loading guards
  if (userLoading) return <CircularProgress />;
  if (userError)
    return <Typography color="error">{userError.message}</Typography>;
  if (!user) return <Navigate to="/" replace />;

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile({
      email,
      oldPassword,
      newPassword,
      verifyNewPassword,
      username,
      realName,
      country: country?.value,
    });
  };

  return (
    <Container maxWidth="xs">
      <Typography className={classes.header} variant="h5">
        {t("header.profile")}
      </Typography>

      {updateProfileSuccess && (
        <Typography color="primary" gutterBottom>
          {t("account.success.profile")}
        </Typography>
      )}
      {updateProfileError && (
        <Typography color="error" gutterBottom>
          {t("common.error")}: {updateProfileError.message}
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
          label={t("account.oldPassword")}
          type="password"
          fullWidth
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className={classes.input}
        />

        <TextField
          label={t("account.newPassword")}
          type="password"
          fullWidth
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className={classes.input}
        />

        <TextField
          label={t("account.verifyNew")}
          type="password"
          fullWidth
          value={verifyNewPassword}
          onChange={(e) => setVerifyNewPassword(e.target.value)}
          className={classes.input}
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
          value={country}
          onChange={(opt) => setCountry(opt)}
          placeholder={t("account.country")}
          className={classes.countrySelect}
        />

        <div className={classes.buttonRow}>
          <div className={classes.wrapper}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={updateProfileLoading}
            >
              {t("account.editProfile")}
            </Button>
            {updateProfileLoading && (
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
