// src/components/PlayerNotes.jsx
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

import usePlayerNotes from "../hooks/usePlayerNotes";
import SearchBar from "./SearchBar";
import PlayerNoteSearch from "./PlayerNoteSearch";
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

export default function PlayerNotes() {
  const classes = useStyles();
  const { t } = useTranslation();
  const {
    notes: playerNotes,
    isLoading,
    error,
    create: createNote,
    update: updateNote,
    deleteNote,
  } = usePlayerNotes();

  // UI state
  const [game, setGame] = useState("");
  const [player, setPlayer] = useState("");
  const [filterId, setFilterId] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => setDrawerOpen((o) => !o);

  const [editorOpen, setEditorOpen] = useState(false);
  const toggleEditor = () => setEditorOpen((o) => !o);
  const [editId, setEditId] = useState("");
  const [editFilter, setEditFilter] = useState(null);
  const [editBody, setEditBody] = useState("");

  // build filters array from translations
  const filters = useMemo(() => {
    const raw = t("notes.common.filters.players", { returnObjects: true });
    return raw.map((f) => ({ label: f.name, value: f.id }));
  }, [t]);

  // compute which notes to display
  const displayedNotes = useMemo(() => {
    if (!game || !player) return [];
    return playerNotes.filter((n) => {
      const sameGame = n.game === game;
      const samePlayer = n.player === player;
      const sameFilter = filterId ? n.filter._id === filterId : true;
      return sameGame && samePlayer && sameFilter;
    });
  }, [playerNotes, game, player, filterId]);

  // sync search results into state
  const handleSearchSelect = ({ game: g, player: p, filter: f }) => {
    setGame(g);
    setPlayer(p);
    setFilterId(f || "");
  };

  // early loading/error UI
  if (isLoading) return <Typography>Loading notes…</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <section className="player-notes">
      {/* mobile quick‑add */}
      {game && player && (
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
                type="Player Note"
                filters={filters}
                error={createNote.error}
                onAdd={({ filter, note }) =>
                  createNote.mutate(
                    { filter, note, game, player },
                    { onSuccess: toggleDrawer }
                  )
                }
              />
            </Container>
          </Drawer>
        </Box>
      )}

      {/* search controls */}
      <SearchBar noteType="player" onSelect={handleSearchSelect} />

      <Container>
        <Grid container spacing={2}>
          {/* desktop search */}
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Grid item md={6} xs={12}>
              <Typography variant="h5" className={classes.spaced}>
                {t("header.notes.player")}
              </Typography>
              <PlayerNoteSearch
                onSelect={handleSearchSelect}
                playerOptions={[]}
              />
            </Grid>
          </Box>

          {/* notes list & desktop quick‑add */}
          <Grid item md={6} xs={12}>
            <Box sx={{ display: { xs: "block", sm: "none" } }}>
              <Typography variant="h5" className={classes.spaced}>
                {t("header.notes.player")}
              </Typography>
              {(!game || !player) && (
                <Typography variant="subtitle1">
                  {t("notes.common.clickSearch")}
                </Typography>
              )}
            </Box>

            {game && player && (
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
                        key={n._id}
                        filter={n.filter.name}
                        note={n.note}
                        onEdit={() => {
                          setEditId(n._id);
                          setEditBody(n.note);
                          setEditFilter({
                            label: n.filter.name,
                            value: n.filter._id,
                          });
                          toggleEditor();
                        }}
                        onDelete={() => deleteNote.mutate({ noteId: n._id })}
                      />
                    ))
                  ) : (
                    <PopulateNotes
                      filter={t("notes.common.notice")}
                      note={t("notes.common.noNotes")}
                      onEdit={() => {}}
                      onDelete={() => {}}
                    />
                  )}
                </Grid>
                <Box sx={{ display: { xs: "none", sm: "block" } }}>
                  <QuickAddNote
                    type="Player Note"
                    filters={filters}
                    error={createNote.error}
                    onAdd={({ filter, note }) =>
                      createNote.mutate({ filter, note, game, player })
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
