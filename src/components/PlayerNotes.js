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

// class PlayerNotes extends React.Component {
//   state = {
//     games: [],
//     player: "",
//     filter: "",
//     characters: [],
//     filters: [],
//     players: [],
//     allPlayerNotes: [],
//     fullPlayerNotes: [],
//     playerNotes: [],
//     game: "",
//     noteEditor: false,
//     noteId: null,
//     noteFilter: "",
//     noteBody: "",
//     loading: false,
//     error: null
//   };

//   async componentDidMount() {
//     const { user } = this.props;
//     const resUser = await axios.get(`/api/users/${user}`);
//     const allPlayerNotes = resUser.data.data.playerNotes;
//     const resGames = await axios.get("/api/games");
//     const resFilters = await axios.get("/api/filters/player");
//     const filters = resFilters.data.data;
//     const games = resGames.data.data;
//     if (language === "ja") {
//       games.sort((x, y) => {
//         return x.name_ja.localeCompare(y.name_ja);
//       });
//       filters.sort((x, y) => {
//         return x.name_ja.localeCompare(y.name_ja);
//       });
//     } else if (language === "ko") {
//       games.sort((x, y) => {
//         return x.name_ko.localeCompare(y.name_ko);
//       });
//       filters.sort((x, y) => {
//         return x.name_ko.localeCompare(y.name_ko);
//       });
//     } else if (
//       language === "zh-CN" ||
//       language === "zh-TW" ||
//       language === "zh-HK"
//     ) {
//       games.sort((x, y) => {
//         return x["name_zh-cn"].localeCompare(y["name_zh-cn"]);
//       });
//       filters.sort((x, y) => {
//         return x["name_zh-cn"].localeCompare(y["name_zh-cn"]);
//       });
//     } else {
//       games.sort((x, y) => {
//         return x.name.localeCompare(y.name);
//       });
//       filters.sort((x, y) => {
//         return x.name.localeCompare(y.name);
//       });
//     }
//     const players = [];
//     allPlayerNotes.forEach(note => {
//       const index = players.indexOf(note.player);
//       if (index === -1) {
//         players.push(note.player);
//       }
//     });
//     players.sort((x, y) => {
//       return x.localeCompare(y);
//     });
//     this.setState({
//       games,
//       allPlayerNotes,
//       filters,
//       players
//     });
//   }

//   showEditor = (noteId, noteFilter, noteBody) => {
//     this.setState({
//       noteEditor: true,
//       noteId,
//       noteFilter,
//       noteBody
//     });
//   };

//   hideEditor = () => {
//     this.setState({
//       noteEditor: false,
//       noteId: "",
//       noteFilter: "",
//       noteBody: ""
//     });
//   };

//   setPlayer = e => {
//     const player = e.value;
//     const { game } = this.state;
//     if (player !== "" && game !== "") {
//       const fullPlayerNotes = [];
//       this.state.allPlayerNotes.forEach(note => {
//         if (note.player === player && note.game === game) {
//           fullPlayerNotes.push(note);
//         }
//       });
//       this.setState({
//         fullPlayerNotes,
//         playerNotes: fullPlayerNotes,
//         player
//       });
//     } else {
//       this.setState({
//         player
//       });
//     }
//   };

//   setGame = e => {
//     const game = e.value;
//     const { player } = this.state;
//     if (player !== "" && game !== "") {
//       const fullPlayerNotes = [];
//       this.state.allPlayerNotes.forEach(note => {
//         if (note.player === player && note.game === game) {
//           fullPlayerNotes.push(note);
//         }
//       });
//       this.setState({
//         fullPlayerNotes,
//         playerNotes: fullPlayerNotes,
//         game
//       });
//     } else {
//       this.setState({
//         game
//       });
//     }
//   };

//   setFilter = e => {
//     const filter = e.value;
//     const { player, game, fullPlayerNotes } = this.state;
//     if (player !== "" && game !== "") {
//       const playerNotes = [];
//       fullPlayerNotes.forEach(note => {
//         if (
//           note.player === player &&
//           note.game === game &&
//           note.filter._id === filter
//         ) {
//           playerNotes.push(note);
//         }
//       });
//       this.setState({
//         filter,
//         playerNotes
//       });
//     }
//   };

//   setEditFilter = e => {
//     const noteFilter = e.value;
//     this.setState({
//       noteFilter
//     });
//   };

//   clearFilter = e => {
//     e.preventDefault();
//     const { fullPlayerNotes } = this.state;
//     this.setState({
//       playerNotes: fullPlayerNotes,
//       filter: ""
//     });
//   };

