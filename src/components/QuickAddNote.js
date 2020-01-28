import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Button
} from "@material-ui/core";
import Select from "react-select";
import localeSelect from "../services/localeSelect";
import {
  quickAdd,
  universalNote,
  newNoteFilter,
  newNote,
  createNote
} from "../data/locales";
import dbLocale from "../services/dbLocale";
import { LanguageContext } from "../contexts/LanguageContext";
import { NoteContext } from "../contexts/NoteContext";

const useStyles = makeStyles(theme => ({
  spaced: {
    marginBottom: theme.spacing(2)
  }
}));

export default function QuickAddNote(props) {
  const classes = useStyles();
  const { language } = useContext(LanguageContext);
  const { postNote, loading, error } = useContext(NoteContext);
  const [note, setNote] = useState("");
  const [filter, setFilter] = useState("");
  const [universal, setUniversal] = useState(false);

  const toggleUniversal = () => {
    setUniversal(!universal);
  };

  return (
    <div className="quick-add">
      <Typography variant="h5" className={classes.spaced}>
        {localeSelect(language, quickAdd)}
      </Typography>
      {error && (
        <p>
          <span>Error:</span> {error}
        </p>
      )}
      {props.type === "Game Note" && (
        <FormControlLabel
          control={
            <Checkbox
              checked={universal}
              onChange={toggleUniversal}
              value={universal}
              color="primary"
            />
          }
          label={localeSelect(language, universalNote)}
          className={classes.spaced}
        />
      )}
      <Typography variant="h6">
        {localeSelect(language, newNoteFilter)}
      </Typography>
      <Select
        options={props.filters.map(filter => {
          return {
            label: dbLocale(language, filter),
            value: filter._id
          };
        })}
        onChange={e => {
          setFilter(e.target.value);
        }}
        className={classes.spaced}
      />
      <Typography variant="h6">{localeSelect(language, newNote)}</Typography>
      <TextField
        multiline
        value={note}
        onChange={e => {
          setNote(e.target.value);
        }}
        fullWidth
        className={classes.spaced}
      />
      <Button
        onClick={() => {
          if (props.type === "Game Note") {
            postNote(
              props.type,
              props.game,
              props.opponentCharacter,
              filter,
              note,
              props.myCharacter,
              universal
            );
          } else if (props.type === "Player Note") {
            postNote(props.type, props.game, props.player, filter, note);
          }
        }}
        variant="contained"
        color="primary"
      >
        {localeSelect(language, createNote)}
      </Button>
    </div>
  );
}
