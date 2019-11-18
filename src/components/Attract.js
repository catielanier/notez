import React from "react";
import { Container, Typography, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";
import logo from "../assets/logo.png";

const useStyles = makeStyles(theme => ({
  buttonRow: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(2)
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative"
  }
}));

function Attract(props) {
  const classes = useStyles();
  return (
    <Container className="attract">
      <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
          <img className="main-logo" src={logo} alt="NoteZ" />
        </Grid>
        <Grid item md={6} xs={12}>
          <Typography variant="h3" gutterBottom>
            Welcome to NoteZ
          </Typography>
          <Typography variant="h5" gutterBottom>
            Your premiere fighting game note app!
          </Typography>
          <Typography variant="body2" gutterBottom>
            Elevate your game like the pros! With comprehensive matchup notes,
            you'll always be on top of your knowledge! And no app on the planet
            is tailored to fighting game notes like NoteZ.
          </Typography>
          <Typography variant="body2" gutterBottom>
            Write notes for both character and player matchups on your computer,
            tablet, or mobile phone, then have access to them wherever you are.
            No need to worry about restoring your notes on a new phone, as NoteZ
            will do it for you! In match, be able to filter down your notes to
            more specific circumstances than just your opponent, so that you'll
            always remember what to do as you play.
          </Typography>
          <Typography variant="body2" gutterBottom>
            Take your game to the next level with NoteZ today!
          </Typography>
          <Container className={classes.buttonRow}>
            <Button
              variant="contained"
              color="primary"
              component={React.forwardRef((props, ref) => (
                <RouterLink innerRef={ref} to="/login" {...props} />
              ))}
              className={classes.wrapper}
            >
              Existing users
            </Button>
            <Button
              variant="outlined"
              color="primary"
              className={classes.wrapper}
              component={React.forwardRef((props, ref) => (
                <RouterLink innerRef={ref} to="/signup" {...props} />
              ))}
            >
              New users
            </Button>
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Attract;
