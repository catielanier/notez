import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Button
} from "@material-ui/core";
import Select from "react-select";
import axios from "axios";
import { getToken } from "../services/tokenService";
import localeSelect from "../services/localeSelect";
import {
  quickAdd,
  universalNote,
  newNoteFilter,
  newNote,
  createNote
} from "../data/locales";
import dbLocale from "../services/dbLocale";

const styles = theme => ({
  spaced: {
    marginBottom: theme.spacing(2)
  }
});

class QuickAddGameNote extends React.Component {
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
      loading: true,
      error: null
    });
    const { filter, note: noteBody, universal } = this.state;
    const { myCharacter, opponentCharacter, game, user } = this.props;
    let note = null;
    if (universal) {
      note = {
        filter,
        note: noteBody,
        myCharacter,
        game,
        universal
      };
    } else {
      note = {
        filter,
        note: noteBody,
        myCharacter,
        opponentCharacter,
        game
      };
    }
    const token = await getToken();
    try {
      const res = await axios.post("/api/notes/game", {
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
        error: e.message
      });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div className="quick-add">
        <Typography variant="h5" className={classes.spaced}>
          {localeSelect(this.props.language, quickAdd)}
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.universal}
              onChange={this.handleCheck}
              value={this.state.universal}
              color="primary"
            />
          }
          label={localeSelect(this.props.language, universalNote)}
          className={classes.spaced}
        />
        <Typography variant="h6">
          {localeSelect(this.props.language, newNoteFilter)}
        </Typography>
        <Select
          options={this.props.filters.map(filter => {
            return {
              label: dbLocale(this.props.language, filter),
              value: filter._id
            };
          })}
          onChange={this.setFilter}
          className={classes.spaced}
        />
        <Typography variant="h6">
          {localeSelect(this.props.language, newNote)}
        </Typography>
        <TextField
          multiline
          name="note"
          value={this.state.note}
          onChange={this.setNote}
          fullWidth
          className={classes.spaced}
        />
        <Button onClick={this.postNote} variant="contained" color="primary">
          {localeSelect(this.props.language, createNote)}
        </Button>
      </div>
    );
  }
}

QuickAddGameNote.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(QuickAddGameNote);
