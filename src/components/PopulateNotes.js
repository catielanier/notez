import React from "react";
import { Grid, IconButton, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles(theme => ({
  border: {
    borderBottom: `1px solid lightgrey`,
    verticalAlign: "center"
  },
  padding: {
    borderBottom: `1px solid lightgrey`,
    paddingTop: "3px"
  },
  filterName: {
    fontWeight: "bold"
  }
}));

function PopulateNotes(props) {
  const classes = useStyles();
  return (
    <>
      <Grid item md={3} xs={4} className={classes.padding}>
        <Typography
          variant="span"
          color="secondary"
          className={classes.filterName}
        >
          {props.language === "ja"
            ? props.filter_ja
            : props.language === "ko"
            ? props.filter_ko
            : props.language === "zh-CN"
            ? props["filter_zh-cn"]
            : props.language === "zh-HK"
            ? props["filter_zh-hk"]
            : props.language === "zh-TW"
            ? props["filter_zh-tw"]
            : props.filter}
          :
        </Typography>
      </Grid>
      {props.filter !== "Notice" ? (
        <>
          <Grid item md={7} xs={5} className={classes.padding}>
            {props.note}
          </Grid>
          <Grid item md={2} xs={3} className={classes.border}>
            <Grid container>
              <Grid item md={6}>
                <IconButton
                  color="secondary"
                  size="small"
                  onClick={() =>
                    props.showEditor(props.id, props.filterId, props.note)
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
        <Grid item md={9} className={classes.padding}>
          {props.note}
        </Grid>
      )}
    </>
  );
}

export default PopulateNotes;
