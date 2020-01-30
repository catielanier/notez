import React, {useContext, useState} from "react";
import Select from "react-select";
import {
  TextField,
  Button,
  Typography,
  Container,
  CircularProgress,
  makeStyles
} from "@material-ui/core";
import { Redirect } from "react-router-dom";
import localeSelect from "../services/localeSelect";
import {
  editCharacter as editCharacterLocale,
  englishCharacter,
  japaneseCharacter,
  koreanCharacter,
  simplifiedCharacter,
  traditionalCharacter,
  cantoneseCharacter
} from "../data/locales";
import dbLocale from "../services/dbLocale";
import { LanguageContext } from "../contexts/LanguageContext";
import { UserContext } from "../contexts/UserContext";
import { CharacterContext } from "../contexts/CharacterContext";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  header: {
    textAlign: "center"
  },
  buttonRow: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(2)
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative"
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
}));

export default function EditCharacter() {
  const classes = useStyles();
  const { language } = useContext(LanguageContext);
  const { characters, loading, error, editCharacter, success } = useContext(CharacterContext);
  const { user } = useContext(UserContext);
  const [name, setName] = useState("");
  const [nameJa, setNameJa] = useState("");
  const [nameKo, setNameKo] = useState("");
  const [nameCn, setNameCn] = useState("");
  const [nameTw, setNameTw] = useState("");
  const [nameHk, setNameHk] = useState("");
  const [character, setCharacter] = useState("");
  return (
    <section>
      <Typography variant="h5" className={classes.header}>
        {localeSelect(language, editCharacterLocale)}
      </Typography>
      <Container maxWidth="sm">
        <Select
          options={characters.map(character => {
            return {
              label: dbLocale(language, character),
              value: character._id
            };
          })}
          onChange={e => {
            setCharacter(e.value);
            const index = characters.findIndex(x => x._id === e.value);
            setName(characters[index].name);
            setNameKo(characters[index].name_ko);
            setNameJa(characters[index].name_ja);
            setNameCn(characters[index]["name_zh-cn"]);
            setNameTw(characters[index]["name_zh-tw"]);
            setNameHk(characters[index]["name_zh-hk"]);
          }}
        />
        {character !== "" && (
          <form onSubmit={e => {
            e.preventDefault();
            editCharacter(character, name, nameJa, nameKo, nameCn, nameTw, nameHk);
          }}>
            <TextField
              label={localeSelect(language, englishCharacter)}
              id="standard-name-required"
              value={name}
              onChange={e => {
                setName(e.target.value);
              }}
              fullWidth="true"
              placeholder="Character Name"
              required
            />
            <TextField
              label={localeSelect(language, japaneseCharacter)}
              value={nameJa}
              onChange={e => {
                setNameJa(e.target.value);
              }}
              fullWidth="true"
              placeholder="キャラクター名"
            />
            <TextField
              label={localeSelect(language, koreanCharacter)}
              value={nameKo}
              onChange={e => {
                setNameKo(e.target.value);
              }}
              fullWidth="true"
              placeholder="캐릭터 이름"
            />
            <TextField
              label={localeSelect(language, simplifiedCharacter)}
              value={nameCn}
              onChange={e => {
                setNameCn(e.target.value);
              }}
              fullWidth="true"
              placeholder="角色名字"
            />
            <TextField
              label={localeSelect(language, traditionalCharacter)}
              value={nameTw}
              onChange={e=> {
                setNameTw(e.target.value);
              }}
              fullWidth="true"
              placeholder="角色名字"
            />
            <TextField
              label={localeSelect(language, cantoneseCharacter)}
              value={nameHk}
              onChange={e => {
                setNameHk(e.target.value);
              }}
              fullWidth="true"
              placeholder="角色名字"
            />
            <Container className={classes.buttonRow}>
              <div className={classes.wrapper}>
                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                  disabled={loading}
                >
                  {localeSelect(language, editCharacterLocale)}
                </Button>
                {loading && (
                  <CircularProgress
                    size={20}
                    color="secondary"
                    className={classes.buttonProgress}
                  />
                )}
              </div>
            </Container>
          </form>
        )}
      </Container>
    </section>
  )
}

