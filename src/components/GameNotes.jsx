import React, { useState, useMemo } from "react";
import {
  Box,
  Button,
  Container,
  Drawer,
  Fab,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import AddIcon from "@mui/icons-material/Add";
import Select from "react-select";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";

import useGameNotes from "../hooks/useGameNotes";
import { useUser } from "../contexts/UserContext";
import SearchBar from "./SearchBar";
import GameNotesSearch from "./GameNotesSearch";
import PopulateNotes from "./PopulateNotes";
import QuickAddNote from "./QuickAddNote";

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

export default function GameNotes() {
  const classes = useStyles();
  const { t } = useTranslation();
  const { user, isLoading: userLoading } = useUser();
  const {
    notes,
    isLoading: notesLoading,
    error,
    create: createNote,
    update: updateNote,
    deleteNote,
  } = useGameNotes();

  // local UI state
  const [game, setGame] = useState("");
  const [myCharacter, setMyCharacter] = useState("");
  const [opponentCharacter, setOpponentCharacter] = useState("");
  const [filterId, setFilterId] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editId, setEditId] = useState("");
  const [editFilter, setEditFilter] = useState(null);
  const [editBody, setEditBody] = useState("");

  const toggleDrawer = () => setDrawerOpen((o) => !o);
  const toggleEditor = () => setEditorOpen((o) => !o);

  // build filter list
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

  // compute displayed notes
  const displayedNotes = useMemo(() => {
    if (!game || !myCharacter || !opponentCharacter) return [];
    return notes.filter(
      (n) =>
        n.game === game &&
        n.myCharacter === myCharacter &&
        (n.universal || n.opponentCharacter === opponentCharacter) &&
        (!filterId || n.filter.id === filterId)
    );
  }, [notes, game, myCharacter, opponentCharacter, filterId]);

  // early guards
  if (userLoading) return <Typography>Loading user…</Typography>;
  if (!user) return <Navigate to="/" replace />;
  if (notesLoading) return <Typography>Loading notes…</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <section className="game-notes">
      {/* mobile quick‑add */}
      {game && myCharacter && opponentCharacter && (
        <Box sx={{ display: { xs: "block", sm: "none" } }}>
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
        </Box>
      )}

      {/* top‑level search bar */}
      <SearchBar
        noteType="game"
        onSelect={({ game: g, me, opp, filter: f }) => {
          setGame(g);
          setMyCharacter(me);
          setOpponentCharacter(opp);
          setFilterId(f || "");
        }}
      />

      <Container>
        <Grid container spacing={2}>
          {/* desktop search controls */}
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Grid item md={6} xs={12}>
              <Typography variant="h5" className={classes.spaced}>
                {t("header.notes.game")}
              </Typography>
              <GameNotesSearch
                onSelect={({ game: g, me, opp }) => {
                  setGame(g);
                  setMyCharacter(me);
                  setOpponentCharacter(opp);
                }}
              />
            </Grid>
          </Box>

          {/* notes list & desktop quick‑add */}
          <Grid item md={6} xs={12}>
            <Box sx={{ display: { xs: "block", sm: "none" } }}>
              <Typography variant="h5" className={classes.spaced}>
                {t("header.notes.game")}
              </Typography>
              {(!game || !myCharacter || !opponentCharacter) && (
                <Typography variant="subtitle1">
                  {t("notes.common.clickSearch")}
                </Typography>
              )}
            </Box>

            {game && myCharacter && opponentCharacter && (
              <>
                <Box sx={{ display: { xs: "none", sm: "block" } }}>
                  <Typography variant="h5" className={classes.spaced}>
                    {t("notes.common.notes")}
                  </Typography>
                </Box>
                <Grid container className={classes.noteList}>
                  {displayedNotes.length > 0 ? (
                    displayedNotes.map((n) => (
                      <PopulateNotes
                        key={n.id}
                        id={n.id}
                        note={n.note}
                        filter={n.filter.name}
                        filterId={n.filter.id}
                        onEdit={() => {
                          setEditId(n.id);
                          setEditBody(n.note);
                          setEditFilter({
                            label: n.filter.name,
                            value: n.filter.id,
                          });
                          toggleEditor();
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
                <Box sx={{ display: { xs: "none", sm: "block" } }}>
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
                        { onSuccess: toggleEditor }
                      )
                    }
                  />
                </Box>
              </>
            )}
          </Grid>
        </Grid>
      </Container>

      {/* edit modal */}
      <Modal
        open={editorOpen}
        onClose={() => {
          toggleEditor();
          setEditId("");
          setEditFilter(null);
          setEditBody("");
        }}
        aria-labelledby="editor-title"
      >
        <Container className={classes.paper}>
          <Typography variant="h5" id="editor-title" className={classes.spaced}>
            {t("notes.common.editing")}
          </Typography>
          <Typography variant="h6">{t("notes.common.filter")}</Typography>
          <Select
            options={filters}
            value={editFilter}
            onChange={(e) =>
              setEditFilter(e ? { label: e.label, value: e.value } : null)
            }
            className={classes.spaced}
          />
          <TextField
            multiline
            fullWidth
            value={editBody}
            onChange={(e) => setEditBody(e.target.value)}
            className={classes.spaced}
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => {
              updateNote.mutate(
                {
                  id: editId,
                  changes: { filter: editFilter.value, note: editBody },
                },
                { onSuccess: toggleEditor }
              );
            }}
          >
            {t("notes.common.edit")}
          </Button>
          <Button onClick={toggleEditor} className={classes.button}>
            {t("notes.common.cancel")}
          </Button>
        </Container>
      </Modal>
    </section>
  );
}
