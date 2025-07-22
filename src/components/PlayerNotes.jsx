import React, { useEffect, useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
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

import { useUser } from "../contexts/UserContext"; // assume this hook returns { user, isLoading, error }
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
  const { t } = useTranslation();
  const classes = useStyles();

  // ensure user is logged in
  const { user, isLoading: userLoading } = useUser();
  const {
    notes: playerNotes,
    isLoading: notesLoading,
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

  // build filters array from i18n
  const filters = useMemo(() => {
    const raw = t("notes.common.filters.players", { returnObjects: true });
    return raw.map((f) => ({ label: f.name, value: f.id }));
  }, [t]);

  // filter down notes for display
  const displayedNotes = useMemo(() => {
    if (!game || !player) return [];
    return playerNotes.filter((n) => {
      const sameGame = n.game === game;
      const samePlayer = n.player === player;
      const sameFilter = filterId ? n.filter._id === filterId : true;
      return sameGame && samePlayer && sameFilter;
    });
  }, [playerNotes, game, player, filterId]);

  // sync URL/user search bar → state
  const handleSearchSelect = ({ game: g, player: p, filter: f }) => {
    setGame(g);
    setPlayer(p);
    setFilterId(f || "");
  };

  // inline loading / auth guard
  if (userLoading) return <Typography>Loading user…</Typography>;
  if (!user) return <Navigate to="/" replace />;
  if (notesLoading) return <Typography>Loading notes…</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <section className="player-notes">
      {/* Mobile Quick‑Add */}
      {game && player && (
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
                player={player}
                filters={filters}
                type="Player Note"
                onAdd={({ filter, note }) => {
                  createNote.mutate(
                    { filter, note, game, player },
                    { onSuccess: toggleDrawer }
                  );
                }}
              />
            </Container>
          </Drawer>
        </Hidden>
      )}

      {/* Search controls */}
      <SearchBar noteType="player" onSelect={handleSearchSelect} />

      <Container>
        <Grid container spacing={2}>
          {/* Desktop search */}
          <Hidden xsDown>
            <Grid item md={6} xs={12}>
              <Typography variant="h5" className={classes.spaced}>
                {t("header.notes.player")}
              </Typography>
              <PlayerNoteSearch onSelect={handleSearchSelect} />
            </Grid>
          </Hidden>

          {/* Notes list + desktop quick‑add */}
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
              <>
                <Hidden xsDown>
                  <Typography variant="h5" className={classes.spaced}>
                    {t("notes.common.notes")}
                  </Typography>
                </Hidden>

                <Grid container className={classes.noteList}>
                  {displayedNotes.length > 0 ? (
                    displayedNotes.map((n) => (
                      <PopulateNotes
                        key={n._id}
                        id={n._id}
                        note={n.note}
                        filter={n.filter.name}
                        filterId={n.filter._id}
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
                    />
                  )}
                </Grid>

                <Hidden xsDown>
                  <QuickAddNote
                    game={game}
                    player={player}
                    filters={filters}
                    type="Player Note"
                    onAdd={({ filter, note }) =>
                      createNote.mutate({ filter, note, game, player })
                    }
                  />
                </Hidden>
              </>
            )}
          </Grid>
        </Grid>
      </Container>

      {/* Edit Modal */}
      <Modal
        aria-labelledby="editor-title"
        open={editorOpen}
        onClose={() => {
          toggleEditor();
          setEditId("");
          setEditFilter(null);
          setEditBody("");
        }}
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
            onClick={() => {
              updateNote.mutate(
                {
                  id: editId,
                  changes: { filter: editFilter.value, note: editBody },
                },
                { onSuccess: toggleEditor }
              );
            }}
            className={classes.button}
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
