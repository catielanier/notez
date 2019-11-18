import React from "react";
import { Container, Typography, Grid } from "@material-ui/core";
import logo from "../assets/logo.png";

function Attract() {
  return (
    <Container className="attract">
      <Grid container spacing={2}>
        <Grid item md={5} xs={12}>
          <img className="main-logo" src={logo} alt="NoteZ" />
        </Grid>
        <Grid item md={7} xs={12}>
          <Typography variant="h3" gutterBottom>
            Welcome to NoteZ
          </Typography>
          <Typography variant="h5">
            Your premiere fighting game note app!
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Attract;
