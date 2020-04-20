import React, { useContext, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Button,
  makeStyles,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import Select from "react-select";
import localeSelect from "../services/localeSelect";
import {
  linkCharactersToGame,
  characterLinked,
  linkCharacters,
} from "../data/locales";
import dbLocale from "../services/dbLocale";
import { LanguageContext } from "../contexts/LanguageContext";
import { UserContext } from "../contexts/UserContext";
import { GameContext } from "../contexts/GameContext";
import { CharacterContext } from "../contexts/CharacterContext";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  spaced: {
    marginBottom: theme.spacing(2),
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function LinkCharacter() {
  const classes = useStyles();
  const { language } = useContext(LanguageContext);
  const { user } = useContext(UserContext);
  const { games, loading, error, success, connectCharacters } = useContext(
    GameContext
  );
  const { characters } = useContext(CharacterContext);
  const [game, setGame] = useState("");
  const [selectedCharacters, setSelectedCharacters] = useState([]);
  const [renderedSelectedCharacters, setRenderedSelectedCharacters] = useState(
    []
  );
  const [unselectedCharacters, setUnselectedCharacters] = useState([]);
  if (!user) {
    return <Redirect to="/" />;
  }
  return (
    <section className="link-character">
      <Container maxWidth="sm">
        <Typography variant="h5">
          {localeSelect(language, linkCharactersToGame)}
        </Typography>
        {error && (
          <p className="error">
            <span>Error:</span> {error}
          </p>
        )}
        {success && <p>{localeSelect(language, characterLinked)}</p>}
        <Select
          className={classes.spaced}
          options={games.map((game) => {
            return {
              label: dbLocale(language, game),
              value: game._id,
            };
          })}
          onChange={(e) => {
            setGame(e.value);
            const selected = [];
            const selectedRender = [];
            const index = games.findIndex((x) => x._id === e.value);
            games[index].characters.forEach((character) => {
              selected.push(character._id);
              selectedRender.push({
                label: dbLocale(language, character),
                value: character._id,
              });
            });
            const unselected = [];
            characters.forEach((character) => {
              const index = selected.findIndex((id) => character._id === id);
              if (index === -1) {
                unselected.push(character);
              }
            });
            setSelectedCharacters(selected);
            selectedRender.sort((x, y) => x.label.localeCompare(y.label));
            setRenderedSelectedCharacters(selectedRender);
            setUnselectedCharacters(unselected);
          }}
        />
      </Container>
      <Container maxWidth="md">
        {game !== "" && (
          <>
            <Container maxWidth="sm" className={classes.spaced}>
              <Typography variant="h6">Select Characters</Typography>
              <Select
                className={classes.spaced}
                options={unselectedCharacters.map((character) => {
                  return {
                    value: character._id,
                    label: dbLocale(language, character),
                  };
                })}
                onChange={(e) => {
                  setSelectedCharacters([...selectedCharacters, e.value]);
                  const renderedSelected = [...renderedSelectedCharacters];
                  renderedSelected.push(e);
                  renderedSelected.sort((x, y) =>
                    x.label.localeCompare(y.label)
                  );
                  setRenderedSelectedCharacters(renderedSelected);
                  const unselected = [];
                  unselectedCharacters.forEach((character) => {
                    if (character._id !== e.value) {
                      unselected.push(character);
                    }
                  });
                  setUnselectedCharacters(unselected);
                }}
              />
              <Typography variant="h6">Selected Characters:</Typography>
              {renderedSelectedCharacters.map((character) => (
                <Grid
                  container
                  spacing={2}
                  key={character.value}
                  alignItems="center"
                >
                  <Grid item md={11}>
                    <Typography>{character.label}</Typography>
                  </Grid>
                  <Grid item md={1}>
                    <IconButton
                      color="secondary"
                      onClick={(e) => {
                        e.preventDefault();
                        const selected = [];
                        const renderedSelected = [];
                        selectedCharacters.forEach((id) => {
                          if (character.value !== id) {
                            selected.push(id);
                          }
                        });
                        renderedSelectedCharacters.forEach((render) => {
                          if (render.value !== character.value) {
                            renderedSelected.push(render);
                          }
                        });
                        const unselected = [...unselectedCharacters];
                        const index = characters.findIndex(
                          (x) => x._id === character.value
                        );
                        unselected.push(characters[index]);
                        unselected.sort((x, y) =>
                          dbLocale(language, x).localeCompare(
                            dbLocale(language, y)
                          )
                        );
                        setUnselectedCharacters(unselected);
                        setSelectedCharacters(selected);
                        setRenderedSelectedCharacters(renderedSelected);
                      }}
                    >
                      <ClearIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
            </Container>
            <Container maxWidth="sm">
              <div className={classes.wrapper}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={(e) => {
                    e.preventDefault();
                    connectCharacters(game, selectedCharacters);
                  }}
                >
                  {localeSelect(language, linkCharacters)}
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
          </>
        )}
      </Container>
    </section>
  );
}
