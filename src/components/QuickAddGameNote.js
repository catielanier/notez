import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Button
} from "@material-ui/core";
import Select from "react-select";
import localeSelect from "../services/localeSelect";
import {
  quickAdd,
  universalNote,
  newNoteFilter,
  newNote,
  createNote
} from "../data/locales";
import dbLocale from "../services/dbLocale";
import { LanguageContext } from "../contexts/LanguageContext";
import { NoteContext } from "../contexts/NoteContext";

const useStyles = makeStyles(theme => ({
  spaced: {
    marginBottom: theme.spacing(2)
  }
}));

export default function QuickAddGameNote(props) {
  const classes = useStyles();
  const { language } = useContext(LanguageContext);
  const { postNote, loading, error } = useContext(NoteContext);
  const [note, setNote] = useState("");
  const [filter, setFilter] = useState("");
  const [universal, setUniversal] = useState(false);

  const toggleUniversal = () => {
    setUniversal(!universal);
  };

  return (
    <div className="quick-add">
      <Typography variant="h5" className={classes.spaced}>
        {localeSelect(language, quickAdd)}
      </Typography>
      {error && (
        <p>
          <span>Error:</span> {error}
        </p>
      )}
      <FormControlLabel
        control={
          <Checkbox
            checked={universal}
            onChange={toggleUniversal}
            value={universal}
            color="primary"
          />
        }
        label={localeSelect(language, universalNote)}
        className={classes.spaced}
      />
      <Typography variant="h6">
        {localeSelect(language, newNoteFilter)}
      </Typography>
      <Select
        options={props.filters.map(filter => {
          return {
            label: dbLocale(language, filter),
            value: filter._id
          };
        })}
        onChange={e => {
          setFilter(e.target.value);
        }}
        className={classes.spaced}
      />
      <Typography variant="h6">{localeSelect(language, newNote)}</Typography>
      <TextField
        multiline
        value={note}
        onChange={e => {
          setNote(e.target.value);
        }}
        fullWidth
        className={classes.spaced}
      />
      <Button onClick={postNote} variant="contained" color="primary">
        {localeSelect(language, createNote)}
      </Button>
    </div>
  );
}

// class QuickAddGameNote extends React.Component {
//   state = {
//     filter: "",
//     note: "",
//     universal: false,
//     loading: false,
//     success: false,
//     error: null
//   };

//   setFilter = e => {
//     const filter = e.value;
//     this.setState({
//       filter
//     });
//   };

//   handleCheck = e => {
//     const universal = !this.state.universal;
//     this.setState({
//       universal
//     });
//   };

//   setNote = e => {
//     const note = e.target.value;
//     this.setState({
//       note
//     });
//   };

//   postNote = async e => {
//     e.preventDefault();
//     this.setState({
//       loading: true,
//       error: null
//     });
//     const { filter, note: noteBody, universal } = this.state;
//     const { myCharacter, opponentCharacter, game, user } = this.props;
//     let note = null;
//     if (universal) {
//       note = {
//         filter,
//         note: noteBody,
//         myCharacter,
//         game,
//         universal
//       };
//     } else {
//       note = {
//         filter,
//         note: noteBody,
//         myCharacter,
//         opponentCharacter,
//         game
//       };
//     }
//     const token = await getToken();
//     if (filter !== "") {
//       try {
//         const res = await axios.post("/api/notes/game", {
//           token,
//           user,
//           note
//         });
//         await this.props.addToNotes(res.data.data);
//         if (res) {
//           this.setState({
//             loading: false,
//             success: true,
//             note: ""
//           });
//         }
//       } catch (e) {
//         this.setState({
//           loading: false,
//           error: e.message
//         });
//       }
//     } else {
//       this.setState({
//         loading: false,
//         error: localeSelect(language, specifyFilter)
//       });
//     }
//   };

//   render() {
//     const { classes } = this.props;
//     return (
//       <div className="quick-add">
//         <Typography variant="h5" className={classes.spaced}>
//           {localeSelect(language, quickAdd)}
//         </Typography>
//         {this.state.error && (
//           <p>
//             <span>Error:</span> {this.state.error}
//           </p>
//         )}
//         <FormControlLabel
//           control={
//             <Checkbox
//               checked={this.state.universal}
//               onChange={this.handleCheck}
//               value={this.state.universal}
//               color="primary"
//             />
//           }
//           label={localeSelect(language, universalNote)}
//           className={classes.spaced}
//         />
//         <Typography variant="h6">
//           {localeSelect(language, newNoteFilter)}
//         </Typography>
//         <Select
//           options={props.filters.map(filter => {
//             return {
//               label: dbLocale(language, filter),
//               value: filter._id
//             };
//           })}
//           onChange={this.setFilter}
//           className={classes.spaced}
//         />
//         <Typography variant="h6">
//           {localeSelect(language, newNote)}
//         </Typography>
//         <TextField
//           multiline
//           name="note"
//           value={this.state.note}
//           onChange={this.setNote}
//           fullWidth
//           className={classes.spaced}
//         />
//         <Button onClick={this.postNote} variant="contained" color="primary">
//           {localeSelect(language, createNote)}
//         </Button>
//       </div>
//     );
//   }
// }

// QuickAddGameNote.propTypes = {
//   classes: PropTypes.object.isRequired
// };

// export default withStyles(styles)(QuickAddGameNote);
