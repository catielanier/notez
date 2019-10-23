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
        const index3 = playerNotes.findIndex(note => note._id === id);
        allPlayerNotes.splice(index1, 1);
        fullPlayerNotes.splice(index2, 1);
        playerNotes.splice(index3, 1);
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
      loading: true
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
                {this.props.language === "ja"
                  ? "プレイヤーノート"
                  : this.props.language === "ko"
                  ? "플레이어 노트"
                  : this.props.language === "zh-CN"
                  ? "玩家笔记"
                  : this.props.language === "zh-TW" ||
                    this.props.language === "zh-HK"
                  ? "玩家筆記"
                  : "Player Notes"}
              </Typography>
              <Typography variant="h6">
                {this.props.language === "ja"
                  ? "対戦相手を選択してください："
                  : this.props.language === "ko"
                  ? "상대를 선택하십시오:"
                  : this.props.language === "zh-CN"
                  ? "选择你的对手："
                  : this.props.language === "zh-TW"
                  ? "選擇你的對手："
                  : this.props.language === "zh-HK"
                  ? "拣你嘅對手："
                  : "Choose your opponent:"}
              </Typography>
              <Creatable
                options={this.state.players.map(player => {
                  return { label: player, value: player };
                })}
                onChange={this.setPlayer}
                className={classes.spaced}
              />
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
                      {this.state.playerNotes.length > 0 ? (
                        this.state.playerNotes.map(note => {
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
              {this.props.language === "ja"
                ? "編集ノート"
                : this.props.language === "ko"
                ? "편집 노트"
                : this.props.language === "zh-CN"
                ? "编辑笔记"
                : this.props.language === "zh-TW"
                ? "編輯筆記"
                : this.props.language === "zh-HK"
                ? "編輯筆記"
                : "Editing Note"}
            </Typography>
            <Typography variant="h6">
              {this.props.language === "ja"
                ? "フィルター"
                : this.props.language === "ko"
                ? "필터"
                : this.props.language === "zh-CN"
                ? "过滤器"
                : this.props.language === "zh-HK" ||
                  this.props.language === "zh-TW"
                ? "過濾器"
                : "Filter"}
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
              {this.props.language === "ja"
                ? "ノートを編集"
                : this.props.language === "ko"
                ? "노트 수정"
                : this.props.language === "zh-CN"
                ? "编辑笔记"
                : this.props.language === "zh-TW"
                ? "編輯筆記"
                : this.props.language === "zh-HK"
                ? "編輯筆記"
                : "Edit Note"}
            </Button>
            <Button className={classes.button} onClick={this.hideEditor}>
              {this.props.language === "ja"
                ? "キャンセル"
                : this.props.language === "ko"
                ? "취소"
                : this.props.language === "zh-CN"
                ? "取消"
                : this.props.language === "zh-TW"
                ? "取消"
                : this.props.language === "zh-HK"
                ? "取消"
                : "Cancel"}
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
