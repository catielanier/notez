import React, { useContext } from "react";
import { Grid, IconButton, Typography, Hidden } from "@mui/material";
import { makeStyles } from "@mui/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
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

export default function PopulateNotes({
  filter,
  filterId,
  note,
  id,
  setEditFilter,
  setNoteBody,
  setNoteId,
  deleteNote,
}) {
  const classes = useStyles();
  const { toggleNoteEditor } = useContext(NoteContext);

  const startEdit = () => {
    setEditFilter({ label: filter, value: filterId });
    setNoteBody(note);
    setNoteId(id);
    toggleNoteEditor();
  };

  return (
    <>
      <Hidden xsDown>
        <Grid item md={3} className={classes.padding}>
          <Typography
            component="span"
            color="secondary"
            className={classes.filterName}
          >
            {filter}:
          </Typography>
        </Grid>
      </Hidden>
      <Hidden smUp>
        <Grid item xs={9} className={classes.paddingWithoutBorder}>
          <Typography
            component="span"
            color="secondary"
            className={classes.filterName}
          >
            {filter}:
          </Typography>
        </Grid>
      </Hidden>

      {filter !== "Notice" ? (
        <>
          <Hidden xsDown>
            <Grid item md={7} className={classes.padding}>
              {note}
            </Grid>
            <Grid item md={2} className={classes.border}>
              <Grid container>
                <Grid item md={6}>
                  <IconButton
                    color="secondary"
                    size="small"
                    onClick={startEdit}
                  >
                    <EditIcon />
                  </IconButton>
                </Grid>
                <Grid item md={6}>
                  <IconButton
                    color="secondary"
                    size="small"
                    onClick={() => deleteNote(id)}
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
                <Grid item xs={6}>
                  <IconButton
                    color="secondary"
                    size="small"
                    onClick={startEdit}
                  >
                    <EditIcon />
                  </IconButton>
                </Grid>
                <Grid item xs={6}>
                  <IconButton
                    color="secondary"
                    size="small"
                    onClick={() => deleteNote(id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} className={classes.padding}>
              {note}
            </Grid>
          </Hidden>
        </>
      ) : (
        <Grid item md={9} xs={12} className={classes.padding}>
          {note}
        </Grid>
      )}
    </>
  );
}
