import React, { useContext } from "react";
import { Grid, IconButton, Typography, Hidden } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { NoteContext } from "../contexts/NoteContext";

const useStyles = makeStyles((theme) => ({
  border: {
    borderBottom: `1px solid lightgrey`,
    verticalAlign: "center",
  },
  padding: {
    borderBottom: `1px solid lightgrey`,
    paddingTop: "3px",
  },
  filterName: {
    fontWeight: "bold",
  },
  paddingWithoutBorder: {
    paddingTop: "3px",
  },
}));

function PopulateNotes(props) {
  const classes = useStyles();
  const { toggleNoteEditor } = useContext(NoteContext);
  return (
    <>
      <Hidden xsDown>
        <Grid item md={3} className={classes.padding}>
          <Typography
            variant="span"
            color="secondary"
            className={classes.filterName}
          >
            {props.filter}:
          </Typography>
        </Grid>
      </Hidden>
      <Hidden smUp>
        <Grid item xs={9} className={classes.paddingWithoutBorder}>
          <Typography
            variant="span"
            color="secondary"
            className={classes.filterName}
          >
            {props.filter}:
          </Typography>
        </Grid>
      </Hidden>
      {props.filter !== "Notice" ? (
        <>
          <Hidden xsDown>
            <Grid item md={7} className={classes.padding}>
              {props.note}
            </Grid>
            <Grid item md={2} className={classes.border}>
              <Grid container>
                <Grid item md={6}>
                  <IconButton
                    color="secondary"
                    size="small"
                    onClick={() => {
                      props.setEditFilter({
                        label: props.filter,
                        value: props.filterId,
                      });
                      props.setNoteBody(props.note);
                      props.setNoteId(props.id);
                      toggleNoteEditor();
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </Grid>
                <Grid item md={6}>
                  <IconButton
                    color="secondary"
                    size="small"
                    onClick={() => props.deleteNote(props.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Hidden>
          <Hidden smUp>
            <Grid item xs={3}>
              <Grid container>
                <Grid item md={6}>
                  <IconButton
                    color="secondary"
                    size="small"
                    onClick={() => {
                      props.setEditFilter({
                        label: props.filter,
                        value: props.filterId,
                      });
                      props.setNoteBody(props.note);
                      props.setNoteId(props.id);
                      toggleNoteEditor();
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </Grid>
                <Grid item md={6}>
                  <IconButton
                    color="secondary"
                    size="small"
                    onClick={() => props.deleteNote(props.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} className={classes.padding}>
              {props.note}
            </Grid>
          </Hidden>
        </>
      ) : (
        <Grid item md={9} className={classes.padding}>
          {props.note}
        </Grid>
      )}
    </>
  );
}

export default PopulateNotes;
