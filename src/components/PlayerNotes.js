import React from "react";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {
  Container,
  Typography,
  Grid,
  Button,
  Modal,
  TextField
} from "@material-ui/core";
import Select from "react-select";
import { Redirect } from "react-router-dom";
import Creatable from "react-select/creatable";
import QuickAddPlayerNote from "./QuickAddPlayerNote";
import PopulateNotes from "./PopulateNotes";
import { getToken } from "../services/tokenService";
import localeSelect from "../services/localeSelect";
import {
  playerNotes,
  chooseGame,
  chooseFilter,
  clearFilter,
  notes,
  notice,
  noNotes,
  editingNote,
  filter,
  editNote,
  cancel,
  chooseOpponent
} from "../data/locales";
import dbLocale from "../services/dbLocale";

const styles = theme => ({
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
});

class PlayerNotes extends React.Component {
  state = {
    games: [],
    player: "",
    filter: "",
    characters: [],
    filters: [],
    players: [],
    allPlayerNotes: [],
    fullPlayerNotes: [],
    playerNotes: [],
    game: "",
    noteEditor: false,
    noteId: null,
    noteFilter: "",
    noteBody: "",
    loading: false,
    error: null
  };

  async componentDidMount() {
    const { user } = this.props;
    const resUser = await axios.get(`/api/users/${user}`);
    const allPlayerNotes = resUser.data.data.playerNotes;
    const resGames = await axios.get("/api/games");
    const resFilters = await axios.get("/api/filters/player");
    const filters = resFilters.data.data;
    const games = resGames.data.data;
    if (this.props.language === "ja") {
      games.sort((x, y) => {
        return x.name_ja.localeCompare(y.name_ja);
      });
      filters.sort((x, y) => {
        return x.name_ja.localeCompare(y.name_ja);
      });
    } else if (this.props.language === "ko") {
      games.sort((x, y) => {
        return x.name_ko.localeCompare(y.name_ko);
      });
      filters.sort((x, y) => {
        return x.name_ko.localeCompare(y.name_ko);
      });
    } else if (
      this.props.language === "zh-CN" ||
      this.props.language === "zh-TW" ||
      this.props.language === "zh-HK"
    ) {
      games.sort((x, y) => {
        return x["name_zh-cn"].localeCompare(y["name_zh-cn"]);
      });
      filters.sort((x, y) => {
        return x["name_zh-cn"].localeCompare(y["name_zh-cn"]);
      });
    } else {
      games.sort((x, y) => {
        return x.name.localeCompare(y.name);
      });
      filters.sort((x, y) => {
        return x.name.localeCompare(y.name);
      });
    }
    const players = [];
    allPlayerNotes.forEach(note => {
      const index = players.indexOf(note.player);
      if (index === -1) {
        players.push(note.player);
      }
    });
    players.sort((x, y) => {
      return x.localeCompare(y);
    });
    this.setState({
      games,
      allPlayerNotes,
      filters,
      players
    });
  }

  showEditor = (noteId, noteFilter, noteBody) => {
    this.setState({
      noteEditor: true,
      noteId,
      noteFilter,
      noteBody
    });
  };

  hideEditor = () => {
    this.setState({
      noteEditor: false,
      noteId: "",
      noteFilter: "",
      noteBody: ""
    });
  };

  setPlayer = e => {
    const player = e.value;
    const { game } = this.state;
    if (player !== "" && game !== "") {
      const fullPlayerNotes = [];
      this.state.allPlayerNotes.forEach(note => {
        if (note.player === player && note.game === game) {
          fullPlayerNotes.push(note);
        }
      });
      this.setState({
        fullPlayerNotes,
        playerNotes: fullPlayerNotes,
        player
      });
    } else {
      this.setState({
        player
      });
    }
  };

  setGame = e => {
    const game = e.value;
    const { player } = this.state;
    if (player !== "" && game !== "") {
      const fullPlayerNotes = [];
      this.state.allPlayerNotes.forEach(note => {
        if (note.player === player && note.game === game) {
          fullPlayerNotes.push(note);
        }
      });
      this.setState({
        fullPlayerNotes,
        playerNotes: fullPlayerNotes,
        game
      });
    } else {
      this.setState({
        game
      });
    }
  };

  setFilter = e => {
    const filter = e.value;
    const { player, game, fullPlayerNotes } = this.state;
    if (player !== "" && game !== "") {
      const playerNotes = [];
      fullPlayerNotes.forEach(note => {
        if (
          note.player === player &&
          note.game === game &&
          note.filter._id === filter
        ) {
          playerNotes.push(note);
        }
      });
      this.setState({
        filter,
        playerNotes
      });
    }
  };

  setEditFilter = e => {
    const noteFilter = e.value;
    this.setState({
      noteFilter
    });
  };

  clearFilter = e => {
    e.preventDefault();
    const { fullPlayerNotes } = this.state;
    this.setState({
      playerNotes: fullPlayerNotes,
      filter: ""
    });
  };

