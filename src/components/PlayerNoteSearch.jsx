import React, { useContext } from "react";
import { Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Select from "react-select";
import Creatable from "react-select/creatable";
import { useTranslation } from "react-i18next";
import { NoteContext } from "../contexts/NoteContext";

const useStyles = makeStyles((theme) => ({
  spaced: {
    marginBottom: theme.spacing(2),
  },
}));

export default function PlayerNoteSearch() {
  const classes = useStyles();
  const { t } = useTranslation();
  const {
    setPlayerNotesGame: setGame,
    setPlayer,
    setPlayerNotesFilter: setFilter,
    players,
    playerNotesFilter: filter,
  } = useContext(NoteContext);

  const games = t("games", { returnObjects: true });
  const filters = t("notes.common.filters.players", {
    returnObjects: true,
  });

  return (
    <>
      <Typography variant="h6" className={classes.spaced}>
        {t("notes.opponent")}
      </Typography>
      <Creatable
        options={players.map((p) => ({ label: p, value: p }))}
        onChange={(e) => setPlayer(e?.value ?? "")}
        className={classes.spaced}
      />

      <Typography variant="h6" className={classes.spaced}>
        {t("notes.common.game")}
      </Typography>
      <Select
        options={games.map((g) => ({ label: g.name, value: g.id }))}
        onChange={(e) => setGame(e?.value ?? "")}
        className={classes.spaced}
      />

      <Typography variant="h6" className={classes.spaced}>
        {t("notes.filter.choose")}
      </Typography>
      <Select
        options={filters.map((f) => ({ label: f.name, value: f.id }))}
        onChange={(e) => setFilter(e?.value ?? "")}
        className={classes.spaced}
      />

      {filter !== "" && (
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => setFilter("")}
        >
          {t("notes.filter.clear")}
        </Button>
      )}
    </>
  );
}