// class EditCharacter extends React.Component {
//   state = {
//     characters: [],
//     character: "",
//     name: "",
//     name_ja: "",
//     name_ko: "",
//     "name_zh-cn": "",
//     "name_zh-tw": "",
//     "name_zh-hk": "",
//     loading: false,
//     success: false,
//     error: null
//   };
//
//   async componentDidMount() {
//     await axios.get("/api/characters").then(res => {
//       const characters = res.data.data;
//       if (language === "ja") {
//         characters.sort((x, y) => {
//           return x.name_ja.localeCompare(y.name_ja);
//         });
//       } else if (language === "ko") {
//         characters.sort((x, y) => {
//           return x.name_ko.localeCompare(y.name_ko);
//         });
//       } else if (
//         language === "zh-CN" ||
//         language === "zh-TW" ||
//         language === "zh-HK"
//       ) {
//         characters.sort((x, y) => {
//           return x["name_zh-cn"].localeCompare(y["name_zh-cn"]);
//         });
//       } else {
//         characters.sort((x, y) => {
//           return x.name.localeCompare(y.name);
//         });
//       }
//       this.setState({
//         characters
//       });
//     });
//   }
//
//   setCharacter = e => {
//     const character = e.value;
//     const { characters } = this.state;
//     const index = characters.findIndex(x => x._id === character);
//     const { name, name_ja, name_ko } = characters[index];
//     const name_cn = characters[index]["name_zh-cn"];
//     const name_tw = characters[index]["name_zh-tw"];
//     const name_hk = characters[index]["name_zh-hk"];
//     this.setState({
//       character,
//       name,
//       name_ja,
//       name_ko,
//       "name_zh-cn": name_cn,
//       "name_zh-tw": name_tw,
//       "name_zh-hk": name_hk
//     });
//   };
//
//   changeState = e => {
//     const { name, value } = e.target;
//     this.setState({
//       [name]: value
//     });
//   };
//
//   updateCharacter = async e => {
//     e.preventDefault();
//     this.setState({
//       loading: true,
//       error: null
//     });
//     const {
//       name,
//       name_ja,
//       name_ko,
//       "name_zh-cn": name_cn,
//       "name_zh-tw": name_tw,
//       "name_zh-hk": name_hk,
//       character
//     } = this.state;
//     const { user } = this.props;
//     const token = await getToken();
//     try {
//       const res = await axios.put(`/api/characters/`, {
//         data: {
//           token,
//           user,
//           name,
//           name_ja,
//           name_ko,
//           name_cn,
//           name_tw,
//           name_hk,
//           character
//         }
//       });
//       if (res) {
//         this.setState({
//           success: true,
//           loading: false
//         });
//       }
//     } catch (e) {
//       this.setState({
//         error: e.message,
//         loading: false
//       });
//     }
//   };
//
//   render() {
//     const { classes } = this.props;
//     if (!this.props.user) {
//       return <Redirect to="/" />;
//     }
//     return (
//       <section>
//         <Typography variant="h5" className={classes.header}>
//           {localeSelect(language, editCharacter)}
//         </Typography>
//         <Container maxWidth="sm">
//           <Select
//             options={this.state.characters.map(character => {
//               return {
//                 label: dbLocale(language, character),
//                 value: character._id
//               };
//             })}
//             onChange={this.setCharacter}
//           />
//           {this.state.character !== "" && (
//             <form onSubmit={this.updateCharacter}>
//               <TextField
//                 label={localeSelect(language, englishCharacter)}
//                 id="standard-name-required"
//                 value={this.state.name}
//                 name="name"
//                 onChange={this.changeState}
//                 fullWidth="true"
//                 placeholder="Character Name"
//                 required
//               />
//               <TextField
//                 label={localeSelect(language, japaneseCharacter)}
//                 value={this.state.name_ja}
//                 name="name_ja"
//                 onChange={this.changeState}
//                 fullWidth="true"
//                 placeholder="キャラクター名"
//               />
//               <TextField
//                 label={localeSelect(language, koreanCharacter)}
//                 value={this.state.name_ko}
//                 name="name_ko"
//                 onChange={this.changeState}
//                 fullWidth="true"
//                 placeholder="캐릭터 이름"
//               />
//               <TextField
//                 label={localeSelect(language, simplifiedCharacter)}
//                 value={this.state["name_zh-cn"]}
//                 name="name_zh-cn"
//                 onChange={this.changeState}
//                 fullWidth="true"
//                 placeholder="角色名字"
//               />
//               <TextField
//                 label={localeSelect(language, traditionalCharacter)}
//                 value={this.state["name_zh-tw"]}
//                 name="name_zh-tw"
//                 onChange={this.changeState}
//                 fullWidth="true"
//                 placeholder="角色名字"
//               />
//               <TextField
//                 label={localeSelect(language, cantoneseCharacter)}
//                 value={this.state["name_zh-hk"]}
//                 name="name_zh-hk"
//                 onChange={this.changeState}
//                 fullWidth="true"
//                 placeholder="角色名字"
//               />
//               <Container className={classes.buttonRow}>
//                 <div className={classes.wrapper}>
//                   <Button
//                     variant="contained"
//                     type="submit"
//                     color="primary"
//                     disabled={this.state.loading}
//                   >
//                     {localeSelect(language, editCharacter)}
//                   </Button>
//                   {this.state.loading && (
//                     <CircularProgress
//                       size={20}
//                       color="secondary"
//                       className={classes.buttonProgress}
//                     />
//                   )}
//                 </div>
//               </Container>
//             </form>
//           )}
//         </Container>
//       </section>
//     );
//   }
// }
//
// EditCharacter.propTypes = {
//   classes: PropTypes.object.isRequired
// };
//
// export default withStyles(styles)(EditCharacter);
