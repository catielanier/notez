// src/components/Attract.js
import React from "react";
import Particles from "react-particles";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "../assets/logo.png";

const useStyles = makeStyles((theme) => ({
  buttonRow: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(2),
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
}));

export default function Attract() {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <>
      <Particles
        params={{
          particles: {
            number: { value: 90 },
            size: { value: 5 },
          },
          interactivity: {
            events: { onhover: { enable: true, mode: "repulse" } },
          },
        }}
        className="particle"
      />

      <Container className="attract">
        <Grid container spacing={2}>
          <Grid item md={6} xs={12}>
            <img className="main-logo" src={logo} alt={t("app.name")} />
          </Grid>

          <Grid item md={6} xs={12}>
            <Typography variant="h3" gutterBottom>
              {t("home.title")}
            </Typography>
            <Typography variant="h5" gutterBottom>
              {t("home.subtitle")}
            </Typography>

            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Typography variant="body2" gutterBottom>
                {t("home.description.partOne")}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {t("home.description.partTwo")}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {t("home.description.partThree")}
              </Typography>
            </Box>

            <div className={classes.buttonRow}>
              <Button
                variant="contained"
                color="primary"
                component={RouterLink}
                to="/login"
                className={classes.wrapper}
              >
                {t("home.existing")}
              </Button>
              <Button
                variant="outlined"
                color="primary"
                component={RouterLink}
                to="/signup"
                className={classes.wrapper}
              >
                {t("home.new")}
              </Button>
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