  deleteNote = async id => {
    this.setState({
      loading: true
    });
    const { user } = this.props;
    const token = await getToken();
    const { allPlayerNotes, fullPlayerNotes, playerNotes } = this.state;
    try {
      const res = await axios({
        method: "DELETE",
        url: "/api/notes/player",
        data: {
          user,
          token,
          noteId: id
        }
      });
      if (res) {
        const index1 = allPlayerNotes.findIndex(note => note._id === id);
        const index2 = fullPlayerNotes.findIndex(note => note._id === id);
        allPlayerNotes.splice(index1, 1);
        fullPlayerNotes.splice(index2, 1);
        this.setState({
          allPlayerNotes,
          fullPlayerNotes,
          playerNotes,
          loading: false
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  addToNotes = note => {
    const { allPlayerNotes, fullPlayerNotes } = this.state;
    allPlayerNotes.push(note);
    fullPlayerNotes.push(note);
    this.setState({
      allPlayerNotes,
      fullPlayerNotes
    });
  };

  setEditNote = e => {
    const noteBody = e.target.value;
    this.setState({
      noteBody
    });
  };

  editNote = async e => {
    e.preventDefault();
    this.setState({
      loading: true,
      error: null
    });
    const {
      noteId: id,
      noteFilter: filter,
      noteBody: note,
      fullPlayerNotes
    } = this.state;
    const token = await getToken();
    try {
      const res = await axios.put(`/api/notes/player/${id}`, {
        filter,
        token,
        note
      });
      const index = fullPlayerNotes.findIndex(note => note._id === id);
      fullPlayerNotes[index] = res.data.data;
      this.setState({
        loading: false,
        fullPlayerNotes,
        noteFilter: "",
        noteBody: "",
        noteId: null,
        noteEditor: false
      });
    } catch (e) {
      this.setState({
        loading: false,
        error: e.message
      });
    }
  };

  render() {
    const { classes } = this.props;
    if (!this.props.user) {
      return <Redirect to="/" />;
    }
    return (
      <section className="player-notes">
        <Container>
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <Typography variant="h5" className={classes.spaced}>
                {localeSelect(this.props.language, playerNotes)}
              </Typography>
              <Typography variant="h6">
                {localeSelect(this.props.language, chooseOpponent)}
              </Typography>
              <Creatable
                options={this.state.players.map(player => {
                  return { label: player, value: player };
                })}
                onChange={this.setPlayer}
                className={classes.spaced}
              />
              <Typography variant="h6">
                {localeSelect(this.props.language, chooseGame)}
              </Typography>
              <Select
                options={this.state.games.map(game => {
                  return {
                    label: dbLocale(this.props.language, game),
                    value: game._id
                  };
                })}
                onChange={this.setGame}
                className={classes.spaced}
              />
              <Typography variant="h6">
                {localeSelect(this.props.language, chooseFilter)}
              </Typography>
              <Select
                options={this.state.filters.map(filter => {
                  return {
                    label: dbLocale(this.props.language, filter),
                    value: filter._id
                  };
                })}
                disabled={
                  this.state.myCharacter === "" &&
                  this.state.opponentCharacter === ""
                }
                onChange={this.setFilter}
                className={classes.spaced}
              />
              {this.state.filter !== "" && (
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={this.clearFilter}
                >
                  {localeSelect(this.props.language, clearFilter)}
                </Button>
              )}
            </Grid>
            <Grid item md={6} xs={12}>
              {this.state.game !== "" &&
                this.state.myCharacter !== "" &&
                this.state.opponentCharacter !== "" && (
                  <Container>
                    <Typography variant="h5" className={classes.spaced}>
                      {localeSelect(this.props.language, notes)}
                    </Typography>
                    <Grid container className={classes.spaced}>
                      {this.state.playerNotes.length > 0 ? (
                        this.state.playerNotes.map(note => {
                          return (
                            <PopulateNotes
                              key={note._id}
                              id={note._id}
                              note={note.note}
                              filter={dbLocale(
                                this.props.language,
                                note.filter
                              )}
                              filterId={note.filter._id}
                              deleteNote={this.deleteNote}
                              showEditor={this.showEditor}
                            />
                          );
                        })
                      ) : (
                        <PopulateNotes
                          filter={localeSelect(this.props.language, notice)}
                          note={localeSelect(this.props.language, noNotes)}
                        />
                      )}
                    </Grid>
                    <QuickAddPlayerNote
                      user={this.props.user}
                      game={this.state.game}
                      player={this.state.player}
                      filters={this.state.filters}
                      addToNotes={this.addToNotes}
                      language={this.props.language}
                    />
                  </Container>
                )}
            </Grid>
          </Grid>
        </Container>
        <Modal
          aria-labelledby="editor-title"
          open={this.state.noteEditor}
          onClose={this.hideEditor}
        >
          <Container className={classes.paper}>
            <Typography
              variant="h5"
              id="editor-title"
              className={classes.spaced}
            >
              {localeSelect(this.props.language, editingNote)}
            </Typography>
            <Typography variant="h6">
              {localeSelect(this.props.language, filter)}
            </Typography>
            <Select
              options={this.state.filters.map(filter => {
                return {
                  label: dbLocale(this.props.language, filter),
                  value: filter._id
                };
              })}
              onChange={this.setEditFilter}
              defaultValue={this.state.noteFilter}
              className={classes.spaced}
            />
            <TextField
              multiline
              name="note"
              value={this.state.noteBody}
              onChange={this.setEditNote}
              fullWidth
            />
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={this.editNote}
            >
              {localeSelect(this.props.language, editNote)}
            </Button>
            <Button className={classes.button} onClick={this.hideEditor}>
              {localeSelect(this.props.language, cancel)}
            </Button>
          </Container>
        </Modal>
      </section>
    );
  }
}

PlayerNotes.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PlayerNotes);
