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
import QuickAddGameNote from "./QuickAddGameNote";
import PopulateNotes from "./PopulateNotes";
import localeSelect from "../services/localeSelect";
import {
  gameNotes as gameNotesLocale,
  chooseGame,
  yourCharacter as yourCharacterLocale,
  opponentCharacter as opponentCharacterLocale,
  chooseFilter,
  clearFilter,
  notes,
  notice,
  noNotes,
  editingNote,
  filter as filterLocale,
  editNote as editNoteLocale,
  cancel
} from "../data/locales";
import dbLocale from "../services/dbLocale";
import { NoteContext } from "../contexts/NoteContext";
import { GameContext } from "../contexts/GameContext";
import { LanguageContext } from "../contexts/LanguageContext";

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

export default function GameNotes() {
  const classes = useStyles();
  const {
    gameNotes,
    loading,
    error,
    noteEditor,
    toggleNoteEditor,
    editNote
  } = useContext(NoteContext);
  const { games } = useContext(GameContext);
  const { language } = useContext(LanguageContext);
  const [game, setGame] = useState("");
  const [myCharacter, setMyCharacter] = useState("");
  const [opponentCharacter, setOpponentCharacter] = useState("");
  const [myFilter, setMyFilter] = useState("");
  const [displayedNotes, setDisplayedNotes] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [filters, setFilters] = useState([]);
  const [noteId, setNoteId] = useState("");
  const [editFilter, setEditFilter] = useState({});
  const [noteBody, setNoteBody] = useState("");

  // Effect called to grab characters and filters from chosen game, and set them to state.
  useEffect(() => {
    if (game !== "") {
      setMyCharacter("");
      setMyFilter("");
      setOpponentCharacter("");
      setDisplayedNotes([]);
      const index = games.findIndex(x => x._id === game);
      const { characters: allCharacters, filters: allFilters } = games[index];
      if (language === "ja") {
        allCharacters.sort((x, y) => {
          return x.name_ja.localeCompare(y.name_ja);
        });
        allFilters.sort((x, y) => {
          return x.name_ja.localeCompare(y.name_ja);
        });
      } else if (language === "ko") {
        allCharacters.sort((x, y) => {
          return x.name_ko.localeCompare(y.name_ko);
        });
        allFilters.sort((x, y) => {
          return x.name_ko.localeCompare(y.name_ko);
        });
      } else if (
        language === "zh-CN" ||
        language === "zh-TW" ||
        language === "zh-HK"
      ) {
        allCharacters.sort((x, y) => {
          return x["name_zh-cn"].localeCompare(y["name_zh-cn"]);
        });
        allFilters.sort((x, y) => {
          return x["name_zh-cn"].localeCompare(y["name_zh-cn"]);
        });
      } else {
        allCharacters.sort((x, y) => {
          return x.name.localeCompare(y.name);
        });
        allFilters.sort((x, y) => {
          return x.name.localeCompare(y.name);
        });
      }
      setCharacters(allCharacters);
      setFilters(allFilters);
    }
  }, [game, games, language]);

  useEffect(() => {
    if (myCharacter !== "" && opponentCharacter !== "" && myFilter !== "") {
      const notes = [];
      gameNotes.forEach(note => {
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
      gameNotes.forEach(note => {
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
      <Container>
        <Grid container spacing={2}>
          <Grid item md={6} xs={12}>
            <Typography variant="h5" className={classes.spaced}>
              {localeSelect(language, gameNotesLocale)}
            </Typography>
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
              {localeSelect(language, yourCharacterLocale)}
            </Typography>
            <Select
              options={characters.map(character => {
                return {
                  label: dbLocale(language, character),
                  value: character._id
                };
              })}
              onChange={e => {
                setMyCharacter(e.value);
              }}
              className={classes.spaced}
            />
            <Typography variant="h6">
              {localeSelect(language, opponentCharacterLocale)}
            </Typography>
            <Select
              options={characters.map(character => {
                return {
                  label: dbLocale(language, character),
                  value: character._id
                };
              })}
              onChange={e => {
                setOpponentCharacter(e.value);
              }}
              className={classes.spaced}
            />
            <Typography variant="h6">
              {localeSelect(language, chooseFilter)}
            </Typography>
            <Select
              options={filters.map(x => {
                return {
                  label: dbLocale(language, x),
                  value: x._id
                };
              })}
              onChange={e => {
                setMyFilter(e.value);
              }}
              className={classes.spaced}
            />
            {myFilter !== "" && (
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => {
                  setMyFilter("");
                }}
              >
                {localeSelect(language, clearFilter)}
              </Button>
            )}
          </Grid>
          <Grid item md={6} xs={12}>
            {game !== "" && myCharacter !== "" && opponentCharacter !== "" && (
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
                <QuickAddGameNote
                  game={game}
                  myCharacter={myCharacter}
                  opponentCharacter={opponentCharacter}
                  filters={filters}
                  language={language}
                />
              </Container>
            )}
          </Grid>
        </Grid>
      </Container>
      <Modal
        aria-labelledby="editor-title"
        open={noteEditor}
        onClose={toggleNoteEditor}
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
              setEditFilter(e.value);
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
          <Button className={classes.button} onClick={toggleNoteEditor}>
            {localeSelect(language, cancel)}
          </Button>
        </Container>
      </Modal>
    </section>
  );
}

// class GameNotes extends React.Component {
//   state = {
//     games: [],
//     myCharacter: "",
//     opponentCharacter: "",
//     filter: "",
//     characters: [],
//     filters: [],
//     allGameNotes: [],
//     fullGameNotes: [],
//     gameNotes: [],
//     game: "",
//     noteEditor: false,
//     noteId: null,
//     noteFilter: "",
//     noteBody: "",
//     loading: false,
//     error: null
//   };
//
//   async componentDidMount() {
//     const { user } = this.props;
//     const resUser = await axios.get(`/api/users/${user}`);
//     const allGameNotes = resUser.data.data.gameNotes;
//     const resGames = await axios.get("/api/games");
//     const games = resGames.data.data;
//     if (language === "ja") {
//       games.sort((x, y) => {
//         return x.name_ja.localeCompare(y.name_ja);
//       });
//     } else if (language === "ko") {
//       games.sort((x, y) => {
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
//     } else {
//       games.sort((x, y) => {
//         return x.name.localeCompare(y.name);
//       });
//     }
//
//     this.setState({
//       games,
//       allGameNotes
//     });
//   }
//
//   showEditor = (noteId, noteFilter, noteBody) => {
//     this.setState({
//       noteEditor: true,
//       noteId,
//       noteFilter,
//       noteBody
//     });
//   };
//
//   hideEditor = () => {
//     this.setState({
//       noteEditor: false,
//       noteId: "",
//       noteFilter: "",
//       noteBody: ""
//     });
//   };
//
//   setGame = e => {
//     const { value: game } = e;
//     const index = this.state.games.findIndex(x => x._id === game);
//     const { characters, filters } = this.state.games[index];
//     if (language === "ja") {
//       characters.sort((x, y) => {
//         return x.name_ja.localeCompare(y.name_ja);
//       });
//       filters.sort((x, y) => {
//         return x.name_ja.localeCompare(y.name_ja);
//       });
//     } else if (language === "ko") {
//       characters.sort((x, y) => {
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
//       characters.sort((x, y) => {
//         return x["name_zh-cn"].localeCompare(y["name_zh-cn"]);
//       });
//       filters.sort((x, y) => {
//         return x["name_zh-cn"].localeCompare(y["name_zh-cn"]);
//       });
//     } else {
//       characters.sort((x, y) => {
//         return x.name.localeCompare(y.name);
//       });
//       filters.sort((x, y) => {
//         return x.name.localeCompare(y.name);
//       });
//     }
//     this.setState({
//       game,
//       characters,
//       filters
//     });
//   };
//
//   setMyCharacter = e => {
//     const myCharacter = e.value;
//     const { opponentCharacter } = this.state;
//     if (myCharacter !== "" && opponentCharacter !== "") {
//       const fullGameNotes = [];
//       this.state.allGameNotes.forEach(note => {
//         if (note.myCharacter === myCharacter && note.universal) {
//           fullGameNotes.push(note);
//         }
//       });
//       this.state.allGameNotes.forEach(note => {
//         if (
//           note.myCharacter === myCharacter &&
//           note.opponentCharacter === opponentCharacter
//         ) {
//           fullGameNotes.push(note);
//         }
//       });
//       this.setState({
//         fullGameNotes,
//         gameNotes: fullGameNotes,
//         myCharacter
//       });
//     } else {
//       this.setState({
//         myCharacter
//       });
//     }
//   };
//
//   setOpponentCharacter = e => {
//     const opponentCharacter = e.value;
//     const { myCharacter } = this.state;
//     if (myCharacter !== "" && opponentCharacter !== "") {
//       const fullGameNotes = [];
//       this.state.allGameNotes.forEach(note => {
//         if (note.myCharacter === myCharacter && note.universal) {
//           fullGameNotes.push(note);
//         }
//       });
//       this.state.allGameNotes.forEach(note => {
//         if (
//           note.myCharacter === myCharacter &&
//           note.opponentCharacter === opponentCharacter
//         ) {
//           fullGameNotes.push(note);
//         }
//       });
//       this.setState({
//         fullGameNotes,
//         gameNotes: fullGameNotes,
//         opponentCharacter
//       });
//     } else {
//       this.setState({
//         opponentCharacter,
//         fullGameNotes: []
//       });
//     }
//   };
//
//   setFilter = e => {
//     const filter = e.value;
//     const { myCharacter, opponentCharacter, fullGameNotes } = this.state;
//     if (myCharacter !== "" && opponentCharacter !== "") {
//       const gameNotes = [];
//       fullGameNotes.forEach(note => {
//         if (
//           note.myCharacter === myCharacter &&
//           note.universal &&
//           note.filter._id === filter
//         ) {
//           gameNotes.push(note);
//         }
//       });
//       fullGameNotes.forEach(note => {
//         if (
//           note.myCharacter === myCharacter &&
//           note.opponentCharacter === opponentCharacter &&
//           note.filter._id === filter
//         ) {
//           gameNotes.push(note);
//         }
//       });
//       console.log(gameNotes);
//       this.setState({
//         filter,
//         gameNotes
//       });
//     }
//   };
//
//   setEditFilter = e => {
//     const noteFilter = e.value;
//     this.setState({
//       noteFilter
//     });
//   };
//
//   clearFilter = e => {
//     e.preventDefault();
//     const { fullGameNotes } = this.state;
//     this.setState({
//       gameNotes: fullGameNotes,
//       filter: ""
//     });
//   };
//
//   deleteNote = async id => {
//     this.setState({
//       loading: true
//     });
//     const { user } = this.props;
//     const token = await getToken();
//     const { allGameNotes, fullGameNotes, gameNotes } = this.state;
//     try {
//       const res = await axios({
//         method: "DELETE",
//         url: "/api/notes/game",
//         data: {
//           user,
//           token,
//           noteId: id
//         }
//       });
//       if (res) {
//         const index1 = allGameNotes.findIndex(note => note._id === id);
//         const index2 = fullGameNotes.findIndex(note => note._id === id);
//         allGameNotes.splice(index1, 1);
//         fullGameNotes.splice(index2, 1);
//         console.log(gameNotes);
//         this.setState({
//           allGameNotes,
//           fullGameNotes,
//           gameNotes,
//           loading: false
//         });
//       }
//     } catch (e) {
//       console.log(e);
//     }
//   };
//
//   addToNotes = note => {
//     const { allGameNotes, fullGameNotes } = this.state;
//     if (note.universal === true) {
//       allGameNotes.unshift(note);
//       fullGameNotes.unshift(note);
//     } else {
//       allGameNotes.push(note);
//       fullGameNotes.push(note);
//     }
//     this.setState({
//       allGameNotes,
//       fullGameNotes
//     });
//   };
//
//   setEditNote = e => {
//     const noteBody = e.target.value;
//     this.setState({
//       noteBody
//     });
//   };
//
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
//       fullGameNotes
//     } = this.state;
//     const token = await getToken();
//     try {
//       const res = await axios.put(`/api/notes/game/${id}`, {
//         filter,
//         token,
//         note
//       });
//       const index = fullGameNotes.findIndex(note => note._id === id);
//       fullGameNotes[index] = res.data.data;
//       this.setState({
//         loading: false,
//         fullGameNotes,
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
//
//   render() {
//     const { classes } = this.props;
//     return (
//       <section className="game-notes">
//         <Container>
//           <Grid container spacing={2}>
//             <Grid item md={6} xs={12}>
//               <Typography variant="h5" className={classes.spaced}>
//                 {localeSelect(language, gameNotes)}
//               </Typography>
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
//                 {localeSelect(language, yourCharacter)}
//               </Typography>
//               <Select
//                 options={this.state.characters.map(character => {
//                   return {
//                     label: dbLocale(language, character),
//                     value: character._id
//                   };
//                 })}
//                 onChange={this.setMyCharacter}
//                 className={classes.spaced}
//               />
//               <Typography variant="h6">
//                 {localeSelect(language, opponentCharacter)}
//               </Typography>
//               <Select
//                 options={this.state.characters.map(character => {
//                   return {
//                     label: dbLocale(language, character),
//                     value: character._id
//                   };
//                 })}
//                 onChange={this.setOpponentCharacter}
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
//                       {this.state.gameNotes.length > 0 ? (
//                         this.state.gameNotes.map(note => {
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
//                     <QuickAddGameNote
//                       user={this.props.user}
//                       game={this.state.game}
//                       myCharacter={this.state.myCharacter}
//                       opponentCharacter={this.state.opponentCharacter}
//                       filters={this.state.filters}
//                       addToNotes={this.addToNotes}
//                       language={language}
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
//
// GameNotes.propTypes = {
//   classes: PropTypes.object.isRequired
// };
//
// export default withStyles(styles)(GameNotes);
