import React, { useContext, useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Button,
  Modal,
  TextField,
  Hidden,
  Fab,
  Drawer,
  makeStyles,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Select from "react-select";
import QuickAddNote from "./QuickAddNote";
import PopulateNotes from "./PopulateNotes";
import SearchBar from "./SearchBar";
import GameNotesSearch from "./GameNotesSearch";
import localeSelect from "../services/localeSelect";
import {
  gameNotes as gameNotesLocale,
  notes,
  notice,
  noNotes,
  editingNote,
  filter as filterLocale,
  editNote as editNoteLocale,
  cancel,
  quickAdd,
} from "../data/locales";
import dbLocale from "../services/dbLocale";
import { NoteContext } from "../contexts/NoteContext";
import { GameContext } from "../contexts/GameContext";
import { LanguageContext } from "../contexts/LanguageContext";

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
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  wrapper: {
    padding: theme.spacing(3),
  },
}));

export default function GameNotes() {
  const classes = useStyles();
  const {
    gameNotes,
    loading,
    error,
    noteEditor,
    toggleNoteEditor,
    editNote,
    gameNotesGame: game,
    myCharacter,
    opponentCharacter,
    gameNotesFilter: myFilter,
    displayedGameNotes: displayedNotes,
    setDisplayedGameNotes: setDisplayedNotes,
  } = useContext(NoteContext);
  const { filters } = useContext(GameContext);
  const { language } = useContext(LanguageContext);
  const [noteId, setNoteId] = useState("");
  const [editFilter, setEditFilter] = useState({});
  const [noteBody, setNoteBody] = useState("");
  const [noteDrawer, setNoteDrawer] = useState(false);
  const showNoteDrawer = () => {
    setNoteDrawer(!noteDrawer);
  };

  useEffect(() => {
    if (myCharacter !== "" && opponentCharacter !== "" && myFilter !== "") {
      const notes = [];
      gameNotes.forEach((note) => {
        if (
          game === note.game &&
          myCharacter === note.myCharacter &&
          opponentCharacter === note.opponentCharacter &&
          myFilter === note.filter._id
        ) {
          notes.push(note);
        }
        if (
          game === note.game &&
          myCharacter === note.myCharacter &&
          note.universal === true &&
          myFilter === note.filter._id
        ) {
          notes.push(note);
        }
      });
      setDisplayedNotes(notes);
    } else if (
      myCharacter !== "" &&
      opponentCharacter !== "" &&
      myFilter === ""
    ) {
      const notes = [];
      gameNotes.forEach((note) => {
        if (
          game === note.game &&
          myCharacter === note.myCharacter &&
          opponentCharacter === note.opponentCharacter
        ) {
          notes.push(note);
        }
        if (
          game === note.game &&
          myCharacter === note.myCharacter &&
          note.universal === true
        ) {
          notes.push(note);
        }
      });
      setDisplayedNotes(notes);
    }
  }, [myFilter, myCharacter, opponentCharacter, gameNotes, game]);

  return (
    <section className="game-notes">
      {game !== "" && myCharacter !== "" && opponentCharacter !== "" && (
        <Hidden smUp>
          <Fab
            className={classes.fab}
            color="secondary"
            dark
            aria-label={localeSelect(language, quickAdd)}
            onClick={showNoteDrawer}
          >
            <AddIcon />
          </Fab>
          <Drawer anchor="bottom" open={noteDrawer} onClose={showNoteDrawer}>
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
                {localeSelect(language, gameNotesLocale)}
              </Typography>
              <GameNotesSearch />
            </Grid>
          </Hidden>
          <Grid item md={6} xs={12}>
            <Hidden smUp>
              <Typography variant="h5" className={classes.spaced}>
                {localeSelect(language, gameNotesLocale)}
              </Typography>
              {(game === "" ||
                myCharacter === "" ||
                opponentCharacter === "") && (
                <Typography variant="subtitle">
                  Click the search button to find your notes.
                </Typography>
              )}
            </Hidden>
            {game !== "" && myCharacter !== "" && opponentCharacter !== "" && (
              <Container>
                <Hidden xsDown>
                  <Typography variant="h5" className={classes.spaced}>
                    {localeSelect(language, notes)}
                  </Typography>
                </Hidden>
                <Grid container className={classes.spaced}>
                  {displayedNotes.length > 0 ? (
                    displayedNotes.map((note) => {
                      return (
                        <PopulateNotes
                          key={note._id}
                          id={note._id}
                          note={note.note}
                          filter={dbLocale(language, note.filter)}
                          filterId={note.filter._id}
                          setEditFilter={setEditFilter}
                          setNoteBody={setNoteBody}
                          setNoteId={setNoteId}
                        />
                      );
                    })
                  ) : (
                    <PopulateNotes
                      filter={localeSelect(language, notice)}
                      note={localeSelect(language, noNotes)}
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
        aria-labelledby="editor-title"
        open={noteEditor}
        onClose={() => {
          setNoteId("");
          setEditFilter({});
          setNoteBody("");
          toggleNoteEditor();
        }}
      >
        <Container className={classes.paper}>
          <Typography variant="h5" id="editor-title" className={classes.spaced}>
            {localeSelect(language, editingNote)}
          </Typography>
          {error && <Typography variant="body1">Error: ${error}</Typography>}
          <Typography variant="h6">
            {localeSelect(language, filterLocale)}
          </Typography>
          <Select
            options={filters.map((filter) => {
              return {
                label: dbLocale(language, filter),
                value: filter._id,
              };
            })}
            onChange={(e) => {
              setEditFilter({ label: e.label, value: e.value });
            }}
            defaultValue={editFilter}
            className={classes.spaced}
          />
          <TextField
            multiline
            name="note"
            value={noteBody}
            onChange={(e) => {
              setNoteBody(e.target.value);
            }}
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => {
              const result = editNote(
                "Game Note",
                noteId,
                editFilter.value,
                noteBody
              );
              if (result === true) {
                setNoteId("");
                setEditFilter({});
                setNoteBody("");
                toggleNoteEditor();
              }
            }}
          >
            {localeSelect(language, editNoteLocale)}
          </Button>
          <Button className={classes.button} onClick={toggleNoteEditor}>
            {localeSelect(language, cancel)}
          </Button>
        </Container>
      </Modal>
    </section>
  );
}
