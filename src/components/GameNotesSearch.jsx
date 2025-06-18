import { Button, makeStyles, Typography } from "@material-ui/core";
import { useContext, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import { LanguageContext } from "../contexts/LanguageContext";
import { NoteContext } from "../contexts/NoteContext";

const useStyles = makeStyles((theme) => ({
  spaced: { marginBottom: theme.spacing(2) },
}));

export default function GameNotesSearch() {
  const classes = useStyles();
  const { t } = useTranslation();
  const { language } = useContext(LanguageContext);
  const {
    gameNotesGame: game,
    setGameNotesGame: setGame,
    setMyCharacter,
    setOpponentCharacter,
    gameNotesFilter: myFilter,
    setGameNotesFilter: setMyFilter,
    setDisplayedGameNotes: setDisplayedNotes,
  } = useContext(NoteContext);

  const games = t("games", { returnObjects: true });
  const [charOptions, setCharOptions] = useState([]);
  const [filterOptions, setFilterOptions] = useState([]);

  useEffect(() => {
    if (!game) {
      setCharOptions([]);
      setFilterOptions([]);
      return;
    }

    const selected = games.find((g) => g.id === game);
    if (!selected) return;

    setCharOptions(
      selected.characters.map((c) => ({
        label: c.name,
        value: c.id,
      }))
    );

    const commonGameFilters = t("notes.common.filters.games", {
      returnObjects: true,
    });

    const combinedFilters = [...selected.filters, ...commonGameFilters];

    setFilterOptions(
      combinedFilters.map((f) => ({
        label: f.name,
        value: f.id,
      }))
    );
  }, [game, language, games, t]);

  useEffect(() => {
    if (!game) return;
    setMyCharacter("");
    setOpponentCharacter("");
    setMyFilter("");
    setDisplayedNotes([]);
    updateDropdowns(game, "game");
  }, [
    game,
    setMyCharacter,
    setOpponentCharacter,
    setMyFilter,
    setDisplayedNotes,
    updateDropdowns,
  ]);

  const gameOptions = useMemo(
    () => games.map((g) => ({ label: g.name, value: g.id })),
    [games]
  );

  return (
    <>
      <Typography variant="h6">{t("notes.common.game")}</Typography>
      <Select
        options={gameOptions}
        value={gameOptions.find((o) => o.value === game) || null}
        onChange={(e) => setGame(e?.value || "")}
        className={classes.spaced}
      />

      <Typography variant="h6">{t("notes.character.you")}</Typography>
      <Select
        isDisabled={!game}
        options={charOptions}
        onChange={(e) => setMyCharacter(e?.value || "")}
        className={classes.spaced}
      />

      <Typography variant="h6">{t("notes.character.opponent")}</Typography>
      <Select
        isDisabled={!game}
        options={charOptions}
        onChange={(e) => setOpponentCharacter(e?.value || "")}
        className={classes.spaced}
      />

      <Typography variant="h6">{t("notes.filter.choose")}</Typography>
      <Select
        isDisabled={!game}
        options={filterOptions}
        onChange={(e) => setMyFilter(e?.value || "")}
        className={classes.spaced}
      />

      {myFilter && (
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => setMyFilter("")}
        >
          {t("notes.filter.clear")}
        </Button>
      )}
    </>
  );
}
