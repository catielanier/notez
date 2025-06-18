import { Button, makeStyles, Typography } from "@material-ui/core";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import Creatable from "react-select/creatable";
import { GameContext } from "../contexts/GameContext";
import { LanguageContext } from "../contexts/LanguageContext";
import { NoteContext } from "../contexts/NoteContext";
import dbLocale from "../services/dbLocale";

const useStyles = makeStyles((theme) => ({
  spaced: {
    marginBottom: theme.spacing(2),
  },
}));

export default function PlayerNoteSearch() {
  const { t } = useTranslation();
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
      <Typography variant="h6">{t("notes.opponent")}</Typography>
      <Creatable
        options={players.map((player) => {
          return { label: player, value: player };
        })}
        onChange={(e) => {
          setPlayer(e.value);
        }}
        className={classes.spaced}
      />
      <Typography variant="h6">{t("notes.common.game")}</Typography>
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
      <Typography variant="h6">{t("notes.filter.choose")}</Typography>
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
          {t("notes.filter.clear")}
        </Button>
      )}
    </>
  );
}
