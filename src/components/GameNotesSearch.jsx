// src/components/GameNotesSearch.jsx
import React, { useState, useEffect, useMemo } from "react";
import { Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Select from "react-select";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  spaced: {
    marginBottom: theme.spacing(2),
  },
}));

export default function GameNotesSearch({ onSelect }) {
  const classes = useStyles();
  const { t } = useTranslation();

  // master games list from translations
  const games = t("games", { returnObjects: true });

  // local selection state
  const [selectedGame, setSelectedGame] = useState("");
  const [selectedMe, setSelectedMe] = useState("");
  const [selectedOpp, setSelectedOpp] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");

  // dynamic options
  const [charOptions, setCharOptions] = useState([]);
  const [filterOptions, setFilterOptions] = useState([]);

  // build game dropdown options
  const gameOptions = useMemo(
    () => games.map((g) => ({ label: g.name, value: g.id })),
    [games]
  );

  // when the selected game changes, reset downstream state and rebuild options
  useEffect(() => {
    if (!selectedGame) {
      setCharOptions([]);
      setFilterOptions([]);
      setSelectedMe("");
      setSelectedOpp("");
      setSelectedFilter("");
      onSelect({ game: "", me: "", opp: "", filter: "" });
      return;
    }

    const sel = games.find((g) => g.id === selectedGame);
    if (!sel) return;

    // characters for both "you" and "opponent"
    setCharOptions(sel.characters.map((c) => ({ label: c.name, value: c.id })));

    // combine game‑specific and common filters
    const commonGameFilters = t("notes.common.filters.games", {
      returnObjects: true,
    });
    const combined = [...sel.filters, ...commonGameFilters];
    setFilterOptions(combined.map((f) => ({ label: f.name, value: f.id })));

    // notify parent about reset
    onSelect({ game: sel.id, me: "", opp: "", filter: "" });
  }, [selectedGame, games, t, onSelect]);

  // whenever any selection updates, propagate to parent
  useEffect(() => {
    onSelect({
      game: selectedGame,
      me: selectedMe,
      opp: selectedOpp,
      filter: selectedFilter,
    });
  }, [selectedGame, selectedMe, selectedOpp, selectedFilter, onSelect]);

  return (
    <>
      <Typography variant="h6">{t("notes.common.game")}</Typography>
      <Select
        options={gameOptions}
        value={gameOptions.find((o) => o.value === selectedGame) || null}
        onChange={(e) => setSelectedGame(e?.value || "")}
        className={classes.spaced}
      />

      <Typography variant="h6">{t("notes.character.you")}</Typography>
      <Select
        isDisabled={!selectedGame}
        options={charOptions}
        value={charOptions.find((o) => o.value === selectedMe) || null}
        onChange={(e) => setSelectedMe(e?.value || "")}
        className={classes.spaced}
      />

      <Typography variant="h6">{t("notes.character.opponent")}</Typography>
      <Select
        isDisabled={!selectedGame}
        options={charOptions}
        value={charOptions.find((o) => o.value === selectedOpp) || null}
        onChange={(e) => setSelectedOpp(e?.value || "")}
        className={classes.spaced}
      />

      <Typography variant="h6">{t("notes.filter.choose")}</Typography>
      <Select
        isDisabled={!selectedGame}
        options={filterOptions}
        value={filterOptions.find((o) => o.value === selectedFilter) || null}
        onChange={(e) => setSelectedFilter(e?.value || "")}
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
