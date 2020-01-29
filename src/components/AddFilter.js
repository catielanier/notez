import React, { useContext, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  CircularProgress,
  FormControlLabel,
  Checkbox,
  makeStyles
} from "@material-ui/core";
import { Redirect } from "react-router-dom";
import localeSelect from "../services/localeSelect";
import {
  addFilter,
  clearForm,
  filterCreated,
  englishFilter,
  japaneseFilter,
  koreanFilter,
  simplifiedFilter,
  traditionalFilter,
  cantoneseFilter,
  playerFilter as playerFilterLocale
} from "../data/locales";
import { UserContext } from "../contexts/UserContext";
import { LanguageContext } from "../contexts/LanguageContext";
import { FilterContext } from "../contexts/FilterContext";

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

export default function AddFilter() {
  const classes = useStyles();
  const { user } = useContext(UserContext);
  const { language } = useContext(LanguageContext);
  const { loading, success, error, createFilter } = useContext(FilterContext);
  const [name, setName] = useState("");
  const [nameJa, setNameJa] = useState("");
  const [nameKo, setNameKo] = useState("");
  const [nameCn, setNameCn] = useState("");
  const [nameTw, setNameTw] = useState("");
  const [nameHk, setNameHk] = useState("");
  const [playerFilter, setPlayerFilter] = useState(false);
  const togglePlayerFilter = () => {
    setPlayerFilter(!playerFilter);
  };
  if (!user) {
    return <Redirect to="/" />;
  }
  return (
    <section className="add-character">
      <Typography className={classes.header} variant="h5">
        {localeSelect(language, addFilter)}
      </Typography>
      <form
        onSubmit={e => {
          e.preventDefault();
          createFilter(
            name,
            nameJa,
            nameKo,
            nameCn,
            nameTw,
            nameHk,
            playerFilter
          );
        }}
        disabled={loading}
      >
        <Container maxWidth="sm">
          {success && <p>{localeSelect(language, filterCreated)}</p>}
          {error && (
            <p className="error">
              <span>Error:</span> {error}
            </p>
          )}
          <FormControlLabel
            control={
              <Checkbox
                checked={playerFilter}
                onChange={togglePlayerFilter}
                value={playerFilter}
                color="primary"
              />
            }
            label={localeSelect(language, playerFilterLocale)}
          />
          <TextField
            label={localeSelect(language, englishFilter)}
            id="standard-name-required"
            value={name}
            onChange={e => {
              setName(e.target.value);
            }}
            fullWidth="true"
            placeholder="Filter Type"
            required
          />
          <TextField
            label={localeSelect(language, japaneseFilter)}
            value={nameJa}
            onChange={e => {
              setNameJa(e.target.value);
            }}
            fullWidth="true"
            placeholder="フィルタータイプ"
          />
          <TextField
            label={localeSelect(language, koreanFilter)}
            value={nameKo}
            onChange={e => {
              setNameKo(e.target.value);
            }}
            fullWidth="true"
            placeholder="필터 타입"
          />
          <TextField
            label={localeSelect(language, simplifiedFilter)}
            value={nameCn}
            onChange={e => {
              setNameCn(e.target.value);
            }}
            fullWidth="true"
            placeholder="过滤器类型"
          />
          <TextField
            label={localeSelect(language, traditionalFilter)}
            value={nameTw}
            onChange={e => {
              setNameTw(e.target.value);
            }}
            fullWidth="true"
            placeholder="過濾器類型"
          />
          <TextField
            label={localeSelect(language, cantoneseFilter)}
            value={nameHk}
            onChange={e => {
              setNameHk(e.target.value);
            }}
            fullWidth="true"
            placeholder="過濾器類型"
          />
          <Container className={classes.buttonRow}>
            <div className={classes.wrapper}>
              <Button
                variant="contained"
                type="submit"
                color="primary"
                disabled={loading}
              >
                {localeSelect(language, addFilter)}
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
                  setPlayerFilter(false);
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
