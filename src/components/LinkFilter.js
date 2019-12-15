import React from "react";
import {
  Container,
  Typography,
  Grid,
  Checkbox,
  FormControlLabel,
  Button
} from "@material-ui/core";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Select from "react-select";
import { getToken } from "../services/tokenService";
import localeSelect from "../services/localeSelect";
import { linkFiltersToGame, filterLinked, linkFilters } from "../data/locales";
import dbLocale from "../services/dbLocale";

class LinkFilter extends React.Component {
  state = {
    games: [],
    game: "",
    filters: [],
    selected: [],
    loading: false,
    success: false,
    error: null
  };

  pickGame = e => {
    const game = e.value;
    const index = this.state.games.findIndex(oneGame => oneGame._id === game);
    const { filters: selected } = this.state.games[index];
    this.setState({
      game,
      selected
    });
  };

  handleFilters = e => {
    const filter = e.target.value;
    const { selected } = this.state;
    const index = selected.indexOf(filter);
    if (index === -1) {
      selected.push(filter);
      this.setState({
        selected
      });
    } else {
      selected.splice(index, 1);
      this.setState({
        selected
      });
    }
  };

  linkFilters = async e => {
    e.preventDefault();
    this.setState({
      loading: true,
      error: null
    });
    const token = await getToken();
    const { user } = this.props;
    const { game, selected: filters } = this.state;
    try {
      const res = await axios.put(`/api/games/${game}/filter`, {
        user,
        token,
        filters,
        game
      });
      if (res) {
        this.setState({
          loading: false,
          success: true
        });
      }
    } catch (e) {
      this.setState({
        loading: false,
        error: e.message
      });
    }
  };

  componentDidMount = async () => {
    try {
      const res = await axios.get("/api/games");
      const games = res.data.data;
      const res2 = await axios.get("/api/filters/game");
      const filters = res2.data.data;
      filters.sort(function(x, y) {
        return x.name.localeCompare(y.name);
      });
      this.setState({
        games,
        filters
      });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    if (!this.props.user) {
      return <Redirect to="/" />;
    }
    return (
      <section className="link-filter">
        <Container maxWidth="sm">
          <Typography variant="h5">
            {localeSelect(this.props.language, linkFiltersToGame)}
          </Typography>
          {this.state.success && (
            <p>{localeSelect(this.props.language, filterLinked)}</p>
          )}
          <Select
            options={this.state.games.map(game => {
              return {
                label: dbLocale(this.props.language, game),
                value: game._id
              };
            })}
            onChange={this.pickGame}
          />
        </Container>
        <Container maxWidth="md">
          {this.state.game !== "" && (
            <>
              <Grid container spacing={2}>
                {this.state.filters.map((filter, index) => {
                  return (
                    <Grid item key={index} md={3} sm={4} xs={6}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            value={filter._id}
                            onChange={this.handleFilters}
                            color="primary"
                            checked={
                              this.state.selected.indexOf(filter._id) !== -1
                            }
                          />
                        }
                        label={dbLocale(this.props.language, filter)}
                      />
                    </Grid>
                  );
                })}
              </Grid>
              <Button
                variant="contained"
                color="primary"
                onClick={this.linkFilters}
              >
                {localeSelect(this.props.language, linkFilters)}
              </Button>
            </>
          )}
        </Container>
      </section>
    );
  }
}

export default LinkFilter;
