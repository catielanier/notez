import React from "react";
import { Grid, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

function PopulateNotes(props) {
  return (
    <>
      <Grid item md={2}>
        <span className="filter-name">{props.filter}</span>
      </Grid>
      {props.filter !== "Notice" ? (
        <>
          <Grid item md={8}>
            {props.note}
          </Grid>
          <Grid item md={2}>
            <Grid container>
              <Grid item md={6}>
                <IconButton
                  color="secondary"
                  size="small"
                  onClick={() =>
                    props.showEditor(props.id, props.filter, props.note)
                  }
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
        </>
      ) : (
        <Grid item md={10}>
          {props.note}
        </Grid>
      )}
    </>
  );
}

export default PopulateNotes;
