import React from "react";
import { Grid } from "@material-ui/core";

function PopulateNotes(props) {
  return (
    <>
      <Grid item md={2}>
        <span className="filter-name">{props.filter}</span>
      </Grid>
      {props.filter !== "Notice" ? (
        <>
          <Grid item md={7}>
            {props.note}
          </Grid>
          <Grid item md={3}>
            Edit Delete
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
