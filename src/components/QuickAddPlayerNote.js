import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { Typography, TextField, Button } from "@material-ui/core";
import Select from "react-select";
import axios from "axios";
import { getToken } from "../services/tokenService";

const styles = theme => ({
  spaced: {
    marginBottom: theme.spacing(2)
  }
});

class QuickAddPlayerNote extends React.Component {
  state = {
    filter: "",
    note: "",
    universal: false,
    loading: false,
    success: false,
    error: null
  };

  setFilter = e => {
    const filter = e.value;
    this.setState({
      filter
    });
  };

  handleCheck = e => {
    const universal = !this.state.universal;
    this.setState({
      universal
    });
  };

  setNote = e => {
    const note = e.target.value;
    this.setState({
      note
    });
  };

  postNote = async e => {
    e.preventDefault();
    this.setState({
      loading: true
    });
    const { filter, note: noteBody } = this.state;
    const { player, game, user } = this.props;
    const note = {
      filter,
      note: noteBody,
      player,
      game
    };
    const token = await getToken();
    try {
      const res = await axios.post("/api/notes/player", {
        token,
        user,
        note
      });
      await this.props.addToNotes(res.data.data);
      if (res) {
        this.setState({
          loading: false,
          success: true
        });
      }
    } catch (e) {
      this.setState({
        loading: false,
        error: e
      });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div className="quick-add">
        <Typography variant="h5" className={classes.spaced}>
          Quick Add:
        </Typography>
        <Typography variant="h6">New note filter:</Typography>
        <Select
          options={this.props.filters.map(filter => {
            return {
              label: filter.name,
              value: filter._id
            };
          })}
          onChange={this.setFilter}
          className={classes.spaced}
        />
        <Typography variant="h6">Note:</Typography>
        <TextField
          multiline
          name="note"
          value={this.state.note}
          onChange={this.setNote}
          fullWidth
          className={classes.spaced}
        />
        <Button onClick={this.postNote} variant="contained" color="primary">
          Create Note
        </Button>
      </div>
    );
  }
}

QuickAddPlayerNote.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(QuickAddPlayerNote);
