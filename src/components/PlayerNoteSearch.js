import React, { useContext } from "react";
import { Typography, Button, makeStyles } from "@material-ui/core";
import Select from "react-select";
import Creatable from "react-select/creatable";
import localeSelect from "../services/localeSelect";
import dbLocale from "../services/dbLocale";
import { NoteContext } from "../contexts/NoteContext";
import { GameContext } from "../contexts/GameContext";
import {
  chooseGame,
  chooseFilter,
  clearFilter,
  chooseOpponent,
} from "../data/locales";
import { LanguageContext } from "../contexts/LanguageContext";

const useStyles = makeStyles((theme) => ({
  spaced: {
    marginBottom: theme.spacing(2),
  },
}));

export default function PlayerNoteSearch() {
  const classes = useStyles();
  const { language } = useContext(LanguageContext);
  const {
    setPlayerNotesGame: setGame,
    setPlayer,
    setPlayerNotesFilter: setFilter,
    players,
    playerFilters: filters,
    playerNotesFilter: filter,
  } = useContext(NoteContext);
  const { games } = useContext(GameContext);
  return (
    <>
      <Typography variant="h6">
        {localeSelect(language, chooseOpponent)}
      </Typography>
      <Creatable
        options={players.map((player) => {
          return { label: player, value: player };
        })}
        onChange={(e) => {
          setPlayer(e.value);
        }}
        className={classes.spaced}
      />
      <Typography variant="h6">{localeSelect(language, chooseGame)}</Typography>
      <Select
        options={games.map((game) => {
          return {
            label: dbLocale(language, game),
            value: game._id,
          };
        })}
        onChange={(e) => {
          setGame(e.value);
        }}
        className={classes.spaced}
      />
      <Typography variant="h6">
        {localeSelect(language, chooseFilter)}
      </Typography>
      <Select
        options={filters.map((filter) => {
          return {
            label: dbLocale(language, filter),
            value: filter._id,
          };
        })}
        onChange={(e) => {
          setFilter(e.value);
        }}
        className={classes.spaced}
      />
      {filter !== "" && (
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => {
            setFilter("");
          }}
        >
          {localeSelect(language, clearFilter)}
        </Button>
      )}
    </>
  );
}
