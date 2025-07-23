import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

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

export default function PopulateNotes({ filter, note, onEdit, onDelete }) {
  const classes = useStyles();

  return (
    <>
      {/* filter label */}
      <Box sx={{ display: { xs: "none", sm: "block" } }}>
        <Grid item md={3} className={classes.padding}>
          <Typography
            component="span"
            color="secondary"
            className={classes.filterName}
          >
            {filter}:
          </Typography>
        </Grid>
      </Box>
      <Box sx={{ display: { xs: "block", sm: "none" } }}>
        <Grid item xs={9} className={classes.paddingWithoutBorder}>
          <Typography
            component="span"
            color="secondary"
            className={classes.filterName}
          >
            {filter}:
          </Typography>
        </Grid>
      </Box>

      {/* desktop layout */}
      <Box sx={{ display: { xs: "none", sm: "block" } }}>
        <Grid item md={7} className={classes.padding}>
          {note}
        </Grid>
        <Grid item md={2} className={classes.border}>
          <Grid container>
            <Grid item md={6}>
              <IconButton color="secondary" size="small" onClick={onEdit}>
                <EditIcon />
              </IconButton>
            </Grid>
            <Grid item md={6}>
              <IconButton color="secondary" size="small" onClick={onDelete}>
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      {/* mobile layout */}
      <Box sx={{ display: { xs: "block", sm: "none" } }}>
        <Grid item xs={3}>
          <Grid container>
            <Grid item xs={6}>
              <IconButton color="secondary" size="small" onClick={onEdit}>
                <EditIcon />
              </IconButton>
            </Grid>
            <Grid item xs={6}>
              <IconButton color="secondary" size="small" onClick={onDelete}>
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.padding}>
          {note}
        </Grid>
      </Box>
    </>
  );
}
