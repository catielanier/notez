import React, { useState, useContext } from "react";
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
  addGame,
  clearForm,
  gameCreated,
  englishGame,
  japaneseGame,
  koreanGame,
  simplifiedGame,
  traditionalGame,
  cantoneseGame
} from "../data/locales";
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

export default function AddGame() {
  const classes = useStyles();
  const { language } = useContext(LanguageContext);
  const { loading, error, createGame, success } = useContext(GameContext);
  const { user } = useContext(UserContext);
  const [name, setName] = useState("");
  const [nameJa, setNameJa] = useState("");
  const [nameKo, setNameKo] = useState("");
  const [nameCn, setNameCn] = useState("");
  const [nameTw, setNameTw] = useState("");
  const [nameHk, setNameHk] = useState("");
  if (!user) {
    return <Redirect to="/" />;
  }
  return (
    <section className="add-game">
      <Typography className={classes.header} variant="h5">
        {localeSelect(language, addGame)}
      </Typography>
      <form
        onSubmit={e => {
          e.preventDefault();
          createGame(name, nameJa, nameKo, nameCn, nameTw, nameHk);
        }}
        disabled={loading}
      >
        <Container maxWidth="sm">
          {success && <p>{localeSelect(language, gameCreated)}</p>}
          {error && (
            <p className="error">
              <span>Error:</span> {error}
            </p>
          )}
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
                {localeSelect(language, addGame)}
              </Button>
              {loading && (
                <CircularProgress
                  size={20}
                  color="secondary"
                  className={classes.buttonProgress}
                />
              )}
            </div>
            <div className={classes.wrapper}>
              <Button
                onClick={() => {
                  setName("");
                  setNameJa("");
                  setNameKo("");
                  setNameCn("");
                  setNameTw("");
                  setNameHk("");
                }}
              >
                {localeSelect(language, clearForm)}
              </Button>
            </div>
          </Container>
        </Container>
      </form>
    </section>
  );
}
