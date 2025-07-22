import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Container,
  Drawer,
  Fab,
  Grid,
  Hidden,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { makeStyles } from "@mui/styles";
import { useTranslation } from "react-i18next";
import Select from "react-select";

import useGameNotes from "../hooks/useGameNotes";
import GameNotesSearch from "./GameNotesSearch";
import PopulateNotes from "./PopulateNotes";
import QuickAddNote from "./QuickAddNote";
import SearchBar from "./SearchBar";

const useStyles = makeStyles((theme) => ({
  /* …your styles… */
}));

export default function GameNotes() {
  const { t } = useTranslation();
  const classes = useStyles();

  const {
    notes,
    isLoading,
    error,
    create: createNote,
    update: updateNote,
    deleteNote,
  } = useGameNotes();

  // all your existing UI state:
  const [game, setGame] = useState("");
  const [myCharacter, setMyCharacter] = useState("");
  const [opponentCharacter, setOppCharacter] = useState("");
  const [filterId, setFilterId] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => setDrawerOpen((o) => !o);
  const [noteEditor, setNoteEditor] = useState(false);
  const toggleNoteEditor = () => setNoteEditor((o) => !o);
  const [noteId, setNoteId] = useState("");
  const [editFilter, setEditFilter] = useState({});
  const [noteBody, setNoteBody] = useState("");

  // filters logic (unchanged)…
  const gamesTx = t("games", { returnObjects: true });
  const selectedGame = useMemo(
    () => gamesTx.find((g) => g.id === game) || { filters: [] },
    [gamesTx, game]
  );
  const commonFilters = t("notes.common.filters.games", {
    returnObjects: true,
  });
  const filters = useMemo(() => {
    const seen = new Set();
    return [...commonFilters, ...selectedGame.filters].filter(({ id }) => {
      if (seen.has(id)) return false;
      seen.add(id);
      return true;
    });
  }, [commonFilters, selectedGame]);

  // display logic
  const displayedNotes = useMemo(() => {
    if (!game || !myCharacter || !opponentCharacter) return [];
    return notes.filter((n) => {
      const sameGame = n.game === game;
      const sameChars =
        n.myCharacter === myCharacter &&
        (n.universal || n.opponentCharacter === opponentCharacter);
      const sameFilter = filterId ? n.filter.id === filterId : true;
      return sameGame && sameChars && sameFilter;
    });
  }, [notes, game, myCharacter, opponentCharacter, filterId]);

  // early renders
  if (isLoading) return <Typography>Loading…</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <section className="game-notes">
      {/* Quick‑add FAB on mobile */}
      {game && myCharacter && opponentCharacter && (
        <Hidden smUp>
          <Fab
            className={classes.fab}
            color="primary"
            aria-label={t("notes.common.quickAdd")}
            onClick={toggleDrawer}
          >
            <AddIcon />
          </Fab>
          <Drawer anchor="bottom" open={drawerOpen} onClose={toggleDrawer}>
            <Container className={classes.wrapper}>
              <QuickAddNote
                game={game}
                myCharacter={myCharacter}
                opponentCharacter={opponentCharacter}
                filters={filters}
                type="Game Note"
                onAdd={({ filter, note, universal }) =>
                  createNote.mutate(
                    {
                      filter,
                      note,
                      game,
                      myCharacter,
                      opponentCharacter,
                      universal,
                    },
                    { onSuccess: toggleDrawer }
                  )
                }
              />
            </Container>
          </Drawer>
        </Hidden>
      )}

      {/* SearchBar (make sure to lift out game/myCharacter/oppCharacter via onSelect) */}
      <SearchBar
        noteType="game"
        onSelect={({ game: g, me, opp, filter: f }) => {
          setGame(g);
          setMyCharacter(me);
          setOppCharacter(opp);
          setFilterId(f || "");
        }}
      />

      {/* …the rest of your grid/layout… */}

      <Grid container className={classes.noteList}>
        {displayedNotes.length ? (
          displayedNotes.map((n) => (
            <PopulateNotes
              key={n.id}
              id={n.id}
              note={n.note}
              filter={n.filter.name}
              filterId={n.filter.id}
              onEdit={() => {
                setNoteId(n.id);
                setNoteBody(n.note);
                setEditFilter({ label: n.filter.name, value: n.filter.id });
                toggleNoteEditor();
              }}
              onDelete={() => deleteNote.mutate({ noteId: n.id })}
            />
          ))
        ) : (
          <PopulateNotes
            filter={t("notes.common.notice")}
            note={t("notes.common.noNotes")}
          />
        )}
      </Grid>

      {/* …edit Modal (unchanged aside from updateNote.mutate)… */}
    </section>
  );
}
