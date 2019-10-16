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
import Creatable from "react-select/creatable";
import QuickAddPlayerNote from "./QuickAddPlayerNote";
import PopulateNotes from "./PopulateNotes";
import { getToken } from "../services/tokenService";

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
    noteBody: ""
  };

  async componentDidMount() {
    const { user } = this.props;
    const resUser = await axios.get(`/api/users/${user}`);
    const allPlayerNotes = resUser.data.data.playerNotes;
    const resGames = await axios.get("/api/games");
    const resFilters = await axios.get("/api/filters/player");
    const filters = resFilters.data.data;
    const games = resGames.data.data;
    games.sort((x, y) => {
      return x.name.localeCompare(y.name);
    });
    filters.sort((x, y) => {
      return x.name.localeCompare(y.name);
    });
    const players = [];
    allPlayerNotes.map(note => {
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
        gameNotes: fullPlayerNotes,
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
        gameNotes: fullPlayerNotes,
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
    const { allGameNotes, fullGameNotes, gameNotes } = this.state;
    try {
      const res = await axios({
        method: "DELETE",
        url: "/api/notes/game",
        data: {
          user,
          token,
          noteId: id
        }
      });
      if (res) {
        const index1 = allGameNotes.findIndex(note => note._id === id);
        const index2 = fullGameNotes.findIndex(note => note._id === id);
        const index3 = gameNotes.findIndex(note => note._id === id);
        allGameNotes.splice(index1, 1);
        fullGameNotes.splice(index2, 1);
        gameNotes.splice(index3, 1);
        this.setState({
          allGameNotes,
          fullGameNotes,
          gameNotes,
          loading: false
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  addToNotes = note => {
    const { allGameNotes, fullGameNotes } = this.state;
    if (note.universal === true) {
      allGameNotes.unshift(note);
      fullGameNotes.unshift(note);
    } else {
      allGameNotes.push(note);
      fullGameNotes.push(note);
    }
    this.setState({
      allGameNotes,
      fullGameNotes
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
      loading: true
    });
    const {
      noteId: id,
      noteFilter: filter,
      noteBody: note,
      fullGameNotes
    } = this.state;
    const token = await getToken();
    try {
      const res = await axios.put(`/api/notes/game/${id}`, {
        filter,
        token,
        note
      });
      const index = fullGameNotes.findIndex(note => note._id === id);
      fullGameNotes[index] = res.data.data;
      this.setState({
        loading: false,
        fullGameNotes,
        noteFilter: "",
        noteBody: "",
        noteId: null,
        noteEditor: false
      });
    } catch (e) {
      this.setState({
        loading: false
      });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <section className="player-notes">
        <Container>
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <Typography variant="h5" className={classes.spaced}>
                Player Notes
              </Typography>
              <Typography variant="h6">Choose your opponent:</Typography>
              <Creatable
                options={this.state.players.map(player => {
                  return { label: player, value: player };
                })}
                onChange={this.setPlayer}
                className={classes.spaced}
              />
              <Typography variant="h6">Choose your game:</Typography>
              <Select
                options={this.state.games.map(game => {
                  return { label: game.name, value: game._id };
                })}
                onChange={this.setGame}
                className={classes.spaced}
              />
              <Typography variant="h6">
                Choose your filter (optional):
              </Typography>
              <Select
                options={this.state.filters.map(filter => {
                  return { label: filter.name, value: filter._id };
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
                  Clear Filter
                </Button>
              )}
            </Grid>
            <Grid item md={6} xs={12}>
              {this.state.game !== "" &&
                this.state.myCharacter !== "" &&
                this.state.opponentCharacter !== "" && (
                  <Container>
                    <Typography variant="h5" className={classes.spaced}>
                      Notes:
                    </Typography>
                    <Grid container className={classes.spaced}>
                      {this.state.gameNotes.length > 0 ? (
                        this.state.gameNotes.map(note => {
                          return (
                            <PopulateNotes
                              key={note._id}
                              id={note._id}
                              note={note.note}
                              filter={note.filter.name}
                              filterId={note.filter._id}
                              deleteNote={this.deleteNote}
                              showEditor={this.showEditor}
                            />
                          );
                        })
                      ) : (
                        <PopulateNotes
                          filter="Notice"
                          note="You do not have any notes for this matchup. Add some below!"
                        />
                      )}
                    </Grid>
                    <QuickAddPlayerNote
                      user={this.props.user}
                      game={this.state.game}
                      player={this.state.player}
                      filters={this.state.filters}
                      addToNotes={this.addToNotes}
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
              Editing Note
            </Typography>
            <Typography variant="h6">Filter:</Typography>
            <Select
              options={this.state.filters.map(filter => {
                return {
                  label: filter.name,
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
              Edit Note
            </Button>
            <Button className={classes.button} onClick={this.hideEditor}>
              Cancel
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
