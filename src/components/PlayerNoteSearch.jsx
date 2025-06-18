import { Button, makeStyles, Typography } from "@material-ui/core";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import Creatable from "react-select/creatable";
import { NoteContext } from "../contexts/NoteContext";

const useStyles = makeStyles((theme) => ({
  spaced: { marginBottom: theme.spacing(2) },
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
      <Typography variant="h6">{t("notes.opponent")}</Typography>
      <Creatable
        options={players.map((p) => ({ label: p, value: p }))}
        onChange={(e) => setPlayer(e?.value ?? "")}
        className={classes.spaced}
      />

      <Typography variant="h6">{t("notes.common.game")}</Typography>
      <Select
        options={games.map((g) => ({
          label: g.name, // already localised
          value: g.id, // stable identifier from the JSON
        }))}
        onChange={(e) => setGame(e?.value ?? "")}
        className={classes.spaced}
      />

      <Typography variant="h6">{t("notes.filter.choose")}</Typography>
      <Select
        options={filters.map((f) => ({
          label: typeof f === "string" ? f : f.label ?? f.name, // flexible
          value: typeof f === "string" ? f : f.value ?? f.id ?? f, // flexible
        }))}
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
