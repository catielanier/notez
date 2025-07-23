import React, { useState, useEffect, useMemo } from "react";
import { Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  spaced: {
    marginBottom: theme.spacing(2),
  },
}));

export default function PlayerNoteSearch({ playerOptions, onSelect }) {
  const classes = useStyles();
  const { t } = useTranslation();

  // local selection state
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [selectedGame, setSelectedGame] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");

  // build dropdown options from translations
  const games = t("games", { returnObjects: true });
  const gameOptions = useMemo(
    () => games.map((g) => ({ label: g.name, value: g.id })),
    [games]
  );
  const filterList = t("notes.common.filters.players", {
    returnObjects: true,
  });
  const filterOptions = useMemo(
    () => filterList.map((f) => ({ label: f.name, value: f.id })),
    [filterList]
  );

  // whenever any selection changes, notify parent
  useEffect(() => {
    onSelect({
      game: selectedGame,
      player: selectedPlayer,
      filter: selectedFilter,
    });
  }, [selectedGame, selectedPlayer, selectedFilter, onSelect]);

  return (
    <>
      <Typography variant="h6" className={classes.spaced}>
        {t("notes.opponent")}
      </Typography>
      <CreatableSelect
        isClearable
        options={playerOptions}
        value={playerOptions.find((o) => o.value === selectedPlayer) || null}
        onChange={(opt) => setSelectedPlayer(opt?.value || "")}
        className={classes.spaced}
      />

      <Typography variant="h6" className={classes.spaced}>
        {t("notes.common.game")}
      </Typography>
      <Select
        isClearable
        options={gameOptions}
        value={gameOptions.find((o) => o.value === selectedGame) || null}
        onChange={(opt) => setSelectedGame(opt?.value || "")}
        className={classes.spaced}
      />

      <Typography variant="h6" className={classes.spaced}>
        {t("notes.filter.choose")}
      </Typography>
      <Select
        isClearable
        options={filterOptions}
        value={filterOptions.find((o) => o.value === selectedFilter) || null}
        onChange={(opt) => setSelectedFilter(opt?.value || "")}
        className={classes.spaced}
      />

      {selectedFilter && (
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => setSelectedFilter("")}
        >
          {t("notes.filter.clear")}
        </Button>
      )}
    </>
  );
}
