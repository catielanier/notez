import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Container,
  CircularProgress,
} from "@mui/material";
import Select from "react-select";
import { makeStyles } from "@mui/styles";
import { CountryContext } from "../contexts/CountryContext";
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
  const { user, loading, error, success, updateProfile } =
    useContext(UserContext);
  const { countries } = useContext(CountryContext);

  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [verifyNewPassword, setVerifyNewPassword] = useState("");
  const [username, setUsername] = useState("");
  const [realName, setRealName] = useState("");
  const [country, setCountry] = useState(null);

  useEffect(() => {
    if (!user) return;
    axios.get(`/api/users/${user}`).then((res) => {
      const data = res.data.data;
      setUsername(data.username);
      setEmail(data.email);
      setRealName(data.realName);
      const found = countries.find((c) => c.value === data.country);
      setCountry(found || null);
    });
  }, [user, countries]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(
      email,
      oldPassword,
      newPassword,
      verifyNewPassword,
      username,
      realName,
      country?.value
    );
  };

  return (
    <section>
      <Container maxWidth="xs">
        <Typography className={classes.header} variant="h5">
          {t("header.profile")}
        </Typography>

        <form onSubmit={handleSubmit} className={classes.container}>
          {success && <p>{t("account.success.profile")}</p>}
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
            label={t("account.oldPassword")}
            required
            type="password"
            fullWidth
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className={classes.input}
          />

          <TextField
            label={t("account.newPassword")}
            required
            type="password"
            fullWidth
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={classes.input}
          />

          <TextField
            label={t("account.verifyNew")}
            required
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

          <Container className={classes.buttonRow}>
            <div className={classes.wrapper}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={loading}
              >
                {t("account.editProfile")}
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
