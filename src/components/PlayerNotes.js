import React, { useContext, useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Button,
  Modal,
  TextField,
  makeStyles
} from "@material-ui/core";
import Select from "react-select";
import { Redirect } from "react-router-dom";
import Creatable from "react-select/creatable";
import QuickAddNote from "./QuickAddNote";
import PopulateNotes from "./PopulateNotes";
import localeSelect from "../services/localeSelect";
import {
  playerNotes as playerNotesLocale,
  chooseGame,
  chooseFilter,
  clearFilter,
  notes,
  notice,
  noNotes,
  editingNote,
  filter as filterLocale,
  editNote as editNoteLocale,
  cancel,
  chooseOpponent
} from "../data/locales";
import dbLocale from "../services/dbLocale";
import { UserContext } from "../contexts/UserContext";
import { LanguageContext } from "../contexts/LanguageContext";
import { GameContext } from "../contexts/GameContext";
import { NoteContext } from "../contexts/NoteContext";

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: "50%",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  },
  button: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2)
  },
  spaced: {
    marginBottom: theme.spacing(2)
  }
}));

export default function PlayerNotes() {
  const classes = useStyles();
  const { user } = useContext(UserContext);
  const { language } = useContext(LanguageContext);
  const { games } = useContext(GameContext);
  const {
    playerNotes,
    players,
    loading,
    error,
    editNote,
    toggleNoteEditor,
    noteEditor,
    playerFilters: filters
  } = useContext(NoteContext);
  const [game, setGame] = useState("");
  const [filter, setFilter] = useState("");
  const [player, setPlayer] = useState("");
  const [editFilter, setEditFilter] = useState("");
  const [noteBody, setNoteBody] = useState("");
  const [noteId, setNoteId] = useState("");
  const [displayedNotes, setDisplayedNotes] = useState([]);
  useEffect(() => {
    if (game !== "" && player !== "" && filter !== "") {
      const notes = [];
      playerNotes.forEach(note => {
        if (
          game === note.game &&
          player === note.player &&
          filter === note.filter._id
        ) {
          notes.push(note);
        }
      });
      setDisplayedNotes(notes);
    } else if (game !== "" && player !== "" && filter === "") {
      const notes = [];
      playerNotes.forEach(note => {
        if (game === note.game && player === note.player) {
          notes.push(note);
        }
      });
      setDisplayedNotes(notes);
    }
  }, [playerNotes, game, player, filter]);
  if (!user) {
    return <Redirect to="/" />;
  }
  return (
    <section className="player-notes">
      <Container>
        <Grid container spacing={2}>
          <Grid item md={6} xs={12}>
            <Typography variant="h5" className={classes.spaced}>
              {localeSelect(language, playerNotesLocale)}
            </Typography>
            <Typography variant="h6">
              {localeSelect(language, chooseOpponent)}
            </Typography>
            <Creatable
              options={players.map(player => {
                return { label: player, value: player };
              })}
              onChange={e => {
                setPlayer(e.value);
              }}
              className={classes.spaced}
            />
            <Typography variant="h6">
              {localeSelect(language, chooseGame)}
            </Typography>
            <Select
              options={games.map(game => {
                return {
                  label: dbLocale(language, game),
                  value: game._id
                };
              })}
              onChange={e => {
                setGame(e.value);
              }}
              className={classes.spaced}
            />
            <Typography variant="h6">
              {localeSelect(language, chooseFilter)}
            </Typography>
            <Select
              options={filters.map(filter => {
                return {
                  label: dbLocale(language, filter),
                  value: filter._id
                };
              })}
              onChange={e => {
                setFilter(e.value);
              }}
              className={classes.spaced}
            />
            {filter !== "" && (
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => {
                  setFilter("");
                }}
              >
                {localeSelect(language, clearFilter)}
              </Button>
            )}
          </Grid>
          <Grid item md={6} xs={12}>
            {game !== "" && player !== "" && (
              <Container>
                <Typography variant="h5" className={classes.spaced}>
                  {localeSelect(language, notes)}
                </Typography>
                <Grid container className={classes.spaced}>
                  {displayedNotes.length > 0 ? (
                    displayedNotes.map(note => {
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
                <QuickAddNote
                  game={game}
                  player={player}
                  filters={filters}
                  type="Player Note"
                />
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
          <Typography variant="h6">
            {localeSelect(language, filterLocale)}
          </Typography>
          <Select
            options={filters.map(filter => {
              return {
                label: dbLocale(language, filter),
                value: filter._id
              };
            })}
            onChange={e => {
              setEditFilter({ label: e.label, value: e.value });
            }}
            defaultValue={editFilter}
            className={classes.spaced}
          />
          <TextField
            multiline
            name="note"
            value={noteBody}
            onChange={e => {
              setNoteBody(e.target.value);
            }}
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={editNote}
          >
            {localeSelect(language, editNoteLocale)}
          </Button>
          <Button
            className={classes.button}
            onClick={() => {
              setNoteId("");
              setEditFilter({});
              setNoteBody("");
              toggleNoteEditor();
            }}
          >
            {localeSelect(language, cancel)}
          </Button>
        </Container>
      </Modal>
    </section>
  );
}
