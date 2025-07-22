// src/components/PlayerNotes.js
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Navigate, Link as RouterLink } from "react-router-dom";
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
import { makeStyles } from "@mui/styles";
import AddIcon from "@mui/icons-material/Add";
import Select from "react-select";
import { useTranslation } from "react-i18next";

import PlayerNoteSearch from "./PlayerNoteSearch";
import PopulateNotes from "./PopulateNotes";
import QuickAddNote from "./QuickAddNote";
import SearchBar from "./SearchBar";

import { NoteContext } from "../contexts/NoteContext";
import { UserContext } from "../contexts/UserContext";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: "50%",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  button: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  spaced: {
    marginBottom: theme.spacing(2),
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  wrapper: {
    padding: theme.spacing(3),
  },
  noteList: {
    marginLeft: `-${theme.spacing(2)}px`,
    marginBottom: theme.spacing(8),
  },
}));

export default function PlayerNotes() {
  const { t } = useTranslation();
  const classes = useStyles();

  const { user } = useContext(UserContext);
  const {
    playerNotes,
    error,
    editNote,
    toggleNoteEditor,
    noteEditor,
    player,
    playerNotesFilter: filter,
    playerNotesGame: game,
    displayedPlayerNotes: displayedNotes,
    setDisplayedPlayerNotes: setDisplayedNotes,
  } = useContext(NoteContext);

  const filters = useMemo(() => {
    const raw = t("notes.common.filters.players", { returnObjects: true });
    return raw.map((f) => ({ _id: f.id, name: f.name }));
  }, [t]);

  const filterNameById = (id) => filters.find((f) => f._id === id)?.name || id;

  const [editFilter, setEditFilter] = useState(null);
  const [noteBody, setNoteBody] = useState("");
  const [noteId, setNoteId] = useState("");
  const [noteDrawer, setNoteDrawer] = useState(false);
  const toggleNoteDrawer = () => setNoteDrawer((o) => !o);

  useEffect(() => {
    if (!game || !player) {
      setDisplayedNotes([]);
      return;
    }
    const notes = playerNotes.filter((n) => {
      const sameGame = n.game === game;
      const samePlayer = n.player === player;
      const sameFilter = filter ? n.filter._id === filter : true;
      return sameGame && samePlayer && sameFilter;
    });
    setDisplayedNotes(notes);
  }, [playerNotes, game, player, filter, setDisplayedNotes]);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <section className="player-notes">
      {game && player && (
        <Hidden smUp>
          <Fab
            className={classes.fab}
            color="primary"
            aria-label={t("notes.common.quickAdd")}
            onClick={toggleNoteDrawer}
          >
            <AddIcon />
          </Fab>

          <Drawer anchor="bottom" open={noteDrawer} onClose={toggleNoteDrawer}>
            <Container className={classes.wrapper}>
              <QuickAddNote
                game={game}
                player={player}
                filters={filters}
                type="Player Note"
              />
            </Container>
          </Drawer>
        </Hidden>
      )}

      <SearchBar noteType="player" />

      <Container>
        <Grid container spacing={2}>
          <Hidden xsDown>
            <Grid item md={6} xs={12}>
              <Typography variant="h5" className={classes.spaced}>
                {t("header.notes.player")}
              </Typography>
              <PlayerNoteSearch />
            </Grid>
          </Hidden>

          <Grid item md={6} xs={12}>
            <Hidden smUp>
              <Typography variant="h5" className={classes.spaced}>
                {t("header.notes.player")}
              </Typography>
              {(!game || !player) && (
                <Typography variant="subtitle1">
                  {t("notes.common.clickSearch")}
                </Typography>
              )}
            </Hidden>

            {game && player && (
              <Container>
                <Hidden xsDown>
                  <Typography variant="h5" className={classes.spaced}>
                    {t("notes.common.notes")}
                  </Typography>
                </Hidden>

                <Grid container className={classes.noteList}>
                  {displayedNotes.length ? (
                    displayedNotes.map((n) => (
                      <PopulateNotes
                        key={n._id}
                        id={n._id}
                        note={n.note}
                        filter={filterNameById(n.filter._id)}
                        filterId={n.filter._id}
                        setEditFilter={setEditFilter}
                        setNoteBody={setNoteBody}
                        setNoteId={setNoteId}
                      />
                    ))
                  ) : (
                    <PopulateNotes
                      filter={t("notes.common.notice")}
                      note={t("notes.common.noNotes")}
                    />
                  )}
                </Grid>

                <Hidden xsDown>
                  <QuickAddNote
                    game={game}
                    player={player}
                    filters={filters}
                    type="Player Note"
                  />
                </Hidden>
              </Container>
            )}
          </Grid>
        </Grid>
      </Container>

      <Modal
        aria-labelledby="editor-title"
        open={noteEditor}
        onClose={() => {
          setNoteId("");
          setEditFilter(null);
          setNoteBody("");
          toggleNoteEditor();
        }}
      >
        <Container className={classes.paper}>
          <Typography variant="h5" id="editor-title" className={classes.spaced}>
            {t("notes.common.editing")}
          </Typography>

          {error && (
            <Typography variant="body1" color="error">
              Error: {error}
            </Typography>
          )}

          <Typography variant="h6">{t("notes.common.filter")}</Typography>
          <Select
            options={filters.map((f) => ({
              label: f.name,
              value: f._id,
            }))}
            onChange={(e) =>
              setEditFilter(e ? { label: e.label, value: e.value } : null)
            }
            defaultValue={editFilter || undefined}
            className={classes.spaced}
          />

          <TextField
            multiline
            fullWidth
            value={noteBody}
            onChange={(e) => setNoteBody(e.target.value)}
          />

          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => {
              if (!editFilter) return;
              const ok = editNote(
                "Player Note",
                noteId,
                editFilter.value,
                noteBody
              );
              if (ok) {
                setNoteId("");
                setEditFilter(null);
                setNoteBody("");
                toggleNoteEditor();
              }
            }}
          >
            {t("notes.common.edit")}
          </Button>

          <Button
            className={classes.button}
            onClick={() => {
              setNoteId("");
              setEditFilter(null);
              setNoteBody("");
              toggleNoteEditor();
            }}
          >
            {t("notes.common.cancel")}
          </Button>
        </Container>
      </Modal>
    </section>
  );
}
