import React, { useContext, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Checkbox,
  FormControlLabel,
  Button
} from "@material-ui/core";
import Select from "react-select";
import localeSelect from "../services/localeSelect";
import {
  linkCharactersToGame,
  characterLinked,
  linkCharacters
} from "../data/locales";
import dbLocale from "../services/dbLocale";
import { LanguageContext } from "../contexts/LanguageContext";
import { UserContext } from "../contexts/UserContext";
import { GameContext } from "../contexts/GameContext";
import { CharacterContext } from "../contexts/CharacterContext";
import { Redirect } from "react-router-dom";

export default function LinkCharacter() {
  const { language } = useContext(LanguageContext);
  const { user } = useContext(UserContext);
  const { games, loading, error, success, connectCharacters } = useContext(
    GameContext
  );
  const { characters } = useContext(CharacterContext);
  const [game, setGame] = useState("");
  const [selectedCharacters, setSelectedCharacters] = useState([]);
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
          options={games.map(game => {
            return {
              label: dbLocale(language, game),
              value: game._id
            };
          })}
          onChange={e => {
            setGame(e.value);
            const selected = [];
            const index = games.findIndex(x => x._id === e.value);
            games[index].characters.forEach(character => {
              selected.push(character._id);
            });
            setSelectedCharacters(selected);
          }}
        />
      </Container>
      <Container maxWidth="md">
        {game !== "" && (
          <>
            <Grid container spacing={2}>
              {characters.map((character, index) => {
                return (
                  <Grid item key={index} md={3} sm={4} xs={6}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          value={character._id}
                          onChange={e => {
                            const index = selectedCharacters.indexOf(
                              e.target.value
                            );
                            if (index === -1) {
                              selectedCharacters.push(e.target.value);
                            } else {
                              selectedCharacters.splice(index, 1);
                            }
                          }}
                          color="primary"
                          checked={
                            selectedCharacters.indexOf(character._id) !== -1
                          }
                        />
                      }
                      label={dbLocale(language, character)}
                    />
                  </Grid>
                );
              })}
            </Grid>
            <Button
              variant="contained"
              color="primary"
              onClick={e => {
                e.preventDefault();
                connectCharacters(game, selectedCharacters);
              }}
            >
              {localeSelect(language, linkCharacters)}
            </Button>
          </>
        )}
      </Container>
    </section>
  );
}
