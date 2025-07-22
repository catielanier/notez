import React, { useContext, useEffect, useMemo, useState } from "react";
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

import { NoteContext } from "../contexts/NoteContext";
import GameNotesSearch from "./GameNotesSearch";
import PopulateNotes from "./PopulateNotes";
import QuickAddNote from "./QuickAddNote";
import SearchBar from "./SearchBar";

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
  const { t } = useTranslation();
  const classes = useStyles();

  const {
    gameNotes,
    noteEditor,
    toggleNoteEditor,
    editNote,
    gameNotesGame: game,
    myCharacter,
    opponentCharacter,
    gameNotesFilter: myFilter,
    displayedGameNotes: displayedNotes,
    setDisplayedGameNotes: setDisplayedNotes,
    error,
  } = useContext(NoteContext);

  const [noteId, setNoteId] = useState("");
  const [editFilter, setEditFilter] = useState({});
  const [noteBody, setNoteBody] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => setDrawerOpen((o) => !o);

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

  useEffect(() => {
    if (!game || !myCharacter || !opponentCharacter) return;
    const matches = gameNotes.filter((n) => {
      const sameGame = n.game === game;
      const sameChars =
        n.myCharacter === myCharacter &&
        (n.universal || n.opponentCharacter === opponentCharacter);
      const sameFilter = myFilter ? n.filter.id === myFilter : true;
      return sameGame && sameChars && sameFilter;
    });
    setDisplayedNotes(matches);
  }, [
    game,
    myCharacter,
    opponentCharacter,
    myFilter,
    gameNotes,
    setDisplayedNotes,
  ]);

  return (
    <section className="game-notes">
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
              />
            </Container>
          </Drawer>
        </Hidden>
      )}

      <SearchBar noteType="game" />

      <Container>
        <Grid container spacing={2}>
          <Hidden xsDown>
            <Grid item md={6} xs={12}>
              <Typography variant="h5" className={classes.spaced}>
                {t("header.notes.game")}
              </Typography>
              <GameNotesSearch />
            </Grid>
          </Hidden>

          <Grid item md={6} xs={12}>
            <Hidden smUp>
              <Typography variant="h5" className={classes.spaced}>
                {t("header.notes.game")}
              </Typography>
              {!game || !myCharacter || !opponentCharacter ? (
                <Typography variant="subtitle1">
                  {t("notes.common.clickSearch")}
                </Typography>
              ) : null}
            </Hidden>

            {game && myCharacter && opponentCharacter && (
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
                        key={n.id}
                        id={n.id}
                        note={n.note}
                        filter={n.filter.name}
                        filterId={n.filter.id}
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
                    myCharacter={myCharacter}
                    opponentCharacter={opponentCharacter}
                    filters={filters}
                    type="Game Note"
                  />
                </Hidden>
              </Container>
            )}
          </Grid>
        </Grid>
      </Container>

      <Modal
        open={noteEditor}
        onClose={() => {
          setNoteId("");
          setEditFilter({});
          setNoteBody("");
          toggleNoteEditor();
        }}
        aria-labelledby="editor-title"
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
            options={filters.map((f) => ({ label: f.name, value: f.id }))}
            onChange={(e) =>
              setEditFilter(e ? { label: e.label, value: e.value } : {})
            }
            defaultValue={editFilter}
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
              const ok = editNote(
                "Game Note",
                noteId,
                editFilter.value,
                noteBody
              );
              if (ok) {
                setNoteId("");
                setEditFilter({});
                setNoteBody("");
                toggleNoteEditor();
              }
            }}
          >
            {t("notes.common.edit")}
          </Button>
          <Button className={classes.button} onClick={toggleNoteEditor}>
            {t("notes.common.cancel")}
          </Button>
        </Container>
      </Modal>
    </section>
  );
}
