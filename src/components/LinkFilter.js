import React, { useContext, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Checkbox,
  FormControlLabel,
  Button
} from "@material-ui/core";
import { Redirect } from "react-router-dom";
import Select from "react-select";
import localeSelect from "../services/localeSelect";
import { linkFiltersToGame, filterLinked, linkFilters } from "../data/locales";
import dbLocale from "../services/dbLocale";
import { LanguageContext } from "../contexts/LanguageContext";
import { UserContext } from "../contexts/UserContext";
import { GameContext } from "../contexts/GameContext";
import { FilterContext } from "../contexts/FilterContext";

export default function LinkFilter() {
  const { language } = useContext(LanguageContext);
  const { user } = useContext(UserContext);
  const { games, loading, error, success, connectFilters } = useContext(
    GameContext
  );
  const { filters } = useContext(FilterContext);
  const [game, setGame] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);
  if (!user) {
    return <Redirect to="/" />;
  }
  return (
    <section className="link-filter">
      <Container maxWidth="sm">
        <Typography variant="h5">
          {localeSelect(language, linkFiltersToGame)}
        </Typography>
        {error && (
          <p className="error">
            <span>Error:</span> {error}
          </p>
        )}
        {success && <p>{localeSelect(language, filterLinked)}</p>}
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
            games[index].filters.forEach(filter => {
              selected.push(filter._id);
            });
            setSelectedFilters(selected);
          }}
        />
      </Container>
      <Container maxWidth="md">
        {game !== "" && (
          <>
            <Grid container spacing={2}>
              {filters.map((filter, index) => {
                return (
                  <Grid item key={index} md={3} sm={4} xs={6}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          value={filter._id}
                          onChange={e => {
                            const index = selectedFilters.indexOf(
                              e.target.value
                            );
                            if (index === -1) {
                              selectedFilters.push(e.target.value);
                            } else {
                              selectedFilters.splice(index, 1);
                            }
                          }}
                          color="primary"
                          checked={selectedFilters.indexOf(filter._id) !== -1}
                        />
                      }
                      label={dbLocale(language, filter)}
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
                connectFilters(game, selectedFilters);
              }}
            >
              {localeSelect(language, linkFilters)}
            </Button>
          </>
        )}
      </Container>
    </section>
  );
}
