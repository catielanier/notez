import React, { useState, useContext } from "react";
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
  editGame as editGameLocale,
  englishGame,
  japaneseGame,
  koreanGame,
  simplifiedGame,
  traditionalGame,
  cantoneseGame
} from "../data/locales";
import dbLocale from "../services/dbLocale";
import { LanguageContext } from "../contexts/LanguageContext";
import { UserContext } from "../contexts/UserContext";
import { GameContext } from "../contexts/GameContext";

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

export default function EditGame() {
  const classes = useStyles();
  const { language } = useContext(LanguageContext);
  const { games, loading, error, editGame, success } = useContext(GameContext);
  const { user } = useContext(UserContext);
  const [name, setName] = useState("");
  const [nameJa, setNameJa] = useState("");
  const [nameKo, setNameKo] = useState("");
  const [nameCn, setNameCn] = useState("");
  const [nameTw, setNameTw] = useState("");
  const [nameHk, setNameHk] = useState("");
  const [game, setGame] = useState("");
  if (!user) {
    return <Redirect to="/" />;
  }
  return (
    <section>
      <Typography variant="h5" className={classes.header}>
        {localeSelect(language, editGameLocale)}
      </Typography>
      <Container maxWidth="sm">
        <Select
          options={games.map(game => {
            return {
              label: dbLocale(language, game),
              value: game._id
            };
          })}
          onChange={e => {
            setGame(e.value);
            const index = games.findIndex(x => x._id === e.value);
            setName(games[index].name);
            setNameKo(games[index].name_ko);
            setNameJa(games[index].name_ja);
            setNameCn(games[index]["name_zh-cn"]);
            setNameTw(games[index]["name_zh-tw"]);
            setNameHk(games[index]["name_zh-hk"]);
          }}
        />
        {game !== "" && (
          <form
            onSubmit={e => {
              e.preventDefault();
              editGame(game, name, nameJa, nameKo, nameCn, nameTw, nameHk);
            }}
          >
            <TextField
              label={localeSelect(language, englishGame)}
              id="standard-name-required"
              value={name}
              onChange={e => {
                setName(e.target.value);
              }}
              fullWidth="true"
              placeholder="Game Title"
              required
            />
            <TextField
              label={localeSelect(language, japaneseGame)}
              value={nameJa}
              onChange={e => {
                setNameJa(e.target.value);
              }}
              fullWidth="true"
              placeholder="ゲームタイトル"
            />
            <TextField
              label={localeSelect(language, koreanGame)}
              value={nameKo}
              onChange={e => {
                setNameKo(e.target.value);
              }}
              fullWidth="true"
              placeholder="게임 제목"
            />
            <TextField
              label={localeSelect(language, simplifiedGame)}
              value={nameCn}
              onChange={e => {
                setNameCn(e.target.value);
              }}
              fullWidth="true"
              placeholder="电子游戏标题"
            />
            <TextField
              label={localeSelect(language, traditionalGame)}
              value={nameTw}
              onChange={e => {
                setNameTw(e.target.value);
              }}
              fullWidth="true"
              placeholder="電子遊戲標題"
            />
            <TextField
              label={localeSelect(language, cantoneseGame)}
              value={nameHk}
              onChange={e => {
                setNameHk(e.target.value);
              }}
              fullWidth="true"
              placeholder="電子遊戲標題"
            />
            <Container className={classes.buttonRow}>
              <div className={classes.wrapper}>
                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                  disabled={loading}
                >
                  {localeSelect(language, editGameLocale)}
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
  );
}
