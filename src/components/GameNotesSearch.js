import React, { useContext, useEffect } from "react";
import { Typography, Button, makeStyles } from "@material-ui/core";
import Select from "react-select";
import { LanguageContext } from "../contexts/LanguageContext";
import { GameContext } from "../contexts/GameContext";
import localeSelect from "../services/localeSelect";
import dbLocale from "../services/dbLocale";
import {
  chooseGame,
  yourCharacter as yourCharacterLocale,
  opponentCharacter as opponentCharacterLocale,
  chooseFilter,
  clearFilter,
} from "../data/locales";
import { NoteContext } from "../contexts/NoteContext";

const useStyles = makeStyles((theme) => ({
  spaced: {
    marginBottom: theme.spacing(2),
  },
}));

export default function GameNotesSearch() {
  const classes = useStyles();
  const { language } = useContext(LanguageContext);
  const { games, updateDropdowns, characters, filters } = useContext(
    GameContext
  );
  const {
    gameNotesGame: game,
    setGameNotesGame: setGame,
    setMyCharacter,
    setOpponentCharacter,
    gameNotesFilter: myFilter,
    setGameNotesFilter: setMyFilter,
    setDisplayedGameNotes: setDisplayedNotes,
  } = useContext(NoteContext);

  // Effect called to grab characters and filters from chosen game, and set them to state.
  useEffect(() => {
    if (game !== "") {
      setMyCharacter("");
      setMyFilter("");
      setOpponentCharacter("");
      setDisplayedNotes([]);
      updateDropdowns(game, "game");
    }
  }, [game, games, language]);

  return (
    <>
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
        {localeSelect(language, yourCharacterLocale)}
      </Typography>
      <Select
        options={characters.map((character) => {
          return {
            label: dbLocale(language, character),
            value: character._id,
          };
        })}
        onChange={(e) => {
          setMyCharacter(e.value);
        }}
        className={classes.spaced}
      />
      <Typography variant="h6">
        {localeSelect(language, opponentCharacterLocale)}
      </Typography>
      <Select
        options={characters.map((character) => {
          return {
            label: dbLocale(language, character),
            value: character._id,
          };
        })}
        onChange={(e) => {
          setOpponentCharacter(e.value);
        }}
        className={classes.spaced}
      />
      <Typography variant="h6">
        {localeSelect(language, chooseFilter)}
      </Typography>
      <Select
        options={filters.map((x) => {
          return {
            label: dbLocale(language, x),
            value: x._id,
          };
        })}
        onChange={(e) => {
          setMyFilter(e.value);
        }}
        className={classes.spaced}
      />
      {myFilter !== "" && (
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => {
            setMyFilter("");
          }}
        >
          {localeSelect(language, clearFilter)}
        </Button>
      )}
    </>
  );
}