//   deleteNote = async id => {
//     this.setState({
//       loading: true
//     });
//     const { user } = this.props;
//     const token = await getToken();
//     const { allPlayerNotes, fullPlayerNotes, playerNotes } = this.state;
//     try {
//       const res = await axios({
//         method: "DELETE",
//         url: "/api/notes/player",
//         data: {
//           user,
//           token,
//           noteId: id
//         }
//       });
//       if (res) {
//         const index1 = allPlayerNotes.findIndex(note => note._id === id);
//         const index2 = fullPlayerNotes.findIndex(note => note._id === id);
//         allPlayerNotes.splice(index1, 1);
//         fullPlayerNotes.splice(index2, 1);
//         this.setState({
//           allPlayerNotes,
//           fullPlayerNotes,
//           playerNotes,
//           loading: false
//         });
//       }
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   addToNotes = note => {
//     const { allPlayerNotes, fullPlayerNotes } = this.state;
//     allPlayerNotes.push(note);
//     fullPlayerNotes.push(note);
//     this.setState({
//       allPlayerNotes,
//       fullPlayerNotes
//     });
//   };

//   setEditNote = e => {
//     const noteBody = e.target.value;
//     this.setState({
//       noteBody
//     });
//   };

//   editNote = async e => {
//     e.preventDefault();
//     this.setState({
//       loading: true,
//       error: null
//     });
//     const {
//       noteId: id,
//       noteFilter: filter,
//       noteBody: note,
//       fullPlayerNotes
//     } = this.state;
//     const token = await getToken();
//     try {
//       const res = await axios.put(`/api/notes/player/${id}`, {
//         filter,
//         token,
//         note
//       });
//       const index = fullPlayerNotes.findIndex(note => note._id === id);
//       fullPlayerNotes[index] = res.data.data;
//       this.setState({
//         loading: false,
//         fullPlayerNotes,
//         noteFilter: "",
//         noteBody: "",
//         noteId: null,
//         noteEditor: false
//       });
//     } catch (e) {
//       this.setState({
//         loading: false,
//         error: e.message
//       });
//     }
//   };

//   render() {
//     const { classes } = this.props;
//     if (!this.props.user) {
//       return <Redirect to="/" />;
//     }
//     return (
//       <section className="player-notes">
//         <Container>
//           <Grid container spacing={2}>
//             <Grid item md={6} xs={12}>
//               <Typography variant="h5" className={classes.spaced}>
//                 {localeSelect(language, playerNotes)}
//               </Typography>
//               <Typography variant="h6">
//                 {localeSelect(language, chooseOpponent)}
//               </Typography>
//               <Creatable
//                 options={this.state.players.map(player => {
//                   return { label: player, value: player };
//                 })}
//                 onChange={this.setPlayer}
//                 className={classes.spaced}
//               />
//               <Typography variant="h6">
//                 {localeSelect(language, chooseGame)}
//               </Typography>
//               <Select
//                 options={this.state.games.map(game => {
//                   return {
//                     label: dbLocale(language, game),
//                     value: game._id
//                   };
//                 })}
//                 onChange={this.setGame}
//                 className={classes.spaced}
//               />
//               <Typography variant="h6">
//                 {localeSelect(language, chooseFilter)}
//               </Typography>
//               <Select
//                 options={this.state.filters.map(filter => {
//                   return {
//                     label: dbLocale(language, filter),
//                     value: filter._id
//                   };
//                 })}
//                 disabled={
//                   this.state.myCharacter === "" &&
//                   this.state.opponentCharacter === ""
//                 }
//                 onChange={this.setFilter}
//                 className={classes.spaced}
//               />
//               {this.state.filter !== "" && (
//                 <Button
//                   variant="outlined"
//                   color="secondary"
//                   onClick={this.clearFilter}
//                 >
//                   {localeSelect(language, clearFilter)}
//                 </Button>
//               )}
//             </Grid>
//             <Grid item md={6} xs={12}>
//               {this.state.game !== "" &&
//                 this.state.myCharacter !== "" &&
//                 this.state.opponentCharacter !== "" && (
//                   <Container>
//                     <Typography variant="h5" className={classes.spaced}>
//                       {localeSelect(language, notes)}
//                     </Typography>
//                     <Grid container className={classes.spaced}>
//                       {this.state.playerNotes.length > 0 ? (
//                         this.state.playerNotes.map(note => {
//                           return (
//                             <PopulateNotes
//                               key={note._id}
//                               id={note._id}
//                               note={note.note}
//                               filter={dbLocale(
//                                 language,
//                                 note.filter
//                               )}
//                               filterId={note.filter._id}
//                               deleteNote={this.deleteNote}
//                               showEditor={this.showEditor}
//                             />
//                           );
//                         })
//                       ) : (
//                         <PopulateNotes
//                           filter={localeSelect(language, notice)}
//                           note={localeSelect(language, noNotes)}
//                         />
//                       )}
//                     </Grid>
//                     <QuickAddNote
//                       user={this.props.user}
//                       game={this.state.game}
//                       player={this.state.player}
//                       filters={this.state.filters}
//                       addToNotes={this.addToNotes}
//                       language={language}
//                       type="Player Note"
//                     />
//                   </Container>
//                 )}
//             </Grid>
//           </Grid>
//         </Container>
//         <Modal
//           aria-labelledby="editor-title"
//           open={this.state.noteEditor}
//           onClose={this.hideEditor}
//         >
//           <Container className={classes.paper}>
//             <Typography
//               variant="h5"
//               id="editor-title"
//               className={classes.spaced}
//             >
//               {localeSelect(language, editingNote)}
//             </Typography>
//             <Typography variant="h6">
//               {localeSelect(language, filter)}
//             </Typography>
//             <Select
//               options={this.state.filters.map(filter => {
//                 return {
//                   label: dbLocale(language, filter),
//                   value: filter._id
//                 };
//               })}
//               onChange={this.setEditFilter}
//               defaultValue={this.state.noteFilter}
//               className={classes.spaced}
//             />
//             <TextField
//               multiline
//               name="note"
//               value={this.state.noteBody}
//               onChange={this.setEditNote}
//               fullWidth
//             />
//             <Button
//               variant="contained"
//               color="primary"
//               className={classes.button}
//               onClick={this.editNote}
//             >
//               {localeSelect(language, editNote)}
//             </Button>
//             <Button className={classes.button} onClick={this.hideEditor}>
//               {localeSelect(language, cancel)}
//             </Button>
//           </Container>
//         </Modal>
//       </section>
//     );
//   }
// }

// PlayerNotes.propTypes = {
//   classes: PropTypes.object.isRequired
// };

// export default withStyles(styles)(PlayerNotes);
