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
import QuickAddGameNote from "./QuickAddGameNote";
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

class GameNotes extends React.Component {
  state = {
    games: [],
    myCharacter: "",
    opponentCharacter: "",
    filter: "",
    characters: [],
    filters: [],
    allGameNotes: [],
    fullGameNotes: [],
    gameNotes: [],
    game: "",
    noteEditor: false,
    noteId: null,
    noteFilter: "",
    noteBody: ""
  };

  async componentDidMount() {
    const { user } = this.props;
    const resUser = await axios.get(`/api/users/${user}`);
    const allGameNotes = resUser.data.data.gameNotes;
    const resGames = await axios.get("/api/games");
    const games = resGames.data.data;
    if (this.props.language === "ja") {
      games.sort((x, y) => {
        return x.name_ja.localeCompare(y.name_ja);
      });
    } else if (this.props.language === "ko") {
      games.sort((x, y) => {
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
    } else {
      games.sort((x, y) => {
        return x.name.localeCompare(y.name);
      });
    }

    this.setState({
      games,
      allGameNotes
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

  setGame = e => {
    const { value: game } = e;
    const index = this.state.games.findIndex(x => x._id === game);
    const { characters, filters } = this.state.games[index];
    if (this.props.language === "ja") {
      characters.sort((x, y) => {
        return x.name_ja.localeCompare(y.name_ja);
      });
      filters.sort((x, y) => {
        return x.name_ja.localeCompare(y.name_ja);
      });
    } else if (this.props.language === "ko") {
      characters.sort((x, y) => {
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
      characters.sort((x, y) => {
        return x["name_zh-cn"].localeCompare(y["name_zh-cn"]);
      });
      filters.sort((x, y) => {
        return x["name_zh-cn"].localeCompare(y["name_zh-cn"]);
      });
    } else {
      characters.sort((x, y) => {
        return x.name.localeCompare(y.name);
      });
      filters.sort((x, y) => {
        return x.name.localeCompare(y.name);
      });
    }
    this.setState({
      game,
      characters,
      filters
    });
  };

  setMyCharacter = e => {
    const myCharacter = e.value;
    const { opponentCharacter } = this.state;
    if (myCharacter !== "" && opponentCharacter !== "") {
      const fullGameNotes = [];
      this.state.allGameNotes.forEach(note => {
        if (note.myCharacter === myCharacter && note.universal) {
          fullGameNotes.push(note);
        }
      });
      this.state.allGameNotes.forEach(note => {
        if (
          note.myCharacter === myCharacter &&
          note.opponentCharacter === opponentCharacter
        ) {
          fullGameNotes.push(note);
        }
      });
      this.setState({
        fullGameNotes,
        gameNotes: fullGameNotes,
        myCharacter
      });
    } else {
      this.setState({
        myCharacter
      });
    }
  };

  setOpponentCharacter = e => {
    const opponentCharacter = e.value;
    const { myCharacter } = this.state;
    if (myCharacter !== "" && opponentCharacter !== "") {
      const fullGameNotes = [];
      this.state.allGameNotes.forEach(note => {
        if (note.myCharacter === myCharacter && note.universal) {
          fullGameNotes.push(note);
        }
      });
      this.state.allGameNotes.forEach(note => {
        if (
          note.myCharacter === myCharacter &&
          note.opponentCharacter === opponentCharacter
        ) {
          fullGameNotes.push(note);
        }
      });
      this.setState({
        fullGameNotes,
        gameNotes: fullGameNotes,
        opponentCharacter
      });
    } else {
      this.setState({
        opponentCharacter,
        fullGameNotes: []
      });
    }
  };

  setFilter = e => {
    const filter = e.value;
    const { myCharacter, opponentCharacter, fullGameNotes } = this.state;
    if (myCharacter !== "" && opponentCharacter !== "") {
      const gameNotes = [];
      fullGameNotes.forEach(note => {
        if (
          note.myCharacter === myCharacter &&
          note.universal &&
          note.filter._id === filter
        ) {
          gameNotes.push(note);
        }
      });
      fullGameNotes.forEach(note => {
        if (
          note.myCharacter === myCharacter &&
          note.opponentCharacter === opponentCharacter &&
          note.filter._id === filter
        ) {
          gameNotes.push(note);
        }
      });
      console.log(gameNotes);
      this.setState({
        filter,
        gameNotes
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
    const { fullGameNotes } = this.state;
    this.setState({
      gameNotes: fullGameNotes,
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
      <section className="game-notes">
        <Container>
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <Typography variant="h5" className={classes.spaced}>
                {this.props.language === "ja"
                  ? "ゲームノート"
                  : this.props.language === "ko"
                  ? "게임 노트"
                  : this.props.language === "zh-CN"
                  ? "游戏笔记"
                  : this.props.language === "zh-HK" ||
                    this.props.language === "zh-TW"
                  ? "遊戲筆記"
                  : "Game Notes"}
              </Typography>
              <Typography variant="h6">
                {this.props.language === "ja"
                  ? "ゲームを選択してください："
                  : this.props.language === "ko"
                  ? "게임을 선택하십시오:"
                  : this.props.language === "zh-CN"
                  ? "选择一个游戏："
                  : this.props.language === "zh-HK" ||
                    this.props.language === "zh-TW"
                  ? "選擇一個遊戲："
                  : "Choose a game:"}
              </Typography>
              <Select
                options={
                  this.props.language === "ja"
                    ? this.state.games.map(game => {
                        return { label: game.name_ja, value: game._id };
                      })
                    : this.props.language === "ko"
                    ? this.state.games.map(game => {
                        return { label: game.name_ko, value: game._id };
                      })
                    : this.props.language === "zh-CN"
                    ? this.state.games.map(game => {
                        return {
                          label: game["name_zh-cn"],
                          value: game._id
                        };
                      })
                    : this.props.language === "zh-TW"
                    ? this.state.games.map(game => {
                        return {
                          label: game["name_zh-tw"],
                          value: game._id
                        };
                      })
                    : this.props.language === "zh-HK"
                    ? this.state.games.map(game => {
                        return {
                          label: game["name_zh-hk"],
                          value: game._id
                        };
                      })
                    : this.state.games.map(game => {
                        return { label: game.name, value: game._id };
                      })
                }
                onChange={this.setGame}
                className={classes.spaced}
              />
              <Typography variant="h6">
                {this.props.language === "ja"
                  ? "キャラクターを選択してください："
                  : this.props.language === "ko"
                  ? "당신의 성격을 선택하십시오:"
                  : this.props.language === "zh-CN"
                  ? "选择你的角色："
                  : this.props.language === "zh-HK" ||
                    this.props.language === "zh-TW"
                  ? "選擇你的角色："
                  : "Choose your character:"}
              </Typography>
              <Select
                options={
                  this.props.language === "ja"
                    ? this.state.characters.map(character => {
                        return {
                          label: character.name_ja,
                          value: character._id
                        };
                      })
                    : this.props.language === "ko"
                    ? this.state.characters.map(character => {
                        return {
                          label: character.name_ko,
                          value: character._id
                        };
                      })
                    : this.props.language === "zh-CN"
                    ? this.state.characters.map(character => {
                        return {
                          label: character["name_zh-cn"],
                          value: character._id
                        };
                      })
                    : this.props.language === "zh-TW"
                    ? this.state.characters.map(character => {
                        return {
                          label: character["name_zh-tw"],
                          value: character._id
                        };
                      })
                    : this.props.language === "zh-HK"
                    ? this.state.characters.map(character => {
                        return {
                          label: character["name_zh-hk"],
                          value: character._id
                        };
                      })
                    : this.state.characters.map(character => {
                        return { label: character.name, value: character._id };
                      })
                }
                onChange={this.setMyCharacter}
                className={classes.spaced}
              />
              <Typography variant="h6">
                {this.props.language === "ja"
                  ? "対戦相手のキャラクターを選択してください："
                  : this.props.language === "ko"
                  ? "상대의 캐릭터를 선택하십시오:"
                  : this.props.language === "zh-CN"
                  ? "选择对手的角色："
                  : this.props.language === "zh-HK" ||
                    this.props.language === "zh-TW"
                  ? "選擇對手的角色："
                  : "Choose your opponent's character:"}
              </Typography>
              <Select
                options={
                  this.props.language === "ja"
                    ? this.state.characters.map(character => {
                        return {
                          label: character.name_ja,
                          value: character._id
                        };
                      })
                    : this.props.language === "ko"
                    ? this.state.characters.map(character => {
                        return {
                          label: character.name_ko,
                          value: character._id
                        };
                      })
                    : this.props.language === "zh-CN"
                    ? this.state.characters.map(character => {
                        return {
                          label: character["name_zh-cn"],
                          value: character._id
                        };
                      })
                    : this.props.language === "zh-TW"
                    ? this.state.characters.map(character => {
                        return {
                          label: character["name_zh-tw"],
                          value: character._id
                        };
                      })
                    : this.props.language === "zh-HK"
                    ? this.state.characters.map(character => {
                        return {
                          label: character["name_zh-hk"],
                          value: character._id
                        };
                      })
                    : this.state.characters.map(character => {
                        return { label: character.name, value: character._id };
                      })
                }
                onChange={this.setOpponentCharacter}
                className={classes.spaced}
              />
              <Typography variant="h6">
                {this.props.language === "ja"
                  ? "（オプション）フィルターを選択します："
                  : this.props.language === "ko"
                  ? "(선택 사항) 필터를 선택하십시오:"
                  : this.props.language === "zh-CN"
                  ? "（可选）选择您的过滤器："
                  : this.props.language === "zh-HK" ||
                    this.props.language === "zh-TW"
                  ? "（可選）選擇您的過濾器："
                  : "Choose your filter (optional):"}
              </Typography>
              <Select
                options={
                  this.props.language === "ja"
                    ? this.state.filters.map(filter => {
                        return { label: filter.name_ja, value: filter._id };
                      })
                    : this.props.language === "ko"
                    ? this.state.filters.map(filter => {
                        return { label: filter.name_ko, value: filter._id };
                      })
                    : this.props.language === "zh-CN"
                    ? this.state.filters.map(filter => {
                        return {
                          label: filter["name_zh-cn"],
                          value: filter._id
                        };
                      })
                    : this.props.language === "zh-TW"
                    ? this.state.filters.map(filter => {
                        return {
                          label: filter["name_zh-tw"],
                          value: filter._id
                        };
                      })
                    : this.props.language === "zh-HK"
                    ? this.state.filters.map(filter => {
                        return {
                          label: filter["name_zh-hk"],
                          value: filter._id
                        };
                      })
                    : this.state.filters.map(filter => {
                        return { label: filter.name, value: filter._id };
                      })
                }
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
                  {this.props.language === "ja"
                    ? "フィルターをクリア"
                    : this.props.language === "ko"
                    ? "필터 지우기"
                    : this.props.language === "zh-CN"
                    ? "清除筛选"
                    : this.props.language === "zh-HK" ||
                      this.props.language === "zh-TW"
                    ? "清除篩選"
                    : "Clear Filter"}
                </Button>
              )}
            </Grid>
            <Grid item md={6} xs={12}>
              {this.state.game !== "" &&
                this.state.myCharacter !== "" &&
                this.state.opponentCharacter !== "" && (
                  <Container>
                    <Typography variant="h5" className={classes.spaced}>
                      {this.props.language === "ja"
                        ? "ノート:"
                        : this.props.language === "ko"
                        ? "노트:"
                        : this.props.language === "zh-CN"
                        ? "笔记："
                        : this.props.language === "zh-HK" ||
                          this.props.language === "zh-TW"
                        ? "筆記："
                        : "Notes:"}
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
                              filter_ja={note.filter.name_ja}
                              filter_ko={note.filter.name_ko}
                              filter_zh-cn={note.filter["name_zh-cn"]}
                              filter_zh-tw={note.filter["name_zh-tw"]}
                              filter_zh-hk={note.filter["name_zh-hk"]}
                              language={this.props.language}
                            />
                          );
                        })
                      ) : (
                        <PopulateNotes
                          filter="Notice"
                          filter_ja="通知"
                          filter_ko="주의"
                          filter_zh-cn="注意"
                          filter_zh-hk="注意"
                          filter_zh-tw="注意"
                          language={this.props.language}
                          note={
                            this.props.language === "ja"
                              ? "この対戦についてのメモはありません。 以下を追加してください！"
                              : this.props.language === "ko"
                              ? "이 경기에 대한 메모가 없습니다. 아래에 몇 가지를 추가하십시오!"
                              : this.props.language === "zh-CN"
                              ? "您没有关于这场比赛的任何笔记。 在下面添加一些！"
                              : this.props.language === "zh-TW"
                              ? "您沒有關於這場比賽的任何筆記。 在下面添加一些！"
                              : this.props.language === "zh-HK"
                              ? "你冇关於呢场比赛嘅任何碌士。喺下面添加啲！"
                              : "You do not have any notes for this matchup. Add some below!"
                          }
                        />
                      )}
                    </Grid>
                    <QuickAddGameNote
                      user={this.props.user}
                      game={this.state.game}
                      myCharacter={this.state.myCharacter}
                      opponentCharacter={this.state.opponentCharacter}
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

GameNotes.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GameNotes);
